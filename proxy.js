import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { legacyDestination, isAdminPath, adminAvailable } from './lib/site-routing.mjs';

export async function proxy(req) {
  const pathname = req.nextUrl.pathname;
  if (isAdminPath(pathname)) {
    if (!adminAvailable(req.nextUrl.hostname, process.env)) {
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
        return NextResponse.redirect(new URL('/en/login/', req.url));
      }
    }
  }
  const destination = legacyDestination(pathname, process.env.SITE_REGION);
  if (destination) {
    const target = req.nextUrl.clone();
    target.pathname = destination;
    return NextResponse.redirect(target, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|img/|fonts/).*)'],
};
