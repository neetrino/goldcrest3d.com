/**
 * Quote form attachment validation — PNG, JPEG/JPG, WebP, PDF, max 10MB.
 * Used in submitQuote (server) and can be used for client-side UX.
 */

export const QUOTE_ATTACHMENT_MAX_BYTES = 10 * 1024 * 1024; // 10 MB

export const QUOTE_ATTACHMENT_ALLOWED_MIME_TYPES: readonly string[] = [
  "image/png",
  "image/jpeg", // .jpg, .jpeg, .jfif
  "image/webp",
  "application/pdf",
];

const ALLOWED_SET = new Set(QUOTE_ATTACHMENT_ALLOWED_MIME_TYPES);

/** Browsers sometimes omit MIME or use octet-stream after drag-and-drop. */
const AMBIGUOUS_MIME_FOR_EXTENSION_FALLBACK = new Set([
  "",
  "application/octet-stream",
]);

const EXTENSION_TO_CANONICAL_MIME: Readonly<Record<string, string>> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  jpe: "image/jpeg",
  jfif: "image/jpeg",
  webp: "image/webp",
  pdf: "application/pdf",
};

function fileExtensionLower(name: string): string | null {
  const dot = name.lastIndexOf(".");
  if (dot < 0 || dot === name.length - 1) return null;
  return name.slice(dot + 1).toLowerCase();
}

/**
 * Resolves canonical Content-Type for quote attachments (upload + validation).
 * Handles empty MIME and non-standard `image/jpg` after drag-and-drop.
 */
export function resolveQuoteAttachmentContentType(file: File): string | null {
  const raw = (file.type ?? "").trim().toLowerCase();
  const normalized =
    raw === "image/jpg" || raw === "image/pjpeg" ? "image/jpeg" : raw;

  if (ALLOWED_SET.has(normalized)) {
    return normalized;
  }

  if (!AMBIGUOUS_MIME_FOR_EXTENSION_FALLBACK.has(normalized)) {
    return null;
  }

  const ext = fileExtensionLower(file.name);
  if (!ext) return null;
  const inferred = EXTENSION_TO_CANONICAL_MIME[ext];
  return inferred && ALLOWED_SET.has(inferred) ? inferred : null;
}

const QUOTE_ATTACHMENT_TYPE_ERROR =
  "Only PNG, JPG, JPEG, WebP, and PDF files are allowed." as const;

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

  if (!resolveQuoteAttachmentContentType(file)) {
    return QUOTE_ATTACHMENT_TYPE_ERROR;
  }

  return null;
}

/**
 * Validates an array of files for the quote form.
 * Returns the first error message found, or null if all valid (or empty).
 */
export function validateQuoteAttachments(files: File[]): string | null {
  for (const file of files) {
    const err = validateQuoteAttachment(file);
    if (err) return err;
  }
  return null;
}
