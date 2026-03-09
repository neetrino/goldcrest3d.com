import { z } from "zod";

export const quoteFormSchema = z.object({
  fullName: z.string().min(1, "Անունը պարտադիր է").max(120),
  email: z.string().email("Վավեր email հասցե"),
  message: z.string().min(1, "Հաղորդագրությունը պարտադիր է").max(5000),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;
