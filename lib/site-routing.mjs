export function isAdminPath(pathname) {
  return /^\/(admin(?:\/|$)|api\/(?:admin|login)(?:\/|$)|en\/login(?:\/|$)|login(?:\/|$))/.test(pathname);
}

export function adminAvailable(hostname, env) {
  return env.ADMIN_ENABLED !== 'false' && (!env.ADMIN_HOST || hostname === env.ADMIN_HOST);
}

export function legacyDestination(pathname, region) {
  const locale = region === 'cn' ? 'zh' : 'en';
  if (pathname === '/') return `/${locale}/`;
  if (/^\/login\/?$/.test(pathname)) return '/en/login/';
  if (/^\/(university|highschool|contacts|lead-program)(\/|$)/.test(pathname)) {
    return `/${locale}${pathname.replace(/\/$/, '')}/`;
  }
  if (/^\/(news|summer-school)(\/|$)/.test(pathname)) {
    return `/zh${pathname.replace(/\/$/, '')}/`;
  }
  if (/^\/(about-us|schools)(\/|$)/.test(pathname)) {
    return `/en${pathname.replace(/\/$/, '')}/`;
  }
  return null;
}
