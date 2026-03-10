/**
 * Seed — creates one initial Admin in Neon (no public signup).
 * Run: pnpm db:seed
 * Optional in .env: SEED_ADMIN_EMAIL, SEED_ADMIN_USERNAME, SEED_ADMIN_PASSWORD
 */

import "dotenv/config";
import { hash } from "bcryptjs";
import { prisma } from "../src/lib/db";

const DEFAULT_EMAIL = "admin@goldcrest.local";
const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "Admin123";

const SALT_ROUNDS = 12;

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL?.trim() || DEFAULT_EMAIL;
  const username = process.env.SEED_ADMIN_USERNAME?.trim() || DEFAULT_USERNAME;
  const plainPassword = process.env.SEED_ADMIN_PASSWORD || DEFAULT_PASSWORD;

  const hashedPassword = await hash(plainPassword, SALT_ROUNDS);

  // Type assertion: some TS resolutions (e.g. IDE) use a Prisma client ref without latest schema.
  // Runtime uses the correct generated client (pnpm prisma generate). Schema: User.username, User.password.
  const createData = {
    email,
    username,
    name: "Admin",
    password: hashedPassword,
  };
  const updateData = {
    username,
    name: "Admin",
    password: hashedPassword,
  };

  await prisma.user.upsert({
    where: { email },
    create: createData as Parameters<typeof prisma.user.create>[0]["data"],
    update: updateData as Parameters<typeof prisma.user.update>[0]["data"],
  });

  console.log("---");
  console.log("Admin created in Neon. Use these to sign in at /signin");
  console.log("Login (email):", email);
  console.log("Login (username):", username);
  console.log("Password:", plainPassword);
  console.log("---");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
