import { z } from "zod";

const MAX_TITLE_LEN = 280;
const MAX_TEXT_LEN = 4000;
const MAX_STAT_VALUE_LEN = 64;
const MAX_STAT_CAPTION_LEN = 280;
const MAX_ALT_LEN = 280;

const numberField = (label: string) =>
  z.coerce.number().refine((value) => Number.isFinite(value), `${label} must be a number.`);

export const founderSectionFormSchema = z.object({
  heading: z.string().max(MAX_TITLE_LEN, `Heading max ${MAX_TITLE_LEN} chars`),
  name: z.string().max(MAX_TITLE_LEN, `Name max ${MAX_TITLE_LEN} chars`),
  bioP1: z.string().max(MAX_TEXT_LEN, `Paragraph max ${MAX_TEXT_LEN} chars`),
  bioP2: z.string().max(MAX_TEXT_LEN, `Paragraph max ${MAX_TEXT_LEN} chars`),
  bioP3: z.string().max(MAX_TEXT_LEN, `Paragraph max ${MAX_TEXT_LEN} chars`),
  bioP4: z.string().max(MAX_TEXT_LEN, `Paragraph max ${MAX_TEXT_LEN} chars`),
  yearsValue: z.string().max(MAX_STAT_VALUE_LEN, `Stat value max ${MAX_STAT_VALUE_LEN} chars`),
  yearsCaption: z.string().max(MAX_STAT_CAPTION_LEN, `Stat caption max ${MAX_STAT_CAPTION_LEN} chars`),
  projectsValue: z.string().max(MAX_STAT_VALUE_LEN, `Stat value max ${MAX_STAT_VALUE_LEN} chars`),
  projectsCaption: z
    .string()
    .max(MAX_STAT_CAPTION_LEN, `Stat caption max ${MAX_STAT_CAPTION_LEN} chars`),
  imageAlt: z.string().max(MAX_ALT_LEN, `Image alt max ${MAX_ALT_LEN} chars`),
  zoom: numberField("Zoom").min(0.5).max(2.5),
  offsetX: numberField("Horizontal offset").min(-400).max(400),
  offsetY: numberField("Vertical offset").min(-400).max(400),
});
