import type { ImageFraming } from "@/lib/site-media/image-framing";

export type FounderSectionEntry = {
  name: string;
  body: string;
  /** Public display URL for the founder photo; null when no upload. */
  customImageDisplayUrl: string | null;
  heroImageR2Key: string | null;
  heroImageFraming: ImageFraming | null;
};
