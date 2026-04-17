import { z } from "zod";

/** Per-layer image framing — used in SiteMediaItem.layoutMeta and Manager2. */
export const visualLayerLayoutSchema = z.object({
  offsetX: z.number().default(0),
  offsetY: z.number().default(0),
  scale: z.number().default(1),
  objectPosition: z.string().optional(),
});

export type VisualLayerLayout = z.infer<typeof visualLayerLayoutSchema>;

export const heroSlideLayoutMetaSchema = z.object({
  desktop: visualLayerLayoutSchema.optional(),
  mobile: visualLayerLayoutSchema.optional(),
  text: z
    .object({
      offsetX: z.number().default(0),
      offsetY: z.number().default(0),
    })
    .optional(),
});

export type HeroSlideLayoutMeta = z.infer<typeof heroSlideLayoutMetaSchema>;

export function parseHeroSlideLayoutMeta(
  raw: unknown,
): HeroSlideLayoutMeta | null {
  const r = heroSlideLayoutMetaSchema.safeParse(raw);
  return r.success ? r.data : null;
}

export const imageFrameLayoutSchema = z.object({
  offsetX: z.number().default(0),
  offsetY: z.number().default(0),
  scale: z.number().default(1),
});

export type ImageFrameLayout = z.infer<typeof imageFrameLayoutSchema>;

export function parseImageFrameLayout(raw: unknown): ImageFrameLayout | null {
  const r = imageFrameLayoutSchema.safeParse(raw);
  return r.success ? r.data : null;
}
