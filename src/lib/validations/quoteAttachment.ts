/**
 * Quote form attachment validation — PNG, JPG, PDF, max 10MB.
 * Used in submitQuote (server) and can be used for client-side UX.
 */

export const QUOTE_ATTACHMENT_MAX_BYTES = 10 * 1024 * 1024; // 10 MB

export const QUOTE_ATTACHMENT_ALLOWED_MIME_TYPES: readonly string[] = [
  "image/png",
  "image/jpeg", // .jpg and .jpeg
  "application/pdf",
];

const ALLOWED_SET = new Set(QUOTE_ATTACHMENT_ALLOWED_MIME_TYPES);

/**
 * Validates an optional file for the quote form.
 * Returns an error message or null if valid (or no file).
 */
export function validateQuoteAttachment(
  file: File | null | undefined,
): string | null {
  if (!file || file.size === 0) return null;

  if (file.size > QUOTE_ATTACHMENT_MAX_BYTES) {
    return "File must be 10MB or smaller.";
  }

  const type = (file.type ?? "").toLowerCase();
  if (!ALLOWED_SET.has(type)) {
    return "Only PNG, JPG, and PDF files are allowed.";
  }

  return null;
}
