import { sql } from "@vercel/postgres";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');

    let query;
    if (type) {
      query = sql`SELECT * FROM success_story WHERE type = ${type} ORDER BY id ASC`;
    } else {
      query = sql`SELECT * FROM success_story ORDER BY id ASC`;
    }

    const { rows } = await query;
    return new Response(JSON.stringify({ success: true, data: rows }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching success stories:', error);
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching success stories" }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const {
      type,
      name,
      image,
      school,
      labels,
      offers,
      evaluation
    } = await req.json();

    if (!name || !school || !type) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Name, school, and type are required"
        }),
        { status: 400 }
      );
    }

    if (!['University', 'HighSchool'].includes(type)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Type must be either 'University' or 'HighSchool'"
        }),
        { status: 400 }
      );
    }

    const { rows } = await sql`
      INSERT INTO success_story (
        type, name, image, school, labels, offers, evaluation
      )
      VALUES (
        ${type}, ${name}, ${image || null}, ${school},
        ${labels || null}, ${offers || null}, ${evaluation || null}
      )
      RETURNING *;
    `;

    return new Response(JSON.stringify({ success: true, data: rows[0] }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error adding success story:', error);
    return new Response(
      JSON.stringify({ success: false, message: "Error adding success story" }),
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const {
      id,
      type,
      name,
      image,
      school,
      labels,
      offers,
      evaluation
    } = await req.json();

    if (!id || !name || !school || !type) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "ID, name, school, and type are required"
        }),
        { status: 400 }
      );
    }

    if (!['University', 'HighSchool'].includes(type)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Type must be either 'University' or 'HighSchool'"
        }),
        { status: 400 }
      );
    }

    const { rows } = await sql`
      UPDATE success_story
      SET
        type = ${type},
        name = ${name},
        image = ${image || null},
        school = ${school},
        labels = ${labels || null},
        offers = ${offers || null},
        evaluation = ${evaluation || null}
      WHERE id = ${id}
      RETURNING *;
    `;

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Success story not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ success: true, data: rows[0] }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error updating success story:', error);
    return new Response(
      JSON.stringify({ success: false, message: "Error updating success story" }),
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

    const { rowCount } = await sql`DELETE FROM success_story WHERE id = ${id}`;
    if (rowCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Success story not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Success story deleted" }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting success story:', error);
    return new Response(
      JSON.stringify({ success: false, message: "Error deleting success story" }),
      { status: 500 }
    );
  }
}