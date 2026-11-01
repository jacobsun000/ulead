import { test } from 'node:test';
import assert from 'node:assert/strict';
import { legacyDestination, isAdminPath, adminAvailable } from '../../lib/site-routing.mjs';

test('root and legacy routes select the deployment locale without redirect loops', () => {
  assert.equal(legacyDestination('/', 'cn'), '/zh/');
  assert.equal(legacyDestination('/', 'us'), '/en/');
  assert.equal(legacyDestination('/university/', 'cn'), '/zh/university/');
  assert.equal(legacyDestination('/university', 'us'), '/en/university/');
  assert.equal(legacyDestination('/summer-school/highschool', 'us'), '/zh/summer-school/highschool/');
  assert.equal(legacyDestination('/en/university/', 'us'), null);
  assert.equal(legacyDestination('/zh/', 'cn'), null);
  assert.equal(legacyDestination('/img/logo.png', 'cn'), null);
  assert.equal(legacyDestination('/api/contact/', 'cn'), null);
});

test('admin APIs, login and pages share the same regional boundary', () => {
  for (const path of ['/admin', '/admin/news/', '/api/admin/news/', '/api/login/', '/en/login/', '/login']) {
    assert.equal(isAdminPath(path), true, path);
  }
  for (const path of ['/api/contact/', '/administrator', '/api/admin-other']) {
    assert.equal(isAdminPath(path), false, path);
  }
  assert.equal(adminAvailable('en.ulead-edu.com', { ADMIN_ENABLED: 'false' }), false);
  assert.equal(adminAvailable('www.ulead-edu.com', { ADMIN_HOST: 'admin.ulead-edu.com' }), false);
  assert.equal(adminAvailable('admin.ulead-edu.com', { ADMIN_HOST: 'admin.ulead-edu.com' }), true);
});
