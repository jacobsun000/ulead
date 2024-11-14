// app/api/contact/route.js
import { db } from '@vercel/postgres';

export async function POST(req) {
  const { name, contact, source, questions } = await req.json();

  if (!name || !contact) {
    return new Response(JSON.stringify({ message: 'Name and contact are required' }), { status: 400 });
  }

  try {
    const client = await db.connect();
    const query = `
      INSERT INTO contact_us (name, contact, source, questions)
      VALUES ($1, $2, $3, $4)
    `;
    await client.query(query, [name, contact, source, questions]);
    client.release();

    return new Response(JSON.stringify({ message: 'Contact information saved successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Internal server error', error: error.message }), { status: 500 });
  }
}
