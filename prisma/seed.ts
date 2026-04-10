/**
 * Prisma seed entrypoint (`pnpm db:seed`).
 * No bundled admin or app data — users and credentials are stored only in the database.
 * Extend this file when you need repeatable seed data (e.g. fixtures for dev).
 */
import "dotenv/config";

async function main(): Promise<void> {
  console.info(
    "[seed] No seed data defined. Admin and other records are managed in the database.",
  );
}

main().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
