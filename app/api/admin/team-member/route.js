import { sql } from "@vercel/postgres";

export async function GET(req) {
  try {
    const { rows } = await sql`SELECT * FROM team_members ORDER BY order_index ASC, id ASC`;
    return new Response(JSON.stringify({ success: true, data: rows }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching team members" }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const {
      name,
      image_url,
      description,
      order_index,
      name_zh,
      title_zh,
      description_zh
    } = await req.json();

    if (!name || !image_url || !description || !Array.isArray(description)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Name, image URL, and description array are required"
        }),
        { status: 400 }
      );
    }

    const { rows } = await sql`
      INSERT INTO team_members (
        name, image_url, description, order_index, name_zh, title_zh, description_zh
      )
      VALUES (
        ${name}, ${image_url}, ${description}, ${order_index || 0},
        ${name_zh || ''}, ${title_zh || ''}, ${description_zh || null}
      )
      RETURNING *;
    `;

    return new Response(JSON.stringify({ success: true, data: rows[0] }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error adding team member:', error);
    return new Response(
      JSON.stringify({ success: false, message: "Error adding team member" }),
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const {
      id,
      name,
      image_url,
      description,
      order_index,
      name_zh,
      title_zh,
      description_zh
    } = await req.json();

    if (!id || !name || !image_url || !description || !Array.isArray(description)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "ID, name, image URL, and description array are required"
        }),
        { status: 400 }
      );
    }

    const { rows } = await sql`
      UPDATE team_members
      SET
        name = ${name},
        image_url = ${image_url},
        description = ${description},
        order_index = ${order_index || 0},
        name_zh = ${name_zh || ''},
        title_zh = ${title_zh || ''},
        description_zh = ${description_zh || null}
      WHERE id = ${id}
      RETURNING *;
    `;

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Team member not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ success: true, data: rows[0] }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error updating team member:', error);
    return new Response(
      JSON.stringify({ success: false, message: "Error updating team member" }),
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

    const { rowCount } = await sql`DELETE FROM team_members WHERE id = ${id}`;
    if (rowCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Team member not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Team member deleted" }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting team member:', error);
    return new Response(
      JSON.stringify({ success: false, message: "Error deleting team member" }),
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
        UPDATE team_members
        SET order_index = ${item.order_index}
        WHERE id = ${item.id}
      `;
    }

    return new Response(
      JSON.stringify({ success: true, message: "Order updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating order:', error);
    return new Response(
      JSON.stringify({ success: false, message: "Error updating order" }),
      { status: 500 }
    );
  }
}