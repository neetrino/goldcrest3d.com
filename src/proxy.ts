import {
  RATE_LIMIT_QUOTE_MAX,
  RATE_LIMIT_QUOTE_WINDOW_MS,
} from "@/constants";
import { type NextRequest, NextResponse } from "next/server";

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
 * Proxy runs at the network boundary — rate limiting for quote form.
 */
export function proxy(req: NextRequest) {
  const method = req.method;
  const path = req.nextUrl.pathname;
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

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
