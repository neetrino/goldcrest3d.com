-- Split combined hero text offset into separate title vs description nudges (preserves prior positions).

ALTER TABLE "PowerBannerCopy" ADD COLUMN "titleOffsetY" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "PowerBannerCopy" ADD COLUMN "bodyOffsetY" INTEGER NOT NULL DEFAULT 0;

UPDATE "PowerBannerCopy"
SET
  "titleOffsetY" = "textOffsetY",
  "bodyOffsetY" = "textOffsetY";

ALTER TABLE "PowerBannerCopy" DROP COLUMN "textOffsetY";
