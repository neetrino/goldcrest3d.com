-- Align database with prisma/schema.prisma (diff: datasource → schema).
-- VerificationToken: composite unique index per Prisma @@unique([identifier, token]).
-- User.updatedAt: no server default; @updatedAt is handled by Prisma Client.

ALTER TABLE "User" ALTER COLUMN "updatedAt" DROP DEFAULT;

ALTER TABLE "VerificationToken" DROP CONSTRAINT "VerificationToken_pkey";

CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");
