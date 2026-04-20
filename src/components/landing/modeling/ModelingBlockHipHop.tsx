import { LANDING_IMAGE_IDS } from "@/constants";
import { getModelingHipHopCardBackgroundStyle } from "./modeling-hiphop-background.constants";
import { ModelingCard } from "./ModelingCard";

type ModelingBlockHipHopProps = {
  imageUrlDesktop: string;
  imageUrlMobile: string;
  titleDesktop: string;
  titleMobile: string;
  titleDesktopOffsetY: number;
  titleMobileOffsetY: number;
  descriptionLinesDesktop: string[];
  descriptionLinesMobile: string[];
  bodyDesktopOffsetY: number;
  bodyMobileOffsetY: number;
};

/** Hip-Hop Jewelry block — Figma background layer on image area. */
export function ModelingBlockHipHop({
  imageUrlDesktop,
  imageUrlMobile,
  titleDesktop,
  titleMobile,
  titleDesktopOffsetY,
  titleMobileOffsetY,
  descriptionLinesDesktop,
  descriptionLinesMobile,
  bodyDesktopOffsetY,
  bodyMobileOffsetY,
}: ModelingBlockHipHopProps) {
  const sameUrl = imageUrlDesktop === imageUrlMobile;
  return (
    <ModelingCard
      title={titleDesktop}
      titleMobile={titleMobile}
      titleOffsetYDesktop={titleDesktopOffsetY}
      titleOffsetYMobile={titleMobileOffsetY}
      description=""
      descriptionLines={descriptionLinesMobile}
      descriptionLinesDesktop={descriptionLinesDesktop}
      descriptionOffsetYDesktop={bodyDesktopOffsetY}
      descriptionOffsetYMobile={bodyMobileOffsetY}
      imageSrc={imageUrlDesktop}
      imageId={LANDING_IMAGE_IDS.MODELING_HIPHOP}
      imageOnLeft={false}
      textAlign="left"
      imageLayerBackground={getModelingHipHopCardBackgroundStyle(imageUrlDesktop)}
      imageLayerBackgroundMobile={
        sameUrl ? undefined : getModelingHipHopCardBackgroundStyle(imageUrlMobile)
      }
      imagePairBreakpoint="md"
      mobileHipHopTypography
    />
  );
}
