import sanitizeHtml from "sanitize-html";

/**
 * Approximate “visible text” length for validation (strips tags, decodes entities).
 */
export function getHeroBannerBodyPlainTextLength(raw: string): number {
  const stripped = sanitizeHtml(raw, {
    allowedTags: [],
    allowedAttributes: {},
  });
  return stripped.trim().length;
}
