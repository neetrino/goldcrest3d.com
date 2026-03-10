import { type NextRequest, NextResponse } from "next/server";

/** Auth.js v5 default session cookie names (no __Secure- in dev). */
const SESSION_COOKIE_NAMES = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
] as const;

/**
 * Proxy runs at the network boundary — we only check for session cookie presence;
 * real auth is enforced in admin layout via auth().
 */
function hasSessionCookie(req: NextRequest): boolean {
  for (const name of SESSION_COOKIE_NAMES) {
    if (req.cookies.get(name)?.value) return true;
  }
  return false;
}

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (path.startsWith("/api")) return NextResponse.next();

  const hasSession = hasSessionCookie(req);
  const isAuthPage = path.startsWith("/auth");
  const isAdminPage = path.startsWith("/admin");

  if (isAdminPage && !hasSession) {
    return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
  }
  if (isAuthPage && hasSession) {
    return NextResponse.redirect(new URL("/admin/leads", req.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
