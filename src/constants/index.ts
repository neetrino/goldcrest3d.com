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
  FINISHED_CREATIONS: "finished-creations",
  PROCESS: "process",
  QUOTE: "quote",
  FOOTER: "footer",
} as const;

export type LandingSectionId =
  (typeof LANDING_SECTION_IDS)[keyof typeof LANDING_SECTION_IDS];

/** Landing element IDs — unique id for specific copy (e.g. hero modeling subtitle) */
export const LANDING_ELEMENT_IDS = {
  HERO_MODELING_SUBTITLE: "hero-modeling-subtitle",
  HERO_RENDERING_SUBTITLE: "hero-rendering-subtitle",
  /** Wrapper for hero modeling title, subtitle and CTA — used to shift text independently from background */
  HERO_MODELING_TEXT_GROUP: "hero-modeling-text-group",
} as const;

/**
 * Landing image IDs — data-landing-image on each image wrapper.
 * Օգտագործել՝ «այս նկարը [id]-ի համար» — կփոխենք LANDING_IMAGES / src.
 */
export const LANDING_IMAGE_IDS = {
  /** Hero (PowerBanners) */
  HERO_MODELING: "hero-modeling",
  HERO_RENDERING: "hero-rendering",
  HERO_DESIGN: "hero-design",
  /** Modeling Specialization */
  MODELING_HIPHOP: "modeling-hiphop",
  MODELING_BRIDAL: "modeling-bridal",
  MODELING_PORTRAIT: "modeling-portrait",
  MODELING_MECHANICAL: "modeling-mechanical",
  MODELING_HERITAGE: "modeling-heritage",
  MODELING_HIGH_JEWELRY: "modeling-high-jewelry",
  /** Manufacturing Intelligence */
  MANUFACTURING_MAIN: "manufacturing-main",
  MANUFACTURING_ICON_DOWN: "manufacturing-icon-down",
  /** Founder */
  FOUNDER_PHOTO: "founder-photo",
  /** Finished Creations gallery */
  FINISHED_1: "finished-1",
  FINISHED_2: "finished-2",
  FINISHED_3: "finished-3",
  FINISHED_4: "finished-4",
  FINISHED_5: "finished-5",
  FINISHED_6: "finished-6",
  FINISHED_7: "finished-7",
  /** Quote form */
  QUOTE_UPLOAD_ICON: "quote-upload-icon",
  /** Footer */
  FOOTER_LOGO: "footer-logo",
  FOOTER_FOLLOW_IMAGE: "footer-follow-image",
  FOOTER_SOCIAL_1: "footer-social-1",
  FOOTER_SOCIAL_2: "footer-social-2",
  FOOTER_SOCIAL_3: "footer-social-3",
} as const;

export type LandingImageId =
  (typeof LANDING_IMAGE_IDS)[keyof typeof LANDING_IMAGE_IDS];

/** R2 bucket key prefixes — quote attachments, order product images */
export const R2_PREFIXES = {
  QUOTES: "quotes",
  ORDERS: "orders",
} as const;

/** Rate limit: quote form — requests per window (per IP) */
export const RATE_LIMIT_QUOTE_WINDOW_MS = 60_000;
export const RATE_LIMIT_QUOTE_MAX = 10;

/** Main site header logo (`public/images/header-logo.png`); same asset as `LandingNav`. */
export const SITE_HEADER_LOGO_SRC = "/images/header-logo.png";
