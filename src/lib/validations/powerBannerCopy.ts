import { z } from "zod";

import {
  HERO_BANNER_BODY_MAX_PLAIN_TEXT_CHARS,
  HERO_BANNER_BODY_MAX_STORAGE_CHARS,
} from "@/lib/power-banner-copy/hero-banner-body-constants";
import { getHeroBannerBodyPlainTextLength } from "@/lib/power-banner-copy/hero-banner-body-plain-text-length";
import { POWER_BANNER_KEY_SET } from "@/lib/power-banner-copy/power-banner-keys";
import type { PowerBannerKey } from "@/lib/power-banner-copy/power-banner-keys";
import { powerBannerMobileHeroTextLayoutSchema } from "@/lib/power-banner-copy/power-banner-mobile-hero-text-layout";
import { parseCanvasRichTextDocumentJson } from "@/lib/canvas-rich-text/canvas-rich-text-document";

const MAX_TITLE_LEN = 280;

export const powerBannerCopyFormSchema = z.object({
  bannerKey: z
    .string()
    .refine((k): k is PowerBannerKey => POWER_BANNER_KEY_SET.has(k), "Invalid banner."),
  title: z
    .string()
    .max(MAX_TITLE_LEN, `Title must be at most ${MAX_TITLE_LEN} characters`)
    .transform((s) => s.trim())
    .refine((s) => s.length > 0, "Title is required."),
  body: z
    .string()
    .max(
      HERO_BANNER_BODY_MAX_STORAGE_CHARS,
      `Description must be at most ${HERO_BANNER_BODY_MAX_STORAGE_CHARS} characters (including markup).`,
    )
    .transform((s) => s.trim())
    .superRefine((val, ctx) => {
      const len = getHeroBannerBodyPlainTextLength(val);
      if (len === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Description is required.",
        });
      }
      if (len > HERO_BANNER_BODY_MAX_PLAIN_TEXT_CHARS) {
        ctx.addIssue({
          code: "custom",
          message: `Description must be at most ${HERO_BANNER_BODY_MAX_PLAIN_TEXT_CHARS} characters of text.`,
        });
      }
    }),
  bodyDoc: z.string().optional(),
}).superRefine((data, ctx) => {
  if (!data.bodyDoc) {
    return;
  }
  if (!parseCanvasRichTextDocumentJson(data.bodyDoc)) {
    ctx.addIssue({
      code: "custom",
      path: ["bodyDoc"],
      message: "Invalid canvas rich text payload.",
    });
  }
});

function optionalHeroBannerRichBodyField(fieldLabel: string) {
  return z
    .string()
    .max(
      HERO_BANNER_BODY_MAX_STORAGE_CHARS,
      `${fieldLabel} must be at most ${HERO_BANNER_BODY_MAX_STORAGE_CHARS} characters (including markup).`,
    )
    .transform((s) => s.trim())
    .superRefine((val, ctx) => {
      if (val.length === 0) {
        return;
      }
      const len = getHeroBannerBodyPlainTextLength(val);
      if (len > HERO_BANNER_BODY_MAX_PLAIN_TEXT_CHARS) {
        ctx.addIssue({
          code: "custom",
          message: `${fieldLabel} must be at most ${HERO_BANNER_BODY_MAX_PLAIN_TEXT_CHARS} characters of text.`,
        });
      }
    });
}

export const powerBannerMobileCopyFormSchema = z
  .object({
    bannerKey: z
      .string()
      .refine((k): k is PowerBannerKey => POWER_BANNER_KEY_SET.has(k), "Invalid banner."),
    mobileTitle: z
      .string()
      .max(MAX_TITLE_LEN, `Mobile title must be at most ${MAX_TITLE_LEN} characters`)
      .transform((s) => s.trim()),
    mobileBody: optionalHeroBannerRichBodyField("Mobile description"),
    mobileBodyDoc: z.string().optional(),
    useHeroVisualTextLayout: z.enum(["0", "1"]).optional(),
    heroTextLayoutMobile: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.mobileBodyDoc && !parseCanvasRichTextDocumentJson(data.mobileBodyDoc)) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid mobile canvas rich text payload.",
        path: ["mobileBodyDoc"],
      });
    }
    if (data.useHeroVisualTextLayout !== "1") {
      return;
    }
    const raw = data.heroTextLayoutMobile?.trim() ?? "";
    if (raw.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Visual text layout is enabled but layout data is missing.",
        path: ["heroTextLayoutMobile"],
      });
      return;
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw) as unknown;
    } catch {
      ctx.addIssue({
        code: "custom",
        message: "Invalid visual layout JSON.",
        path: ["heroTextLayoutMobile"],
      });
      return;
    }
    const layout = powerBannerMobileHeroTextLayoutSchema.safeParse(parsed);
    if (!layout.success) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid visual layout values.",
        path: ["heroTextLayoutMobile"],
      });
    }
  });
