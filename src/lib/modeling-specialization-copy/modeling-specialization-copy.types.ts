import type { ModelingSlotKey } from "@/lib/site-media/site-media.registry";

export type ModelingSpecializationCopyRow = {
  slotKey: ModelingSlotKey;
  titleDesktop: string;
  titleMobile: string;
  bodyDesktop: string;
  bodyMobile: string;
  titleTablet: string;
  bodyTablet: string;
  /** Vertical offsets: CSS translateY % (-100…100), scaled with section --ms on the landing page. */
  titleDesktopOffsetY: number;
  titleMobileOffsetY: number;
  bodyDesktopOffsetY: number;
  bodyMobileOffsetY: number;
  /** Tablet vertical: translateY % of the text box; wider clamp than desktop (see modeling-specialization-copy-offset). */
  titleTabletOffsetY: number;
  bodyTabletOffsetY: number;
  /** Tablet horizontal: translateX % of the text box. */
  titleTabletOffsetX: number;
  bodyTabletOffsetX: number;
  desktopLine1Emphasis: string;
  tabletLine1Emphasis: string;
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
  titleTabletOffsetY: number;
  bodyTabletOffsetY: number;
  titleTabletOffsetX: number;
  bodyTabletOffsetX: number;
  desktopLine1Emphasis: string;
  tabletLine1Emphasis: string;
};
