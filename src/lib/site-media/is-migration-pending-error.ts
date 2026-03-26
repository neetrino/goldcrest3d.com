import { Prisma } from "@prisma/client";

/**
 * Таблица ещё не создана / схема не совпадает — ожидаемо до `prisma migrate deploy`.
 */
export function isMigrationPendingError(err: unknown): boolean {
  return (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    (err.code === "P2021" || err.code === "P2022" || err.code === "P2025")
  );
}
