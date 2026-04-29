-- Desktop title/body horizontal shift (translateX % of text box), separate from tablet offsets.
ALTER TABLE "ModelingSpecializationCopy"
ADD COLUMN "titleDesktopOffsetX" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "bodyDesktopOffsetX" INTEGER NOT NULL DEFAULT 0;
