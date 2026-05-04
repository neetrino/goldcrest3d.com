import { z } from "zod";

/** Admin update / edit — client-facing choice uses FULL | SPLIT only. */
export const PAYMENT_TYPES = ["FULL", "SPLIT"] as const;
export type PaymentType = (typeof PAYMENT_TYPES)[number];
export const PAYMENT_LINK_MODES = ["FULL_ONLY", "SPLIT_ENABLED"] as const;
export type PaymentLinkMode = (typeof PAYMENT_LINK_MODES)[number];

const adminOrderBase = {
  clientName: z.string().min(1, "Client name is required").max(120),
  clientEmail: z.string().email("Valid email address"),
  productTitle: z.string().min(1, "Product title is required").max(200),
  /** Whole-unit price from admin forms (same scale as DB `priceCents`). */
  priceAmount: z
    .number()
    .int("Price must be a whole number")
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
  paymentLinkMode: z.enum(PAYMENT_LINK_MODES, {
    message: "Choose a payment link mode",
  }),
});

export type OrderFormData = z.infer<typeof orderFormSchema>;
export type CreateOrderFormData = z.infer<typeof createOrderFormSchema>;
