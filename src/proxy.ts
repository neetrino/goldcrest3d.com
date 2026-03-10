import {
  RATE_LIMIT_AUTH_MAX,
  RATE_LIMIT_AUTH_WINDOW_MS,
  RATE_LIMIT_QUOTE_MAX,
  RATE_LIMIT_QUOTE_WINDOW_MS,
} from "@/constants";
import { type NextRequest, NextResponse } from "next/server";

/** Auth.js v5 default session cookie names (no __Secure- in dev). */
const SESSION_COOKIE_NAMES = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
] as const;

const quoteLimit = new Map<string, { count: number; resetAt: number }>();
const authLimit = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

function isOverLimit(
  store: Map<string, { count: number; resetAt: number }>,
  key: string,
  max: number,
  windowMs: number,
): boolean {
  const now = Date.now();
  let entry = store.get(key);
  if (!entry || now >= entry.resetAt) {
    entry = { count: 1, resetAt: now + windowMs };
    store.set(key, entry);
    return false;
  }
  entry.count++;
  return entry.count > max;
}

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
  const method = req.method;
  const path = req.nextUrl.pathname;
  const ip = getClientIp(req);

  if (method === "POST") {
    if (path === "/") {
      if (
        isOverLimit(
          quoteLimit,
          ip,
          RATE_LIMIT_QUOTE_MAX,
          RATE_LIMIT_QUOTE_WINDOW_MS,
        )
      ) {
        return new NextResponse("Too Many Requests", { status: 429 });
      }
    } else if (path.startsWith("/api/auth/")) {
      if (
        isOverLimit(
          authLimit,
          ip,
          RATE_LIMIT_AUTH_MAX,
          RATE_LIMIT_AUTH_WINDOW_MS,
        )
      ) {
        return new NextResponse("Too Many Requests", { status: 429 });
      }
    }
  }

  if (path.startsWith("/api")) return NextResponse.next();

  const hasSession = hasSessionCookie(req);
  const isSignInPage = path === "/signin" || path.startsWith("/auth");
  const isAdminPage = path.startsWith("/admin");

  if (isAdminPage && !hasSession) {
    const signInUrl = new URL("/signin", req.nextUrl);
    signInUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(signInUrl);
  }
  if (isSignInPage && hasSession) {
    return NextResponse.redirect(new URL("/admin/leads", req.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
