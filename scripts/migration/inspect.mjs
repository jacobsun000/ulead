import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { parseEnv } from 'node:util';
import { resolve } from 'node:path';
import { neon } from '@neondatabase/serverless';
import { list } from '@vercel/blob';

// Read-only source inspection. Never print connection strings or customer rows.
const env = parseEnv(await readFile(process.argv[2] || 'neon.env', 'utf8'));
const output = resolve('.migration', new Date().toISOString().replaceAll(':', '-'));
await mkdir(output, { recursive: true, mode: 0o700 });
const quote = (name) => `"${name.replaceAll('"', '""')}"`;

try {
  const sql = neon(env.DATABASE_URL || env.POSTGRES_URL);
  const [version] = await sql`SELECT current_setting('server_version') AS version`;
  const extensions = await sql`SELECT extname, extversion FROM pg_extension ORDER BY extname`;
  const columns = await sql`
    SELECT table_name, column_name, data_type, udt_name, is_nullable, column_default
    FROM information_schema.columns WHERE table_schema = 'public'
    ORDER BY table_name, ordinal_position`;
  const tables = await sql`
    SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename`;
  const counts = {};
  const referencedBlobUrls = new Set();
  for (const { tablename } of tables) {
    const [row] = await sql.query(`SELECT count(*)::int AS count FROM public.${quote(tablename)}`);
    counts[tablename] = row.count;
    // Inspect URL references in memory; do not export customer records.
    if (tablename !== 'contact_us') {
      const rows = await sql.query(`SELECT row_to_json(t)::text AS json FROM public.${quote(tablename)} t`);
      for (const { json } of rows) {
        for (const match of json.matchAll(/https:\/\/[^"\s\\]+\.public\.blob\.vercel-storage\.com\/[^"\s\\]+/g)) {
          referencedBlobUrls.add(match[0]);
        }
      }
    }
  }
  const blobs = [];
  let cursor;
  do {
    const page = await list({ token: env.BLOB_READ_WRITE_TOKEN, limit: 1000, cursor });
    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  const urls = new Set(blobs.map((blob) => blob.url));
  const missingReferences = [...referencedBlobUrls].filter((url) => !urls.has(url));
  let sampledDownloads = 0;
  for (const blob of blobs.slice(0, 3)) {
    const response = await fetch(blob.url, { signal: AbortSignal.timeout(30000), redirect: 'error' });
    if (!response.ok || (await response.arrayBuffer()).byteLength !== blob.size) {
      throw new Error('Blob sample download failed');
    }
    sampledDownloads++;
  }
  const report = {
    inspectedAt: new Date().toISOString(), version: version.version, extensions, counts,
    blobCount: blobs.length, blobBytes: blobs.reduce((sum, blob) => sum + blob.size, 0),
    referencedBlobCount: referencedBlobUrls.size, missingReferenceCount: missingReferences.length,
    sampledDownloads,
  };
  await writeFile(`${output}/inventory.json`, JSON.stringify({ ...report, columns, blobs, missingReferences }, null, 2), { mode: 0o600 });
  console.log(JSON.stringify({ ...report, inventoryDirectory: output }, null, 2));
  if (missingReferences.length) process.exitCode = 2;
} catch (error) {
  // SDK errors can contain URLs or SQL values, so do not log their messages.
  console.error(`Source inspection failed (${error.name}); check credentials, connectivity, and provider status.`);
  process.exitCode = 1;
}
