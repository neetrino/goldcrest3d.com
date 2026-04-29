-- Idempotent: desktop title/body horizontal offsets (separate from tablet).
-- Use when `prisma migrate deploy` is blocked by migration history / failed migrations.

ALTER TABLE "ModelingSpecializationCopy"
  ADD COLUMN IF NOT EXISTS "titleDesktopOffsetX" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE "ModelingSpecializationCopy"
  ADD COLUMN IF NOT EXISTS "bodyDesktopOffsetX" INTEGER NOT NULL DEFAULT 0;
