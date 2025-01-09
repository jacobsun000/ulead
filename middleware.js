import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
  const token = req.cookies.get("token")?.value; // Extract JWT token from cookies
  const url = req.nextUrl.pathname;

  if (url.startsWith("/admin")) {
    if (!token) {
      // Redirect to login if no token is found
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      // Verify the token using `jose`
      await jwtVerify(token, JWT_SECRET);

      // Allow access if token is valid
      return NextResponse.next();
    } catch (err) {
      console.error("JWT verification failed:", err);
      // Redirect to login if token is invalid or expired
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Allow access to other routes
  return NextResponse.next();
}

// Apply middleware only to admin folder
export const config = {
  matcher: ["/admin/:path*", "/admin", "/api/admin/:path*"],
};
