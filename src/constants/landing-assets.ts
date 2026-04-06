/**
 * Landing page image URLs — Figma design (Goldcrest 3D, node 92:83).
 * Տեղական ու remote URL-ները թույլատրված են `next.config.ts` `images.remotePatterns`-ում — `next/image` օպտիմիզացիա։
 */

export const LANDING_IMAGES = {
  /** Hero: 3D Production-Ready Modeling (Figma 222:210) — локальный PNG, без срока MCP */
  heroModeling: "/images/modeling/hero-production-ready-jewelry-cad.png",
  /** Hero: Jewelry Rendering (Figma 222:218) — локальный PNG, без срока MCP */
  heroRendering: "/images/rendering/hero-jewelry-rendering.png",
  /** Hero: Jewelry Design — brief (Figma 222:314), локальный PNG */
  heroDesign: "/images/design/hero-jewelry-design-brief.png",
  /** Modeling Specialization blocks (Figma export) */
  modelingHipHop: "/images/modeling/hip-hop.png",
  /** Bridal & Engagement — webp (նույն ասեթը, ավելի փոքր ֆայլ) */
  modelingBridal: "/images/modeling/bridal-engagement.webp",
  /** High Jewelry — Figma 378:751, локальный PNG (качество без срока MCP) */
  modelingHighJewelry: "/images/modeling/high-jewelry.png",
  /** Mechanical & Lock Systems — full-bleed (լոկալ webp) */
  modelingMechanical: "/images/modeling/mechanical-lock-systems.webp",
  modelingPortrait: "/images/modeling/portrait-jewelry.png",
  /** Ancient & Heritage Jewelry — full-bleed, jewelry left, cream background */
  modelingHeritage: "/images/modeling/ancient-heritage.png",
  /** Manufacturing Intelligence — Figma node -280 / 201:329 composite */
  manufacturing: "/images/manufacturing/tolerance-control-assembly-precision.png",
  /** Manufacturing Intelligence — detail: Tolerance Control & Assembly Precision */
  manufacturingToleranceControl:
    "/images/manufacturing/tolerance-control-assembly-precision.png",
  /** Manufacturing Intelligence — detail: Mechanical Stress & Load Distribution (FEA) */
  manufacturingMechanicalStressLoadDistribution:
    "/images/manufacturing/mechanical-stress-load-distribution.png",
  /** Manufacturing Intelligence — detail: 3D Printing Strategy & Resin Behavior */
  manufacturingPrintingStrategyResinBehavior:
    "/images/manufacturing/3d-printing-strategy-resin-behavior.png",
  /** Manufacturing Intelligence — detail: Casting Compensation & Metal Flow Awareness */
  manufacturingCastingCompensationMetalFlowAwareness:
    "/images/manufacturing/casting-compensation-metal-flow-awareness.png",
  /** Manufacturing Intelligence — detail: Stone Seat Geometry & Setting Logic */
  manufacturingStoneSeatGeometrySetting:
    "/images/manufacturing/stone-seat-geometry-setting-logic.png",
  /** Manufacturing Intelligence — detail: Wall Thickness Engineering */
  manufacturingWallThicknessEngineering:
    "/images/manufacturing/wall-thickness-engineering.png",
  /** Founder photo (Figma 222:305) — локальный PNG */
  founder: "/images/founder/founder-portrait.png",
  finishedCnc: "/images/finished/block1-portrait-jewelry.webp",
  finishedCopper: "/images/finished/block2-ancient-heritage.webp",
  finishedOpacity: "/images/finished/block3-hiphop.webp",
  /** Footer — Goldcrest full logo (Figma 92:215 → 92:248), локальный PNG */
  footerLogo: "/images/footer/footer-goldcrest-full-logo.png",
  /** Footer Follow — map (Figma 110:389, 685.818×96, background cover), локальный PNG */
  footerFollowImage: "/images/footer/follow-map-banner.png",
  /** Quote form — file upload (document + arrow) */
  iconUpload: "/images/icon-upload-quote.png",
  iconDots: "/images/icon-dots.svg",
  /** Footer Follow — Instagram (Figma 92:227), ֆայլը SVG է */
  social1: "/images/footer/follow-social-instagram.svg",
  /** Footer Follow — LinkedIn (Figma 92:227), ֆայլը SVG է */
  social2: "/images/footer/follow-social-linkedin.svg",
  /** Footer Follow — Behance (Figma 92:227), ֆայլը SVG է */
  social3: "/images/footer/follow-social-behance.svg",
} as const;
