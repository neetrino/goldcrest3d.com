export const POWER_BANNER_KEYS = ["MODELING", "RENDERING", "DESIGN"] as const;

export type PowerBannerKey = (typeof POWER_BANNER_KEYS)[number];

export const POWER_BANNER_KEY_SET = new Set<string>(POWER_BANNER_KEYS);
