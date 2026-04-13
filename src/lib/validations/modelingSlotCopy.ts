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

const heroBannerBodyField = (fieldLabel: string) =>
  z
    .string()
    .max(
      HERO_BANNER_BODY_MAX_STORAGE_CHARS,
      `${fieldLabel} must be at most ${HERO_BANNER_BODY_MAX_STORAGE_CHARS} characters (including markup).`,
    )
    .transform((s) => s.trim())
    .superRefine((val, ctx) => {
      const len = getHeroBannerBodyPlainTextLength(val);
      if (len === 0) {
        ctx.addIssue({
          code: "custom",
          message: `${fieldLabel} is required.`,
        });
      }
      if (len > HERO_BANNER_BODY_MAX_PLAIN_TEXT_CHARS) {
        ctx.addIssue({
          code: "custom",
          message: `${fieldLabel} must be at most ${HERO_BANNER_BODY_MAX_PLAIN_TEXT_CHARS} characters of text.`,
        });
      }
    });

const optionalMobileBodyField = z
  .string()
  .max(
    HERO_BANNER_BODY_MAX_STORAGE_CHARS,
    `Mobile description must be at most ${HERO_BANNER_BODY_MAX_STORAGE_CHARS} characters (including markup).`,
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
        message: `Mobile description must be at most ${HERO_BANNER_BODY_MAX_PLAIN_TEXT_CHARS} characters of text.`,
      });
    }
  });

export const modelingSlotCopyFormSchema = z.object({
  slotKey: z
    .string()
    .refine((k): k is ModelingSlotKey => ORDERED_SLOT_KEY_SET.has(k), "Invalid slot."),
  title: z
    .string()
    .max(MAX_TITLE_LEN, `Title must be at most ${MAX_TITLE_LEN} characters`)
    .transform((s) => s.trim())
    .refine((s) => s.length > 0, "Title is required."),
  body: heroBannerBodyField("Desktop / tablet description"),
  bodyMobile: optionalMobileBodyField,
});
