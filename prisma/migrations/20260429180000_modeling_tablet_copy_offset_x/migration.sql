-- Horizontal shift for tablet-only title/body (CSS translateX %), same range as vertical offsets.
ALTER TABLE "ModelingSpecializationCopy"
ADD COLUMN "titleTabletOffsetX" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "bodyTabletOffsetX" INTEGER NOT NULL DEFAULT 0;
