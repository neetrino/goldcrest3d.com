import type { PrismaClient } from "@/generated/prisma/client";

/** Prisma codes that often clear after reconnect / one retry (pooler, idle drops, network). */
const TRANSIENT_PRISMA_CODES = new Set([
  "P1001",
  "P1008",
  "P1017",
  "P2024",
]);

const TRANSIENT_RETRY_ATTEMPTS = 2;
const TRANSIENT_RETRY_DELAY_MS = 75;

function messageLooksTransient(msg: string): boolean {
  const m = msg.toLowerCase();
  return (
    m.includes("connection terminated") ||
    m.includes("connection closed") ||
    m.includes("server closed the connection") ||
    m.includes("econnreset") ||
    m.includes("etimedout")
  );
}

/**
 * True for dropped TCP / pool timeouts / server-side connection close surfaced by pg or Prisma.
 */
export function isTransientDbConnectionError(err: unknown): boolean {
  if (typeof err !== "object" || err === null) return false;
  const rec = err as Record<string, unknown>;
  const code = rec.code;
  if (typeof code === "string" && TRANSIENT_PRISMA_CODES.has(code)) {
    return true;
  }
  const msg = rec.message;
  if (typeof msg === "string" && messageLooksTransient(msg)) {
    return true;
  }
  return false;
}

/**
 * Runs a Prisma operation once, then on transient connection failure reconnects and retries once.
 */
export async function withPrismaConnectionRetry<T>(
  prisma: PrismaClient,
  run: () => Promise<T>,
): Promise<T> {
  for (let attempt = 0; attempt < TRANSIENT_RETRY_ATTEMPTS; attempt++) {
    try {
      return await run();
    } catch (err) {
      const isLastAttempt = attempt === TRANSIENT_RETRY_ATTEMPTS - 1;
      if (isLastAttempt || !isTransientDbConnectionError(err)) {
        throw err;
      }
      try {
        await prisma.$connect();
      } catch {
        // Next attempt will call `run()` again; ignore connect noise.
      }
      await new Promise((r) => {
        setTimeout(r, TRANSIENT_RETRY_DELAY_MS);
      });
    }
  }
  throw new Error("withPrismaConnectionRetry: exhausted without result");
}
