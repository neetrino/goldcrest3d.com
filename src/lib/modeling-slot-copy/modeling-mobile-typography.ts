import { MODELING_SLOT_KEYS, type ModelingSlotKey } from "@/lib/site-media/site-media.registry";

const MODELING_MOBILE_FONT_MIN_PX = 8;
const MODELING_MOBILE_FONT_MAX_PX = 120;

type ModelingMobileTypography = {
  titleFontSizePx: number;
  bodyFontSizePx: number;
};

const DEFAULT_MODELING_MOBILE_TYPOGRAPHY: ModelingMobileTypography = {
  titleFontSizePx: 20,
  bodyFontSizePx: 12,
};

const MODELING_MOBILE_TYPOGRAPHY_BY_SLOT: Record<ModelingSlotKey, ModelingMobileTypography> = {
  [MODELING_SLOT_KEYS.HIP_HOP]: DEFAULT_MODELING_MOBILE_TYPOGRAPHY,
  [MODELING_SLOT_KEYS.BRIDAL]: DEFAULT_MODELING_MOBILE_TYPOGRAPHY,
  [MODELING_SLOT_KEYS.PORTRAIT]: DEFAULT_MODELING_MOBILE_TYPOGRAPHY,
  [MODELING_SLOT_KEYS.MECHANICAL]: DEFAULT_MODELING_MOBILE_TYPOGRAPHY,
  [MODELING_SLOT_KEYS.HERITAGE]: DEFAULT_MODELING_MOBILE_TYPOGRAPHY,
  [MODELING_SLOT_KEYS.HIGH_JEWELRY]: {
    titleFontSizePx: 18,
    bodyFontSizePx: 11,
  },
};

function clampModelingMobileFontSizePx(value: number): number {
  return Math.min(MODELING_MOBILE_FONT_MAX_PX, Math.max(MODELING_MOBILE_FONT_MIN_PX, value));
}

export function resolveModelingMobileFontSizePx(
  value: number | null | undefined,
  fallbackPx: number,
): number {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return clampModelingMobileFontSizePx(fallbackPx);
  }
  return clampModelingMobileFontSizePx(value);
}

export function getDefaultModelingMobileTypographyForSlot(
  slotKey: ModelingSlotKey,
): ModelingMobileTypography {
  return MODELING_MOBILE_TYPOGRAPHY_BY_SLOT[slotKey];
}
