import Image from "next/image";

import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } from "@/components/landing/landing-media-frame.constants";

import { MODELING_CARD_FRAME_MOBILE_CLASSES } from "./modeling-card.constants";

const MOBILE_TITLE = "Ancient & Heritage Jewelry";
const DESKTOP_TITLE = "Ancient & Heritage Jewelry";
const DESKTOP_LINE_1 =
  "Cultural and historical motifs re-engineered into structurally optimized,";
const DESKTOP_LINE_1_EMPHASIS = "production-ready";
const DESKTOP_LINE_2 =
  "CAD frameworks. Authentic design language preserved through precise digital";
const DESKTOP_LINE_3 = "reconstruction and manufacturing awareness.";

/** Mobile only â€” explicit line break after â€œstructuresâ€. */
const MOBILE_DESCRIPTION_LINE_1 =
  "Cultural and historical motifs re-engineered";
const MOBILE_DESCRIPTION_LINE_2 =
  "into structurally optimized, production-ready CAD frameworks.";

type ModelingBlockHighJewelryProps = {
  imageUrlDesktop: string;
  imageUrlMobile: string;
};

/** High Jewelry â€” `object-cover` Õ¡Õ´Õ¢Õ¸Õ²Õ» block-Õ¸Ö‚Õ´; mobile-Õ¸Ö‚Õ´ Õ¡Õ» anchor, desktop-Õ¸Ö‚Õ´ Õ¯Õ¥Õ¶Õ¿Ö€Õ¸Õ¶Õ¡ÖÕ¾Õ¡Õ® cropÖ‰ */
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
              />
            </div>
            <div className="absolute inset-0 hidden md:block">
              <Image
                src={imageUrlDesktop}
                alt=""
                fill
                className="h-full w-full object-cover object-[center_48%_center]"
                sizes="(max-width: 1280px) 50vw, 33vw"
              />
            </div>
          </>
        )}
      </div>
      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-black max-sm:translate-y-[calc(160px*var(--ms,1))]"
        style={{ marginTop: "-33%" }}
      >
        <h3 className="font-sans text-[calc(20px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(28px*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] text-black max-sm:translate-y-[calc(0.75rem*var(--ms,1))] sm:font-manrope sm:text-[calc(32px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(24px*var(--ms,1)*var(--mt,1))] sm:tracking-normal sm:font-bold">
          <span className="sm:hidden">{MOBILE_TITLE}</span>
          <span className="hidden sm:inline">{DESKTOP_TITLE}</span>
        </h3>
        <p className="mt-[calc(1rem*var(--ms,1))] block w-[min(100%,calc(280px*var(--ms,1)))] max-w-full shrink-0 text-center font-sans text-[calc(12px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(1rem*var(--ms,1)*var(--mt,1))] text-[#364153] sm:hidden">
          <span className="block whitespace-nowrap">
            {MOBILE_DESCRIPTION_LINE_1}
          </span>
          <span className="mt-[calc(0.25rem*var(--ms,1))] block">
            {MOBILE_DESCRIPTION_LINE_2}
          </span>
        </p>
        <div className="mt-[calc(1rem*var(--ms,1))] hidden max-w-[calc(520px*var(--ms,1))] font-manrope text-[calc(14px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(22px*var(--ms,1)*var(--mt,1))] text-black/70 sm:block">
          <span className="block whitespace-nowrap -translate-x-[calc(1.9rem*var(--ms,1))]">
            {DESKTOP_LINE_1}{" "}
            <span className="whitespace-nowrap">{DESKTOP_LINE_1_EMPHASIS}</span>
          </span>
          <span className="mt-[calc(0.125rem*var(--ms,1))] block">
            {DESKTOP_LINE_2}
          </span>
          <span className="block">{DESKTOP_LINE_3}</span>
        </div>
      </div>
    </article>
  );
}
