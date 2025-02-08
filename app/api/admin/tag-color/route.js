import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM tag_color ORDER BY id ASC`;
    return new Response(JSON.stringify({ success: true, data: rows }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "Error fetching tag colors" }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { type, color } = await req.json();
    await sql`INSERT INTO tag_color (type, color) VALUES (${type}, ${color})`;
    return new Response(JSON.stringify({ success: true, message: "Tag color added" }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "Error adding tag color" }), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { id, type, color } = await req.json();
    await sql`UPDATE tag_color SET type = ${type}, color = ${color} WHERE id = ${id}`;
    return new Response(JSON.stringify({ success: true, message: "Tag color updated" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "Error updating tag color" }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await sql`DELETE FROM tag_color WHERE id = ${id}`;
    return new Response(JSON.stringify({ success: true, message: "Tag color deleted" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "Error deleting tag color" }), { status: 500 });
  }
}
