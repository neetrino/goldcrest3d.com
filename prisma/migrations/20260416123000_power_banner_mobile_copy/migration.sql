ALTER TABLE "PowerBannerCopy"
  ADD COLUMN "r2ObjectKeyMobile" TEXT,
  ADD COLUMN "titleMobile" TEXT,
  ADD COLUMN "bodyMobile" TEXT,
  ADD COLUMN "mobileOverlayText" TEXT;

-- Backward compatibility: preserve current mobile experience by seeding mobile fields
-- from existing desktop/tablet values.
UPDATE "PowerBannerCopy"
SET
  "r2ObjectKeyMobile" = "r2ObjectKey",
  "titleMobile" = "title",
  "bodyMobile" = "body"
WHERE
  "r2ObjectKeyMobile" IS NULL
  AND "titleMobile" IS NULL
  AND "bodyMobile" IS NULL;
