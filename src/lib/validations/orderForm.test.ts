import { describe, expect, it } from "vitest";
import { orderFormSchema, PAYMENT_TYPES } from "./orderForm";

describe("orderFormSchema", () => {
  it("accepts valid FULL order", () => {
    const result = orderFormSchema.safeParse({
      clientName: "Jane Doe",
      clientEmail: "jane@example.com",
      productTitle: "Custom bracket",
      priceCents: 15000,
      paymentType: "FULL",
    });
    expect(result.success).toBe(true);
  });

  it("accepts valid SPLIT order", () => {
    const result = orderFormSchema.safeParse({
      clientName: "Jane Doe",
      clientEmail: "jane@example.com",
      productTitle: "Custom bracket",
      priceCents: 20000,
      paymentType: "SPLIT",
    });
    expect(result.success).toBe(true);
  });

  it("accepts zero price", () => {
    const result = orderFormSchema.safeParse({
      clientName: "Jane",
      clientEmail: "jane@example.com",
      productTitle: "Sample",
      priceCents: 0,
      paymentType: "FULL",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty clientName", () => {
    const result = orderFormSchema.safeParse({
      clientName: "",
      clientEmail: "jane@example.com",
      productTitle: "Product",
      priceCents: 100,
      paymentType: "FULL",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = orderFormSchema.safeParse({
      clientName: "Jane",
      clientEmail: "invalid",
      productTitle: "Product",
      priceCents: 100,
      paymentType: "FULL",
    });
    expect(result.success).toBe(false);
  });

  it("rejects negative priceCents", () => {
    const result = orderFormSchema.safeParse({
      clientName: "Jane",
      clientEmail: "jane@example.com",
      productTitle: "Product",
      priceCents: -100,
      paymentType: "FULL",
    });
    expect(result.success).toBe(false);
  });

  it("rejects non-integer priceCents", () => {
    const result = orderFormSchema.safeParse({
      clientName: "Jane",
      clientEmail: "jane@example.com",
      productTitle: "Product",
      priceCents: 99.5,
      paymentType: "FULL",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid paymentType", () => {
    const result = orderFormSchema.safeParse({
      clientName: "Jane",
      clientEmail: "jane@example.com",
      productTitle: "Product",
      priceCents: 100,
      paymentType: "HALF",
    });
    expect(result.success).toBe(false);
  });
});

describe("PAYMENT_TYPES", () => {
  it("contains FULL and SPLIT", () => {
    expect(PAYMENT_TYPES).toContain("FULL");
    expect(PAYMENT_TYPES).toContain("SPLIT");
    expect(PAYMENT_TYPES).toHaveLength(2);
  });
});
