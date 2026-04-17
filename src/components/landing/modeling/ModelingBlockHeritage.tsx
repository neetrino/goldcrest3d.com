import Image from "next/image";

import type { ModelingCardFields } from "@/lib/managed-home/managed-home-schemas";
import { LANDING_IMAGE_IDS } from "@/constants";
import { LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } from "@/components/landing/landing-media-frame.constants";

import { MODELING_CARD_FRAME_MOBILE_CLASSES } from "./modeling-card.constants";
import type { ModelingBlockViewport } from "./ModelingBlockHipHop";
import { ModelingPlainText } from "./ModelingPlainText";

const HERITAGE_TITLE = "3D Portrait Jewelry";
const HERITAGE_TITLE_MOBILE_LINE_1 = "3D Portrait";
const HERITAGE_TITLE_MOBILE_LINE_2 = "Jewelry";

const HERITAGE_DESCRIPTION_LINES_MOBILE = [
  "High-relief sculptural",
  "portraits engineered with",
  "controlled volume",
  "distribution and balanced",
  "weight architecture.",
] as const;

const HERITAGE_DESCRIPTION_LINES = [
  "High-relief sculptural portraits",
  "engineered with controlledvolume",
  "distribution and balanced weight",
  "architecture. Developed to integrate",
  "pavé surfaces, deep dimensional detail",
  "and reinforced structural support for",
  "long-term durability.",
] as const;

type HeritageOverlayProps = {
  managed?: ModelingCardFields;
  viewport: ModelingBlockViewport;
  emulateMobileChrome: boolean;
};

function HeritageOverlayText({ managed, viewport, emulateMobileChrome }: HeritageOverlayProps) {
  const desktopTitle = managed?.title ?? HERITAGE_TITLE;
  const m1 = managed?.titleLine1 ?? HERITAGE_TITLE_MOBILE_LINE_1;
  const m2 = managed?.titleLine2 ?? HERITAGE_TITLE_MOBILE_LINE_2;
  const mobileLines =
    managed?.descriptionLines != null && managed.descriptionLines.length > 0
      ? managed.descriptionLines
      : [...HERITAGE_DESCRIPTION_LINES_MOBILE];
  const desktopLines =
    managed?.descriptionLines != null && managed.descriptionLines.length > 0
      ? managed.descriptionLines
      : [...HERITAGE_DESCRIPTION_LINES];

  const mobileShell =
    emulateMobileChrome
      ? "absolute inset-0 z-10 flex items-start justify-end px-[calc(1.5rem*var(--ms,1))] py-[calc(2rem*var(--ms,1))]"
      : "absolute inset-0 z-10 flex items-start justify-end px-[calc(1.5rem*var(--ms,1))] py-[calc(2rem*var(--ms,1))] md:px-[calc(2rem*var(--ms,1))] md:py-[calc(2.5rem*var(--ms,1))]";

  if (viewport === "mobile") {
    return (
      <div className={mobileShell}>
        <div className="-translate-x-[calc(0.3rem*var(--ms,1))] -translate-y-[calc(0rem*var(--ms,1))] max-w-[calc(540px*var(--ms,1))] text-right text-black">
          <h3 className="mt-[calc(2.25rem*var(--ms,1))] font-sans text-[calc(20px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(20px*var(--ms,1)*var(--mt,1))] tracking-[-0.449px]">
            <span className="block text-right translate-y-[calc(2.75rem*var(--ms,1))]">
              <span className="block">
                <ModelingPlainText text={m1} />
              </span>
              <span className="block">
                <ModelingPlainText text={m2} />
              </span>
            </span>
          </h3>
          <p className="mt-[calc(3.5rem*var(--ms,1))] w-[calc(470px*var(--ms,1))] max-w-full font-sans text-[calc(12px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(1rem*var(--ms,1)*var(--mt,1))] text-[#364153]">
            {mobileLines.map((line, i) => (
              <span key={`heritage-m-${i}`} className="block whitespace-pre-line">
                {line.length === 0 ? "\u00A0" : line}
              </span>
            ))}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-10 flex items-start justify-end px-[calc(1.5rem*var(--ms,1))] py-[calc(2rem*var(--ms,1))] md:px-[calc(2rem*var(--ms,1))] md:py-[calc(2.5rem*var(--ms,1))]">
      <div className="-translate-x-[calc(0.3rem*var(--ms,1))] max-w-[calc(540px*var(--ms,1))] text-right text-black md:-translate-x-[calc(1.5rem*var(--ms,1))] md:mt-[calc(12.7rem*var(--ms,1))] md:-translate-y-[calc(4.15rem*var(--ms,1))]">
        <h3 className="mt-[calc(2.25rem*var(--ms,1))] font-manrope text-[calc(32px*var(--ms,1)*var(--mt,1))] font-extrabold leading-[calc(24px*var(--ms,1)*var(--mt,1))] sm:mt-0 sm:scale-x-105 sm:origin-right sm:tracking-normal">
          <span className="inline">
            <ModelingPlainText text={desktopTitle} />
          </span>
        </h3>
        <p className="mt-[calc(1rem*var(--ms,1))] w-[calc(470px*var(--ms,1))] max-w-full font-manrope text-[calc(14px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(22px*var(--ms,1)*var(--mt,1))] text-black">
          {desktopLines.map((line, i) => (
            <span key={`heritage-d-${i}`} className="block whitespace-pre-line">
              {line.length === 0 ? "\u00A0" : line}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

type ModelingBlockHeritageProps = {
  imageUrlDesktop: string;
  imageUrlMobile: string;
  managed?: ModelingCardFields;
  viewport: ModelingBlockViewport;
  emulateMobileChrome?: boolean;
};

/** Ancient & Heritage Jewelry block. Full-bleed image with title and description overlay. */
export function ModelingBlockHeritage({
  imageUrlDesktop,
  imageUrlMobile,
  managed,
  viewport,
  emulateMobileChrome = false,
}: ModelingBlockHeritageProps) {
  const sameUrl = imageUrlDesktop === imageUrlMobile;
  const mobileImgWrap = emulateMobileChrome
    ? "absolute inset-0 block"
    : "absolute inset-0 md:hidden";
  const desktopImgWrap = emulateMobileChrome
    ? "absolute inset-0 hidden"
    : "absolute inset-0 hidden md:block";
  return (
    <article
      className={`relative min-w-0 overflow-hidden ${MODELING_CARD_FRAME_MOBILE_CLASSES}`}
    >
      <div
        className="absolute inset-0"
        data-landing-image={LANDING_IMAGE_IDS.MODELING_HERITAGE}
        style={{ backgroundColor: LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED }}
      >
        {sameUrl ? (
          <Image
            src={imageUrlDesktop}
            alt=""
            fill
            className="h-full w-full object-cover object-center"
            sizes="(max-width: 767px) 100vw, 50vw"
          />
        ) : (
          <>
            <div className={mobileImgWrap}>
              <Image
                src={imageUrlMobile}
                alt=""
                fill
                className="min-h-0 min-w-0 h-full w-full object-cover object-center"
                sizes="(max-width: 767px) 100vw, 0px"
              />
            </div>
            <div className={desktopImgWrap}>
              <Image
                src={imageUrlDesktop}
                alt=""
                fill
                className="h-full w-full object-cover object-center"
                sizes="(max-width: 1280px) 50vw, 33vw"
              />
            </div>
          </>
        )}
      </div>
      <HeritageOverlayText
        managed={managed}
        viewport={viewport}
        emulateMobileChrome={emulateMobileChrome}
      />
    </article>
  );
}
