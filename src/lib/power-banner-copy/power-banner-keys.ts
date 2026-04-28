export const POWER_BANNER_KEYS = ["MODELING", "RENDERING", "DESIGN"] as const;
export const POWER_BANNER_VIEWPORTS = ["desktop", "mobile", "tablet"] as const;

export type PowerBannerKey = (typeof POWER_BANNER_KEYS)[number];
export type PowerBannerViewport = (typeof POWER_BANNER_VIEWPORTS)[number];

export const POWER_BANNER_KEY_SET = new Set<string>(POWER_BANNER_KEYS);
export const POWER_BANNER_VIEWPORT_SET = new Set<string>(POWER_BANNER_VIEWPORTS);

export const POWER_BANNER_SLOT_IDS: Record<
  PowerBannerViewport,
  Record<PowerBannerKey, string>
> = {
  desktop: {
    MODELING: "hero_modeling_desktop",
    RENDERING: "hero_rendering_desktop",
    DESIGN: "hero_design_desktop",
  },
  mobile: {
    MODELING: "hero_modeling_mobile",
    RENDERING: "hero_rendering_mobile",
    DESIGN: "hero_design_mobile",
  },
  tablet: {
    MODELING: "hero_modeling_tablet",
    RENDERING: "hero_rendering_tablet",
    DESIGN: "hero_design_tablet",
  },
};
