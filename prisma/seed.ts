/**
 * Seed — admin user for Auth.js (Credentials).
 * Run: pnpm db:seed
 * Uses SEED_ADMIN_EMAIL, SEED_ADMIN_USERNAME, SEED_ADMIN_PASSWORD (empty = defaults).
 * Loads .env so DATABASE_URL (Neon) is available when run via tsx.
 */
import "dotenv/config";

import { hashSync } from "bcryptjs";
import { prisma } from "../src/lib/db";

const DEFAULT_ADMIN_EMAIL = "admin@goldcrest.local";
const DEFAULT_ADMIN_USERNAME = "admin";
const DEFAULT_ADMIN_PASSWORD = "Admin123";

async function main() {
  const email =
    (process.env.SEED_ADMIN_EMAIL ?? DEFAULT_ADMIN_EMAIL).trim() ||
    DEFAULT_ADMIN_EMAIL;
  const name =
    (process.env.SEED_ADMIN_USERNAME ?? DEFAULT_ADMIN_USERNAME).trim() ||
    DEFAULT_ADMIN_USERNAME;
  const password =
    (process.env.SEED_ADMIN_PASSWORD ?? DEFAULT_ADMIN_PASSWORD).trim() ||
    DEFAULT_ADMIN_PASSWORD;

  const existing = await prisma.user.findFirst({ where: { email } });
  if (existing) {
    return;
  }

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashSync(password, 10),
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
