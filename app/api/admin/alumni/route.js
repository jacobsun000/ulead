import { sql } from "@vercel/postgres";

export async function GET(req) {
  try {
    const { rows } = await sql`SELECT * FROM alumni ORDER BY id ASC`;
    return new Response(JSON.stringify({ success: true, data: rows }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching alumni:', error);
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching alumni" }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const {
      name,
      image,
      highschool,
      university,
      university_logo,
      title,
      highschool_cn,
      university_cn,
      labels,
      evaluation,
      plan
    } = await req.json();

    if (!name || !image || !highschool || !university || !university_logo) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Name, image, highschool, university, and university_logo are required"
        }),
        { status: 400 }
      );
    }

    const { rows } = await sql`
      INSERT INTO alumni (
        name, image, highschool, university, university_logo,
        title, highschool_cn, university_cn, labels, evaluation, plan
      )
      VALUES (
        ${name}, ${image}, ${highschool}, ${university}, ${university_logo},
        ${title || null}, ${highschool_cn || null}, ${university_cn || null},
        ${labels || null}, ${evaluation || null}, ${plan || null}
      )
      RETURNING *;
    `;

    return new Response(JSON.stringify({ success: true, data: rows[0] }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error adding alumni:', error);
    return new Response(
      JSON.stringify({ success: false, message: "Error adding alumni" }),
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const {
      id,
      name,
      image,
      highschool,
      university,
      university_logo,
      title,
      highschool_cn,
      university_cn,
      labels,
      evaluation,
      plan
    } = await req.json();

    if (!id || !name || !image || !highschool || !university || !university_logo) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "ID, name, image, highschool, university, and university_logo are required"
        }),
        { status: 400 }
      );
    }

    const { rows } = await sql`
      UPDATE alumni
      SET
        name = ${name},
        image = ${image},
        highschool = ${highschool},
        university = ${university},
        university_logo = ${university_logo},
        title = ${title || null},
        highschool_cn = ${highschool_cn || null},
        university_cn = ${university_cn || null},
        labels = ${labels || null},
        evaluation = ${evaluation || null},
        plan = ${plan || null}
      WHERE id = ${id}
      RETURNING *;
    `;

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Alumni not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ success: true, data: rows[0] }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error updating alumni:', error);
    return new Response(
      JSON.stringify({ success: false, message: "Error updating alumni" }),
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
    console.error('Error deleting alumni:', error);
    return new Response(
      JSON.stringify({ success: false, message: "Error deleting alumni" }),
      { status: 500 }
    );
  }
}