-- Split hero copy into explicit desktop/mobile records.
ALTER TABLE "PowerBannerCopy"
ADD COLUMN "viewport" TEXT NOT NULL DEFAULT 'desktop';

ALTER TABLE "PowerBannerCopy"
DROP CONSTRAINT "PowerBannerCopy_pkey";

ALTER TABLE "PowerBannerCopy"
ADD CONSTRAINT "PowerBannerCopy_pkey" PRIMARY KEY ("bannerKey", "viewport");

INSERT INTO "PowerBannerCopy" ("bannerKey", "viewport", "title", "body", "updatedAt")
SELECT "bannerKey", 'mobile', "title", "body", NOW()
FROM "PowerBannerCopy"
WHERE "viewport" = 'desktop'
ON CONFLICT ("bannerKey", "viewport") DO NOTHING;

-- Convert legacy hero slots into explicit desktop slots.
UPDATE "SiteMediaItem"
SET "slotId" = CASE
  WHEN "slotId" = 'hero_modeling' THEN 'hero_modeling_desktop'
  WHEN "slotId" = 'hero_rendering' THEN 'hero_rendering_desktop'
  WHEN "slotId" = 'hero_design' THEN 'hero_design_desktop'
  ELSE "slotId"
END
WHERE "sectionKey" = 'hero_banners'
  AND "slotId" IN ('hero_modeling', 'hero_rendering', 'hero_design');

-- Create mobile rows from legacy mobile image keys, if they exist on desktop rows.
INSERT INTO "SiteMediaItem" (
  "sectionKey",
  "slotId",
  "sortOrder",
  "r2ObjectKey",
  "legacySrc",
  "alt"
)
SELECT
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
  "alt"
FROM "SiteMediaItem"
WHERE "sectionKey" = 'hero_banners'
  AND "slotId" IN ('hero_modeling_desktop', 'hero_rendering_desktop', 'hero_design_desktop')
  AND "r2ObjectKeyMobile" IS NOT NULL
ON CONFLICT ("slotId") DO NOTHING;

-- Ensure mobile rows exist even when no upload is present yet.
INSERT INTO "SiteMediaItem" (
  "sectionKey",
  "slotId",
  "sortOrder",
  "legacySrc",
  "alt"
)
VALUES
  ('hero_banners', 'hero_modeling_mobile', 0, '/images/modeling/block1-mobile.png', '3D Production-Ready Modeling hero banner'),
  ('hero_banners', 'hero_rendering_mobile', 1, '/images/rendering/block2-mobile.png', 'Jewelry Rendering hero banner'),
  ('hero_banners', 'hero_design_mobile', 2, '/images/design/block3-mobile-original.png', 'Jewelry Design hero banner')
ON CONFLICT ("slotId") DO NOTHING;

-- Desktop rows no longer store mobile object keys.
UPDATE "SiteMediaItem"
SET "r2ObjectKeyMobile" = NULL
WHERE "sectionKey" = 'hero_banners'
  AND "slotId" IN ('hero_modeling_desktop', 'hero_rendering_desktop', 'hero_design_desktop');
