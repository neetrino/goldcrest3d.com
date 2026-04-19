import { z } from "zod";

import { MANUFACTURING_SPECIALIZATION_ITEMS } from "@/constants/manufacturing-specialization";
import { MANUFACTURING_SECTION_COPY_KEYS } from "@/lib/manufacturing-intelligence-copy/manufacturing-intelligence-copy.keys";

const MAX_TITLE_LEN = 280;
const MAX_DESCRIPTION_LEN = 4000;
const MAX_ALT_LEN = 280;

const MANUFACTURING_ITEM_SET = new Set<string>(
  MANUFACTURING_SPECIALIZATION_ITEMS.map((item) => item.id),
);

const numberField = (label: string) =>
  z.coerce.number().refine((value) => Number.isFinite(value), `${label} must be a number.`);

export const manufacturingIntelligenceItemFormSchema = z.object({
  itemId: z
    .string()
    .refine((value) => MANUFACTURING_ITEM_SET.has(value), "Invalid manufacturing item."),
  title: z.string().max(MAX_TITLE_LEN, `Title max ${MAX_TITLE_LEN} chars`),
  description: z
    .string()
    .max(MAX_DESCRIPTION_LEN, `Description max ${MAX_DESCRIPTION_LEN} chars`),
  imageAlt: z.string().max(MAX_ALT_LEN, `Image alt max ${MAX_ALT_LEN} chars`),
  zoom: numberField("Zoom").min(0.5).max(2.5),
  offsetX: numberField("Horizontal offset").min(-400).max(400),
  offsetY: numberField("Vertical offset").min(-400).max(400),
});

export const manufacturingIntelligenceHeadingFormSchema = z.object({
  desktopHeading: z.string().max(MAX_TITLE_LEN, `Desktop heading max ${MAX_TITLE_LEN} chars`),
  mobileHeading: z.string().max(MAX_TITLE_LEN, `Mobile heading max ${MAX_TITLE_LEN} chars`),
  desktopHeadingKey: z.literal(MANUFACTURING_SECTION_COPY_KEYS.HEADING_DESKTOP),
  mobileHeadingKey: z.literal(MANUFACTURING_SECTION_COPY_KEYS.HEADING_MOBILE),
});
