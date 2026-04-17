import Image from "next/image";

import type { ModelingCardFields } from "@/lib/managed-home/managed-home-schemas";
import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } from "@/components/landing/landing-media-frame.constants";

import { MODELING_CARD_FRAME_MOBILE_CLASSES } from "./modeling-card.constants";
import type { ModelingBlockViewport } from "./ModelingBlockHipHop";
import { ModelingPlainText } from "./ModelingPlainText";

const MOBILE_TITLE = "Ancient & Heritage Jewelry";
const DESKTOP_TITLE = "Ancient & Heritage Jewelry";

const DEFAULT_MOBILE_LINES = [
  "Cultural and historical motifs re-engineered",
  "into structurally optimized, production-ready CAD frameworks.",
] as const;

const DEFAULT_DESKTOP_LINES = [
  "Cultural and historical motifs re-engineered into structurally optimized, production-ready",
  "CAD frameworks. Authentic design language preserved through precise digital",
  "reconstruction and manufacturing awareness.",
] as const;

type ModelingBlockHighJewelryProps = {
  imageUrlDesktop: string;
  imageUrlMobile: string;
  managed?: ModelingCardFields;
  viewport: ModelingBlockViewport;
  emulateMobileChrome?: boolean;
};

/** High Jewelry — full-bleed image with centered title and description. */
export function ModelingBlockHighJewelry({
  imageUrlDesktop,
  imageUrlMobile,
  managed,
  viewport,
  emulateMobileChrome = false,
}: ModelingBlockHighJewelryProps) {
  const sameUrl = imageUrlDesktop === imageUrlMobile;
  const objectClassName =
    "h-full w-full object-cover max-md:object-right md:object-[center_48%_center]";
  const mobileImgWrap = emulateMobileChrome
    ? "absolute inset-0 block"
    : "absolute inset-0 md:hidden";
  const desktopImgWrap = emulateMobileChrome
    ? "absolute inset-0 hidden"
    : "absolute inset-0 hidden md:block";
  const overlayStackClass = emulateMobileChrome
    ? "absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-black translate-y-[calc(144px*var(--ms,1))]"
    : "absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-black max-sm:translate-y-[calc(144px*var(--ms,1))]";
  const titleHeadingClass =
    viewport === "mobile" || emulateMobileChrome
      ? "font-sans text-[calc(20px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(28px*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] text-black translate-y-[calc(0.75rem*var(--ms,1))]"
      : "font-sans text-[calc(20px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(28px*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] text-black max-sm:translate-y-[calc(0.75rem*var(--ms,1))] sm:font-manrope sm:text-[calc(32px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(24px*var(--ms,1)*var(--mt,1))] sm:tracking-normal sm:font-bold";
  const title = managed?.title ?? (viewport === "mobile" ? MOBILE_TITLE : DESKTOP_TITLE);
  const mobileLines =
    managed?.descriptionLines != null && managed.descriptionLines.length > 0
      ? managed.descriptionLines
      : [...DEFAULT_MOBILE_LINES];
  const desktopLines =
    managed?.descriptionLines != null && managed.descriptionLines.length > 0
      ? managed.descriptionLines
      : [...DEFAULT_DESKTOP_LINES];

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
            <div className={mobileImgWrap}>
              <Image
                src={imageUrlMobile}
                alt=""
                fill
                className="min-h-0 min-w-0 h-full w-full object-cover object-right"
                sizes="(max-width: 767px) 100vw, 0px"
              />
            </div>
            <div className={desktopImgWrap}>
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
        className={overlayStackClass}
        style={{ marginTop: "-33%" }}
      >
        <h3 className={titleHeadingClass}>
          <ModelingPlainText text={title} />
        </h3>
        {viewport === "mobile" ? (
          <p className="mt-[calc(1rem*var(--ms,1))] block w-[min(100%,calc(280px*var(--ms,1)))] max-w-full shrink-0 text-center font-sans text-[calc(12px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(1rem*var(--ms,1)*var(--mt,1))] text-[#364153]">
            {mobileLines.map((line, i) => (
              <span
                key={`hj-m-${i}`}
                className={
                  i === 0
                    ? "block whitespace-pre-line"
                    : "mt-[calc(0.25rem*var(--ms,1))] block whitespace-pre-line"
                }
              >
                {line.length === 0 ? "\u00A0" : line}
              </span>
            ))}
          </p>
        ) : null}
        {viewport === "desktop" ? (
          <div className="mt-[calc(1rem*var(--ms,1))] max-w-[calc(520px*var(--ms,1))] font-manrope text-[calc(14px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(22px*var(--ms,1)*var(--mt,1))] text-black/70">
            {desktopLines.map((line, i) => (
              <span key={`hj-d-${i}`} className="block whitespace-pre-line">
                {line.length === 0 ? "\u00A0" : line}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
