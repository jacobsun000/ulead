import { sql } from "@vercel/postgres";

export async function GET(req) {
  try {
    const type = req.nextUrl.searchParams.get("type");
    const { rows } = await sql`SELECT * FROM success_story where type = ${type}`;
    return new Response(JSON.stringify({ success: true, data: rows }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching stories" }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { type, name, image, school, labels, offers, evaluation } = await req.json();

    if (!type || !name || !name || !school || !labels || !offers || !evaluation) {
      return new Response(
        JSON.stringify({ success: false, message: "All fields are required" }),
        { status: 400 }
      );
    }

    const { rows } = await sql`
      INSERT INTO success_story (type, name, image, school, labels, offers, evaluation)
      VALUES (${type}, ${name}, ${image}, ${school}, ${labels}, ${offers}, ${evaluation})
      RETURNING *;
    `;
    return new Response(JSON.stringify({ success: true, data: rows[0] }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Error adding success story" }),
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { id, type, name, image, school, labels, offers, evaluation } = await req.json();

    if (!id || !type || !name || !name || !school || !labels || !offers || !evaluation) {
      return new Response(
        JSON.stringify({ success: false, message: "All fields are required" }),
        { status: 400 }
      );
    }

    const { rows } = await sql`
      UPDATE success_story
      SET type = ${type}, name = ${name}, image = ${image},
          school = ${school}, labels = ${labels}, offers = ${offers},
          evaluation = ${evaluation}
      WHERE id = ${id}
      RETURNING *;
    `;
    return new Response(JSON.stringify({ success: true, data: rows[0] }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Error editing success story" }),
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
    return new Response(
      JSON.stringify({ success: false, message: "Error deleting success story" }),
      { status: 500 }
    );
  }
}
