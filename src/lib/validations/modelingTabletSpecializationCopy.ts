import { z } from "zod";

import {
  MODELING_TABLET_COPY_OFFSET_MAX_PCT,
  MODELING_TABLET_COPY_OFFSET_MIN_PCT,
} from "@/constants/modeling-specialization-copy-offset";
import { MODELING_SLOT_KEYS } from "@/lib/site-media/site-media.registry";

const MAX_TITLE_LEN = 280;
const MAX_BODY_LEN = 4000;

const MODELING_SLOT_SET = new Set<string>(Object.values(MODELING_SLOT_KEYS));
const tabletOffsetField = z.coerce
  .number()
  .int("Offset must be an integer.")
  .min(
    MODELING_TABLET_COPY_OFFSET_MIN_PCT,
    `Offset must be >= ${MODELING_TABLET_COPY_OFFSET_MIN_PCT}`,
  )
  .max(
    MODELING_TABLET_COPY_OFFSET_MAX_PCT,
    `Offset must be <= ${MODELING_TABLET_COPY_OFFSET_MAX_PCT}`,
  );

/** Missing form fields (e.g. optional emphasis input not rendered) arrive as `null` from FormData. */
function formDataOptionalString(raw: unknown): string {
  if (raw === null || raw === undefined) return "";
  return typeof raw === "string" ? raw : String(raw);
}

export const modelingTabletSlotCopyFormSchema = z.object({
  slotKey: z
    .string()
    .refine((value) => MODELING_SLOT_SET.has(value), "Invalid slot."),
  titleTablet: z.string().max(MAX_TITLE_LEN, `Tablet title max ${MAX_TITLE_LEN} chars`),
  bodyTablet: z.string().max(MAX_BODY_LEN, `Tablet description max ${MAX_BODY_LEN} chars`),
  titleTabletOffsetY: tabletOffsetField,
  bodyTabletOffsetY: tabletOffsetField,
  titleTabletOffsetX: tabletOffsetField,
  bodyTabletOffsetX: tabletOffsetField,
  tabletLine1Emphasis: z.preprocess(
    formDataOptionalString,
    z
      .string()
      .max(MAX_TITLE_LEN, `Tablet emphasized fragment max ${MAX_TITLE_LEN} chars`),
  ),
});
