/**
 * Edge-only middleware: quote form rate limiting only.
 * Must NOT import: @/auth, @/lib/db, or any module that uses Node (crypto, bcrypt, Prisma).
 * Admin protection is enforced in src/app/admin/layout.tsx (auth() + AdminSignInGate).
 */
import { type NextRequest, NextResponse } from "next/server";

/** Inlined from @/constants to keep this file Edge-safe (no app imports). */
const RATE_LIMIT_QUOTE_WINDOW_MS = 60_000;
const RATE_LIMIT_QUOTE_MAX = 10;

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

/**
 * Middleware (Edge): rate limit POST / (quote form). Մնացած request-ներ — next().
 */
export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const method = req.method;

  if (method === "POST" && path === "/") {
    const ip = getClientIp(req);
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

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
