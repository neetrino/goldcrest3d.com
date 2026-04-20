-- Align legacy SiteMediaItem columns with current Prisma model shape.
ALTER TABLE "SiteMediaItem"
  ADD COLUMN IF NOT EXISTS "sectionKey" TEXT,
  ADD COLUMN IF NOT EXISTS "slotId" TEXT,
  ADD COLUMN IF NOT EXISTS "alt" TEXT,
  ADD COLUMN IF NOT EXISTS "legacySrc" TEXT,
  ADD COLUMN IF NOT EXISTS "layoutMeta" JSONB,
  ADD COLUMN IF NOT EXISTS "publicLabelKey" TEXT;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'SiteMediaItem'
      AND column_name = 'groupKey'
  ) THEN
    EXECUTE 'UPDATE "SiteMediaItem" SET "sectionKey" = COALESCE("sectionKey", "groupKey")';
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'SiteMediaItem'
      AND column_name = 'slotKey'
  ) THEN
    EXECUTE 'UPDATE "SiteMediaItem" SET "slotId" = COALESCE("slotId", "slotKey")';
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'SiteMediaItem'
      AND column_name = 'altText'
  ) THEN
    EXECUTE 'UPDATE "SiteMediaItem" SET "alt" = COALESCE("alt", "altText")';
  END IF;
END $$;

ALTER TABLE "SiteMediaItem"
  ALTER COLUMN "sectionKey" SET NOT NULL,
  ALTER COLUMN "slotId" SET NOT NULL,
  ALTER COLUMN "r2ObjectKey" DROP NOT NULL;

ALTER TABLE "SiteMediaItem"
  DROP COLUMN IF EXISTS "groupKey",
  DROP COLUMN IF EXISTS "slotKey",
  DROP COLUMN IF EXISTS "altText",
  DROP COLUMN IF EXISTS "status";

DROP INDEX IF EXISTS "SiteMediaItem_groupKey_slotKey_key";
DROP INDEX IF EXISTS "SiteMediaItem_groupKey_sortOrder_idx";
DROP INDEX IF EXISTS "SiteMediaItem_sectionKey_sortOrder_idx";
DROP INDEX IF EXISTS "SiteMediaItem_slotId_key";

CREATE UNIQUE INDEX IF NOT EXISTS "SiteMediaItem_slotId_key"
  ON "SiteMediaItem"("slotId");

CREATE INDEX IF NOT EXISTS "SiteMediaItem_sectionKey_sortOrder_idx"
  ON "SiteMediaItem"("sectionKey", "sortOrder");
