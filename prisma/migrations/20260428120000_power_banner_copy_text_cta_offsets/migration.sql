-- Mobile hero banner vertical nudge for title+description block and CTA (px). Desktop rows keep 0.
ALTER TABLE "PowerBannerCopy"
ADD COLUMN "textOffsetY" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "ctaOffsetY" INTEGER NOT NULL DEFAULT 0;
