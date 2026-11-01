import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { parseEnv, promisify } from 'node:util';
import { execFile } from 'node:child_process';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { list } from '@vercel/blob';

// Creates local backups only. No source writes, no target database connection.
process.umask(0o077);
const env = parseEnv(await readFile(process.argv[2] || 'neon.env', 'utf8'));
const output = resolve(process.argv[3] || 'data/backups', `export-${new Date().toISOString().replaceAll(':', '-')}`);
await mkdir(`${output}/blobs`, { recursive: true, mode: 0o700 });

try {
  const url = new URL(env.DATABASE_URL_UNPOOLED || env.POSTGRES_URL_NON_POOLING || env.DATABASE_URL);
  // Credentials are passed in the child environment, never process arguments.
  const pgEnv = {
    ...process.env, PGHOST: url.hostname, PGPORT: url.port || '5432',
    PGUSER: decodeURIComponent(url.username), PGPASSWORD: decodeURIComponent(url.password),
    PGDATABASE: decodeURIComponent(url.pathname.slice(1)), PGSSLMODE: 'verify-full',
    PGSSLROOTCERT: 'system', PGCONNECT_TIMEOUT: '15',
    PGOPTIONS: '-c default_transaction_read_only=on',
  };
  await promisify(execFile)('pg_dump', [
    '--format=custom',
    '--file', `${output}/database.dump`,
  ], { env: pgEnv, timeout: 120000 });
  // Preserve all database schemas, data, sequences, ownership and grants in the archive.
  // Restore elsewhere with --no-owner --no-acl when source roles do not exist there.
  const { stdout: archiveContents } = await promisify(execFile)('pg_restore', [
    '--list', `${output}/database.dump`,
  ], { timeout: 30000 });
  await writeFile(`${output}/database-contents.txt`, archiveContents, { mode: 0o600 });
  const manifest = { exportedAt: new Date().toISOString(), databaseScope: 'full-database', blobs: [] };
  let cursor;
  do {
    const page = await list({ token: env.BLOB_READ_WRITE_TOKEN, limit: 1000, cursor });
    for (const blob of page.blobs) {
      const response = await fetch(blob.url, { signal: AbortSignal.timeout(30000), redirect: 'error' });
      if (!response.ok) throw new Error('Blob download failed');
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length !== blob.size) throw new Error('Blob size changed; repeat export');
      // Hash the URL for local filenames, so remote paths cannot escape the export directory.
      const filename = createHash('sha256').update(blob.url).digest('hex');
      await writeFile(`${output}/blobs/${filename}`, bytes, { flag: 'wx', mode: 0o600 });
      manifest.blobs.push({ ...blob, filename, sha256: createHash('sha256').update(bytes).digest('hex') });
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  const dump = await readFile(`${output}/database.dump`);
  manifest.databaseSha256 = createHash('sha256').update(dump).digest('hex');
  await writeFile(`${output}/manifest.json`, JSON.stringify(manifest, null, 2), { mode: 0o600 });
  console.log(JSON.stringify({ directory: output, databaseBytes: dump.length,
    blobCount: manifest.blobs.length, blobBytes: manifest.blobs.reduce((n, blob) => n + blob.size, 0) }, null, 2));
} catch (error) {
  console.error(`Export failed (${error.name}). Partial directory is not a complete backup; retry after checking source access.`);
  process.exitCode = 1;
}
