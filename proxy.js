import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { legacyDestination, isAdminPath, adminAvailable } from './lib/site-routing.mjs';

export async function proxy(req) {
  // Standalone Next.js may use its internal bind address for nextUrl's origin.
  // Nginx supplies the original Host and overwrites X-Forwarded-Proto.
  const requestUrl = req.nextUrl.clone();
  const publicOrigin = new URL(`http://${req.headers.get('host') || requestUrl.host}`);
  requestUrl.hostname = publicOrigin.hostname;
  requestUrl.port = publicOrigin.port;
  const protocol = req.headers.get('x-forwarded-proto');
  if (protocol === 'http' || protocol === 'https') requestUrl.protocol = `${protocol}:`;
  const pathname = req.nextUrl.pathname;
  if (isAdminPath(pathname)) {
    if (!adminAvailable(requestUrl.hostname, process.env)) {
      return new NextResponse(null, { status: 404 });
    }
    if (pathname.startsWith('/api/admin/') || pathname === '/api/admin' ||
        pathname === '/admin' || pathname.startsWith('/admin/')) {
      try {
        if (!process.env.JWT_SECRET) throw new Error('Missing signing secret');
        await jwtVerify(req.cookies.get('token')?.value || '',
          new TextEncoder().encode(process.env.JWT_SECRET), { algorithms: ['HS256'] });
      } catch {
        if (pathname.startsWith('/api/')) {
          return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        return NextResponse.redirect(new URL('/en/login/', requestUrl));
      }
    }
  }
  const destination = pathname === '/' && process.env.ADMIN_HOST === requestUrl.hostname
    ? '/admin/' : legacyDestination(pathname, process.env.SITE_REGION);
  if (destination) {
    const target = requestUrl;
    target.pathname = destination;
    return NextResponse.redirect(target, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|img/|fonts/).*)'],
};
