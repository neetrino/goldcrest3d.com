import type { ImageFraming } from "@/lib/site-media/image-framing";

import type { PowerBannerKey } from "./power-banner-keys";

export type PowerBannerCopyEntry = {
  title: string;
  body: string;
  /** Mobile-only title (below `md`). Empty string means intentionally no title on mobile. */
  mobileTitle: string;
  /** Mobile-only rich/plain description (below `md`). Empty string means intentionally no description on mobile. */
  mobileBody: string;
  /** Large hero image (desktop / tablet). */
  desktopBgSrc: string;
  /** Hero image on small screens. */
  mobileBgSrc: string;
  /** R2 key when the admin replaced the hero art; null when built-in assets are used. */
  heroImageR2Key: string | null;
  /** R2 key when the admin replaced the mobile hero art; null when built-in mobile assets are used. */
  heroImageMobileR2Key: string | null;
  /** Saved focal crop for custom uploads; null when using built-in assets or not set. */
  heroImageFraming: ImageFraming | null;
};

/** Serializable hero copy for the landing page (merged DB + defaults). */
export type PowerBannerCopyBundle = Record<PowerBannerKey, PowerBannerCopyEntry>;
