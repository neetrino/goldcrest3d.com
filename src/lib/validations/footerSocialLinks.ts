import { z } from "zod";

const MAX_URL_LENGTH = 2048;

const urlField = (label: string) =>
  z
    .string()
    .trim()
    .max(MAX_URL_LENGTH, `${label} URL is too long.`)
    .refine((value) => value.length === 0 || /^https?:\/\//i.test(value), {
      message: `${label} URL must start with http:// or https://`,
    })
    .refine(
      (value) => {
        if (value.length === 0) return true;
        try {
          // Use URL parser for full validation.
          void new URL(value);
          return true;
        } catch {
          return false;
        }
      },
      { message: `${label} URL is invalid.` },
    );

export const footerSocialLinksFormSchema = z.object({
  instagram: urlField("Instagram"),
  linkedin: urlField("LinkedIn"),
  behance: urlField("Behance"),
  youtube: urlField("YouTube"),
});
