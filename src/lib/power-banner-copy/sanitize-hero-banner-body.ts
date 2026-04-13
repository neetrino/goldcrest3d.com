import sanitizeHtml from "sanitize-html";

import { normalizeHeroBannerRichLayout } from "./normalize-hero-banner-rich-layout";

const ALIGN = /^(left|right|center|justify)$/;

/** Matches TinyMCE text/background color output (hex, rgb, rgba) — blocks `url()` / `expression()` injection. */
const HERO_BANNER_BODY_COLOR_STYLE =
  /^(#[0-9a-f]{3,8}|rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)|rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*[\d.]+\s*\))$/i;

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
        color: [HERO_BANNER_BODY_COLOR_STYLE],
        "background-color": [HERO_BANNER_BODY_COLOR_STYLE],
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
