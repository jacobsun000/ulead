import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';
export async function GET() {
  const { rows } = await sql`SELECT name,last_success,last_error FROM sync_state ORDER BY name`;
  return NextResponse.json(rows);
}
