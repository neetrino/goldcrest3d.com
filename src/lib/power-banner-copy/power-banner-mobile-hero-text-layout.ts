import { z } from "zod";

import {
  MODELING_TEXT_OVERLAY_POSITION_PCT_MAX,
  MODELING_TEXT_OVERLAY_POSITION_PCT_MIN,
  modelingTextOverlayLayoutSchema,
} from "@/lib/modeling-slot-copy/modeling-text-overlay-layout";

const layerSchema = z.object({
  xPct: z.number().min(MODELING_TEXT_OVERLAY_POSITION_PCT_MIN).max(MODELING_TEXT_OVERLAY_POSITION_PCT_MAX),
  yPct: z.number().min(MODELING_TEXT_OVERLAY_POSITION_PCT_MIN).max(MODELING_TEXT_OVERLAY_POSITION_PCT_MAX),
  fontSizePx: z.number().min(8).max(120),
});

/** `fontSizePx` on CTA controls button scale (16 ≈ 100% on the mobile hero). */
export const powerBannerMobileHeroTextLayoutSchema = z.object({
  title: layerSchema,
  body: layerSchema,
  cta: layerSchema,
});

export type PowerBannerMobileHeroTextLayout = z.infer<typeof powerBannerMobileHeroTextLayoutSchema>;

export const DEFAULT_POWER_BANNER_MOBILE_HERO_TEXT_LAYOUT: PowerBannerMobileHeroTextLayout = {
  title: { xPct: 50, yPct: 36, fontSizePx: 30 },
  body: { xPct: 50, yPct: 62, fontSizePx: 16 },
  cta: { xPct: 50, yPct: 88, fontSizePx: 16 },
};

const DEFAULT_CTA = DEFAULT_POWER_BANNER_MOBILE_HERO_TEXT_LAYOUT.cta;

/**
 * Parses saved JSON; merges legacy 2-layer payloads (title + body only) with default CTA.
 */
export function parsePowerBannerMobileHeroTextLayout(
  raw: unknown | null | undefined,
): PowerBannerMobileHeroTextLayout | null {
  if (raw === null || raw === undefined) {
    return null;
  }
  const full = powerBannerMobileHeroTextLayoutSchema.safeParse(raw);
  if (full.success) {
    return full.data;
  }
  const legacy = modelingTextOverlayLayoutSchema.safeParse(raw);
  if (legacy.success) {
    return {
      ...legacy.data,
      cta: { ...DEFAULT_CTA },
    };
  }
  return null;
}

export function clampPowerBannerMobileHeroTextLayout(
  layout: PowerBannerMobileHeroTextLayout,
): PowerBannerMobileHeroTextLayout {
  const clampLayer = (l: PowerBannerMobileHeroTextLayout["title"]) => ({
    xPct: Math.min(MODELING_TEXT_OVERLAY_POSITION_PCT_MAX, Math.max(MODELING_TEXT_OVERLAY_POSITION_PCT_MIN, l.xPct)),
    yPct: Math.min(MODELING_TEXT_OVERLAY_POSITION_PCT_MAX, Math.max(MODELING_TEXT_OVERLAY_POSITION_PCT_MIN, l.yPct)),
    fontSizePx: Math.min(120, Math.max(8, l.fontSizePx)),
  });
  return {
    title: clampLayer(layout.title),
    body: clampLayer(layout.body),
    cta: clampLayer(layout.cta),
  };
}

export type PowerBannerMobileHeroOverlayLayerKey = keyof PowerBannerMobileHeroTextLayout;
