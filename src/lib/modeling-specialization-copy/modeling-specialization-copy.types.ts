import type { ModelingSlotKey } from "@/lib/site-media/site-media.registry";

export type ModelingSpecializationCopyRow = {
  slotKey: ModelingSlotKey;
  titleDesktop: string;
  titleMobile: string;
  bodyDesktop: string;
  bodyMobile: string;
  titleTablet: string;
  bodyTablet: string;
  /** Vertical offsets: CSS translateY % (-500…500), scaled with section --ms on the landing page. */
  titleDesktopOffsetY: number;
  titleMobileOffsetY: number;
  bodyDesktopOffsetY: number;
  bodyMobileOffsetY: number;
  /** Desktop horizontal: translateX % of the text box (same clamp as tablet; separate storage). */
  titleDesktopOffsetX: number;
  bodyDesktopOffsetX: number;
  /** Mobile horizontal: translateX % of the text box (same clamp as desktop X). */
  titleMobileOffsetX: number;
  bodyMobileOffsetX: number;
  /** Tablet vertical: translateY % of the text box; wider clamp than desktop (see modeling-specialization-copy-offset). */
  titleTabletOffsetY: number;
  bodyTabletOffsetY: number;
  /** Tablet horizontal: translateX % of the text box. */
  titleTabletOffsetX: number;
  bodyTabletOffsetX: number;
  desktopLine1Emphasis: string;
  tabletLine1Emphasis: string;
  /** Mobile title size (px, below `md` on landing + admin preview); scales with section --ms/--mt. */
  mobilePreviewTitleFontPx: number;
  /** Mobile description size (px, below `md` on landing + admin preview); scales with section --ms/--mt. */
  mobilePreviewBodyFontPx: number;
};

export type ModelingSpecializationCopyPayload = {
  titleDesktop: string;
  titleMobile: string;
  bodyDesktop: string;
  bodyMobile: string;
  titleTablet: string;
  bodyTablet: string;
  titleDesktopOffsetY: number;
  titleMobileOffsetY: number;
  bodyDesktopOffsetY: number;
  bodyMobileOffsetY: number;
  titleDesktopOffsetX: number;
  bodyDesktopOffsetX: number;
  titleMobileOffsetX: number;
  bodyMobileOffsetX: number;
  titleTabletOffsetY: number;
  bodyTabletOffsetY: number;
  titleTabletOffsetX: number;
  bodyTabletOffsetX: number;
  desktopLine1Emphasis: string;
  tabletLine1Emphasis: string;
  mobilePreviewTitleFontPx: number;
  mobilePreviewBodyFontPx: number;
};
