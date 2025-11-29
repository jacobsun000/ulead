import { sql } from "@vercel/postgres";

export async function GET(req) {
  try {
    const { rows } = await sql`SELECT * FROM consultant ORDER BY order_index ASC, id ASC`;
    return new Response(JSON.stringify({ success: true, data: rows }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching consultants:', error);
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching consultants" }),
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
      INSERT INTO consultant (
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
    console.error('Error adding consultant:', error);
    return new Response(
      JSON.stringify({ success: false, message: "Error adding consultant" }),
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
      UPDATE consultant
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
        JSON.stringify({ success: false, message: "Consultant not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ success: true, data: rows[0] }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error updating consultant:', error);
    return new Response(
      JSON.stringify({ success: false, message: "Error updating consultant" }),
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

    const { rowCount } = await sql`DELETE FROM consultant WHERE id = ${id}`;
    if (rowCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "consultant not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "consultant deleted" }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting consultant:', error);
    return new Response(
      JSON.stringify({ success: false, message: "Error deleting consultant" }),
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    const { items } = await req.json();

    if (!items || !Array.isArray(items)) {
      return new Response(
        JSON.stringify({ success: false, message: "Items array is required" }),
        { status: 400 }
      );
    }

    // Update order_index for each item
    for (const item of items) {
      await sql`
        UPDATE consultant
        SET order_index = ${item.order_index}
        WHERE id = ${item.id}
      `;
    }

    return new Response(
      JSON.stringify({ success: true, message: "Consultnat updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating order:', error);
    return new Response(
      JSON.stringify({ success: false, message: "Error updating consultant" }),
      { status: 500 }
    );
  }
}
