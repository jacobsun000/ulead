import pg from 'pg';
import { neon } from '@neondatabase/serverless';
export async function connectRemote() {
  if (process.env.US_DATABASE_DRIVER !== 'postgres') {
    const sql = neon(process.env.US_DATABASE_URL);
    return { query: (text,values=[]) => sql.query(text,values), transaction: statements => sql.transaction(statements.map(s => sql.query(s.text,s.values))), close: async () => {} };
  }
  const db = new pg.Client({ connectionString:process.env.US_DATABASE_URL });
  await db.connect();
  return {
    query: async (text,values=[]) => (await db.query(text,values)).rows,
    transaction: async statements => {
      await db.query('BEGIN');
      try { for(const s of statements) await db.query(s.text,s.values); await db.query('COMMIT'); }
      catch(error) { await db.query('ROLLBACK'); throw error; }
    },
    close: () => db.end(),
  };
}
