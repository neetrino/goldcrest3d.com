import { LANDING_IMAGE_IDS } from "@/constants";
import { ModelingCard } from "./ModelingCard";

function portraitLayerBackground(imageUrl: string): string {
  return `url("${imageUrl}") #E0F2F1 center / cover no-repeat`;
}

const PORTRAIT_DESCRIPTION_LINES = [
  "High-relief sculptural portraits",
  "engineered with controlledvolume",
  "distribution and balanced weight",
  "architecture. Developed to integrate",
  "pavé surfaces, deep dimensional detail",
  "and reinforced structural support for",
  "long-term durability.",
] as const;

/** Below `sm` only; desktop unchanged. */
const PORTRAIT_DESCRIPTION_LINES_MOBILE = [
  "High-relief sculptural portraits engineered with controlled volume distribution and balanced weight architecture.",
] as const;

type ModelingBlockPortraitProps = {
  imageUrlDesktop: string;
  imageUrlMobile: string;
};

export function ModelingBlockPortrait({
  imageUrlDesktop,
  imageUrlMobile,
}: ModelingBlockPortraitProps) {
  const sameUrl = imageUrlDesktop === imageUrlMobile;
  return (
    <ModelingCard
      title="3D Portrait Jewelry"
      description=""
      descriptionLines={[...PORTRAIT_DESCRIPTION_LINES]}
      descriptionLinesMobile={[...PORTRAIT_DESCRIPTION_LINES_MOBILE]}
      imageSrc={imageUrlDesktop}
      imageId={LANDING_IMAGE_IDS.MODELING_PORTRAIT}
      imageOnLeft={false}
      textAlign="left"
      descriptionAlign="right"
      titleCompact
      imagePosition="center center"
      imageLayerBackground={{ background: portraitLayerBackground(imageUrlDesktop) }}
      imageLayerBackgroundMobile={
        sameUrl ? undefined : { background: portraitLayerBackground(imageUrlMobile) }
      }
      imagePairBreakpoint="md"
      textDark
      independentTitleDescription
      titleBlockTop="34%"
      titleBlockLeft="5%"
      descriptionBlockTop="45%"
      descriptionBlockLeft="-7%"
      mobilePortraitTypography
    />
  );
}
