-- Drop legacy unmanaged content tables and stale PowerBannerCopy fields
-- to align the live database with the current Prisma schema.
ALTER TABLE "PowerBannerCopy"
DROP COLUMN IF EXISTS "bodyMobile",
DROP COLUMN IF EXISTS "heroImageLayout",
DROP COLUMN IF EXISTS "heroImageLayoutMobile",
DROP COLUMN IF EXISTS "heroTextLayoutMobile",
DROP COLUMN IF EXISTS "r2ObjectKey",
DROP COLUMN IF EXISTS "r2ObjectKeyMobile",
DROP COLUMN IF EXISTS "titleMobile";

DROP TABLE IF EXISTS "EngineeringProcessCopy";
DROP TABLE IF EXISTS "FounderSectionCopy";
DROP TABLE IF EXISTS "ManagedHomeContent";
DROP TABLE IF EXISTS "ManufacturingIntelligenceCopy";
DROP TABLE IF EXISTS "ManufacturingSpecializationItemCopy";
DROP TABLE IF EXISTS "ModelingSlotCopy";
DROP TABLE IF EXISTS "ModelingSpecializationHeader";
