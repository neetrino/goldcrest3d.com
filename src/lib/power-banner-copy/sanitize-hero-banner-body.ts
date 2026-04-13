import sanitizeHtml from "sanitize-html";

import { normalizeHeroBannerRichLayout } from "./normalize-hero-banner-rich-layout";

const ALIGN = /^(left|right|center|justify)$/;

/**
 * Server- and client-safe HTML for hero descriptions (stored in DB and rendered on the landing page).
 */
export function sanitizeHeroBannerBodyHtml(dirty: string): string {
  return sanitizeHtml(dirty, {
    allowedTags: ["p", "br", "strong", "em", "b", "i", "u", "span", "ul", "ol", "li"],
    allowedAttributes: {
      span: ["style", "class"],
      p: ["style", "class"],
      li: ["style", "class"],
      ol: ["style", "class"],
      ul: ["style", "class"],
    },
    allowedStyles: {
      "*": {
        "text-align": [ALIGN],
      },
    },
    transformTags: {
      b: "strong",
      i: "em",
    },
  });
}

/**
 * Sanitize then fix common TinyMCE layout splits (orphan `<p><strong>word</strong></p>`, `<br>` before emphasis).
 */
export function finalizeHeroBannerBodyHtml(dirty: string): string {
  const sanitized = sanitizeHeroBannerBodyHtml(dirty.trim());
  return normalizeHeroBannerRichLayout(sanitized);
}
