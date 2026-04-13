const PRISMA_KNOWN_ERROR_NAME = "PrismaClientKnownRequestError";

/**
 * Таблица ещё не создана / схема не совпадает — ожидаемо до `prisma migrate deploy`.
 * Prisma 7 may surface the same codes with a different `Error.name`; rely on `code` for P2021/P2022.
 */
export function isMigrationPendingError(err: unknown): boolean {
  if (typeof err !== "object" || err === null) return false;
  const rec = err as Record<string, unknown>;
  const code = rec.code;
  if (code === "P2021" || code === "P2022") {
    return true;
  }
  if (code === "P2025" && rec.name === PRISMA_KNOWN_ERROR_NAME) {
    return true;
  }
  return false;
}
