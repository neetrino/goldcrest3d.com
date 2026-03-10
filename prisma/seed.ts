/**
 * Seed — optional data for Neon.
 * Run: pnpm db:seed
 * No admin or auth data; add other seed logic here if needed.
 */

import { prisma } from "../src/lib/db";

async function main() {
  // No seed data by default.
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
