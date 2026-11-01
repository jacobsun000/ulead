import { neon } from '@neondatabase/serverless';

// Keep the existing Vercel connection string and { rows } query result shape.
export function sql(strings, ...values) {
  const query = neon(process.env.POSTGRES_URL || process.env.DATABASE_URL, {
    fullResults: true,
  });
  return query(strings, ...values);
}
