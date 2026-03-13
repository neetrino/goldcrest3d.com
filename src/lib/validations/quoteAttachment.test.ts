import { describe, expect, it } from "vitest";
import {
  validateQuoteAttachment,
  validateQuoteAttachments,
  QUOTE_ATTACHMENT_MAX_BYTES,
} from "./quoteAttachment";

function file(overrides: { name?: string; size?: number; type?: string } = {}) {
  const { name = "doc.pdf", size = 1000, type = "application/pdf" } = overrides;
  return new File(["x".repeat(size)], name, { type });
}

describe("validateQuoteAttachment", () => {
  it("returns null for no file", () => {
    expect(validateQuoteAttachment(null)).toBeNull();
    expect(validateQuoteAttachment(undefined)).toBeNull();
  });

  it("returns null for empty file", () => {
    expect(validateQuoteAttachment(file({ size: 0 }))).toBeNull();
  });

  it("returns null for valid PNG", () => {
    expect(validateQuoteAttachment(file({ type: "image/png" }))).toBeNull();
  });

  it("returns null for valid JPEG", () => {
    expect(validateQuoteAttachment(file({ type: "image/jpeg" }))).toBeNull();
  });

  it("returns null for valid PDF", () => {
    expect(validateQuoteAttachment(file({ type: "application/pdf" }))).toBeNull();
  });

  it("returns error for file over 10MB", () => {
    expect(
      validateQuoteAttachment(file({ size: QUOTE_ATTACHMENT_MAX_BYTES + 1 }))
    ).toBe("File must be 10MB or smaller.");
  });

  it("returns error for disallowed type", () => {
    expect(validateQuoteAttachment(file({ type: "image/webp" }))).toBe(
      "Only PNG, JPG, and PDF files are allowed."
    );
    expect(validateQuoteAttachment(file({ type: "image/gif" }))).toBe(
      "Only PNG, JPG, and PDF files are allowed."
    );
  });
});

describe("validateQuoteAttachments", () => {
  it("returns null for empty array", () => {
    expect(validateQuoteAttachments([])).toBeNull();
  });

  it("returns null for valid files", () => {
    expect(
      validateQuoteAttachments([
        file({ type: "image/png" }),
        file({ type: "application/pdf" }),
      ])
    ).toBeNull();
  });

  it("returns first error for invalid file in array", () => {
    expect(
      validateQuoteAttachments([
        file({ type: "image/png" }),
        file({ type: "image/webp" }),
      ])
    ).toBe("Only PNG, JPG, and PDF files are allowed.");
    expect(
      validateQuoteAttachments([
        file({ type: "image/png" }),
        file({ size: QUOTE_ATTACHMENT_MAX_BYTES + 1 }),
      ])
    ).toBe("File must be 10MB or smaller.");
  });
});
