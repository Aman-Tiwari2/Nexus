import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "nexus2026";
const AUTH_COOKIE = "nexus-admin-auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only guard /admin routes
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  const authCookie = request.cookies.get(AUTH_COOKIE)?.value;
  const isAuthenticated = authCookie === ADMIN_PASSWORD;
  const isLoginPage = pathname === "/admin";

  // API routes for auth don't need the guard
  if (pathname.startsWith("/api/admin/auth")) return NextResponse.next();

  // Guard /api/admin/* routes
  if (pathname.startsWith("/api/admin")) {
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // If authenticated and on login page → redirect to dashboard
  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // If NOT authenticated and trying to access protected pages → redirect to login
  if (!isAuthenticated && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
