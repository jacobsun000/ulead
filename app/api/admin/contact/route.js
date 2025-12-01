import { sql } from "@vercel/postgres";
import { revalidatePublicPages } from "@/lib/revalidate";

export async function GET(req) {
  try {
    const { rows } = await sql`SELECT * FROM contact_us ORDER BY created_at DESC`;
    return new Response(JSON.stringify({ success: true, data: rows }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching contacts" }),
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { ids } = await req.json();

    if (!ids || ids.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "No IDs provided" }),
        { status: 400 }
      );
    }

    const { rowCount } = await sql`DELETE FROM contact_us WHERE id = ANY(${ids})`;
    revalidatePublicPages();
    return new Response(
      JSON.stringify({
        success: true,
        message: `${rowCount} contact(s) deleted`,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Error deleting contacts" }),
      { status: 500 }
    );
  }
}
