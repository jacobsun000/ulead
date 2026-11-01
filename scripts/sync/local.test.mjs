import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import pg from 'pg';
import { rewriteMedia, schema } from '../../lib/content-sync.mjs';
const base='postgresql://postgres:local-rehearsal-only@127.0.0.1:55439/';
const local=new pg.Client({connectionString:base+'ulead_rehearsal'});
const remote=new pg.Client({connectionString:base+'ulead_us_test'});
await local.connect(); await remote.connect();
const run=(ok=true) => {
 const result=spawnSync(process.execPath,['scripts/sync/run.mjs'],{env:{...process.env,DATABASE_URL:base+'ulead_rehearsal',US_DATABASE_URL:base+'ulead_us_test',US_DATABASE_DRIVER:'postgres',BLOB_READ_WRITE_TOKEN:''},encoding:'utf8',timeout:60000});
 assert.equal(result.status,ok?0:1,result.stdout+result.stderr);
};
try {
 assert.ok(!Object.hasOwn(schema,'contact_us'));
 assert.deepEqual(rewriteMedia({a:['old',{b:'old'}]},new Map([['old','new']])),{a:['new',{b:'new'}]});
 await local.query("INSERT INTO legacy_contact_ids SELECT id FROM contact_us ON CONFLICT DO NOTHING");
 await local.query("UPDATE news SET title='Local sync rehearsal' WHERE id=(SELECT min(id) FROM news)");
 run();
 assert.equal((await remote.query('SELECT title FROM news ORDER BY id LIMIT 1')).rows[0].title,'Local sync rehearsal');
 const {rows:[inquiry]}=await remote.query("INSERT INTO contact_us(name,contact) VALUES('sync-test','test@example.invalid') RETURNING id");
 run(); run();
 assert.equal((await local.query('SELECT count(*)::int AS n FROM contact_us WHERE remote_id=$1',[inquiry.id])).rows[0].n,1);
 await local.query("UPDATE contact_us SET deleted_at=now(),name='',contact='' WHERE remote_id=$1",[inquiry.id]);
 run();
 assert.equal((await remote.query('SELECT count(*)::int AS n FROM contact_us WHERE id=$1',[inquiry.id])).rows[0].n,0);
 const before=(await remote.query('SELECT name FROM alumni ORDER BY id LIMIT 1')).rows[0].name;
 await local.query("UPDATE alumni SET name='Must roll back' WHERE id=(SELECT min(id) FROM alumni)");
 await remote.query('ALTER TABLE news ADD CONSTRAINT rehearsal_failure CHECK(false) NOT VALID');
 run(false);
 assert.equal((await remote.query('SELECT name FROM alumni ORDER BY id LIMIT 1')).rows[0].name,before);
 await remote.query('ALTER TABLE news DROP CONSTRAINT rehearsal_failure');
 console.log('PASS: public table allowlist, nested image mapping, publication, inquiry deduplication, deletion propagation, and atomic rollback.');
} finally {await local.end();await remote.end();}
