import pg from 'pg';
import { readFile } from 'node:fs/promises';
import { schema, quote, rewriteMedia } from '../../lib/content-sync.mjs';
if (process.env.CONFIRM_CHINA_MIGRATION !== 'yes') throw new Error('Explicit China migration confirmation required');
const db = new pg.Client({ connectionString:process.env.DATABASE_URL });
await db.connect();
try {
  await db.query(await readFile('deploy/regional.sql','utf8'));
  const assets = JSON.parse(await readFile(process.argv[2],'utf8'));
  const mapping = new Map(assets.map(asset => [asset.source_url,asset.china_url]));
  await db.query('BEGIN');
  for (const asset of assets) await db.query(`INSERT INTO media_assets(source_url,china_url,blob_url,object_key,sha256)
    VALUES($1,$2,$3,$4,$5) ON CONFLICT(source_url) DO NOTHING`, [asset.source_url,asset.china_url,asset.blob_url,asset.object_key,asset.sha256]);
  for (const [table,columns] of Object.entries(schema)) {
    const { rows } = await db.query(`SELECT * FROM ${quote(table)}`);
    for (const row of rows) {
      const rewritten = rewriteMedia(row,mapping);
      if (JSON.stringify(row) === JSON.stringify(rewritten)) continue;
      const fields = columns.filter(column => column.name !== 'id');
      await db.query(`UPDATE ${quote(table)} SET ${fields.map((column,i) => `${quote(column.name)}=$${i+1}`).join(',')} WHERE id=$${fields.length+1}`,
        [...fields.map(column => ['json','jsonb'].includes(column.type) ? JSON.stringify(rewritten[column.name]) : rewritten[column.name]),row.id]);
    }
  }
  // Run once after a fresh source restore, before this database accepts China submissions.
  await db.query("UPDATE contact_us SET region='historical',remote_id=id WHERE region='cn' AND remote_id IS NULL");
  await db.query('INSERT INTO legacy_contact_ids SELECT remote_id FROM contact_us WHERE region=\'historical\' ON CONFLICT DO NOTHING');
  await db.query('COMMIT');
  console.log(JSON.stringify({localizedMedia:assets.length,contentTables:Object.keys(schema).length}));
} catch (error) { await db.query('ROLLBACK'); throw error; }
finally { await db.end(); }
