import { z } from "zod";

/**
 * Email validation for quote form. Basic format only (no real-email verification).
 * Replace quoteEmailSchema with a stricter validator when real-email verification is added.
 */
export const quoteEmailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address");

export const quoteFormSchema = z.object({
  fullName: z.string().min(1, "Name is required").max(120),
  email: quoteEmailSchema,
  message: z.string().min(1, "Message is required").max(5000),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;
