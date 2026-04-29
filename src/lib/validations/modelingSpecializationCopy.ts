import { z } from "zod";

import {
  MODELING_COPY_OFFSET_Y_MAX_PCT,
  MODELING_COPY_OFFSET_Y_MIN_PCT,
  MODELING_TABLET_COPY_OFFSET_MAX_PCT,
  MODELING_TABLET_COPY_OFFSET_MIN_PCT,
} from "@/constants/modeling-specialization-copy-offset";
import { MODELING_SLOT_KEYS } from "@/lib/site-media/site-media.registry";

const MAX_TITLE_LEN = 280;
const MAX_BODY_LEN = 4000;

const MODELING_SLOT_SET = new Set<string>(Object.values(MODELING_SLOT_KEYS));
const offsetField = z.coerce
  .number()
  .int("Offset must be an integer.")
  .min(MODELING_COPY_OFFSET_Y_MIN_PCT, `Offset must be >= ${MODELING_COPY_OFFSET_Y_MIN_PCT}`)
  .max(MODELING_COPY_OFFSET_Y_MAX_PCT, `Offset must be <= ${MODELING_COPY_OFFSET_Y_MAX_PCT}`);

/** Desktop/mobile title/body horizontal: same numeric range as tablet offsets (translateX %). */
const wideRangeCopyOffsetXField = z.coerce
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

export const modelingSpecializationCopyFormSchema = z.object({
  slotKey: z
    .string()
    .refine((value) => MODELING_SLOT_SET.has(value), "Invalid slot."),
  titleDesktop: z.string().max(MAX_TITLE_LEN, `Desktop title max ${MAX_TITLE_LEN} chars`),
  titleMobile: z.string().max(MAX_TITLE_LEN, `Mobile title max ${MAX_TITLE_LEN} chars`),
  bodyDesktop: z.string().max(MAX_BODY_LEN, `Desktop description max ${MAX_BODY_LEN} chars`),
  bodyMobile: z.string().max(MAX_BODY_LEN, `Mobile description max ${MAX_BODY_LEN} chars`),
  titleDesktopOffsetY: offsetField,
  titleMobileOffsetY: offsetField,
  bodyDesktopOffsetY: offsetField,
  bodyMobileOffsetY: offsetField,
  titleDesktopOffsetX: wideRangeCopyOffsetXField,
  bodyDesktopOffsetX: wideRangeCopyOffsetXField,
  titleMobileOffsetX: wideRangeCopyOffsetXField,
  bodyMobileOffsetX: wideRangeCopyOffsetXField,
  desktopLine1Emphasis: z
    .string()
    .max(MAX_TITLE_LEN, `Desktop emphasized fragment max ${MAX_TITLE_LEN} chars`),
});
