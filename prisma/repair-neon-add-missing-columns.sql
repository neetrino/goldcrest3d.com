-- Sync Neon columns with prisma/schema.prisma when migrate deploy cannot run (e.g. failed
-- migration in _prisma_migrations). Applies the same ALTERs as tablet + XY offset migrations
-- (including ModelingSpecializationCopy tablet horizontal offsets).
--
-- Run locally (uses DIRECT_URL / DATABASE_URL from prisma.config.ts + .env):
--   pnpm db:repair-schema
-- Or paste into Neon SQL Editor.
--
-- Safe to re-run: IF NOT EXISTS on columns; tablet PowerBannerCopy rows only if missing.

-- --- ModelingSpecializationCopy: vertical offsets (migration 20260420143000) ---
ALTER TABLE "ModelingSpecializationCopy" ADD COLUMN IF NOT EXISTS "titleDesktopOffsetY" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "ModelingSpecializationCopy" ADD COLUMN IF NOT EXISTS "titleMobileOffsetY" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "ModelingSpecializationCopy" ADD COLUMN IF NOT EXISTS "bodyDesktopOffsetY" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "ModelingSpecializationCopy" ADD COLUMN IF NOT EXISTS "bodyMobileOffsetY" INTEGER NOT NULL DEFAULT 0;

-- --- Tablet modeling + media (migration 20260428120000_tablet_hero_and_modeling_content) ---
ALTER TABLE "SiteMediaItem" ADD COLUMN IF NOT EXISTS "r2ObjectKeyTablet" TEXT;

ALTER TABLE "ModelingSpecializationCopy" ADD COLUMN IF NOT EXISTS "titleTablet" TEXT;
ALTER TABLE "ModelingSpecializationCopy" ADD COLUMN IF NOT EXISTS "bodyTablet" TEXT;
ALTER TABLE "ModelingSpecializationCopy" ADD COLUMN IF NOT EXISTS "titleTabletOffsetY" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "ModelingSpecializationCopy" ADD COLUMN IF NOT EXISTS "bodyTabletOffsetY" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "ModelingSpecializationCopy" ADD COLUMN IF NOT EXISTS "tabletLine1Emphasis" TEXT;

INSERT INTO "PowerBannerCopy" ("bannerKey", "viewport", "title", "body", "titleOffsetY", "bodyOffsetY", "ctaOffsetY", "updatedAt")
SELECT "bannerKey", 'tablet', "title", "body", "titleOffsetY", "bodyOffsetY", "ctaOffsetY", NOW()
FROM "PowerBannerCopy" AS p
WHERE p."viewport" = 'mobile'
  AND NOT EXISTS (
    SELECT 1 FROM "PowerBannerCopy" AS t
    WHERE t."bannerKey" = p."bannerKey" AND t."viewport" = 'tablet'
  );

-- --- Hero horizontal offsets (migration 20260428140000_power_banner_copy_xy_offsets) ---
ALTER TABLE "PowerBannerCopy" ADD COLUMN IF NOT EXISTS "titleOffsetX" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "PowerBannerCopy" ADD COLUMN IF NOT EXISTS "bodyOffsetX" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "PowerBannerCopy" ADD COLUMN IF NOT EXISTS "ctaOffsetX" INTEGER NOT NULL DEFAULT 0;

-- --- Modeling tablet copy horizontal offsets (migration 20260429180000_modeling_tablet_copy_offset_x) ---
ALTER TABLE "ModelingSpecializationCopy" ADD COLUMN IF NOT EXISTS "titleTabletOffsetX" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "ModelingSpecializationCopy" ADD COLUMN IF NOT EXISTS "bodyTabletOffsetX" INTEGER NOT NULL DEFAULT 0;
