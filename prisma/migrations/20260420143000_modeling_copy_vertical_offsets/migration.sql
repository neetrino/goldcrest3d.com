-- Add independent vertical offsets for modeling copy fields.
ALTER TABLE "ModelingSpecializationCopy"
ADD COLUMN "titleDesktopOffsetY" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "titleMobileOffsetY" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "bodyDesktopOffsetY" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "bodyMobileOffsetY" INTEGER NOT NULL DEFAULT 0;
