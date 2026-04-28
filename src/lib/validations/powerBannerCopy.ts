import { z } from "zod";

import {
  POWER_BANNER_KEY_SET,
  POWER_BANNER_VIEWPORT_SET,
} from "@/lib/power-banner-copy/power-banner-keys";
import {
  POWER_BANNER_MOBILE_TEXT_CTA_OFFSET_MAX,
  POWER_BANNER_MOBILE_TEXT_CTA_OFFSET_MIN,
} from "@/lib/power-banner-copy/power-banner-copy-offsets.constants";

const MAX_TITLE_LEN = 280;
const MAX_BODY_LEN = 4000;
const MAX_ALT_LEN = 280;

function normalizeMultilineValue(value: string): string {
  return value.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

const numberField = (label: string) =>
  z.coerce.number().refine((value) => Number.isFinite(value), `${label} must be a number.`);

const optionalPxOffset = z.preprocess((raw) => {
  if (raw === "" || raw === null || raw === undefined) return 0;
  const n = Number(raw);
  return Number.isFinite(n) ? Math.round(n) : 0;
}, z.number().int().min(POWER_BANNER_MOBILE_TEXT_CTA_OFFSET_MIN).max(POWER_BANNER_MOBILE_TEXT_CTA_OFFSET_MAX));

export const powerBannerCopyFormSchema = z.object({
  bannerKey: z
    .string()
    .refine((k) => POWER_BANNER_KEY_SET.has(k), "Invalid banner."),
  viewport: z
    .string()
    .refine((v) => POWER_BANNER_VIEWPORT_SET.has(v), "Invalid viewport."),
  title: z
    .string()
    .max(MAX_TITLE_LEN, `Title must be at most ${MAX_TITLE_LEN} characters`)
    .transform((s) => s.trim()),
  body: z
    .string()
    .max(MAX_BODY_LEN, `Description must be at most ${MAX_BODY_LEN} characters`)
    .transform((s) => normalizeMultilineValue(s).trim()),
  titleOffsetY: optionalPxOffset,
  bodyOffsetY: optionalPxOffset,
  ctaOffsetY: optionalPxOffset,
});

export const powerBannerTransformFormSchema = z.object({
  bannerKey: z
    .string()
    .refine((k) => POWER_BANNER_KEY_SET.has(k), "Invalid banner."),
  viewport: z
    .string()
    .refine((v) => POWER_BANNER_VIEWPORT_SET.has(v), "Invalid viewport."),
  imageAlt: z
    .string()
    .max(MAX_ALT_LEN, `Image alt must be at most ${MAX_ALT_LEN} characters`)
    .transform((s) => s.trim()),
  zoom: numberField("Zoom").min(0.5).max(2.5),
  offsetX: numberField("Horizontal offset").min(-400).max(400),
  offsetY: numberField("Vertical offset").min(-400).max(400),
});
