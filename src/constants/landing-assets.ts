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
  /** Hero: Jewelry Design / brief section */
  heroDesign:
    "https://www.figma.com/api/mcp/asset/1cdecab5-207a-4e4a-acaa-963bd712d880",
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
  /** Founder photo */
  founder:
    "https://www.figma.com/api/mcp/asset/ed180930-9b00-4258-9974-241824666fae",
  finishedCnc: "https://www.figma.com/api/mcp/asset/5d0da0f6-ca7d-4159-bc93-a7ee35d1cc66",
  finishedCopper: "https://www.figma.com/api/mcp/asset/49857533-5513-4d1c-8d13-ae2ee5816f66",
  finishedOpacity: "https://www.figma.com/api/mcp/asset/2d279336-3d78-48c4-b923-778a5512f889",
  /** Footer logo */
  footerLogo:
    "https://www.figma.com/api/mcp/asset/6c3d902a-01d7-4cba-b77b-91b31ab5c912",
  /** Footer Follow block image */
  footerFollowImage:
    "https://www.figma.com/api/mcp/asset/49e4a149-0329-4a34-8e24-ab60dcafab22",
  iconDown: "https://www.figma.com/api/mcp/asset/7233a83f-d0c0-4701-b67e-01c3bd58b2d4",
  /** Quote form — file upload (document + arrow) */
  iconUpload: "/images/icon-upload-quote.png",
  iconDots: "https://www.figma.com/api/mcp/asset/f3ba325e-a7bd-4009-b584-c238a58aa721",
  social1: "https://www.figma.com/api/mcp/asset/36864bcd-ec08-4066-85ef-e5a78c94fb63",
  social2: "https://www.figma.com/api/mcp/asset/e4974554-3948-4ee7-8b33-9f53d5c560b4",
  social3: "https://www.figma.com/api/mcp/asset/c03df5e7-6746-4e6d-830c-e08664bf1f80",
} as const;
