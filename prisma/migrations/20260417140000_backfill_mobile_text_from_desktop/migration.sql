-- One-time backfill: rows that previously relied on null mobile fields (runtime fallback to desktop)
-- get explicit mobile text so published content stays unchanged after decoupling.
UPDATE "ModelingSlotCopy"
SET
  "titleMobile" = COALESCE("titleMobile", "title"),
  "bodyMobile" = COALESCE("bodyMobile", "body")
WHERE "titleMobile" IS NULL OR "bodyMobile" IS NULL;

UPDATE "PowerBannerCopy"
SET
  "titleMobile" = COALESCE("titleMobile", "title"),
  "bodyMobile" = COALESCE("bodyMobile", "body")
WHERE "titleMobile" IS NULL OR "bodyMobile" IS NULL;
