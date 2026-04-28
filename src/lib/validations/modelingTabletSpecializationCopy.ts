import { z } from "zod";

import { MODELING_SLOT_KEYS } from "@/lib/site-media/site-media.registry";

const MAX_TITLE_LEN = 280;
const MAX_BODY_LEN = 4000;
const MIN_OFFSET_Y = -300;
const MAX_OFFSET_Y = 300;

const MODELING_SLOT_SET = new Set<string>(Object.values(MODELING_SLOT_KEYS));
const offsetField = z.coerce
  .number()
  .int("Offset must be an integer.")
  .min(MIN_OFFSET_Y, `Offset must be >= ${MIN_OFFSET_Y}`)
  .max(MAX_OFFSET_Y, `Offset must be <= ${MAX_OFFSET_Y}`);

export const modelingTabletSlotCopyFormSchema = z.object({
  slotKey: z
    .string()
    .refine((value) => MODELING_SLOT_SET.has(value), "Invalid slot."),
  titleTablet: z.string().max(MAX_TITLE_LEN, `Tablet title max ${MAX_TITLE_LEN} chars`),
  bodyTablet: z.string().max(MAX_BODY_LEN, `Tablet description max ${MAX_BODY_LEN} chars`),
  titleTabletOffsetY: offsetField,
  bodyTabletOffsetY: offsetField,
  tabletLine1Emphasis: z
    .string()
    .max(MAX_TITLE_LEN, `Tablet emphasized fragment max ${MAX_TITLE_LEN} chars`),
});
