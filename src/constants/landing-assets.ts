/**
 * Landing page image URLs (Figma MCP assets). Use unoptimized so Next doesn't proxy (avoids 400).
 * Replace with /images/... when you export final assets to public.
 */

export const LANDING_IMAGES = {
  heroModeling: "https://www.figma.com/api/mcp/asset/09156899-34dd-41fb-a759-cf0113f898be",
  heroRendering: "https://www.figma.com/api/mcp/asset/ec13b76e-4e89-4ec6-8e26-bf264f6db2d2",
  heroDesign: "https://www.figma.com/api/mcp/asset/894eaf91-26b6-4d8d-896f-1eda637c46ca",
  /** Local assets in public/images/modeling — positioning is critical per block. */
  modelingHipHop: "/images/modeling/hip-hop.png",
  modelingBridal: "/images/modeling/bridal.png",
  modelingHighJewelry: "/images/modeling/high-jewelry.png",
  modelingMechanical: "/images/modeling/mechanical.png",
  modelingPortrait: "/images/modeling/portrait.png",
  modelingHeritage: "/images/modeling/heritage.png",
  manufacturing: "https://www.figma.com/api/mcp/asset/3a4fbf00-a8d0-4175-b47d-cf79959ddacf",
  founder: "https://www.figma.com/api/mcp/asset/8034aa80-aef3-4ed9-a439-4e826b839bd6",
  finishedCnc: "https://www.figma.com/api/mcp/asset/5d0da0f6-ca7d-4159-bc93-a7ee35d1cc66",
  finishedCopper: "https://www.figma.com/api/mcp/asset/49857533-5513-4d1c-8d13-ae2ee5816f66",
  finishedOpacity: "https://www.figma.com/api/mcp/asset/2d279336-3d78-48c4-b923-778a5512f889",
  footerLogo: "https://www.figma.com/api/mcp/asset/3e8710e1-1714-4bfb-99e5-f780ef636b53",
  iconDown: "https://www.figma.com/api/mcp/asset/8f6693ea-803a-4ba2-a3e5-d183a4a02104",
  iconUpload: "https://www.figma.com/api/mcp/asset/4fa6e3a4-fe1e-484c-b249-dcb789f3149c",
  iconDots: "https://www.figma.com/api/mcp/asset/f3ba325e-a7bd-4009-b584-c238a58aa721",
  social1: "https://www.figma.com/api/mcp/asset/07a7ceda-ac40-4564-82a5-4aed4492c0b3",
  social2: "https://www.figma.com/api/mcp/asset/b1353f74-5d6b-4470-96f2-737b732974e1",
  social3: "https://www.figma.com/api/mcp/asset/0daec7d8-24ec-453f-a8cc-ffaaa4c21f95",
} as const;
