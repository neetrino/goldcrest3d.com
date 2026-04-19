-- Backfill PowerBannerCopy viewport split for databases that missed the
-- desktop/mobile migration but already run code expecting viewport records.
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
DROP CONSTRAINT IF EXISTS "PowerBannerCopy_pkey";

ALTER TABLE "PowerBannerCopy"
ADD CONSTRAINT "PowerBannerCopy_pkey" PRIMARY KEY ("bannerKey", "viewport");

INSERT INTO "PowerBannerCopy" ("bannerKey", "viewport", "title", "body", "updatedAt")
SELECT "bannerKey", 'mobile', "title", "body", NOW()
FROM "PowerBannerCopy"
WHERE "viewport" = 'desktop'
ON CONFLICT ("bannerKey", "viewport") DO NOTHING;
