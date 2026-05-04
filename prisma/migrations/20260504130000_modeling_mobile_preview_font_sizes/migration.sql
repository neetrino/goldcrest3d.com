-- Admin Media Manager: per-slot mobile live preview font sizes (not used on public landing).
ALTER TABLE "ModelingSpecializationCopy" ADD COLUMN "mobilePreviewTitleFontPx" INTEGER NOT NULL DEFAULT 16;
ALTER TABLE "ModelingSpecializationCopy" ADD COLUMN "mobilePreviewBodyFontPx" INTEGER NOT NULL DEFAULT 14;
