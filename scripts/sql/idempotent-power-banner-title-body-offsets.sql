-- Run against Neon if PowerBannerCopy still has legacy "textOffsetY" while the app expects
-- titleOffsetY + bodyOffsetY. Safe to run once; no-op if already migrated.

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'PowerBannerCopy'
      AND column_name = 'textOffsetY'
  ) THEN
    ALTER TABLE "PowerBannerCopy" ADD COLUMN IF NOT EXISTS "titleOffsetY" INTEGER NOT NULL DEFAULT 0;
    ALTER TABLE "PowerBannerCopy" ADD COLUMN IF NOT EXISTS "bodyOffsetY" INTEGER NOT NULL DEFAULT 0;
    UPDATE "PowerBannerCopy"
    SET
      "titleOffsetY" = "textOffsetY",
      "bodyOffsetY" = "textOffsetY";
    ALTER TABLE "PowerBannerCopy" DROP COLUMN "textOffsetY";
  END IF;
END $$;
