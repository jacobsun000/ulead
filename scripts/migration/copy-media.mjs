import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { extname } from 'node:path';
import { cosCall, mediaUrl } from '../../lib/cos.mjs';
const directory = process.argv[2];
const manifest = JSON.parse(await readFile(`${directory}/manifest.json`, 'utf8'));
const types = { '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.gif':'image/gif', '.svg':'image/svg+xml', '.avif':'image/avif' };
const mapping = [];
for (const blob of manifest.blobs) {
  const bytes = await readFile(`${directory}/blobs/${blob.filename}`);
  if (createHash('sha256').update(bytes).digest('hex') !== blob.sha256) throw new Error('Source checksum mismatch');
  const extension = extname(blob.pathname).toLowerCase();
  if (!types[extension]) throw new Error('Unknown media extension; review before uploading');
  const key = `media/legacy-${blob.filename}${extension}`;
  await cosCall('putObject', { Key: key, Body: bytes, ContentType: types[extension], ACL:'public-read', CacheControl:'public,max-age=31536000,immutable' });
  const copied = await cosCall('getObject', { Key: key });
  if (createHash('sha256').update(copied.Body).digest('hex') !== blob.sha256) throw new Error('Target checksum mismatch');
  mapping.push({ source_url:blob.url, china_url:mediaUrl(key), blob_url:blob.url, object_key:key, sha256:blob.sha256 });
}
await writeFile(`${directory}/cos-mapping.json`, JSON.stringify(mapping,null,2), { mode:0o600 });
console.log(JSON.stringify({ copiedAndVerified: mapping.length }));
