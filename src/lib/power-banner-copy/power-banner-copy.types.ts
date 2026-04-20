import type {
  PowerBannerKey,
  PowerBannerViewport,
} from "./power-banner-keys";
import type { ManufacturingImageTransform } from "@/lib/manufacturing-intelligence/manufacturing-image-transform";

export type PowerBannerCopyEntry = {
  title: string;
  body: string;
  imageAlt: string;
  imageSrc: string;
  imageObjectKey: string | null;
  imageTransform: ManufacturingImageTransform;
};

/** Serializable hero copy for the landing page (merged DB + defaults). */
export type PowerBannerCopyBundle = Record<
  PowerBannerViewport,
  Record<PowerBannerKey, PowerBannerCopyEntry>
>;
