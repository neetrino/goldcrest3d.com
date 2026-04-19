import type {
  PowerBannerKey,
  PowerBannerViewport,
} from "./power-banner-keys";

export type PowerBannerCopyEntry = {
  title: string;
  body: string;
  imageAlt: string;
  imageSrc: string;
  imageObjectKey: string | null;
};

/** Serializable hero copy for the landing page (merged DB + defaults). */
export type PowerBannerCopyBundle = Record<
  PowerBannerViewport,
  Record<PowerBannerKey, PowerBannerCopyEntry>
>;
