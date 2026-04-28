-- Independent horizontal positioning for hero copy (tablet layout uses X+Y; desktop/mobile typically leave 0).
ALTER TABLE "PowerBannerCopy" ADD COLUMN IF NOT EXISTS "titleOffsetX" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "PowerBannerCopy" ADD COLUMN IF NOT EXISTS "bodyOffsetX" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "PowerBannerCopy" ADD COLUMN IF NOT EXISTS "ctaOffsetX" INTEGER NOT NULL DEFAULT 0;
