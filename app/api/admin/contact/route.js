import { db } from '@vercel/postgres';

export async function POST(req) {
  const { username, password, page } = await req.json();

  const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  }

  return await fetchContacts(page);
}

async function fetchContacts(page) {
  try {
    const client = await db.connect();
    const PAGE_SIZE = 10;
    const offset = (page - 1) * PAGE_SIZE;

    const query = `
      SELECT * FROM contact_us
      ORDER BY created_at DESC
      LIMIT ${PAGE_SIZE} OFFSET ${offset}
    `;
    const result = await client.query(query);
    client.release();

    return new Response(JSON.stringify({ contacts: result.rows }), { status: 200 });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return new Response(JSON.stringify({ message: 'Internal server error', error: error.message }), { status: 500 });
  }
}
