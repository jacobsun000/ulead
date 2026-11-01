import pg from 'pg';
import { connectRemote } from './remote.mjs';
import { put } from '@vercel/blob';
import { createHash } from 'node:crypto';
import { cosCall } from '../../lib/cos.mjs';
import { schema, quote, rewriteMedia, insertQuery } from '../../lib/content-sync.mjs';

// One writer in China; public snapshots never include inquiries or operational tables.
const local = new pg.Client({ connectionString: process.env.DATABASE_URL });
const remote = await connectRemote();
await local.connect();
try {
  const { rows: [lock] } = await local.query('SELECT pg_try_advisory_lock(741903) AS acquired');
  if (!lock.acquired) { console.log('A publication is already running.'); }
  else {
    if (process.env.SYNC_PUBLISH_ENABLED !== 'false') {
    await local.query('BEGIN ISOLATION LEVEL REPEATABLE READ READ ONLY');
    const snapshot = {};
    for (const table of Object.keys(schema)) snapshot[table] = (await local.query(`SELECT * FROM ${quote(table)} ORDER BY id`)).rows;
    const assets = (await local.query('SELECT * FROM media_assets')).rows;
    await local.query('COMMIT');
    const mapping = new Map();
    for (const asset of assets) {
      let url = asset.blob_url;
      if (!url) {
        const result = await cosCall('getObject', { Key: asset.object_key });
        const bytes = Buffer.from(result.Body);
        if (createHash('sha256').update(bytes).digest('hex') !== asset.sha256) throw new Error('Media checksum mismatch');
        const blob = await put(`china/${asset.sha256}-${asset.object_key.split('/').pop()}`, bytes, {
          access: 'public', addRandomSuffix: false, allowOverwrite: true,
          contentType: result.headers?.['content-type'] || 'application/octet-stream', token: process.env.BLOB_READ_WRITE_TOKEN,
        });
        url = blob.url;
        await local.query('UPDATE media_assets SET blob_url=$1 WHERE source_url=$2', [url, asset.source_url]);
      }
      mapping.set(asset.china_url, url);
    }
    const rewritten = rewriteMedia(snapshot, mapping);
    const version = createHash('sha256').update(JSON.stringify(rewritten)).digest('hex');
    const previous = (await local.query("SELECT version FROM sync_state WHERE name='public-content'")).rows[0];
    if (previous?.version !== version) {
      const queries = [];
      // The inspected source schema has no cross-table foreign keys. Publish atomically.
      for (const [table, columns] of Object.entries(schema)) {
        queries.push({text:`DELETE FROM ${quote(table)}`,values:[]});
        for (const row of rewritten[table]) {
          const query = insertQuery(table, columns, row);
          queries.push(query);
        }
        queries.push({text:`SELECT setval(pg_get_serial_sequence('${table}', 'id'), COALESCE((SELECT max(id) FROM ${quote(table)}),1), EXISTS(SELECT 1 FROM ${quote(table)}))`,values:[]});
      }
      await remote.transaction(queries);
    }
    await local.query(`INSERT INTO sync_state(name,last_success,last_error,version) VALUES('public-content',now(),NULL,$1)
      ON CONFLICT(name) DO UPDATE SET last_success=now(),last_error=NULL,version=excluded.version`, [version]);
    }
    // Full rescan is intentional for this small inbox: no timestamp/sequence cursor gaps.
    const deleted = (await local.query('SELECT remote_id FROM contact_us WHERE remote_id IS NOT NULL AND deleted_at IS NOT NULL')).rows;
    for (const row of deleted) await remote.query('DELETE FROM contact_us WHERE id=$1',[row.remote_id]);
    const inquiries = await remote.query('SELECT id,name,contact,source,questions,created_at FROM contact_us ORDER BY id');
    await local.query('BEGIN');
    for (const row of inquiries) {
      await local.query(`INSERT INTO contact_us(name,contact,source,questions,created_at,region,remote_id)
        SELECT $1,$2,$3,$4,$5,'us',$6 WHERE NOT EXISTS(SELECT 1 FROM legacy_contact_ids WHERE id=$6)
        ON CONFLICT(remote_id) WHERE remote_id IS NOT NULL DO UPDATE SET
        name=excluded.name,contact=excluded.contact,source=excluded.source,questions=excluded.questions
        WHERE contact_us.deleted_at IS NULL`, [row.name,row.contact,row.source,row.questions,row.created_at,row.id]);
    }
    const remoteIds = inquiries.map(row => row.id);
    // Keep a minimal tombstone to prevent a retry from resurrecting a deletion.
    await local.query(`UPDATE contact_us SET deleted_at=COALESCE(deleted_at,now()),name='',contact='',source=NULL,questions=NULL
      WHERE remote_id IS NOT NULL AND NOT(remote_id=ANY($1::int[]))`, [remoteIds]);
    await local.query(`INSERT INTO sync_state(name,last_success,last_error) VALUES('inquiries',now(),NULL)
      ON CONFLICT(name) DO UPDATE SET last_success=now(),last_error=NULL`);
    await local.query('COMMIT');
    await local.query("INSERT INTO sync_state(name,last_success,last_error) VALUES('worker',now(),NULL) ON CONFLICT(name) DO UPDATE SET last_success=now(),last_error=NULL");
    console.log(JSON.stringify({ publicationEnabled: process.env.SYNC_PUBLISH_ENABLED !== 'false', usInquiriesScanned: inquiries.length }));
  }
} catch (error) {
  await local.query('ROLLBACK').catch(() => {});
  await local.query(`INSERT INTO sync_state(name,last_error) VALUES('worker',$1)
    ON CONFLICT(name) DO UPDATE SET last_error=excluded.last_error`, [String(error.code || error.name || 'SyncFailure')]).catch(() => {});
  console.error('Regional sync failed; previous committed content is retained. Error type:', error.code || error.name);
  process.exitCode = 1;
} finally { await local.end(); await remote.close(); }
