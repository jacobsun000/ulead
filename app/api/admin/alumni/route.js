import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM alumni ORDER BY id ASC`;
    return new Response(JSON.stringify({ success: true, data: rows }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching alumni" }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { name, image, highschool, university, university_logo } =
      await req.json();

    if (!name || !image || !highschool || !university || !university_logo) {
      return new Response(
        JSON.stringify({ success: false, message: "All fields are required" }),
        { status: 400 }
      );
    }

    const { rows } = await sql`
      INSERT INTO alumni (name, image, highschool, university, university_logo)
      VALUES (${name}, ${image}, ${highschool}, ${university}, ${university_logo})
      RETURNING *;
    `;
    return new Response(JSON.stringify({ success: true, data: rows[0] }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ success: false, message: "Error adding alumni" }),
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { id, name, image, highschool, university, university_logo } =
      await req.json();

    if (!id || !name || !image || !highschool || !university || !university_logo) {
      return new Response(
        JSON.stringify({ success: false, message: "All fields are required" }),
        { status: 400 }
      );
    }

    const { rows } = await sql`
      UPDATE alumni
      SET name = ${name}, image = ${image}, highschool = ${highschool}, university = ${university}, university_logo = ${university_logo}
      WHERE id = ${id}
      RETURNING *;
    `;
    return new Response(JSON.stringify({ success: true, data: rows[0] }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Error editing alumni" }),
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

    const { rowCount } = await sql`DELETE FROM alumni WHERE id = ${id}`;
    if (rowCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Alumni not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Alumni deleted" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Error deleting alumni" }),
      { status: 500 }
    );
  }
}
