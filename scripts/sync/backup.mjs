import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { cosCall } from '../../lib/cos.mjs';
const bytes=await readFile(process.argv[2]);
const date=new Date().toISOString().slice(0,10);
const sha256=createHash('sha256').update(bytes).digest('hex');
const keys=[`backups/daily/${date}.dump`];
if(date.endsWith('-01')) keys.push(`backups/monthly/${date.slice(0,7)}.dump`);
for(const Key of keys) {
  await cosCall('putObject',{Key,Body:bytes,ContentType:'application/octet-stream',Headers:{'x-cos-meta-sha256':sha256}});
  const restored=await cosCall('getObject',{Key});
  if(createHash('sha256').update(restored.Body).digest('hex')!==sha256) throw new Error('Backup verification failed');
}
console.log(JSON.stringify({backupBytes:bytes.length,verifiedCopies:keys.length,sha256}));
