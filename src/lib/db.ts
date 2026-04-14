import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { normalizePostgresConnectionStringSslMode } from "@/lib/normalizePostgresConnectionStringSslMode";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

/** Single-process Next dev / Node: bounded pool + keepalive reduces idle connection drops from remote Postgres. */
const PG_POOL_MAX = 10;
const PG_IDLE_TIMEOUT_MS = 30_000;
const PG_CONNECTION_TIMEOUT_MS = 15_000;
const PG_KEEPALIVE_INITIAL_DELAY_MS = 10_000;

function pgPoolConfig(connectionString: string) {
  return {
    connectionString,
    max: PG_POOL_MAX,
    idleTimeoutMillis: PG_IDLE_TIMEOUT_MS,
    connectionTimeoutMillis: PG_CONNECTION_TIMEOUT_MS,
    keepAlive: true,
    keepAliveInitialDelayMillis: PG_KEEPALIVE_INITIAL_DELAY_MS,
  };
}

function createPrismaClient(): PrismaClient {
  const rawUrl = process.env.DATABASE_URL;
  if (!rawUrl) {
    throw new Error("DATABASE_URL is not set");
  }
  const connectionString = normalizePostgresConnectionStringSslMode(rawUrl);
  const adapter = new PrismaPg(pgPoolConfig(connectionString));
  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

export const prisma =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
