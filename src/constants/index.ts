/**
 * Shared constants.
 */

/** Landing section IDs — used for nav scroll anchors and section id attributes */
export const LANDING_SECTION_IDS = {
  HERO: "hero",
  PHILOSOPHY: "philosophy",
  SPECIALIZATIONS: "specializations",
  MANUFACTURING: "manufacturing",
  FOUNDER: "founder",
  PROCESS: "process",
  QUOTE: "quote",
  FOOTER: "footer",
} as const;

export type LandingSectionId =
  (typeof LANDING_SECTION_IDS)[keyof typeof LANDING_SECTION_IDS];

/** R2 bucket key prefixes — quote attachments, order product images */
export const R2_PREFIXES = {
  QUOTES: "quotes",
  ORDERS: "orders",
} as const;
