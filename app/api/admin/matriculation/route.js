import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM testimonials ORDER BY id ASC`;
    return new Response(JSON.stringify({ success: true, data: rows }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching testimonials" }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { image_url, name, highschool, offers, experiences } = await req.json();

    if (!image_url || !name || !highschool || !offers || !experiences) {
      return new Response(
        JSON.stringify({ success: false, message: "All fields are required" }),
        { status: 400 }
      );
    }

    const { rows } = await sql`
      INSERT INTO testimonials (image_url, name, highschool, offers, experiences)
      VALUES (${image_url}, ${name}, ${highschool}, ${offers}, ${experiences})
      RETURNING *;
    `;
    return new Response(JSON.stringify({ success: true, data: rows[0] }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: "Error adding testimonial" }),
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { id, image_url, name, highschool, offers, experiences } = await req.json();

    if (!id || !image_url || !name || !highschool || !offers || !experiences) {
      return new Response(
        JSON.stringify({ success: false, message: "All fields are required" }),
        { status: 400 }
      );
    }

    const { rows } = await sql`
      UPDATE testimonials
      SET image_url = ${image_url}, name = ${name}, highschool = ${highschool},
          offers = ${offers}, experiences = ${experiences}
      WHERE id = ${id}
      RETURNING *;
    `;
    return new Response(JSON.stringify({ success: true, data: rows[0] }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Error editing testimonial" }),
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

    const { rowCount } = await sql`DELETE FROM testimonials WHERE id = ${id}`;
    if (rowCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Testimonial not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Testimonial deleted" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Error deleting testimonial" }),
      { status: 500 }
    );
  }
}
