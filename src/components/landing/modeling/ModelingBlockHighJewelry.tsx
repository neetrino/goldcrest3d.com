import { LANDING_IMAGES } from "@/constants/landing-assets";
import { ModelingCard } from "./ModelingCard";

/** High Jewelry block. Gold ring with black stone; center in frame. */
export function ModelingBlockHighJewelry() {
  return (
    <ModelingCard
      title="High Jewelry"
      description="Advanced pavé and fine-setting structures developed with micron-level precision. Invisible settings and ultra-thin tolerances engineered with strict structural discipline."
      imageSrc={LANDING_IMAGES.modelingHighJewelry}
      gradient="linear-gradient(177.43deg, rgb(53, 53, 53) 19.132%, rgb(196, 195, 195) 96.072%)"
      imageOnLeft={false}
      textAlign="left"
      imagePosition="center center"
    />
  );
}
