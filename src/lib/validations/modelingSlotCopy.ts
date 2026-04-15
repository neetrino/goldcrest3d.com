import { z } from "zod";

import {
  HERO_BANNER_BODY_MAX_PLAIN_TEXT_CHARS,
  HERO_BANNER_BODY_MAX_STORAGE_CHARS,
} from "@/lib/power-banner-copy/hero-banner-body-constants";
import { getHeroBannerBodyPlainTextLength } from "@/lib/power-banner-copy/hero-banner-body-plain-text-length";
import { modelingTextOverlayLayoutSchema } from "@/lib/modeling-slot-copy/modeling-text-overlay-layout";
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

const optionalMobileTitleField = z
  .string()
  .max(MAX_TITLE_LEN, `Mobile title must be at most ${MAX_TITLE_LEN} characters`)
  .transform((s) => s.trim());

const optionalMobileBodyField = optionalHeroBannerRichBodyField("Mobile description");

type ParsedTextLayout = z.infer<typeof modelingTextOverlayLayoutSchema>;

function parseTextLayoutFromForm(
  raw: string | undefined,
): { ok: true; value: ParsedTextLayout } | { ok: false; message: string } {
  const trimmed = raw?.trim() ?? "";
  if (trimmed === "") {
    return {
      ok: false,
      message: "Text layout is required when custom overlay is enabled.",
    };
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed) as unknown;
  } catch {
    return { ok: false, message: "Text layout must be valid JSON." };
  }
  const result = modelingTextOverlayLayoutSchema.safeParse(parsed);
  if (!result.success) {
    return {
      ok: false,
      message: result.error.issues[0]?.message ?? "Invalid text layout shape.",
    };
  }
  return { ok: true, value: result.data };
}

export const modelingSlotCopyFormSchema = z
  .object({
    slotKey: z
      .string()
      .refine((k): k is ModelingSlotKey => ORDERED_SLOT_KEY_SET.has(k), "Invalid slot."),
    title: z
      .string()
      .max(MAX_TITLE_LEN, `Title must be at most ${MAX_TITLE_LEN} characters`)
      .transform((s) => s.trim()),
    titleMobile: optionalMobileTitleField,
    body: optionalHeroBannerRichBodyField("Desktop / tablet description"),
    bodyMobile: optionalMobileBodyField,
    useCustomTextLayout: z.enum(["0", "1"]).default("0"),
    textLayoutDesktop: z.string().optional().default(""),
    textLayoutMobile: z.string().optional().default(""),
  })
  .superRefine((data, ctx) => {
    if (data.useCustomTextLayout !== "1") {
      return;
    }
    const desktop = parseTextLayoutFromForm(data.textLayoutDesktop);
    if (!desktop.ok) {
      ctx.addIssue({
        code: "custom",
        message: desktop.message,
        path: ["textLayoutDesktop"],
      });
    }
    const mobile = parseTextLayoutFromForm(data.textLayoutMobile);
    if (!mobile.ok) {
      ctx.addIssue({
        code: "custom",
        message: mobile.message,
        path: ["textLayoutMobile"],
      });
    }
  });
