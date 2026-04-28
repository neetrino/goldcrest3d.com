import type {
  PowerBannerKey,
  PowerBannerViewport,
} from "./power-banner-keys";
import type { ManufacturingImageTransform } from "@/lib/manufacturing-intelligence/manufacturing-image-transform";

export type PowerBannerCopyEntry = {
  title: string;
  body: string;
  /** Hero slide: vertical nudge (px) for the title for this viewport row. */
  titleOffsetY: number;
  /** Hero slide: vertical nudge (px) for the description for this viewport row. */
  bodyOffsetY: number;
  /** Hero slide: vertical nudge (px) for Get a Quote for this viewport row. */
  ctaOffsetY: number;
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
