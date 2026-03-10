import { z } from "zod";

export const quoteFormSchema = z.object({
  fullName: z.string().min(1, "Name is required").max(120),
  email: z.string().email("Valid email address"),
  message: z.string().min(1, "Message is required").max(5000),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;
