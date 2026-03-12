import { LANDING_IMAGES } from "@/constants/landing-assets";
import { ModelingCard } from "./ModelingCard";

/** Hip-Hop Jewelry block. Tiger pendant on right; keep it visible. */
export function ModelingBlockHipHop() {
  return (
    <ModelingCard
      title="Hip-Hop Jewelry"
      description="High-mass, fully iced-out structures engineered for structural durability and controlled weight distribution. Advanced pavé density calibration and reinforced stone retention designed for intensive wear and long-term performance."
      imageSrc={LANDING_IMAGES.modelingHipHop}
      imageOnLeft={false}
      textAlign="left"
      imagePosition="right center"
    />
  );
}
