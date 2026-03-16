import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import { ModelingCard } from "./ModelingCard";

/** 3D Portrait Jewelry block. Female face pendant central; keep face in frame. */
export function ModelingBlockPortrait() {
  return (
    <ModelingCard
      title="3D Portrait Jewelry"
      description="High-relief sculptural portraits engineered with controlled volume distribution and balanced weight architecture. Developed to integrate pavé surfaces, deep dimensional detail and reinforced structural support for long-term durability."
      imageSrc={LANDING_IMAGES.modelingPortrait}
      imageId={LANDING_IMAGE_IDS.MODELING_PORTRAIT}
      gradient="linear-gradient(167.92deg, rgb(6, 6, 6) 14.648%, rgb(192, 162, 102) 73.599%)"
      imageOnLeft={false}
      textAlign="left"
      titleBold
      imagePosition="center center"
    />
  );
}
