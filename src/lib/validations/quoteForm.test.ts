import { describe, expect, it } from "vitest";
import { quoteFormSchema } from "./quoteForm";

describe("quoteFormSchema", () => {
  it("accepts valid data", () => {
    const result = quoteFormSchema.safeParse({
      fullName: "John Smith",
      email: "john@example.com",
      message: "Need a quote for 3D printing.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty fullName", () => {
    const result = quoteFormSchema.safeParse({
      fullName: "",
      email: "john@example.com",
      message: "Message",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = quoteFormSchema.safeParse({
      fullName: "John",
      email: "not-an-email",
      message: "Message",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty message", () => {
    const result = quoteFormSchema.safeParse({
      fullName: "John",
      email: "john@example.com",
      message: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects fullName over 120 chars", () => {
    const result = quoteFormSchema.safeParse({
      fullName: "a".repeat(121),
      email: "john@example.com",
      message: "Message",
    });
    expect(result.success).toBe(false);
  });

  it("rejects message over 5000 chars", () => {
    const result = quoteFormSchema.safeParse({
      fullName: "John",
      email: "john@example.com",
      message: "a".repeat(5001),
    });
    expect(result.success).toBe(false);
  });
});
