/** Section1 — ներքևի լրացում (px), նկարի ֆրեյմը չի փոխվում */
export const SECTION1_TAIL_MIN_HEIGHT_PX = 120;

/** Section1 — միայն հերո-նկարը դեպի ներքև (px), object-position Y offset */
export const SECTION1_HERO_BG_NUDGE_DOWN_PX = 16;

/** Section1 — նկարը դեպի վեր (px); բլոկի չափը չի փոխվում */
export const SECTION1_HERO_BG_IMAGE_NUDGE_UP_PX = 40;

/** Section1 — նկարի մասշտաբ (1 = նույնը) */
export const SECTION1_HERO_BG_SCALE = 1.08;

export const SECTION1_HERO_BG_MOBILE_PATH = "/images/modeling/block1-mobile.png";

/** Section1 — տեքստային բլոկի translateY */
export const SECTION1_HERO_TEXT_NUDGE_DOWN_PX = 22;

export const SECTION1_HERO_TEXT_EXTRA_NUDGE_DOWN_MOBILE_PX = 16;

export const SECTION1_MODELING_TITLE_NUDGE_UP_PX = 0;

/** Mobile hero: two lines (md+ uses desktop single-line title). U+2011 keeps "Ready" on line 1 with "Production". */
export const MODELING_TITLE_MOBILE_LINE1 = "3D Production\u2011Ready";
export const MODELING_TITLE_MOBILE_LINE2 = "Modeling";

export const MODELING_TITLE_DESKTOP_DISPLAY = "3D Production-Ready Modeling";

export const RENDERING_SUBTITLE_LINE1 =
  "High-resolution assets for brand presentation";
export const RENDERING_SUBTITLE_LINE2 =
  "and global sales. Perfection in every light ray.";
export const RENDERING_SUBTITLE_MOBILE_LINE1 = "High-resolution assets for";
export const RENDERING_SUBTITLE_MOBILE_LINE2 = "brand presentation and";
export const RENDERING_SUBTITLE_MOBILE_LINE3 = "global sales. Perfection in";
export const RENDERING_SUBTITLE_MOBILE_LINE4 = "every light ray.";

export const DESIGN_SUBTITLE_LINE1 =
  "Concept-to-CAD development for legacy";
export const DESIGN_SUBTITLE_LINE2 =
  "collection building. Your vision, engineered.";

export const SECTION2_TEXT_CLUSTER_NUDGE_MOBILE_PX = 0;

/** Mobile only: lifts title + subtitle + CTA together (negative = up). Sync with globals-powerbanners-mobile-nav.css --section2-text-cluster-translate-y-mobile */
export const SECTION2_TEXT_CLUSTER_TRANSLATE_Y_MOBILE_PX = -176;

/** Mobile only: extra space above subtitle — moves subtitle + Get a Quote down; title unchanged. Sync with #hero-rendering-subtitle margin-top in globals-powerbanners-mobile-nav.css */
export const SECTION2_RENDERING_SUBTITLE_AND_CTA_NUDGE_DOWN_MOBILE_PX = 20;

/** Mobile only: section2 Get a Quote only — negative = up. Sync with #hero-section2-get-quote transform in globals-powerbanners-mobile-nav.css */
export const SECTION2_GET_QUOTE_NUDGE_UP_MOBILE_PX = 28;

export const SECTION2_TEXT_CLUSTER_NUDGE_MD_PX = 90;
export const SECTION2_HERO_BG_MOBILE_PATH = "/images/rendering/block2-mobile.png";

export const SECTION2_HERO_BG_SCALE = 1.22;
export const SECTION2_HERO_BG_IMAGE_NUDGE_UP_PX = 76;
export const SECTION2_HERO_BG_IMAGE_NUDGE_LEFT_PX = 88;
export const SECTION2_RENDERING_TITLE_NUDGE_DOWN_PX = 10;

export const SECTION3_HERO_BG_MOBILE_PATH =
  "/images/design/block3-mobile-original.png";

export const SECTION3_TEXT_COLUMN_TOP_MD_CLASS = "md:top-[47%]";

/** Hero desktop `sizes` — մոտավորապես լայնության սահմանափակում */
export const HERO_DESKTOP_IMAGE_SIZES = "(max-width: 767px) 0px, 100vw";
export const HERO_MOBILE_IMAGE_SIZES = "(max-width: 767px) 100vw, 0px";
