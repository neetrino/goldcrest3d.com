-- Tablet copy for portrait modeling card: explicit line breaks + blank line between stanzas (avoids 155px-era reflow).
UPDATE "ModelingSpecializationCopy"
SET
    "bodyTablet" = $copy$
Advanced pavé and fine-setting
structures developed with
micron-level precision.

Invisible settings and ultra-thin
tolerances engineered with
strict structural discipline.
$copy$,
    "updatedAt" = NOW()
WHERE "slotKey" = 'portrait';
