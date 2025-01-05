import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const { method, query: { id }, body } = req;

  try {
    if (method === 'GET') {
      if (id) {
        // Fetch a specific team member by ID
        const { rows } = await sql`SELECT * FROM team_members WHERE id = ${id}`;
        if (rows.length === 0) {
          return res.status(404).json({ error: 'Team member not found' });
        }
        return res.status(200).json(rows[0]);
      }
      // Fetch all team members
      const { rows } = await sql`SELECT * FROM team_members ORDER BY id`;
      return res.status(200).json(rows);
    }

    if (method === 'POST') {
      const { name, image_url, description } = body;
      const { rows } = await sql`
        INSERT INTO team_members (name, image_url, description)
        VALUES (${name}, ${image_url}, ${sql.array(description)})
        RETURNING *;
      `;
      return res.status(201).json(rows[0]);
    }

    if (method === 'PUT') {
      const { name, image_url, description } = body;
      const { rowCount } = await sql`
        UPDATE team_members
        SET name = ${name}, image_url = ${image_url}, description = ${sql.array(description)}
        WHERE id = ${id};
      `;
      if (rowCount === 0) {
        return res.status(404).json({ error: 'Team member not found' });
      }
      return res.status(200).json({ message: 'Team member updated' });
    }

    if (method === 'DELETE') {
      const { rowCount } = await sql`DELETE FROM team_members WHERE id = ${id};`;
      if (rowCount === 0) {
        return res.status(404).json({ error: 'Team member not found' });
      }
      return res.status(200).json({ message: 'Team member deleted' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
