import schema from './content-schema.json' with { type: 'json' };
export { schema };
export const quote = name => `"${name.replaceAll('"', '""')}"`;
export function rewriteMedia(value, mapping) {
  if (typeof value === 'string') return mapping.get(value) || value;
  if (Array.isArray(value)) return value.map(item => rewriteMedia(item, mapping));
  if (value && typeof value === 'object' && !(value instanceof Date)) {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, rewriteMedia(item, mapping)]));
  }
  return value;
}
export function insertQuery(table, columns, row) {
  if (!Object.hasOwn(schema, table)) throw new Error('Table not allowed for publication');
  return {
    text: `INSERT INTO ${quote(table)} (${columns.map(c => quote(c.name)).join(',')}) OVERRIDING SYSTEM VALUE VALUES (${columns.map((_, i) => `$${i + 1}`).join(',')})`,
    values: columns.map(c => ['json', 'jsonb'].includes(c.type) ? JSON.stringify(row[c.name]) : row[c.name]),
  };
}
