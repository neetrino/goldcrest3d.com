import { z } from "zod";

import {
  HERO_BANNER_BODY_MAX_PLAIN_TEXT_CHARS,
  HERO_BANNER_BODY_MAX_STORAGE_CHARS,
} from "@/lib/power-banner-copy/hero-banner-body-constants";
import { getHeroBannerBodyPlainTextLength } from "@/lib/power-banner-copy/hero-banner-body-plain-text-length";

const MAX_TITLE_LEN = 280;

export const manufacturingIntelligenceCopyFormSchema = z.object({
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
      if (len > HERO_BANNER_BODY_MAX_PLAIN_TEXT_CHARS) {
        ctx.addIssue({
          code: "custom",
          message: `Description must be at most ${HERO_BANNER_BODY_MAX_PLAIN_TEXT_CHARS} characters of text.`,
        });
      }
    }),
});
