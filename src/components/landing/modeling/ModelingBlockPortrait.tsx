import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import { ModelingCard } from "./ModelingCard";

/** 3D Portrait Jewelry. Bright image; light mint background so block never looks dark. */
const PORTRAIT_BG =
  "url(\"/images/modeling/portrait-jewelry.png\") #E0F2F1 center / cover no-repeat";

export function ModelingBlockPortrait() {
  return (
    <ModelingCard
      title="3D Portrait Jewelry"
      description="High-relief sculptural portraits engineered with controlled volume distribution and balanced weight architecture. Developed to integrate pavé surfaces, deep dimensional detail and reinforced structural support for long-term durability."
      imageSrc={LANDING_IMAGES.modelingPortrait}
      imageId={LANDING_IMAGE_IDS.MODELING_PORTRAIT}
      imageOnLeft={false}
      textAlign="left"
      titleBold
      imagePosition="center center"
      imageLayerBackground={{ background: PORTRAIT_BG }}
      textDark
    />
  );
}
