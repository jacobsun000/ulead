import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const originalFilename = searchParams.get('filename');
  console.log(originalFilename);

  if (!originalFilename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  try {
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
