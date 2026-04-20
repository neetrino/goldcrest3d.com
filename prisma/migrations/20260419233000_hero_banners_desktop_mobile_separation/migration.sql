-- Split hero copy into explicit desktop/mobile records.
ALTER TABLE "PowerBannerCopy"
ADD COLUMN IF NOT EXISTS "viewport" TEXT;

UPDATE "PowerBannerCopy"
SET "viewport" = 'desktop'
WHERE "viewport" IS NULL;

ALTER TABLE "PowerBannerCopy"
ALTER COLUMN "viewport" SET DEFAULT 'desktop';

ALTER TABLE "PowerBannerCopy"
ALTER COLUMN "viewport" SET NOT NULL;

ALTER TABLE "PowerBannerCopy"
DROP CONSTRAINT "PowerBannerCopy_pkey";

ALTER TABLE "PowerBannerCopy"
ADD CONSTRAINT "PowerBannerCopy_pkey" PRIMARY KEY ("bannerKey", "viewport");

INSERT INTO "PowerBannerCopy" ("bannerKey", "viewport", "title", "body", "updatedAt")
SELECT "bannerKey", 'mobile', "title", "body", NOW()
FROM "PowerBannerCopy"
WHERE "viewport" = 'desktop'
ON CONFLICT ("bannerKey", "viewport") DO NOTHING;

-- Convert legacy hero slots into explicit desktop slots (idempotent).
UPDATE "SiteMediaItem"
SET "slotId" = 'hero_modeling_desktop'
WHERE "sectionKey" = 'hero_banners'
  AND "slotId" = 'hero_modeling'
  AND NOT EXISTS (
    SELECT 1
    FROM "SiteMediaItem" existing
    WHERE existing."slotId" = 'hero_modeling_desktop'
  );

UPDATE "SiteMediaItem"
SET "slotId" = 'hero_rendering_desktop'
WHERE "sectionKey" = 'hero_banners'
  AND "slotId" = 'hero_rendering'
  AND NOT EXISTS (
    SELECT 1
    FROM "SiteMediaItem" existing
    WHERE existing."slotId" = 'hero_rendering_desktop'
  );

UPDATE "SiteMediaItem"
SET "slotId" = 'hero_design_desktop'
WHERE "sectionKey" = 'hero_banners'
  AND "slotId" = 'hero_design'
  AND NOT EXISTS (
    SELECT 1
    FROM "SiteMediaItem" existing
    WHERE existing."slotId" = 'hero_design_desktop'
  );

-- Create mobile rows from legacy mobile image keys, if they exist on desktop rows.
INSERT INTO "SiteMediaItem" (
  "id",
  "sectionKey",
  "slotId",
  "sortOrder",
  "r2ObjectKey",
  "legacySrc",
  "alt",
  "updatedAt"
)
SELECT
  CASE
    WHEN "slotId" = 'hero_modeling_desktop' THEN 'site_media_hero_modeling_mobile'
    WHEN "slotId" = 'hero_rendering_desktop' THEN 'site_media_hero_rendering_mobile'
    WHEN "slotId" = 'hero_design_desktop' THEN 'site_media_hero_design_mobile'
  END AS "id",
  "sectionKey",
  CASE
    WHEN "slotId" = 'hero_modeling_desktop' THEN 'hero_modeling_mobile'
    WHEN "slotId" = 'hero_rendering_desktop' THEN 'hero_rendering_mobile'
    WHEN "slotId" = 'hero_design_desktop' THEN 'hero_design_mobile'
  END AS "slotId",
  "sortOrder",
  "r2ObjectKeyMobile",
  CASE
    WHEN "slotId" = 'hero_modeling_desktop' THEN '/images/modeling/block1-mobile.png'
    WHEN "slotId" = 'hero_rendering_desktop' THEN '/images/rendering/block2-mobile.png'
    WHEN "slotId" = 'hero_design_desktop' THEN '/images/design/block3-mobile-original.png'
  END AS "legacySrc",
  "alt",
  NOW()
FROM "SiteMediaItem"
WHERE "sectionKey" = 'hero_banners'
  AND "slotId" IN ('hero_modeling_desktop', 'hero_rendering_desktop', 'hero_design_desktop')
  AND "r2ObjectKeyMobile" IS NOT NULL
ON CONFLICT ("slotId") DO NOTHING;

-- Ensure mobile rows exist even when no upload is present yet.
INSERT INTO "SiteMediaItem" (
  "id",
  "sectionKey",
  "slotId",
  "sortOrder",
  "legacySrc",
  "alt",
  "updatedAt"
)
VALUES
  ('site_media_hero_modeling_mobile', 'hero_banners', 'hero_modeling_mobile', 0, '/images/modeling/block1-mobile.png', '3D Production-Ready Modeling hero banner', NOW()),
  ('site_media_hero_rendering_mobile', 'hero_banners', 'hero_rendering_mobile', 1, '/images/rendering/block2-mobile.png', 'Jewelry Rendering hero banner', NOW()),
  ('site_media_hero_design_mobile', 'hero_banners', 'hero_design_mobile', 2, '/images/design/block3-mobile-original.png', 'Jewelry Design hero banner', NOW())
ON CONFLICT ("slotId") DO NOTHING;

-- Desktop rows no longer store mobile object keys.
UPDATE "SiteMediaItem"
SET "r2ObjectKeyMobile" = NULL
WHERE "sectionKey" = 'hero_banners'
  AND "slotId" IN ('hero_modeling_desktop', 'hero_rendering_desktop', 'hero_design_desktop');
