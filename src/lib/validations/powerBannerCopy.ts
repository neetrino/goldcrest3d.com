import { z } from "zod";

import { POWER_BANNER_KEY_SET } from "@/lib/power-banner-copy/power-banner-keys";

const MAX_TITLE_LEN = 280;
const MAX_BODY_LEN = 4000;

export const powerBannerCopyFormSchema = z.object({
  bannerKey: z
    .string()
    .refine((k) => POWER_BANNER_KEY_SET.has(k), "Invalid banner."),
  title: z
    .string()
    .max(MAX_TITLE_LEN, `Title must be at most ${MAX_TITLE_LEN} characters`)
    .transform((s) => s.trim()),
  body: z
    .string()
    .max(MAX_BODY_LEN, `Description must be at most ${MAX_BODY_LEN} characters`)
    .transform((s) => s.trim()),
});
