import { z } from "zod";

/** Keys for title/body overlay layers in the modeling text overlay editor. */
export type ModelingOverlayLayerKey = "title" | "body";

/** Wider than 0–100 so layers can extend past the image frame (matches editor drag overflow). */
export const MODELING_TEXT_OVERLAY_POSITION_PCT_MIN = -30;
export const MODELING_TEXT_OVERLAY_POSITION_PCT_MAX = 130;

const layerSchema = z.object({
  xPct: z.number().min(MODELING_TEXT_OVERLAY_POSITION_PCT_MIN).max(MODELING_TEXT_OVERLAY_POSITION_PCT_MAX),
  yPct: z.number().min(MODELING_TEXT_OVERLAY_POSITION_PCT_MIN).max(MODELING_TEXT_OVERLAY_POSITION_PCT_MAX),
  fontSizePx: z.number().min(8).max(120),
});

export const modelingTextOverlayLayoutSchema = z.object({
  title: layerSchema,
  body: layerSchema,
});

export type ModelingTextOverlayLayout = z.infer<typeof modelingTextOverlayLayoutSchema>;

export const DEFAULT_MODELING_TEXT_OVERLAY_LAYOUT_DESKTOP: ModelingTextOverlayLayout = {
  title: { xPct: 50, yPct: 24, fontSizePx: 32 },
  body: { xPct: 50, yPct: 58, fontSizePx: 14 },
};

export const DEFAULT_MODELING_TEXT_OVERLAY_LAYOUT_MOBILE: ModelingTextOverlayLayout = {
  title: { xPct: 50, yPct: 30, fontSizePx: 20 },
  body: { xPct: 50, yPct: 64, fontSizePx: 12 },
};

export function parseModelingTextOverlayLayout(
  raw: unknown | null | undefined,
): ModelingTextOverlayLayout | null {
  if (raw === null || raw === undefined) {
    return null;
  }
  const parsed = modelingTextOverlayLayoutSchema.safeParse(raw);
  return parsed.success ? parsed.data : null;
}

export function clampModelingTextOverlayLayout(
  layout: ModelingTextOverlayLayout,
): ModelingTextOverlayLayout {
  const clampLayer = (l: ModelingTextOverlayLayout["title"]) => ({
    xPct: Math.min(MODELING_TEXT_OVERLAY_POSITION_PCT_MAX, Math.max(MODELING_TEXT_OVERLAY_POSITION_PCT_MIN, l.xPct)),
    yPct: Math.min(MODELING_TEXT_OVERLAY_POSITION_PCT_MAX, Math.max(MODELING_TEXT_OVERLAY_POSITION_PCT_MIN, l.yPct)),
    fontSizePx: Math.min(120, Math.max(8, l.fontSizePx)),
  });
  return {
    title: clampLayer(layout.title),
    body: clampLayer(layout.body),
  };
}
