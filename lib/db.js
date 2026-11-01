import { neon } from '@neondatabase/serverless';
import pg from 'pg';

let pool;

// Keep tagged-template parameterization and the existing { rows, rowCount } API.
export function sql(strings, ...values) {
  if (process.env.DATABASE_DRIVER === 'postgres') {
    pool ??= new pg.Pool({
      connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
      max: 5,
      connectionTimeoutMillis: 10000,
      idleTimeoutMillis: 30000,
    });
    const text = strings.reduce((query, part, index) =>
      query + (index ? `$${index}` : '') + part, '');
    return pool.query(text, values);
  }
  if (process.env.DATABASE_DRIVER && process.env.DATABASE_DRIVER !== 'neon') {
    throw new Error('Unsupported DATABASE_DRIVER');
  }
  const query = neon(process.env.POSTGRES_URL || process.env.DATABASE_URL, {
    fullResults: true,
  });
  return query(strings, ...values);
}
