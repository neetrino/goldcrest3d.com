const PRISMA_KNOWN_ERROR_NAME = "PrismaClientKnownRequestError";

/**
 * Таблица ещё не создана / схема не совпадает — ожидаемо до `prisma migrate deploy`.
 */
export function isMigrationPendingError(err: unknown): boolean {
  if (typeof err !== "object" || err === null) return false;
  const rec = err as Record<string, unknown>;
  if (rec.name !== PRISMA_KNOWN_ERROR_NAME) return false;
  const code = rec.code;
  return code === "P2021" || code === "P2022" || code === "P2025";
}
