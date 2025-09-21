import { sql } from "@vercel/postgres";

export async function GET(req) {
  try {
    const { rows } = await sql`SELECT * FROM mentor ORDER BY id ASC`;
    return new Response(JSON.stringify({ success: true, data: rows }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching mentors:', error);
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching mentors" }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const {
      name,
      degree,
      institution,
      research_domains,
      projects,
      supported_programs,
      image_url
    } = await req.json();

    if (!name) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Name is required"
        }),
        { status: 400 }
      );
    }

    const { rows } = await sql`
      INSERT INTO mentor (
        name, degree, institution, research_domains,
        projects, supported_programs, image_url
      )
      VALUES (
        ${name}, ${degree || null}, ${institution || null}, ${research_domains || null},
        ${projects || null}, ${supported_programs || null}, ${image_url || null}
      )
      RETURNING *;
    `;

    return new Response(JSON.stringify({ success: true, data: rows[0] }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error adding mentor:', error);
    return new Response(
      JSON.stringify({ success: false, message: "Error adding mentor" }),
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const {
      id,
      name,
      degree,
      institution,
      research_domains,
      projects,
      supported_programs,
      image_url
    } = await req.json();

    if (!id || !name) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "ID and name are required"
        }),
        { status: 400 }
      );
    }

    const { rows } = await sql`
      UPDATE mentor
      SET
        name = ${name},
        degree = ${degree || null},
        institution = ${institution || null},
        research_domains = ${research_domains || null},
        projects = ${projects || null},
        supported_programs = ${supported_programs || null},
        image_url = ${image_url || null}
      WHERE id = ${id}
      RETURNING *;
    `;

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Mentor not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ success: true, data: rows[0] }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error updating mentor:', error);
    return new Response(
      JSON.stringify({ success: false, message: "Error updating mentor" }),
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

    const { rowCount } = await sql`DELETE FROM mentor WHERE id = ${id}`;
    if (rowCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Mentor not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Mentor deleted" }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting mentor:', error);
    return new Response(
      JSON.stringify({ success: false, message: "Error deleting mentor" }),
      { status: 500 }
    );
  }
}