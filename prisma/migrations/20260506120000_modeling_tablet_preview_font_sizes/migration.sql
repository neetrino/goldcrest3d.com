-- Modeling Specialization: CMS tablet (768px–1023px) title/body font sizes per slot.
ALTER TABLE "ModelingSpecializationCopy" ADD COLUMN "tabletPreviewTitleFontPx" INTEGER NOT NULL DEFAULT 32;
ALTER TABLE "ModelingSpecializationCopy" ADD COLUMN "tabletPreviewBodyFontPx" INTEGER NOT NULL DEFAULT 14;
