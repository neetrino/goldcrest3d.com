const PRISMA_KNOWN_ERROR_NAME = "PrismaClientKnownRequestError";
const PRISMA_UNIQUE_CONSTRAINT = "P2002";

/**
 * True when Prisma rejected a create/upsert due to a unique constraint (duplicate idempotency key).
 */
export function isPrismaUniqueViolation(err: unknown): boolean {
  if (typeof err !== "object" || err === null) return false;
  const rec = err as Record<string, unknown>;
  return rec.name === PRISMA_KNOWN_ERROR_NAME && rec.code === PRISMA_UNIQUE_CONSTRAINT;
}
