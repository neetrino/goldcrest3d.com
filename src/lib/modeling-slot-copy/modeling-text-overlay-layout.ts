import { z } from "zod";

const layerSchema = z.object({
  xPct: z.number().min(0).max(100),
  yPct: z.number().min(0).max(100),
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

/**
 * Custom overlay mode applies only when both breakpoints have a saved layout (matches live site).
 */
export function hasCustomModelingTextLayout(
  desktop: ModelingTextOverlayLayout | null | undefined,
  mobile: ModelingTextOverlayLayout | null | undefined,
): boolean {
  return desktop != null && mobile != null;
}

export function clampModelingTextOverlayLayout(
  layout: ModelingTextOverlayLayout,
): ModelingTextOverlayLayout {
  const clampLayer = (l: ModelingTextOverlayLayout["title"]) => ({
    xPct: Math.min(100, Math.max(0, l.xPct)),
    yPct: Math.min(100, Math.max(0, l.yPct)),
    fontSizePx: Math.min(120, Math.max(8, l.fontSizePx)),
  });
  return {
    title: clampLayer(layout.title),
    body: clampLayer(layout.body),
  };
}
