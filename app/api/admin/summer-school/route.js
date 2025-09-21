import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM summer_school ORDER BY id ASC`;
    return new Response(JSON.stringify({ success: true, data: rows }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching summer schools" }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { name, tags, description, programs, type, href, image } = await req.json();

    if (!name || !tags || !description || !programs || !type) {
      return new Response(
        JSON.stringify({ success: false, message: "Required fields: name, tags, description, programs, type" }),
        { status: 400 }
      );
    }

    // Validate type
    if (!["university", "highschool"].includes(type)) {
      return new Response(
        JSON.stringify({ success: false, message: "Type must be 'university' or 'highschool'" }),
        { status: 400 }
      );
    }

    // Validate programs JSON
    if (!Array.isArray(programs)) {
      return new Response(
        JSON.stringify({ success: false, message: "Programs must be an array" }),
        { status: 400 }
      );
    }

    const { rows } = await sql`
      INSERT INTO summer_school (name, tags, description, programs, type, href, image)
      VALUES (${name}, ${tags}, ${description}, ${JSON.stringify(programs)}, ${type}, ${href || null}, ${image || null})
      RETURNING *;
    `;
    return new Response(JSON.stringify({ success: true, data: rows[0] }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: "Error adding summer school" }),
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { id, name, tags, description, programs, type, href, image } = await req.json();

    if (!id || !name || !tags || !description || !programs || !type) {
      return new Response(
        JSON.stringify({ success: false, message: "Required fields: id, name, tags, description, programs, type" }),
        { status: 400 }
      );
    }

    // Validate type
    if (!["university", "highschool"].includes(type)) {
      return new Response(
        JSON.stringify({ success: false, message: "Type must be 'university' or 'highschool'" }),
        { status: 400 }
      );
    }

    // Validate programs JSON
    if (!Array.isArray(programs)) {
      return new Response(
        JSON.stringify({ success: false, message: "Programs must be an array" }),
        { status: 400 }
      );
    }

    const { rows } = await sql`
      UPDATE summer_school
      SET name = ${name}, tags = ${tags}, description = ${description},
          programs = ${JSON.stringify(programs)}, type = ${type},
          href = ${href || null}, image = ${image || null}
      WHERE id = ${id}
      RETURNING *;
    `;
    return new Response(JSON.stringify({ success: true, data: rows[0] }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: "Error editing summer school" }),
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

    const { rowCount } = await sql`DELETE FROM summer_school WHERE id = ${id}`;
    if (rowCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Summer school not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Summer school deleted" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Error deleting summer school" }),
      { status: 500 }
    );
  }
}