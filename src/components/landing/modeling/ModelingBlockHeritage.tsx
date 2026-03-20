import Image from "next/image";

import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import {
  MODELING_CARD_ASPECT_RATIO,
  getModelingCardWidthStyle,
} from "./modeling-card.constants";

const TITLE = "Ancient & Heritage Jewelry";
const DESCRIPTION =
  "Cultural and historical motifs re-engineered into structurally optimized, production-ready CAD frameworks. Authentic design language preserved through precise digital reconstruction and manufacturing awareness.";

/** Ancient & Heritage Jewelry block. Full-bleed image with title and description overlay (Figma 222:259). */
export function ModelingBlockHeritage() {
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
        data-landing-image={LANDING_IMAGE_IDS.MODELING_HERITAGE}
      >
        <Image
          src={LANDING_IMAGES.modelingHeritage}
          alt=""
          fill
          className="object-cover object-left"
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized
        />
      </div>
      <h3
        className="absolute right-6 top-6 z-10 whitespace-nowrap font-manrope text-[32px] font-bold leading-[24px] text-black md:right-[21rem] md:top-[3.25rem] md:scale-x-105 md:origin-right"
      >
        {TITLE}
      </h3>
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 py-8 text-black md:flex-row md:justify-end md:px-8 md:py-10">
        <p
          className="max-w-[520px] text-right font-manrope text-[14px] font-light leading-[22px] text-black/70 md:mr-[34%] md:mt-[3.75rem]"
          style={{ overflow: "visible" }}
        >
          {DESCRIPTION}
        </p>
      </div>
    </article>
  );
}
