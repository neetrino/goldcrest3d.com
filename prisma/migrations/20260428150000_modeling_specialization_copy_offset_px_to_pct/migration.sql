-- Modeling specialization copy offsets were pixel ints (-300..300); store as CSS percentage (-100..100).
-- Linear map: round(px / 3), clamped (±300px → ±100%).
UPDATE "ModelingSpecializationCopy"
SET
  "titleDesktopOffsetY" = GREATEST(-100, LEAST(100, ROUND("titleDesktopOffsetY"::numeric / 3))),
  "titleMobileOffsetY" = GREATEST(-100, LEAST(100, ROUND("titleMobileOffsetY"::numeric / 3))),
  "bodyDesktopOffsetY" = GREATEST(-100, LEAST(100, ROUND("bodyDesktopOffsetY"::numeric / 3))),
  "bodyMobileOffsetY" = GREATEST(-100, LEAST(100, ROUND("bodyMobileOffsetY"::numeric / 3))),
  "titleTabletOffsetY" = GREATEST(-100, LEAST(100, ROUND("titleTabletOffsetY"::numeric / 3))),
  "bodyTabletOffsetY" = GREATEST(-100, LEAST(100, ROUND("bodyTabletOffsetY"::numeric / 3)));
