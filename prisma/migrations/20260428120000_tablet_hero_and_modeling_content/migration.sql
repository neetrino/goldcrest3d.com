-- Tablet-only assets for Modeling Specialization (isolated from desktop/mobile URLs at runtime).
ALTER TABLE "SiteMediaItem" ADD COLUMN IF NOT EXISTS "r2ObjectKeyTablet" TEXT;

-- Tablet copy for Modeling Specialization (separate from desktop/mobile fields).
ALTER TABLE "ModelingSpecializationCopy" ADD COLUMN IF NOT EXISTS "titleTablet" TEXT;
ALTER TABLE "ModelingSpecializationCopy" ADD COLUMN IF NOT EXISTS "bodyTablet" TEXT;
ALTER TABLE "ModelingSpecializationCopy" ADD COLUMN IF NOT EXISTS "titleTabletOffsetY" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "ModelingSpecializationCopy" ADD COLUMN IF NOT EXISTS "bodyTabletOffsetY" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "ModelingSpecializationCopy" ADD COLUMN IF NOT EXISTS "tabletLine1Emphasis" TEXT;

-- Hero (PowerBannerCopy) tablet rows — same initial text as mobile; independently editable after deploy.
INSERT INTO "PowerBannerCopy" ("bannerKey", "viewport", "title", "body", "titleOffsetY", "bodyOffsetY", "ctaOffsetY", "updatedAt")
SELECT "bannerKey", 'tablet', "title", "body", "titleOffsetY", "bodyOffsetY", "ctaOffsetY", NOW()
FROM "PowerBannerCopy" AS p
WHERE p."viewport" = 'mobile'
  AND NOT EXISTS (
    SELECT 1 FROM "PowerBannerCopy" AS t
    WHERE t."bannerKey" = p."bannerKey" AND t."viewport" = 'tablet'
  );
