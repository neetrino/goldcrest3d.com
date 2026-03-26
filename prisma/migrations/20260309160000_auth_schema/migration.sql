-- Auth.js schema: Account/Session id PK, User.password (Credentials provider)
-- This migration was applied on the database; adding locally to sync history.

-- User: add optional password for Credentials provider
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "password" TEXT;

-- Account: add id as primary key, keep (provider, providerAccountId) unique
ALTER TABLE "Account" ADD COLUMN IF NOT EXISTS "id" TEXT;
UPDATE "Account" SET "id" = gen_random_uuid()::text WHERE "id" IS NULL;
ALTER TABLE "Account" ALTER COLUMN "id" SET NOT NULL;
ALTER TABLE "Account" DROP CONSTRAINT IF EXISTS "Account_pkey";
ALTER TABLE "Account" ADD PRIMARY KEY ("id");
CREATE UNIQUE INDEX IF NOT EXISTS "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- Session: add id as primary key
ALTER TABLE "Session" ADD COLUMN IF NOT EXISTS "id" TEXT;
UPDATE "Session" SET "id" = gen_random_uuid()::text WHERE "id" IS NULL;
ALTER TABLE "Session" ALTER COLUMN "id" SET NOT NULL;
ALTER TABLE "Session" DROP CONSTRAINT IF EXISTS "Session_pkey";
ALTER TABLE "Session" ADD PRIMARY KEY ("id");
