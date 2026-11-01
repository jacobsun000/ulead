import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import pg from 'pg';

const connectionString = process.env.MIGRATION_TEST_DATABASE_URL;
const url = new URL(connectionString);
assert.ok(['127.0.0.1', 'localhost', '[::1]'].includes(url.hostname));
assert.ok(url.pathname.startsWith('/ulead_rehearsal'));
const db = new pg.Client({ connectionString });
await db.connect();
let testContactId;

async function withServer(region, port, check) {
  const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', String(port)], {
    env: { ...process.env, NODE_ENV: 'production', NEXT_TELEMETRY_DISABLED: '1',
      DATABASE_DRIVER: 'postgres', DATABASE_URL: connectionString, POSTGRES_URL: connectionString,
      SITE_REGION: region, ADMIN_ENABLED: region === 'cn' ? 'true' : 'false', ADMIN_HOST: '',
      ADMIN_USERNAME: 'rehearsal', ADMIN_PASSWORD: 'local-only-password', JWT_SECRET: 'local-only-signing-secret-for-rehearsal',
      BLOB_READ_WRITE_TOKEN: '' },
    stdio: 'ignore',
  });
  const base = `http://127.0.0.1:${port}`;
  const request = (path, options = {}) => fetch(base + path, {
    redirect: 'manual', signal: AbortSignal.timeout(15000), ...options,
  });
  try {
    let ready = false;
    for (let attempt = 0; attempt < 60; attempt++) {
      if (child.exitCode !== null) throw new Error('Local server exited');
      try { await request('/'); ready = true; break; } catch { await delay(250); }
    }
    assert.ok(ready, 'Local server did not become ready');
    await check(request);
  } finally {
    child.kill('SIGTERM');
    await new Promise((resolve) => {
      const timer = setTimeout(() => { child.kill('SIGKILL'); resolve(); }, 5000);
      child.once('exit', () => { clearTimeout(timer); resolve(); });
    });
  }
}

try {
  await withServer('cn', 3317, async (request) => {
    const root = await request('/?source=test');
    assert.equal(root.status, 308);
    assert.ok(root.headers.get('location').endsWith('/zh/?source=test'));
    for (const path of ['/zh/', '/zh/university/', '/zh/news/', '/en/', '/en/about-us/']) {
      assert.equal((await request(path)).status, 200, path);
    }
    assert.equal((await request('/api/admin/contact/')).status, 401);
    assert.equal((await request('/api/admin/contact/', { headers: { cookie: 'token=invalid' } })).status, 401);
    assert.equal((await request('/api/admin/news/', { method: 'POST', body: '{}' })).status, 401);
    assert.ok((await request('/admin/')).headers.get('location').endsWith('/en/login/'));
    const invalid = await request('/api/login/', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' });
    assert.equal(invalid.status, 401);
    const login = await request('/api/login/', { method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username: 'rehearsal', password: 'local-only-password' }) });
    assert.equal(login.status, 200);
    const cookie = login.headers.get('set-cookie');
    assert.match(cookie, /HttpOnly/i);
    assert.match(cookie, /Secure/i);
    assert.match(cookie, /SameSite=strict/i);
    assert.deepEqual(await login.json(), { success: true });
    assert.equal((await request('/api/admin/contact/', { headers: { cookie: cookie.split(';')[0] } })).status, 200);
    const marker = `migration-rehearsal-${Date.now()}`;
    const contact = await request('/api/contact/', { method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: marker, contact: 'local-test@example.invalid', source: 'local-rehearsal', questions: 'Local database only' }) });
    assert.equal(contact.status, 200);
    const { rows } = await db.query('SELECT id FROM contact_us WHERE name = $1', [marker]);
    assert.equal(rows.length, 1);
    testContactId = rows[0].id;
  });
  await withServer('us', 3318, async (request) => {
    assert.ok((await request('/')).headers.get('location').endsWith('/en/'));
    for (const path of ['/admin/', '/api/admin/contact/', '/en/login/', '/api/login/']) {
      assert.equal((await request(path)).status, 404, path);
    }
    assert.equal((await request('/en/university/')).status, 200);
  });
  console.log('PASS: China/US routing, public pages, admin API authentication, secure login cookies, disabled US admin, and local contact submission.');
} finally {
  if (testContactId) await db.query('DELETE FROM contact_us WHERE id = $1', [testContactId]);
  await db.end();
}
