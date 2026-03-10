import { z } from "zod";

export const PAYMENT_TYPES = ["FULL", "SPLIT"] as const;
export type PaymentType = (typeof PAYMENT_TYPES)[number];

export const orderFormSchema = z.object({
  clientName: z.string().min(1, "Հաճախորդի անունը պարտադիր է").max(120),
  clientEmail: z.string().email("Վավեր email հասցե"),
  productTitle: z.string().min(1, "Ապրանքի անվանումը պարտադիր է").max(200),
  priceCents: z
    .number()
    .int("Գինը ամբողջ թիվ (դրամ)")
    .min(0, "Գինը չի կարող բացասական լինել"),
  paymentType: z.enum(PAYMENT_TYPES, {
    message: "Ընտրեք FULL կամ SPLIT",
  }),
});

export type OrderFormData = z.infer<typeof orderFormSchema>;
