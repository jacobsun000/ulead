import { sql } from "@vercel/postgres";
import { revalidatePublicPages } from "@/lib/revalidate";

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM target_school ORDER BY id ASC`;
    return new Response(JSON.stringify({ success: true, data: rows }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching target schools" }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { name, state } = await req.json();

    if (!name || !state) {
      return new Response(
        JSON.stringify({ success: false, message: "Name and state are required" }),
        { status: 400 }
      );
    }

    const { rows } = await sql`
      INSERT INTO target_school (name, state)
      VALUES (${name}, ${state})
      RETURNING *;
    `;
    revalidatePublicPages();
    return new Response(JSON.stringify({ success: true, data: rows[0] }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Error adding target school" }),
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { id, name, state } = await req.json();

    if (!id || !name || !state) {
      return new Response(
        JSON.stringify({ success: false, message: "ID, name, and state are required" }),
        { status: 400 }
      );
    }

    const { rows } = await sql`
      UPDATE target_school
      SET name = ${name}, state = ${state}
      WHERE id = ${id}
      RETURNING *;
    `;
    revalidatePublicPages();
    return new Response(JSON.stringify({ success: true, data: rows[0] }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Error updating target school" }),
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

    const { rowCount } = await sql`DELETE FROM target_school WHERE id = ${id}`;
    if (rowCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Target school not found" }),
        { status: 404 }
      );
    }

    revalidatePublicPages();

    return new Response(
      JSON.stringify({ success: true, message: "Target school deleted" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Error deleting target school" }),
      { status: 500 }
    );
  }
}
