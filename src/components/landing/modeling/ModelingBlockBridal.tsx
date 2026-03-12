import { LANDING_IMAGES } from "@/constants/landing-assets";
import { ModelingCard } from "./ModelingCard";

/** Bridal & Engagement block. Engagement ring lower-middle; anchor so stone stays visible. */
export function ModelingBlockBridal() {
  return (
    <ModelingCard
      title="Bridal & Engagement"
      description="Engineered engagement and bridal settings built for durability, comfort and precise stone alignment. Secure prong architecture developed for long-term wear."
      imageSrc={LANDING_IMAGES.modelingBridal}
      imageOnLeft={true}
      textAlign="right"
      imagePosition="center 55%"
    />
  );
}
