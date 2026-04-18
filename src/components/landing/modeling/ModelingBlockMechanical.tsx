import Image from "next/image";

import { HeroBannerBodyRichText } from "@/components/landing/power-banners/HeroBannerBodyRichText";
import { LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED } from "@/components/landing/landing-media-frame.constants";
import type { ModelingSlotCopyEntry } from "@/lib/modeling-slot-copy/modeling-slot-copy.types";
import { framingToCoverImageStyle, type ImageFraming } from "@/lib/site-media/image-framing";

import { MODELING_CARD_FRAME_MOBILE_CLASSES } from "./modeling-card.constants";

/** Desktop (md+): nudge first title line up without shifting the rest of the overlay. */
const TITLE_LINE1_DESKTOP_NUDGE_UP_CLASS = "md:-translate-y-1.5";

const MECHANICAL_RICH_BODY =
  "[&_p]:mb-0 [&_p:last-child]:mb-0 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5";

function MechanicalTitleLines({ title }: { title: string }) {
  const lines = title.split(/\r?\n/);
  return lines.map((line, i) => (
    <span
      key={`mechanical-title-${i}`}
      className={`block whitespace-pre ${i === 0 ? TITLE_LINE1_DESKTOP_NUDGE_UP_CLASS : ""}`}
    >
      {line.length > 0 ? line : "\u00A0"}
    </span>
  ));
}

function preserveEmptyParagraphLines(html: string): string {
  return html.replace(
    /<p([^>]*)>\s*(?:<br\s*\/?>)?\s*<\/p>/gi,
    "<p$1>&nbsp;</p>",
  );
}

type ModelingBlockMechanicalProps = {
  copy: ModelingSlotCopyEntry;
  imageUrlDesktop: string;
  imageUrlMobile: string;
  imageFramingDesktop?: ImageFraming | null;
  imageFramingMobile?: ImageFraming | null;
  /** Optional admin preview override: place title/body at top-left. */
  adminPreviewLeftOrigin?: boolean;
};

/** Mechanical & Lock Systems block. Full-bleed image with title and description overlay. */
export function ModelingBlockMechanical({
  copy,
  imageUrlDesktop,
  imageUrlMobile,
  imageFramingDesktop,
  imageFramingMobile,
  adminPreviewLeftOrigin = false,
}: ModelingBlockMechanicalProps) {
  const sameUrl = imageUrlDesktop === imageUrlMobile;
  const bodyDesktop = preserveEmptyParagraphLines(copy.body);
  const bodyMobile = preserveEmptyParagraphLines(copy.bodyMobile);
  const titleDesktop = copy.title;
  const resolvedTitleMobile = copy.titleMobile;
  const mechanicalTitleH3Class =
    "z-10 w-[calc(283px*var(--ms,1))] max-w-full shrink-0 text-left font-sans text-[calc(20px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(28px*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] max-sm:whitespace-normal sm:w-full sm:max-w-[calc(520px*var(--ms,1))] sm:font-manrope sm:text-[calc(32px*var(--ms,1)*var(--mt,1))] sm:leading-[calc(24px*var(--ms,1)*var(--mt,1))] sm:tracking-normal md:scale-x-105 md:origin-left";
  return (
    <article
      className={`relative min-w-0 overflow-hidden ${MODELING_CARD_FRAME_MOBILE_CLASSES}`}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: LANDING_MEDIA_CONTAIN_FRAME_BG_FULL_BLEED }}
      >
        {sameUrl ? (
          <Image
            src={imageUrlDesktop}
            alt=""
            fill
            className={
              imageFramingDesktop
                ? "h-full w-full object-cover"
                : "h-full w-full object-cover max-md:object-[56%_center] md:object-center"
            }
            style={
              imageFramingDesktop
                ? framingToCoverImageStyle(imageFramingDesktop)
                : undefined
            }
            sizes="(max-width: 767px) 100vw, 50vw"
          />
        ) : (
          <>
            <div className="absolute inset-0 md:hidden">
              <Image
                src={imageUrlMobile}
                alt=""
                fill
                className={
                  imageFramingMobile
                    ? "min-h-0 min-w-0 h-full w-full object-cover"
                    : "min-h-0 min-w-0 h-full w-full object-cover object-[56%_center]"
                }
                style={
                  imageFramingMobile
                    ? framingToCoverImageStyle(imageFramingMobile)
                    : undefined
                }
                sizes="(max-width: 767px) 100vw, 0px"
              />
            </div>
            <div className="absolute inset-0 hidden md:block">
              <Image
                src={imageUrlDesktop}
                alt=""
                fill
                className={
                  imageFramingDesktop
                    ? "h-full w-full object-cover"
                    : "h-full w-full object-cover object-center"
                }
                style={
                  imageFramingDesktop
                    ? framingToCoverImageStyle(imageFramingDesktop)
                    : undefined
                }
                sizes="(max-width: 1280px) 50vw, 33vw"
              />
            </div>
          </>
        )}
      </div>
      <div
        className="absolute inset-0 z-10 flex flex-col items-start justify-start gap-[calc(0.75rem*var(--ms,1))] px-[calc(0.75rem*var(--ms,1))] py-[calc(0.5rem*var(--ms,1))] text-black md:gap-[calc(1rem*var(--ms,1))] md:px-[calc(1rem*var(--ms,1))] md:py-[calc(0.75rem*var(--ms,1))]"
      >
        <>
          <h3 className={`${mechanicalTitleH3Class} md:hidden`}>
            <MechanicalTitleLines title={resolvedTitleMobile} />
          </h3>
          <h3 className={`${mechanicalTitleH3Class} hidden md:block`}>
            <MechanicalTitleLines title={titleDesktop} />
          </h3>
        </>
        <div className="w-[calc(283px*var(--ms,1))] max-w-full shrink-0 text-left font-sans text-[calc(12px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(1rem*var(--ms,1)*var(--mt,1))] md:hidden">
          <HeroBannerBodyRichText
            body={bodyMobile}
            className={`modeling-slot-rich-body whitespace-pre ${MECHANICAL_RICH_BODY}`}
          />
        </div>
        <div
          className="hidden w-full max-w-[min(100%,calc(520px*var(--ms,1)))] text-left font-manrope text-[calc(14px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(22px*var(--ms,1)*var(--mt,1))] md:block"
          style={{ overflow: "visible" }}
        >
          <HeroBannerBodyRichText
            body={bodyDesktop}
            className={`modeling-slot-rich-body whitespace-pre ${MECHANICAL_RICH_BODY}`}
          />
        </div>
      </div>
    </article>
  );
}
