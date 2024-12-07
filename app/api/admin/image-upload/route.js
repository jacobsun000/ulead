import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  try {
    // Upload the file to Vercel Blob Storage
    const blob = await put(filename, request.body, {
      access: 'public', // Makes the file publicly accessible
    });

    // Return the blob URL and metadata
    return NextResponse.json(blob);
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}

// To disable body parsing for App Router
export const config = {
  api: {
    bodyParser: false,
  },
};
