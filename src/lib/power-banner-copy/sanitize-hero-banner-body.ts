import sanitizeHtml from "sanitize-html";

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
