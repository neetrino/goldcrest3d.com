ALTER TABLE "ModelingSpecializationCopy"
  ADD COLUMN IF NOT EXISTS "titleMobileOffsetX" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE "ModelingSpecializationCopy"
  ADD COLUMN IF NOT EXISTS "bodyMobileOffsetX" INTEGER NOT NULL DEFAULT 0;
