import { LANDING_IMAGE_IDS } from "@/constants";
import { getModelingHipHopCardBackgroundStyle } from "./modeling-hiphop-background.constants";
import { ModelingCard } from "./ModelingCard";

type ModelingBlockHipHopProps = {
  imageUrlDesktop: string;
  imageUrlMobile: string;
  imageUrlTablet: string;
  titleDesktop: string;
  titleMobile: string;
  titleTablet: string;
  titleDesktopOffsetY: number;
  titleDesktopOffsetX: number;
  titleMobileOffsetY: number;
  titleMobileOffsetX: number;
  titleTabletOffsetY: number;
  titleTabletOffsetX: number;
  descriptionLinesDesktop: string[];
  descriptionLinesMobile: string[];
  descriptionLinesTablet: string[];
  bodyDesktopOffsetY: number;
  bodyDesktopOffsetX: number;
  bodyMobileOffsetY: number;
  bodyMobileOffsetX: number;
  bodyTabletOffsetY: number;
  bodyTabletOffsetX: number;
  mobilePreviewTitleFontPx: number;
  mobilePreviewBodyFontPx: number;
};

/** Hip-Hop Jewelry block — Figma background layer on image area. */
export function ModelingBlockHipHop({
  imageUrlDesktop,
  imageUrlMobile,
  imageUrlTablet,
  titleDesktop,
  titleMobile,
  titleTablet,
  titleDesktopOffsetY,
  titleDesktopOffsetX,
  titleMobileOffsetY,
  titleMobileOffsetX,
  titleTabletOffsetY,
  titleTabletOffsetX,
  descriptionLinesDesktop,
  descriptionLinesMobile,
  descriptionLinesTablet,
  bodyDesktopOffsetY,
  bodyDesktopOffsetX,
  bodyMobileOffsetY,
  bodyMobileOffsetX,
  bodyTabletOffsetY,
  bodyTabletOffsetX,
  mobilePreviewTitleFontPx,
  mobilePreviewBodyFontPx,
}: ModelingBlockHipHopProps) {
  const sameUrl = imageUrlDesktop === imageUrlMobile;
  return (
    <ModelingCard
      title={titleDesktop}
      titleMobile={titleMobile}
      titleTablet={titleTablet}
      titleOffsetYDesktop={titleDesktopOffsetY}
      titleOffsetXDesktop={titleDesktopOffsetX}
      titleOffsetYMobile={titleMobileOffsetY}
      titleOffsetXMobile={titleMobileOffsetX}
      titleOffsetYTablet={titleTabletOffsetY}
      titleOffsetXTablet={titleTabletOffsetX}
      description=""
      descriptionLines={descriptionLinesMobile}
      descriptionLinesDesktop={descriptionLinesDesktop}
      descriptionLinesTablet={descriptionLinesTablet}
      descriptionOffsetYDesktop={bodyDesktopOffsetY}
      descriptionOffsetXDesktop={bodyDesktopOffsetX}
      descriptionOffsetYMobile={bodyMobileOffsetY}
      descriptionOffsetXMobile={bodyMobileOffsetX}
      descriptionOffsetYTablet={bodyTabletOffsetY}
      descriptionOffsetXTablet={bodyTabletOffsetX}
      imageSrc={imageUrlDesktop}
      imageSrcMobile={imageUrlMobile}
      imageSrcTablet={imageUrlTablet}
      imageId={LANDING_IMAGE_IDS.MODELING_HIPHOP}
      imageOnLeft={false}
      textAlign="left"
      imageLayerBackground={getModelingHipHopCardBackgroundStyle(imageUrlDesktop)}
      imageLayerBackgroundMobile={
        sameUrl ? undefined : getModelingHipHopCardBackgroundStyle(imageUrlMobile)
      }
      imageLayerBackgroundTablet={
        sameUrl ? undefined : getModelingHipHopCardBackgroundStyle(imageUrlTablet)
      }
      imagePairBreakpoint="md"
      mobileHipHopTypography
      mobilePreviewTitleFontPx={mobilePreviewTitleFontPx}
      mobilePreviewBodyFontPx={mobilePreviewBodyFontPx}
    />
  );
}
