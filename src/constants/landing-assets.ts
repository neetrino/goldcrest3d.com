/**
 * Landing page image URLs — Figma design (Goldcrest 3D, node 92:83).
 * Use unoptimized so Next doesn't proxy (avoids 400).
 * Replace with /images/... when you export final assets to public.
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
  modelingBridal:
    "https://www.figma.com/api/mcp/asset/8bbfa33e-92f6-4e62-bcfa-becb486ade43",
  /** High Jewelry — full-bleed block (Figma 222:264), CSS background */
  modelingHighJewelry:
    "https://www.figma.com/api/mcp/asset/002f9765-f5e8-43c9-8293-09281beb4f2f",
  /** Mechanical & Lock Systems — full-bleed block. Use local: put your image at public/images/modeling/mechanical-lock-systems.png and set to "/images/modeling/mechanical-lock-systems.png" */
  modelingMechanical:
    "https://www.figma.com/api/mcp/asset/d547c3a3-48a4-4c4b-b752-f38344605292",
  modelingPortrait: "/images/modeling/portrait-jewelry.png",
  /** Ancient & Heritage Jewelry — full-bleed, jewelry left, cream background */
  modelingHeritage: "/images/modeling/ancient-heritage.png",
  /** Manufacturing Intelligence — Figma node -280 / 201:329 composite */
  manufacturing:
    "https://www.figma.com/api/mcp/asset/f0e2ff65-ab6e-4496-9550-dbb56fe62cca",
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
  finishedCnc: "https://www.figma.com/api/mcp/asset/5d0da0f6-ca7d-4159-bc93-a7ee35d1cc66",
  finishedCopper: "https://www.figma.com/api/mcp/asset/49857533-5513-4d1c-8d13-ae2ee5816f66",
  finishedOpacity: "https://www.figma.com/api/mcp/asset/2d279336-3d78-48c4-b923-778a5512f889",
  /** Footer — Goldcrest full logo (Figma 92:215 → 92:248), локальный PNG */
  footerLogo: "/images/footer/footer-goldcrest-full-logo.png",
  /** Footer Follow — map (Figma 110:389, 685.818×96, background cover), локальный PNG */
  footerFollowImage: "/images/footer/follow-map-banner.png",
  /** Quote form — file upload (document + arrow) */
  iconUpload: "/images/icon-upload-quote.png",
  iconDots: "https://www.figma.com/api/mcp/asset/f3ba325e-a7bd-4009-b584-c238a58aa721",
  /** Footer Follow — Instagram (Figma 92:227), ֆայլը SVG է */
  social1: "/images/footer/follow-social-instagram.svg",
  /** Footer Follow — LinkedIn (Figma 92:227), ֆայլը SVG է */
  social2: "/images/footer/follow-social-linkedin.svg",
  /** Footer Follow — Behance (Figma 92:227), ֆայլը SVG է */
  social3: "/images/footer/follow-social-behance.svg",
} as const;
