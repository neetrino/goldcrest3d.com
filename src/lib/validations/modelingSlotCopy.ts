import { z } from "zod";

import {
  HERO_BANNER_BODY_MAX_PLAIN_TEXT_CHARS,
  HERO_BANNER_BODY_MAX_STORAGE_CHARS,
} from "@/lib/power-banner-copy/hero-banner-body-constants";
import { getHeroBannerBodyPlainTextLength } from "@/lib/power-banner-copy/hero-banner-body-plain-text-length";
import { ORDERED_MODELING_SLOT_KEYS } from "@/lib/site-media/site-media.registry";
import type { ModelingSlotKey } from "@/lib/site-media/site-media.registry";

const MAX_TITLE_LEN = 280;

const ORDERED_SLOT_KEY_SET = new Set<string>(ORDERED_MODELING_SLOT_KEYS);

/** Allows empty stored copy; when non-empty, enforces hero sanitizer size limits (plain + storage). */
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

export const modelingSlotCopyFormSchema = z
  .object({
    slotKey: z
      .string()
      .refine((k): k is ModelingSlotKey => ORDERED_SLOT_KEY_SET.has(k), "Invalid slot."),
    variant: z.enum(["desktop", "mobile"]),
    title: z
      .string()
      .max(MAX_TITLE_LEN, `Title must be at most ${MAX_TITLE_LEN} characters`),
    body: optionalHeroBannerRichBodyField("Description"),
  });
