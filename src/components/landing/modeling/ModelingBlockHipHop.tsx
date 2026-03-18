import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import { getModelingHipHopCardBackgroundStyle } from "./modeling-hiphop-background.constants";
import { ModelingCard } from "./ModelingCard";

/** Hip-Hop Jewelry block — Figma background layer on image area. */
export function ModelingBlockHipHop() {
  return (
    <ModelingCard
      title="Hip-Hop Jewelry"
      description="High-mass, fully iced-out structures engineered for structural durability and controlled weight distribution. Advanced pavé density calibration and reinforced stone retention designed for intensive wear and long-term performance."
      imageSrc={LANDING_IMAGES.modelingHipHop}
      imageId={LANDING_IMAGE_IDS.MODELING_HIPHOP}
      imageOnLeft={false}
      textAlign="left"
      imageLayerBackground={getModelingHipHopCardBackgroundStyle()}
    />
  );
}
