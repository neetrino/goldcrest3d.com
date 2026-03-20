import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import {
  MODELING_CARD_ASPECT_RATIO,
  getModelingCardWidthStyle,
} from "./modeling-card.constants";

const TITLE = "High Jewelry";
const DESCRIPTION =
  "Advanced pavé and fine-setting structures developed with micron-level precision. Invisible settings and ultra-thin tolerances engineered with strict structural discipline.";

/** Figma 222:264 — background with exact position/size so image fills the block. */
const HIGH_JEWELRY_BACKGROUND = {
  backgroundImage: `url(${LANDING_IMAGES.modelingHighJewelry})`,
  backgroundColor: "lightgray",
  backgroundPosition: "-42.124px 0.163px",
  backgroundSize: "117.217% 127.221%",
  backgroundRepeat: "no-repeat",
} as const;

/** High Jewelry block. Full-bleed via CSS background (Figma 222:264), overlay left. */
export function ModelingBlockHighJewelry() {
  return (
    <article
      className="relative min-w-0 w-full overflow-hidden"
      style={{
        ...getModelingCardWidthStyle(),
        aspectRatio: MODELING_CARD_ASPECT_RATIO,
      }}
    >
      <div
        className="absolute inset-0"
        data-landing-image={LANDING_IMAGE_IDS.MODELING_HIGH_JEWELRY}
        style={HIGH_JEWELRY_BACKGROUND}
      />
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 py-8 text-black md:px-8 md:py-10">
        <h3 className="font-manrope text-[32px] font-bold leading-[24px] scale-x-105 origin-left">
          {TITLE}
        </h3>
        <p className="mt-4 max-w-[407px] font-manrope text-[16px] font-light leading-[26px] text-black/70">
          {DESCRIPTION}
        </p>
      </div>
    </article>
  );
}
