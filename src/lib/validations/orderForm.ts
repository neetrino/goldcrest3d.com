import { z } from "zod";

/** Admin update / edit — client-facing choice uses FULL | SPLIT only. */
export const PAYMENT_TYPES = ["FULL", "SPLIT"] as const;
export type PaymentType = (typeof PAYMENT_TYPES)[number];

const adminOrderBase = {
  clientName: z.string().min(1, "Client name is required").max(120),
  clientEmail: z.string().email("Valid email address"),
  productTitle: z.string().min(1, "Product title is required").max(200),
  /** Whole AMD drams from admin forms (same scale as DB `priceCents`). */
  priceAmd: z
    .number()
    .int("Price must be a whole number (AMD)")
    .min(0, "Price cannot be negative"),
};

export const orderFormSchema = z.object({
  ...adminOrderBase,
  paymentType: z.enum(PAYMENT_TYPES, {
    message: "Choose FULL or SPLIT",
  }),
});

/** Admin creates order — payment type is set by the client on the payment page. */
export const createOrderFormSchema = z.object({
  ...adminOrderBase,
});

export type OrderFormData = z.infer<typeof orderFormSchema>;
export type CreateOrderFormData = z.infer<typeof createOrderFormSchema>;
