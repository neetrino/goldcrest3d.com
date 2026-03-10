import { describe, expect, it } from "vitest";
import { leadReplySchema } from "./leadReply";

describe("leadReplySchema", () => {
  it("accepts non-empty body", () => {
    const result = leadReplySchema.safeParse({
      body: "Thank you for your request. We will reply soon.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty body", () => {
    const result = leadReplySchema.safeParse({ body: "" });
    expect(result.success).toBe(false);
  });

  it("rejects body over 10000 chars", () => {
    const result = leadReplySchema.safeParse({
      body: "a".repeat(10_001),
    });
    expect(result.success).toBe(false);
  });

  it("accepts body of exactly 10000 chars", () => {
    const result = leadReplySchema.safeParse({
      body: "a".repeat(10_000),
    });
    expect(result.success).toBe(true);
  });
});
