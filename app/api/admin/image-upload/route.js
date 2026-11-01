import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { createHash } from 'node:crypto';
import { cosCall, mediaUrl } from '@/lib/cos.mjs';
import { sql } from '@/lib/db';

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const originalFilename = searchParams.get('filename');

  if (!originalFilename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  try {
    if (process.env.STORAGE_DRIVER === 'cos') {
      const types = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif', 'image/avif': 'avif' };
      const contentType = request.headers.get('content-type')?.split(';')[0];
      if (!types[contentType]) return NextResponse.json({ error: 'Unsupported image type' }, { status: 415 });
      const reader = request.body?.getReader();
      if (!reader) return NextResponse.json({ error: 'Missing image' }, { status: 400 });
      const chunks = [];
      let size = 0;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        size += value.length;
        if (size > 10 * 1024 * 1024) {
          await reader.cancel();
          return NextResponse.json({ error: 'Image exceeds 10 MiB' }, { status: 413 });
        }
        chunks.push(value);
      }
      if (!size) return NextResponse.json({ error: 'Empty image' }, { status: 400 });
      const bytes = Buffer.concat(chunks);
      const key = `media/${uuidv4()}.${types[contentType]}`;
      await cosCall('putObject', { Key: key, Body: bytes, ContentType: contentType, ACL: 'public-read', CacheControl: 'public,max-age=31536000,immutable' });
      const url = mediaUrl(key);
      const hash = createHash('sha256').update(bytes).digest('hex');
      await sql`INSERT INTO media_assets(source_url,china_url,object_key,sha256) VALUES(${url},${url},${key},${hash})`;
      return NextResponse.json({ url, pathname: key, contentType });
    }
    // Generate a unique filename
    const uniqueFilename = `${uuidv4()}-${originalFilename}`;

    // Upload the file to Vercel Blob Storage
    const blob = await put(uniqueFilename, request.body, {
      access: 'public', // Makes the file publicly accessible
    });

    // Return the blob URL and metadata
    return NextResponse.json(blob);
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
