import { sql } from '@/lib/db';

export async function POST(req) {
  const { name, contact, source, questions } = await req.json();

  if (!name || !contact) {
    return new Response(JSON.stringify({ message: 'Name and contact are required' }), { status: 400 });
  }

  try {
    await sql`
      INSERT INTO contact_us (name, contact, source, questions)
      VALUES (${name}, ${contact}, ${source}, ${questions})
    `;

    return new Response(JSON.stringify({ message: 'Contact information saved successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Internal server error', error: error.message }), { status: 500 });
  }
}
