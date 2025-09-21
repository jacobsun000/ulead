import { sql } from "@vercel/postgres";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');

    if (!type) {
      return new Response(
        JSON.stringify({ success: false, message: "Type parameter is required" }),
        { status: 400 }
      );
    }

    const { rows } = await sql`SELECT * FROM offer WHERE type = ${type} ORDER BY id ASC`;
    return new Response(JSON.stringify({ success: true, data: rows }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching offers:', error);
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching offers" }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { type, logo, count, name, name_cn, country, rank } = await req.json();

    if (!type || !logo || !count || !name) {
      return new Response(
        JSON.stringify({ success: false, message: "Type, logo, count, and name are required" }),
        { status: 400 }
      );
    }

    const { rows } = await sql`
      INSERT INTO offer (type, logo, count, name, name_cn, country, rank)
      VALUES (${type}, ${logo}, ${count}, ${name}, ${name_cn || null}, ${country || null}, ${rank || null})
      RETURNING *;
    `;
    return new Response(JSON.stringify({ success: true, data: rows[0] }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error adding offer:', error);
    return new Response(
      JSON.stringify({ success: false, message: "Error adding offer" }),
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { id, type, logo, count, name, name_cn, country, rank } = await req.json();

    if (!id || !type || !logo || !count || !name) {
      return new Response(
        JSON.stringify({ success: false, message: "ID, type, logo, count, and name are required" }),
        { status: 400 }
      );
    }

    const { rows } = await sql`
      UPDATE offer
      SET type = ${type}, logo = ${logo}, count = ${count}, name = ${name},
          name_cn = ${name_cn || null}, country = ${country || null}, rank = ${rank || null}
      WHERE id = ${id}
      RETURNING *;
    `;

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Offer not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ success: true, data: rows[0] }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error updating offer:', error);
    return new Response(
      JSON.stringify({ success: false, message: "Error updating offer" }),
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { id, type } = await req.json();

    if (!id || !type) {
      return new Response(
        JSON.stringify({ success: false, message: "ID and type are required" }),
        { status: 400 }
      );
    }

    const { rowCount } = await sql`DELETE FROM offer WHERE id = ${id} AND type = ${type}`;
    if (rowCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Offer not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Offer deleted" }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting offer:', error);
    return new Response(
      JSON.stringify({ success: false, message: "Error deleting offer" }),
      { status: 500 }
    );
  }
}