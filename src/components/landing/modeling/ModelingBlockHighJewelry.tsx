import Image from "next/image";

import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } from "@/components/landing/landing-media-frame.constants";

import { MODELING_CARD_FRAME_MOBILE_CLASSES } from "./modeling-card.constants";

const TITLE = "High Jewelry";
const LINE_1 =
  "Advanced pavé and fine-setting structures developed with micron-level";
const LINE_2 =
  "Invisible settings and ultra-thin tolerances engineered with strict structural discipline.";

type ModelingBlockHighJewelryProps = {
  imageUrlDesktop: string;
  imageUrlMobile: string;
};

/** High Jewelry — `object-cover` ամբողջ block-ում; mobile-ում աջ anchor, desktop-ում կենտրոնացված crop։ */
export function ModelingBlockHighJewelry({
  imageUrlDesktop,
  imageUrlMobile,
}: ModelingBlockHighJewelryProps) {
  const sameUrl = imageUrlDesktop === imageUrlMobile;
  const objectClassName =
    "h-full w-full object-cover max-md:object-right md:object-[center_48%_center]";
  return (
    <article
      className={`relative min-w-0 overflow-hidden ${MODELING_CARD_FRAME_MOBILE_CLASSES}`}
    >
      <div
        className="absolute inset-0"
        data-landing-image={LANDING_IMAGE_IDS.MODELING_HIGH_JEWELRY}
        style={{ backgroundColor: LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED }}
      >
        {sameUrl ? (
          <Image
            src={imageUrlDesktop}
            alt=""
            fill
            className={objectClassName}
            sizes="(max-width: 767px) 100vw, 50vw"
            unoptimized
          />
        ) : (
          <>
            <div className="absolute inset-0 md:hidden">
              <Image
                src={imageUrlMobile}
                alt=""
                fill
                className="min-h-0 min-w-0 h-full w-full object-cover object-right"
                sizes="(max-width: 767px) 100vw, 0px"
                unoptimized
              />
            </div>
            <div className="absolute inset-0 hidden md:block">
              <Image
                src={imageUrlDesktop}
                alt=""
                fill
                className="h-full w-full object-cover object-[center_48%_center]"
                sizes="(max-width: 1280px) 50vw, 33vw"
                unoptimized
              />
            </div>
          </>
        )}
      </div>
      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-black max-sm:translate-y-[calc(136px*var(--ms,1))]"
        style={{ marginTop: "-30%" }}
      >
        <h3 className="font-sans text-[calc(20px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(28px*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] text-black max-sm:translate-y-[calc(0.75rem*var(--ms,1))] sm:font-manrope sm:text-[calc(32px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(24px*var(--ms,1)*var(--mt,1))] sm:tracking-normal sm:font-bold">
          {TITLE}
        </h3>
        <p className="mt-[calc(1rem*var(--ms,1))] block w-[calc(243px*var(--ms,1))] max-w-full shrink-0 text-center font-sans text-[calc(12px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(1rem*var(--ms,1)*var(--mt,1))] text-[#364153] sm:hidden">
          {LINE_1}
        </p>
        <div className="mt-[calc(1rem*var(--ms,1))] hidden max-w-[calc(520px*var(--ms,1))] font-manrope text-[calc(14px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(22px*var(--ms,1)*var(--mt,1))] text-black/70 sm:block">
          <span className="block">{LINE_1}</span>
          <span className="mt-[calc(0.125rem*var(--ms,1))] block -translate-x-[calc(0.75rem*var(--ms,1))] whitespace-nowrap">{LINE_2}</span>
        </div>
      </div>
    </article>
  );
}
