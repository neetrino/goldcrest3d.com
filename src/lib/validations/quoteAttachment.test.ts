import { describe, expect, it } from "vitest";
import {
  resolveQuoteAttachmentContentType,
  validateQuoteAttachment,
  validateQuoteAttachments,
  QUOTE_ATTACHMENT_MAX_BYTES,
} from "./quoteAttachment";

const TYPE_ERROR =
  "Only PNG, JPG, JPEG, WebP, and PDF files are allowed." as const;

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

  it("returns null for .jpeg with empty MIME (drag-and-drop)", () => {
    expect(
      validateQuoteAttachment(file({ name: "photo.jpeg", type: "" }))
    ).toBeNull();
  });

  it("returns null for .jpg with application/octet-stream", () => {
    expect(
      validateQuoteAttachment(
        file({ name: "scan.jpg", type: "application/octet-stream" })
      )
    ).toBeNull();
  });

  it("normalizes image/jpg to JPEG", () => {
    expect(
      resolveQuoteAttachmentContentType(
        file({ name: "x.jpg", type: "image/jpg" })
      )
    ).toBe("image/jpeg");
  });

  it("returns null for valid PDF", () => {
    expect(validateQuoteAttachment(file({ type: "application/pdf" }))).toBeNull();
  });

  it("returns null for valid WebP", () => {
    expect(
      validateQuoteAttachment(
        file({ name: "ref.webp", type: "image/webp" })
      )
    ).toBeNull();
  });

  it("returns null for .webp with empty MIME (drag-and-drop)", () => {
    expect(
      validateQuoteAttachment(file({ name: "ref.webp", type: "" }))
    ).toBeNull();
  });

  it("returns error for file over 10MB", () => {
    expect(
      validateQuoteAttachment(file({ size: QUOTE_ATTACHMENT_MAX_BYTES + 1 }))
    ).toBe("File must be 10MB or smaller.");
  });

  it("returns error for disallowed type", () => {
    expect(validateQuoteAttachment(file({ type: "image/gif" }))).toBe(
      TYPE_ERROR
    );
    expect(validateQuoteAttachment(file({ type: "image/svg+xml" }))).toBe(
      TYPE_ERROR
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
        file({ name: "x.webp", type: "image/webp" }),
        file({ type: "application/pdf" }),
      ])
    ).toBeNull();
  });

  it("returns first error for invalid file in array", () => {
    expect(
      validateQuoteAttachments([
        file({ type: "image/png" }),
        file({ type: "image/gif" }),
      ])
    ).toBe(TYPE_ERROR);
    expect(
      validateQuoteAttachments([
        file({ type: "image/png" }),
        file({ size: QUOTE_ATTACHMENT_MAX_BYTES + 1 }),
      ])
    ).toBe("File must be 10MB or smaller.");
  });
});
