import type { CSSProperties } from "react";

import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } from "@/components/landing/landing-media-frame.constants";

import { MODELING_CARD_FRAME_MOBILE_CLASSES } from "./modeling-card.constants";

const TITLE = "High Jewelry";
const LINE_1 =
  "Advanced pavé and fine-setting structures developed with micron-level precision.";
const LINE_2 =
  "Invisible settings and ultra-thin tolerances engineered with strict structural discipline.";

function highJewelryBackground(imageUrl: string): CSSProperties {
  return {
    backgroundImage: `url("${imageUrl}")`,
    backgroundColor: LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED,
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  };
}

type ModelingBlockHighJewelryProps = {
  imageUrl: string;
};

/** High Jewelry block. Full-bleed background (Figma 222:264), title + 2 lines centered. */
export function ModelingBlockHighJewelry({ imageUrl }: ModelingBlockHighJewelryProps) {
  return (
    <article
      className={`relative min-w-0 overflow-hidden ${MODELING_CARD_FRAME_MOBILE_CLASSES}`}
    >
      <div
        className="absolute inset-0"
        data-landing-image={LANDING_IMAGE_IDS.MODELING_HIGH_JEWELRY}
        style={highJewelryBackground(imageUrl)}
      />
      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-black max-sm:translate-y-[136px]"
        style={{ marginTop: "-30%" }}
      >
        <h3 className="font-sans text-[20px] font-bold leading-[28px] tracking-[-0.449px] text-black max-sm:translate-y-3 sm:font-manrope sm:text-[32px] sm:leading-[24px] sm:tracking-normal sm:font-bold">
          {TITLE}
        </h3>
        <p className="mt-4 block w-[243px] max-w-full shrink-0 text-center font-sans text-[12px] font-light leading-4 text-[#364153] sm:hidden">
          {LINE_1}
        </p>
        <div className="mt-4 hidden max-w-[520px] font-manrope text-[14px] font-light leading-[22px] text-black/70 sm:block">
          <span className="block">{LINE_1}</span>
          <span className="mt-0.5 block -translate-x-3 whitespace-nowrap">{LINE_2}</span>
        </div>
      </div>
    </article>
  );
}
