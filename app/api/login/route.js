import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { ADMIN_USERNAME, ADMIN_PASSWORD, JWT_SECRET } = process.env;
  if (!ADMIN_USERNAME || !ADMIN_PASSWORD || !JWT_SECRET) {
    return NextResponse.json({ message: 'Login unavailable' }, { status: 503 });
  }
  let credentials;
  try {
    credentials = await req.json();
  } catch {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }
  if (credentials?.username !== ADMIN_USERNAME || credentials?.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
  const token = await new SignJWT({ username: credentials.username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt().setExpirationTime('3d')
    .sign(new TextEncoder().encode(JWT_SECRET));
  const response = NextResponse.json({ success: true });
  response.cookies.set('token', token, {
    httpOnly: true, secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict', path: '/', maxAge: 3 * 24 * 60 * 60,
  });
  return response;
}
