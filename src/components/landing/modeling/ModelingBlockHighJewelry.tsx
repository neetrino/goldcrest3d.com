import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import { MODELING_CARD_FRAME_MOBILE_CLASSES } from "./modeling-card.constants";

const TITLE = "High Jewelry";
const LINE_1 =
  "Advanced pavé and fine-setting structures developed with micron-level precision.";
const LINE_2 =
  "Invisible settings and ultra-thin tolerances engineered with strict structural discipline.";

/** Figma 222:264 — background with exact position/size so image fills the block. */
const HIGH_JEWELRY_BACKGROUND = {
  backgroundImage: `url(${LANDING_IMAGES.modelingHighJewelry})`,
  backgroundColor: "lightgray",
  backgroundPosition: "-42.124px 0.163px",
  backgroundSize: "117.217% 127.221%",
  backgroundRepeat: "no-repeat",
} as const;

/** High Jewelry block. Full-bleed background (Figma 222:264), title + 2 lines centered. */
export function ModelingBlockHighJewelry() {
  return (
    <article
      className={`relative min-w-0 overflow-hidden ${MODELING_CARD_FRAME_MOBILE_CLASSES}`}
    >
      <div
        className="absolute inset-0"
        data-landing-image={LANDING_IMAGE_IDS.MODELING_HIGH_JEWELRY}
        style={HIGH_JEWELRY_BACKGROUND}
      />
      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-black"
        style={{ marginTop: "-30%" }}
      >
        <h3 className="font-manrope text-[32px] font-bold leading-[24px]">
          {TITLE}
        </h3>
        <div className="mt-4 max-w-[520px] font-manrope text-[14px] font-light leading-[22px] text-black/70">
          <span className="block">{LINE_1}</span>
          <span
            className="mt-0.5 block whitespace-nowrap"
            style={{ transform: "translateX(-12px)" }}
          >
            {LINE_2}
          </span>
        </div>
      </div>
    </article>
  );
}
