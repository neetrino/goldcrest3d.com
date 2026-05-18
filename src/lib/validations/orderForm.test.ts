import { describe, expect, it } from "vitest";
import {
  createOrderFormSchema,
  orderFormSchema,
  PAYMENT_LINK_MODES,
  PAYMENT_TYPES,
} from "./orderForm";

describe("orderFormSchema", () => {
  it("accepts valid FULL order", () => {
    const result = orderFormSchema.safeParse({
      clientName: "Jane Doe",
      clientEmail: "jane@example.com",
      productTitle: "Custom bracket",
      priceAmountDollars: 150,
      paymentType: "FULL",
    });
    expect(result.success).toBe(true);
  });

  it("accepts valid SPLIT order", () => {
    const result = orderFormSchema.safeParse({
      clientName: "Jane Doe",
      clientEmail: "jane@example.com",
      productTitle: "Custom bracket",
      priceAmountDollars: 200,
      paymentType: "SPLIT",
    });
    expect(result.success).toBe(true);
  });

  it("accepts minimum price $0.01", () => {
    const result = orderFormSchema.safeParse({
      clientName: "Jane",
      clientEmail: "jane@example.com",
      productTitle: "Sample",
      priceAmountDollars: 0.01,
      paymentType: "FULL",
    });
    expect(result.success).toBe(true);
  });

  it("rejects zero price", () => {
    const result = orderFormSchema.safeParse({
      clientName: "Jane",
      clientEmail: "jane@example.com",
      productTitle: "Sample",
      priceAmountDollars: 0,
      paymentType: "FULL",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty clientName", () => {
    const result = orderFormSchema.safeParse({
      clientName: "",
      clientEmail: "jane@example.com",
      productTitle: "Product",
      priceAmountDollars: 100,
      paymentType: "FULL",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = orderFormSchema.safeParse({
      clientName: "Jane",
      clientEmail: "invalid",
      productTitle: "Product",
      priceAmountDollars: 100,
      paymentType: "FULL",
    });
    expect(result.success).toBe(false);
  });

  it("rejects negative priceAmountDollars", () => {
    const result = orderFormSchema.safeParse({
      clientName: "Jane",
      clientEmail: "jane@example.com",
      productTitle: "Product",
      priceAmountDollars: -100,
      paymentType: "FULL",
    });
    expect(result.success).toBe(false);
  });

  it("accepts two-decimal priceAmountDollars", () => {
    const result = orderFormSchema.safeParse({
      clientName: "Jane",
      clientEmail: "jane@example.com",
      productTitle: "Product",
      priceAmountDollars: 99.99,
      paymentType: "FULL",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid paymentType", () => {
    const result = orderFormSchema.safeParse({
      clientName: "Jane",
      clientEmail: "jane@example.com",
      productTitle: "Product",
      priceAmountDollars: 100,
      paymentType: "HALF",
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing paymentType", () => {
    const result = orderFormSchema.safeParse({
      clientName: "Jane",
      clientEmail: "jane@example.com",
      productTitle: "Product",
      priceAmountDollars: 100,
    });
    expect(result.success).toBe(false);
  });
});

describe("createOrderFormSchema", () => {
  it("accepts valid data with payment link mode", () => {
    const result = createOrderFormSchema.safeParse({
      clientName: "Jane Doe",
      clientEmail: "jane@example.com",
      productTitle: "Custom bracket",
      priceAmountDollars: 150,
      paymentLinkMode: "FULL_ONLY",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email like orderFormSchema", () => {
    const result = createOrderFormSchema.safeParse({
      clientName: "Jane",
      clientEmail: "invalid",
      productTitle: "Product",
      priceAmountDollars: 100,
      paymentLinkMode: "SPLIT_ENABLED",
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing paymentLinkMode", () => {
    const result = createOrderFormSchema.safeParse({
      clientName: "Jane",
      clientEmail: "jane@example.com",
      productTitle: "Product",
      priceAmountDollars: 100,
    });
    expect(result.success).toBe(false);
  });
});

describe("PAYMENT_LINK_MODES", () => {
  it("contains FULL_ONLY and SPLIT_ENABLED", () => {
    expect(PAYMENT_LINK_MODES).toContain("FULL_ONLY");
    expect(PAYMENT_LINK_MODES).toContain("SPLIT_ENABLED");
    expect(PAYMENT_LINK_MODES).toHaveLength(2);
  });
});

describe("PAYMENT_TYPES", () => {
  it("contains FULL and SPLIT", () => {
    expect(PAYMENT_TYPES).toContain("FULL");
    expect(PAYMENT_TYPES).toContain("SPLIT");
    expect(PAYMENT_TYPES).toHaveLength(2);
  });
});
