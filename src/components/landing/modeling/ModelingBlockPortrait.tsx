import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import { ModelingCard } from "./ModelingCard";

/** 3D Portrait Jewelry. Bright image; light mint background so block never looks dark. */
const PORTRAIT_BG =
  "url(\"/images/modeling/portrait-jewelry.png\") #E0F2F1 center / cover no-repeat";

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

export function ModelingBlockPortrait() {
  return (
    <ModelingCard
      title="3D Portrait Jewelry"
      description=""
      descriptionLines={[...PORTRAIT_DESCRIPTION_LINES]}
      descriptionLinesMobile={[...PORTRAIT_DESCRIPTION_LINES_MOBILE]}
      imageSrc={LANDING_IMAGES.modelingPortrait}
      imageId={LANDING_IMAGE_IDS.MODELING_PORTRAIT}
      imageOnLeft={false}
      textAlign="left"
      descriptionAlign="right"
      titleCompact
      imagePosition="center center"
      imageLayerBackground={{ background: PORTRAIT_BG }}
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
