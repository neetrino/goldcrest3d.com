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
  titleMobileOffsetY: number;
  titleTabletOffsetY: number;
  titleTabletOffsetX: number;
  descriptionLinesDesktop: string[];
  descriptionLinesMobile: string[];
  descriptionLinesTablet: string[];
  bodyDesktopOffsetY: number;
  bodyMobileOffsetY: number;
  bodyTabletOffsetY: number;
  bodyTabletOffsetX: number;
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
  titleMobileOffsetY,
  titleTabletOffsetY,
  titleTabletOffsetX,
  descriptionLinesDesktop,
  descriptionLinesMobile,
  descriptionLinesTablet,
  bodyDesktopOffsetY,
  bodyMobileOffsetY,
  bodyTabletOffsetY,
  bodyTabletOffsetX,
}: ModelingBlockHipHopProps) {
  const sameUrl = imageUrlDesktop === imageUrlMobile;
  return (
    <ModelingCard
      title={titleDesktop}
      titleMobile={titleMobile}
      titleTablet={titleTablet}
      titleOffsetYDesktop={titleDesktopOffsetY}
      titleOffsetYMobile={titleMobileOffsetY}
      titleOffsetYTablet={titleTabletOffsetY}
      titleOffsetXTablet={titleTabletOffsetX}
      description=""
      descriptionLines={descriptionLinesMobile}
      descriptionLinesDesktop={descriptionLinesDesktop}
      descriptionLinesTablet={descriptionLinesTablet}
      descriptionOffsetYDesktop={bodyDesktopOffsetY}
      descriptionOffsetYMobile={bodyMobileOffsetY}
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
    />
  );
}
