import type { PowerBannerKey } from "./power-banner-keys";

export type PowerBannerCopyEntry = {
  title: string;
  body: string;
};

/** Serializable hero copy for the landing page (merged DB + defaults). */
export type PowerBannerCopyBundle = Record<PowerBannerKey, PowerBannerCopyEntry>;
