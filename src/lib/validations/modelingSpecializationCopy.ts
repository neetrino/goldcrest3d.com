import { z } from "zod";

import {
  MODELING_COPY_OFFSET_Y_MAX_PCT,
  MODELING_COPY_OFFSET_Y_MIN_PCT,
  MODELING_TABLET_COPY_OFFSET_MAX_PCT,
  MODELING_TABLET_COPY_OFFSET_MIN_PCT,
} from "@/constants/modeling-specialization-copy-offset";
import {
  MODELING_MOBILE_PREVIEW_BODY_FONT_PX_MAX,
  MODELING_MOBILE_PREVIEW_BODY_FONT_PX_MIN,
  MODELING_MOBILE_PREVIEW_TITLE_FONT_PX_MAX,
  MODELING_MOBILE_PREVIEW_TITLE_FONT_PX_MIN,
} from "@/constants/modeling-specialization-mobile-preview-font";
import {
  MODELING_TABLET_PREVIEW_BODY_FONT_PX_MAX,
  MODELING_TABLET_PREVIEW_BODY_FONT_PX_MIN,
  MODELING_TABLET_PREVIEW_TITLE_FONT_PX_MAX,
  MODELING_TABLET_PREVIEW_TITLE_FONT_PX_MIN,
} from "@/constants/modeling-specialization-tablet-preview-font";
import { MODELING_SLOT_KEYS } from "@/lib/site-media/site-media.registry";

const MAX_TITLE_LEN = 280;
const MAX_BODY_LEN = 4000;

const MODELING_SLOT_SET = new Set<string>(Object.values(MODELING_SLOT_KEYS));

/** Missing optional fields from FormData. */
function formDataOptionalString(raw: unknown): string {
  if (raw === null || raw === undefined) return "";
  return typeof raw === "string" ? raw : String(raw);
}

const tabletOffsetFieldWide = z.coerce
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

const tabletPreviewTitleFontPxField = z.coerce
  .number()
  .int("Tablet title size must be an integer.")
  .min(
    MODELING_TABLET_PREVIEW_TITLE_FONT_PX_MIN,
    `Tablet title size must be >= ${MODELING_TABLET_PREVIEW_TITLE_FONT_PX_MIN}px`,
  )
  .max(
    MODELING_TABLET_PREVIEW_TITLE_FONT_PX_MAX,
    `Tablet title size must be <= ${MODELING_TABLET_PREVIEW_TITLE_FONT_PX_MAX}px`,
  );

const tabletPreviewBodyFontPxField = z.coerce
  .number()
  .int("Tablet description size must be an integer.")
  .min(
    MODELING_TABLET_PREVIEW_BODY_FONT_PX_MIN,
    `Tablet description size must be >= ${MODELING_TABLET_PREVIEW_BODY_FONT_PX_MIN}px`,
  )
  .max(
    MODELING_TABLET_PREVIEW_BODY_FONT_PX_MAX,
    `Tablet description size must be <= ${MODELING_TABLET_PREVIEW_BODY_FONT_PX_MAX}px`,
  );
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

const mobilePreviewTitleFontPxField = z.coerce
  .number()
  .int("Title size must be an integer.")
  .min(
    MODELING_MOBILE_PREVIEW_TITLE_FONT_PX_MIN,
    `Title size must be >= ${MODELING_MOBILE_PREVIEW_TITLE_FONT_PX_MIN}px`,
  )
  .max(
    MODELING_MOBILE_PREVIEW_TITLE_FONT_PX_MAX,
    `Title size must be <= ${MODELING_MOBILE_PREVIEW_TITLE_FONT_PX_MAX}px`,
  );

const mobilePreviewBodyFontPxField = z.coerce
  .number()
  .int("Description size must be an integer.")
  .min(
    MODELING_MOBILE_PREVIEW_BODY_FONT_PX_MIN,
    `Description size must be >= ${MODELING_MOBILE_PREVIEW_BODY_FONT_PX_MIN}px`,
  )
  .max(
    MODELING_MOBILE_PREVIEW_BODY_FONT_PX_MAX,
    `Description size must be <= ${MODELING_MOBILE_PREVIEW_BODY_FONT_PX_MAX}px`,
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
  mobilePreviewTitleFontPx: mobilePreviewTitleFontPxField,
  mobilePreviewBodyFontPx: mobilePreviewBodyFontPxField,
  titleTablet: z.string().max(MAX_TITLE_LEN, `Tablet title max ${MAX_TITLE_LEN} chars`),
  bodyTablet: z.string().max(MAX_BODY_LEN, `Tablet description max ${MAX_BODY_LEN} chars`),
  titleTabletOffsetY: tabletOffsetFieldWide,
  bodyTabletOffsetY: tabletOffsetFieldWide,
  titleTabletOffsetX: tabletOffsetFieldWide,
  bodyTabletOffsetX: tabletOffsetFieldWide,
  tabletLine1Emphasis: z.preprocess(
    formDataOptionalString,
    z
      .string()
      .max(MAX_TITLE_LEN, `Tablet emphasized fragment max ${MAX_TITLE_LEN} chars`),
  ),
  tabletPreviewTitleFontPx: tabletPreviewTitleFontPxField,
  tabletPreviewBodyFontPx: tabletPreviewBodyFontPxField,
});
