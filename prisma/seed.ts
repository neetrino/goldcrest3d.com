/**
 * Seed — creates admin user for dev.
 * Run: pnpm prisma db seed
 * Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in .env or use defaults (dev only).
 */

import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const DEFAULT_DEV_EMAIL = "admin@goldcrest.local";
const DEFAULT_DEV_PASSWORD = "admin-dev-change-me";

async function main() {
  const email =
    process.env.SEED_ADMIN_EMAIL ?? DEFAULT_DEV_EMAIL;
  const plainPassword =
    process.env.SEED_ADMIN_PASSWORD ?? DEFAULT_DEV_PASSWORD;

  const SALT_ROUNDS = 12;
  const hashedPassword = await hash(plainPassword, SALT_ROUNDS);

  await prisma.user.upsert({
    where: { email },
    create: {
      email,
      name: "Admin",
      password: hashedPassword,
    } as { email: string; name: string; password: string },
    update: {
      password: hashedPassword,
    } as { password: string },
  });

  console.log("Seed OK: admin user", email);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
