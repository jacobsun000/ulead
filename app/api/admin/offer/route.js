import { sql } from "@vercel/postgres";

const tables = {
  university: "university",
  high_school: "high_school",
  other_school: "other_school",
};

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  const school = tables[type];
  if (!school) {
    return new Response(
      JSON.stringify({ success: false, message: "Invalid school type" }),
      { status: 400 }
    );
  }

  try {
    const query = `SELECT * FROM ${school} ORDER BY id ASC`; // Dynamic query
    const { rows } = await sql.query(query); // Use sql.query for raw string queries
    return new Response(JSON.stringify({ success: true, data: rows }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching records:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching records" }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const { type, logo, school, country, rank, school_cn, count } = await req.json();

  if (!type || !tables[type]) {
    return new Response(
      JSON.stringify({ success: false, message: "Invalid school type" }),
      { status: 400 }
    );
  }
  const schoolType = tables[type];

  try {
    let query;
    if (type === "university") {
      query = `
        INSERT INTO university (logo, school, school_cn, country, rank, count)
        VALUES ('${logo}', '${school}', '${school_cn}', '${country}', '${rank}', ${count})
        RETURNING *;
      `;
    } else {
      query = `
        INSERT INTO ${schoolType} (logo, school, count)
        VALUES ('${logo}', '${school}', ${count})
        RETURNING *;
      `;
    }

    const { rows } = await sql.query(query); // Manually constructed query
    return new Response(JSON.stringify({ success: true, data: rows[0] }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error adding record:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error adding record" }),
      { status: 500 }
    );
  }
}


export async function PUT(req) {
  const { id, type, logo, school, country, rank, school_cn, count } = await req.json();

  if (!type || !tables[type] || !id) {
    return new Response(
      JSON.stringify({ success: false, message: "Invalid school type or ID" }),
      { status: 400 }
    );
  }
  const schoolType = tables[type];

  try {
    let query;
    if (type === "university") {
      query = `
        UPDATE university
        SET logo = '${logo}', school = '${school}', school_cn = '${school_cn}', 
            country = '${country}', rank = '${rank}', count = ${count}
        WHERE id = ${id}
        RETURNING *;
      `;
    } else {
      query = `
        UPDATE ${schoolType}
        SET logo = '${logo}', school = '${school}', count = ${count}
        WHERE id = ${id}
        RETURNING *;
      `;
    }

    const { rows } = await sql.query(query); // Manually constructed query
    return new Response(JSON.stringify({ success: true, data: rows[0] }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating record:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error updating record" }),
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const { id, type } = await req.json();

  if (!type || !tables[type] || !id) {
    return new Response(
      JSON.stringify({ success: false, message: "Invalid school type or ID" }),
      { status: 400 }
    );
  }
  const schoolType = tables[type];

  try {
    const query = `DELETE FROM ${schoolType} WHERE id = ${id};`;
    const { rowCount } = await sql.query(query); // Manually constructed query

    if (rowCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Record not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Record deleted" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting record:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error deleting record" }),
      { status: 500 }
    );
  }
}
