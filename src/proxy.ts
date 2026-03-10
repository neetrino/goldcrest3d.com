import {
  RATE_LIMIT_QUOTE_MAX,
  RATE_LIMIT_QUOTE_WINDOW_MS,
} from "@/constants";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const quoteLimit = new Map<string, { count: number; resetAt: number }>();

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

/** Auth wrapper: redirect /admin to sign-in when not authenticated. Never serve admin UI without auth. */
const adminProtect = auth((req) => {
  const path = req.nextUrl.pathname;
  if (path.startsWith("/api/auth")) return NextResponse.next();
  if (path.startsWith("/admin")) {
    if (!req.auth) {
      const signInUrl = new URL("/auth/signin", req.url);
      signInUrl.searchParams.set("callbackUrl", path === "/admin" ? "/admin/leads" : path);
      return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
  }
  return NextResponse.next();
});

/**
 * Proxy runs at the network boundary — admin protection first, then rate limiting.
 * Admin area is never opened without authentication (redirect to sign-in).
 */
export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const protectedResponse = await adminProtect(req, { params: Promise.resolve({}) });
  const isRedirect =
    protectedResponse instanceof Response &&
    protectedResponse.status >= 300 &&
    protectedResponse.status < 400;
  if (isRedirect) return protectedResponse;

  const method = req.method;
  const ip = getClientIp(req);
  if (method === "POST" && path === "/") {
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
  }

  return protectedResponse instanceof Response ? protectedResponse : NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
