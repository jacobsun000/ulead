import { sql } from '@vercel/postgres';

export default async function POST(req, res) {
  try {
    const { rows } = await sql`SELECT * FROM alumni`;
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching alumni:', error);
    res.status(500).json({ error: 'Failed to fetch alumni data' });
  }
}
