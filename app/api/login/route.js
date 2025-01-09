import bcrypt from "bcrypt";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(req) {
  const { username, password } = await req.json();

  // Check if username matches
  if (username !== ADMIN_USERNAME) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  }

  // Compare hashed password
  const passwordMatch = await bcrypt.compare(password, ADMIN_PASSWORD);
  if (!passwordMatch) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  }

  // Generate a JWT token
  const token = await generateToken({ username });

  return new Response(JSON.stringify({ token }), { status: 200 });
}

import { SignJWT } from "jose";


async function generateToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("3d")
    .sign(JWT_SECRET);
}
