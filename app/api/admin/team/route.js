import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM team_members ORDER BY id ASC`;
    return new Response(JSON.stringify({ success: true, data: rows }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching team members" }),
      { status: 500 }
    );
  }
}


export async function POST(req) {
  try {
    const { name, image_url, description } = await req.json();

    if (!name || !image_url || !description) {
      return new Response(
        JSON.stringify({ success: false, message: "All fields are required" }),
        { status: 400 }
      );
    }

    const { rows } = await sql`
      INSERT INTO team_members (name, image_url, description)
      VALUES (${name}, ${image_url}, ${description})
      RETURNING *;
    `;
    return new Response(JSON.stringify({ success: true, data: rows[0] }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Error adding team member" }),
      { status: 500 }
    );
  }
}


export async function PUT(req) {
  try {
    const { id, name, image_url, description } = await req.json();

    if (!id || !name || !image_url || !description) {
      return new Response(
        JSON.stringify({ success: false, message: "All fields are required" }),
        { status: 400 }
      );
    }

    const { rows } = await sql`
      UPDATE team_members
      SET name = ${name}, image_url = ${image_url}, description = ${description}
      WHERE id = ${id}
      RETURNING *;
    `;
    return new Response(JSON.stringify({ success: true, data: rows[0] }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Error editing team member" }),
      { status: 500 }
    );
  }
}


export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, message: "ID is required" }),
        { status: 400 }
      );
    }

    const { rowCount } = await sql`DELETE FROM team_members WHERE id = ${id}`;
    if (rowCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Team member not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Team member deleted" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Error deleting team member" }),
      { status: 500 }
    );
  }
}
