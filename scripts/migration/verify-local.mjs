import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import pg from 'pg';

const url = new URL(process.env.MIGRATION_TEST_DATABASE_URL);
assert.ok(['127.0.0.1', 'localhost', '[::1]'].includes(url.hostname));
assert.ok(url.pathname.startsWith('/ulead_rehearsal'));
const [inventoryPath, exportDirectory] = process.argv.slice(2);
const inventory = JSON.parse(await readFile(inventoryPath, 'utf8'));
const manifest = JSON.parse(await readFile(`${exportDirectory}/manifest.json`, 'utf8'));
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
assert.equal(hash(await readFile(`${exportDirectory}/database.dump`)), manifest.databaseSha256);
for (const blob of manifest.blobs) {
  const bytes = await readFile(`${exportDirectory}/blobs/${blob.filename}`);
  assert.equal(hash(bytes), blob.sha256);
  assert.equal(bytes.length, blob.size);
}
const db = new pg.Client({ connectionString: url.href });
await db.connect();
try {
  let totalRows = 0;
  for (const [table, count] of Object.entries(inventory.counts)) {
    const name = `"${table.replaceAll('"', '""')}"`;
    const { rows } = await db.query(`SELECT count(*)::int AS count FROM public.${name}`);
    assert.equal(rows[0].count, count, table);
    totalRows += count;
  }
  const { rows: columns } = await db.query(`
    SELECT table_name, column_name, data_type, udt_name, is_nullable, column_default
    FROM information_schema.columns WHERE table_schema = 'public'
    ORDER BY table_name, ordinal_position`);
  assert.deepEqual(columns, inventory.columns);
  // Test the same parameter types used by the app, including injection-like text.
  process.env.DATABASE_DRIVER = 'postgres';
  process.env.DATABASE_URL = url.href;
  const { sql } = await import('../../lib/db.js');
  const value = "quote'; DROP TABLE contact_us; --";
  const { rows } = await sql`SELECT ${value}::text AS text, ${['a', 'b']}::text[] AS array, ${JSON.stringify({ ok: true })}::jsonb AS json`;
  assert.deepEqual(rows[0], { text: value, array: ['a', 'b'], json: { ok: true } });
  console.log(JSON.stringify({ verifiedTables: Object.keys(inventory.counts).length,
    verifiedRows: totalRows, verifiedBlobs: manifest.blobs.length, schemaMatches: true,
    parameterizationPassed: true }, null, 2));
} finally {
  await db.end();
}
