-- Drop legacy unmanaged content tables and stale PowerBannerCopy fields
-- to align the live database with the current Prisma schema.
ALTER TABLE "PowerBannerCopy"
DROP COLUMN "bodyMobile",
DROP COLUMN "heroImageLayout",
DROP COLUMN "heroImageLayoutMobile",
DROP COLUMN "heroTextLayoutMobile",
DROP COLUMN "r2ObjectKey",
DROP COLUMN "r2ObjectKeyMobile",
DROP COLUMN "titleMobile";

DROP TABLE "EngineeringProcessCopy";
DROP TABLE "FounderSectionCopy";
DROP TABLE "ManagedHomeContent";
DROP TABLE "ManufacturingIntelligenceCopy";
DROP TABLE "ManufacturingSpecializationItemCopy";
DROP TABLE "ModelingSlotCopy";
DROP TABLE "ModelingSpecializationHeader";
