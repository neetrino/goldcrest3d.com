import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import { ModelingCard } from "./ModelingCard";

/** Ancient & Heritage Jewelry block. Medallion centered; preserve relief detail. */
export function ModelingBlockHeritage() {
  return (
    <ModelingCard
      title="Ancient & Heritage Jewelry"
      description="Cultural and historical motifs re-engineered into structurally optimized, production-ready CAD frameworks. Authentic design language preserved through precise digital reconstruction and manufacturing awareness."
      imageSrc={LANDING_IMAGES.modelingHeritage}
      imageId={LANDING_IMAGE_IDS.MODELING_HERITAGE}
      gradient="linear-gradient(167.92deg, rgb(122, 122, 122) 14.648%, rgb(0, 0, 0) 85.526%)"
      imageOnLeft={true}
      textAlign="right"
      titleBold
      descriptionMuted
      imagePosition="center center"
    />
  );
}
