import type { ImageFraming } from "@/lib/site-media/image-framing";

export type ManufacturingIntelligenceCopyEntry = {
  title: string;
  body: string;
  /**
   * Public URL for the custom right-column image when upload resolves; null uses built-in
   * per-accordion imagery on the homepage.
   */
  customImageDisplayUrl: string | null;
  heroImageR2Key: string | null;
  heroImageFraming: ImageFraming | null;
};
