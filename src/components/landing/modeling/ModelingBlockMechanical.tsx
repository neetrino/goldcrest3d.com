import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import { ModelingCard } from "./ModelingCard";

/** Mechanical & Lock Systems block. Chain and clasp converge at bottom center. */
export function ModelingBlockMechanical() {
  return (
    <ModelingCard
      title="Mechanical & Lock Systems"
      description="Tolerance-calibrated clasps, hinges and multi-part articulated structures engineered for controlled movement and secure locking performance. Functional systems developed for durability, precision alignment and long-term mechanical reliability."
      imageSrc={LANDING_IMAGES.modelingMechanical}
      imageId={LANDING_IMAGE_IDS.MODELING_MECHANICAL}
      gradient="linear-gradient(167.92deg, rgb(102, 110, 112) 14.648%, rgb(176, 179, 183) 85.526%)"
      imageOnLeft={true}
      textAlign="right"
      titleBold
      imagePosition="center bottom"
    />
  );
}
