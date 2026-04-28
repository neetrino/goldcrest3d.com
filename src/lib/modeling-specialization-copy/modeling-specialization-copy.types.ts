import type { ModelingSlotKey } from "@/lib/site-media/site-media.registry";

export type ModelingSpecializationCopyRow = {
  slotKey: ModelingSlotKey;
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
  desktopLine1Emphasis: string;
  tabletLine1Emphasis: string;
};
