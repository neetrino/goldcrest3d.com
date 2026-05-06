-- Idempotent: desktop/mobile horizontal offsets (see 20260429200000 / 20260429210000).
-- Safe when a DB skipped those migrations but Prisma Client already expects the columns (P2022).
ALTER TABLE "ModelingSpecializationCopy" ADD COLUMN IF NOT EXISTS "titleDesktopOffsetX" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "ModelingSpecializationCopy" ADD COLUMN IF NOT EXISTS "bodyDesktopOffsetX" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "ModelingSpecializationCopy" ADD COLUMN IF NOT EXISTS "titleMobileOffsetX" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "ModelingSpecializationCopy" ADD COLUMN IF NOT EXISTS "bodyMobileOffsetX" INTEGER NOT NULL DEFAULT 0;
