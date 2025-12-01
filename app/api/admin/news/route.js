import { sql } from "@vercel/postgres";
import { revalidatePublicPages } from "@/lib/revalidate";

function normalizeBadges(badges) {
  if (Array.isArray(badges)) {
    return badges.map((badge) => (badge ?? "").toString().trim()).filter(Boolean);
  }

  if (typeof badges === "string" && badges.trim()) {
    return badges
      .split(",")
      .map((badge) => badge.trim())
      .filter(Boolean);
  }

  return [];
}

function validateNewsPayload(payload, { requireId = false } = {}) {
  const {
    id,
    title,
    author,
    badges,
    excerpt,
    published_at,
    image_url,
    external_url,
    is_published = true,
    is_top = false,
  } = payload || {};

  if (requireId && !id) {
    return { error: "ID is required" };
  }

  if (!title || !published_at || !image_url || !external_url) {
    return {
      error: "Title, published_at, image_url, and external_url are required",
    };
  }

  const date = new Date(published_at);
  if (Number.isNaN(date.getTime())) {
    return { error: "published_at must be a valid date string (YYYY-MM-DD)" };
  }

  return {
    id,
    title: title.trim(),
    author: author ? author.trim() : null,
    badges: normalizeBadges(badges),
    excerpt: excerpt ? excerpt.trim() : null,
    published_at: date.toISOString().slice(0, 10),
    image_url: image_url.trim(),
    external_url: external_url.trim(),
    is_published: Boolean(is_published),
    is_top: Boolean(is_top),
  };
}

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT *
      FROM news
      ORDER BY published_at DESC, id DESC;
    `;
    return new Response(JSON.stringify({ success: true, data: rows }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching news" }),
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const payload = await req.json();
    const result = validateNewsPayload(payload);
    if (result.error) {
      return new Response(
        JSON.stringify({ success: false, message: result.error }),
        { status: 400 },
      );
    }

    const inserted = await sql`
      INSERT INTO news (
        title,
        author,
        badges,
        excerpt,
        published_at,
        image_url,
        external_url,
        is_published,
        is_top
      )
      VALUES (
        ${result.title},
        ${result.author},
        ${result.badges},
        ${result.excerpt},
        ${result.published_at},
        ${result.image_url},
        ${result.external_url},
        ${result.is_published},
        ${result.is_top}
      )
      RETURNING *;
    `;

    revalidatePublicPages();

    return new Response(JSON.stringify({ success: true, data: inserted.rows[0] }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating news:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error creating news" }),
      { status: 500 },
    );
  }
}

export async function PUT(req) {
  try {
    const payload = await req.json();
    const result = validateNewsPayload(payload, { requireId: true });
    if (result.error) {
      return new Response(
        JSON.stringify({ success: false, message: result.error }),
        { status: 400 },
      );
    }

    const updated = await sql`
      UPDATE news
      SET
        title = ${result.title},
        author = ${result.author},
        badges = ${result.badges},
        excerpt = ${result.excerpt},
        published_at = ${result.published_at},
        image_url = ${result.image_url},
        external_url = ${result.external_url},
        is_published = ${result.is_published},
        is_top = ${result.is_top}
      WHERE id = ${result.id}
      RETURNING *;
    `;

    if (updated.rows.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "News item not found" }),
        { status: 404 },
      );
    }

    revalidatePublicPages();

    return new Response(JSON.stringify({ success: true, data: updated.rows[0] }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating news:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error updating news" }),
      { status: 500 },
    );
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id) {
      return new Response(
        JSON.stringify({ success: false, message: "ID is required" }),
        { status: 400 },
      );
    }

    const { rowCount } = await sql`DELETE FROM news WHERE id = ${id}`;
    if (rowCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "News item not found" }),
        { status: 404 },
      );
    }

    revalidatePublicPages();

    return new Response(
      JSON.stringify({ success: true, message: "News item deleted" }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting news:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error deleting news" }),
      { status: 500 },
    );
  }
}
