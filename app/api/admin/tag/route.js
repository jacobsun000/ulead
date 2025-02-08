import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM tag ORDER BY id ASC`;
    return new Response(JSON.stringify({ success: true, data: rows }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "Error fetching tags" }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { text, type, pos } = await req.json();
    await sql`INSERT INTO tag (text, type, pos) VALUES (${text}, ${type}, ${pos})`;
    return new Response(JSON.stringify({ success: true, message: "Tag added" }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "Error adding tag" }), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { id, text, type, pos } = await req.json();
    await sql`UPDATE tag SET text = ${text}, type = ${type}, pos = ${pos} WHERE id = ${id}`;
    return new Response(JSON.stringify({ success: true, message: "Tag updated" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "Error updating tag" }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await sql`DELETE FROM tag WHERE id = ${id}`;
    return new Response(JSON.stringify({ success: true, message: "Tag deleted" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "Error deleting tag" }), { status: 500 });
  }
}
