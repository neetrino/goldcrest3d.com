import { LANDING_IMAGE_IDS } from "@/constants";
import { getModelingHipHopCardBackgroundStyle } from "./modeling-hiphop-background.constants";
import { ModelingCard } from "./ModelingCard";

type ModelingBlockHipHopProps = {
  imageUrlDesktop: string;
  imageUrlMobile: string;
  titleDesktop: string;
  titleMobile: string;
  descriptionLinesDesktop: string[];
  descriptionLinesMobile: string[];
};

/** Hip-Hop Jewelry block — Figma background layer on image area. */
export function ModelingBlockHipHop({
  imageUrlDesktop,
  imageUrlMobile,
  titleDesktop,
  titleMobile,
  descriptionLinesDesktop,
  descriptionLinesMobile,
}: ModelingBlockHipHopProps) {
  const sameUrl = imageUrlDesktop === imageUrlMobile;
  return (
    <ModelingCard
      title={titleDesktop}
      titleMobile={titleMobile}
      description=""
      descriptionLines={descriptionLinesMobile}
      descriptionLinesDesktop={descriptionLinesDesktop}
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
