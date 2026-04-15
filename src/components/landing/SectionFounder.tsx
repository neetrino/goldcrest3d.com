import { LANDING_IMAGE_IDS, LANDING_SECTION_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import {
  FOUNDER_SECTION_BUILTIN_IMAGE_SRC,
  FOUNDER_SECTION_DEFAULT_NAME,
} from "@/lib/founder-section/founder-section-defaults";
import type { FounderSectionEntry } from "@/lib/founder-section/founder-section.types";
import { framingToCoverImageStyle } from "@/lib/site-media/image-framing";
import Image from "next/image";
import { HeroBannerBodyRichText } from "./power-banners/HeroBannerBodyRichText";

const FOUNDER_STAT_NUMBER_CLASS_DEFAULT =
  "font-black leading-[32px] text-[#0f172a] text-[24px] md:text-[28px]";


/** Tablet-ում մի քիչ աջ, desktop-ում պահում ենք նախորդ ձախ տեղաշարժը */
const FOUNDER_PHOTO_DESKTOP_NUDGE_LEFT_CLASS =
  "md:max-lg:-translate-x-0 lg:-translate-x-24";

/** Outer section shell — baseline unchanged below `xl`; larger insets + footprint on wide desktops */
const FOUNDER_SECTION_WRAPPER_CLASS =
  "-mt-8 bg-[#f8f7f6] px-4 pt-0 pb-12 md:-mt-12 md:px-6 md:pt-0 md:pb-16 xl:px-10 xl:pb-20 2xl:px-14 2xl:pb-28";

/** Founder գրադարան — lg (1024px) կոմպակտ, xl-ից վեր՝ լայն դեսքտոփ */
const FOUNDER_GRADIENT_PANEL_CLASS =
  "relative mx-auto flex h-[431.867px] min-h-0 w-full max-w-full shrink-0 flex-col self-stretch overflow-hidden rounded-none bg-[linear-gradient(100deg,#D9D9D9_12.7%,#C69F58_67.88%,#FFDDA0_81.27%,#D9AA54_92.63%)] min-[430px]:max-md:h-[500px] md:mt-[88px] md:h-[560px] md:max-lg:h-auto md:w-full md:max-w-[1440px] md:shrink md:flex-row md:self-auto lg:mt-10 lg:h-[560px] xl:mt-[88px] xl:h-[680px]";

const FOUNDER_DESKTOP_TEXT_COLUMN_CLASS =
  "hidden min-h-0 flex-1 flex-col px-4 pt-6 pb-6 sm:px-6 sm:pt-8 sm:pb-8 md:flex md:pl-16 md:pr-10 md:pt-20 md:pb-10 md:min-h-[280px] md:max-lg:-translate-y-7 md:max-lg:pl-10 md:max-lg:pr-6 md:max-lg:pt-12 md:max-lg:pb-6 lg:pl-14 lg:pr-8 lg:pt-14 lg:pb-6 lg:min-h-0 xl:pl-28 xl:pr-12 xl:pt-40 xl:pb-16 xl:min-h-[320px]";

const FOUNDER_DESKTOP_HEADING_CLASS =
  "text-left font-black text-[#0f172a] text-[32px] leading-[38px] tracking-[-1.2px] md:text-[34px] md:leading-[40px] md:max-lg:text-[clamp(30px,4vw,34px)] md:max-lg:leading-[clamp(34px,4.6vw,40px)] xl:text-[36px] xl:leading-[40px]";

const FOUNDER_DESKTOP_BIO_TOP_MARGIN_CLASS = "mt-5 sm:mt-6 md:mt-6 lg:mt-4 xl:mt-10";

const FOUNDER_DESKTOP_STATS_SECTION_CLASS =
  "mt-6 flex flex-wrap gap-6 sm:gap-8 sm:mt-8 md:mt-10 md:gap-10 lg:mt-6 lg:gap-8 xl:mt-16 xl:gap-12";

type FounderBioContentDesktopProps = {
  contentTopClassName: string;
  body: string;
};

function FounderBioContentDesktop({ contentTopClassName, body }: FounderBioContentDesktopProps) {
  return (
    <HeroBannerBodyRichText
      body={body}
      className={`font-light italic leading-[22px] text-black text-[14px] md:max-lg:text-[clamp(13px,1.6vw,14px)] md:max-lg:leading-[clamp(20px,2.3vw,22px)] [&_p]:mb-3 [&_p:last-child]:mb-0 [&_p]:whitespace-pre-wrap [&_p]:break-words ${contentTopClassName}`}
    />
  );
}

type FounderBioContentMobileProps = {
  contentTopClassName: string;
  body: string;
};

function FounderBioContentMobile({ contentTopClassName, body }: FounderBioContentMobileProps) {
  return (
    <HeroBannerBodyRichText
      body={body}
      className={`w-full font-sans text-base font-light italic leading-6 tracking-[-0.312px] text-black/80 break-words [&_p]:mb-4 [&_p:last-child]:mb-0 [&_p]:break-words ${contentTopClassName}`}
    />
  );
}

type FounderBioAndStatsProps = {
  statCaptionClassName: string;
  contentTopClassName: string;
  statsSectionClassName: string;
  body: string;
  statsFirst?: boolean;
  statNumberClassName?: string;
  useMobileBioTypography?: boolean;
};

function FounderBioAndStats({
  statCaptionClassName,
  contentTopClassName,
  statsSectionClassName,
  body,
  statsFirst = false,
  statNumberClassName = FOUNDER_STAT_NUMBER_CLASS_DEFAULT,
  useMobileBioTypography = false,
}: FounderBioAndStatsProps) {
  const statsBlock = (
    <div className={statsSectionClassName}>
      <div>
        <p className={statNumberClassName}>16+</p>
        <p className={statCaptionClassName}>Years Experience</p>
      </div>
      <div>
        <p className={statNumberClassName}>2.5k+</p>
        <p className={statCaptionClassName}>Projects Delivered</p>
      </div>
    </div>
  );

  const bioBlock = useMobileBioTypography ? (
    <FounderBioContentMobile contentTopClassName={contentTopClassName} body={body} />
  ) : (
    <FounderBioContentDesktop contentTopClassName={contentTopClassName} body={body} />
  );

  if (statsFirst) {
    return (
      <>
        {statsBlock}
        {bioBlock}
      </>
    );
  }

  return (
    <>
      {bioBlock}
      {statsBlock}
    </>
  );
}

type SectionFounderProps = {
  founder: FounderSectionEntry;
};

export function SectionFounder({ founder }: SectionFounderProps) {
  const name = founder.name || FOUNDER_SECTION_DEFAULT_NAME;
  const imageSrc = founder.customImageDisplayUrl ?? FOUNDER_SECTION_BUILTIN_IMAGE_SRC;
  const isBuiltIn = !founder.customImageDisplayUrl;
  const imageStyle =
    founder.heroImageFraming != null
      ? framingToCoverImageStyle(founder.heroImageFraming)
      : undefined;

  return (
    <section
      id={LANDING_SECTION_IDS.FOUNDER}
      className={FOUNDER_SECTION_WRAPPER_CLASS}
      aria-labelledby="founder-heading"
    >
      <div className="mx-auto max-w-[1440px]">
        <h2
          id="founder-heading"
          className="mt-8 -translate-y-3 text-center font-sans text-2xl font-medium leading-8 tracking-[0.07px] text-black md:mt-12 md:translate-y-0 md:text-left md:font-manrope md:text-[48px] md:font-normal md:leading-[40px] md:tracking-[-0.9px]"
        >
          Founder & Lead CAD Engineer
        </h2>
        <h3 className="-mt-2 mb-3 text-center font-sans text-[30px] font-black leading-[36px] tracking-[0.396px] text-black md:hidden">
          {name}
        </h3>
        <div className={FOUNDER_GRADIENT_PANEL_CLASS}>
          <div className={FOUNDER_DESKTOP_TEXT_COLUMN_CLASS}>
            <h3 className={FOUNDER_DESKTOP_HEADING_CLASS}>
              {name}
            </h3>
            <FounderBioAndStats
              statCaptionClassName="font-bold uppercase tracking-[1.4px] text-white text-[12px] md:text-[13px]"
              contentTopClassName={FOUNDER_DESKTOP_BIO_TOP_MARGIN_CLASS}
              statsSectionClassName={FOUNDER_DESKTOP_STATS_SECTION_CLASS}
              body={founder.body}
            />
          </div>
          <div
            className="relative min-h-0 w-full flex-1 md:aspect-auto md:h-auto md:max-w-[440px] lg:max-w-[493px] md:min-h-0 md:flex-none md:shrink-0"
            data-landing-image={LANDING_IMAGE_IDS.FOUNDER_PHOTO}
          >
            <Image
              src={imageSrc}
              alt={name}
              fill
              className={`object-cover object-center min-[430px]:max-md:object-contain min-[430px]:max-md:object-bottom ${FOUNDER_PHOTO_DESKTOP_NUDGE_LEFT_CLASS}`}
              sizes="(max-width: 768px) 100vw, 493px"
              unoptimized={isBuiltIn}
              style={imageStyle}
            />
          </div>
        </div>
        <div className="mt-6 md:hidden">
          <FounderBioAndStats
            statsFirst
            useMobileBioTypography
            statNumberClassName="font-black leading-[32px] text-black text-[24px]"
            statCaptionClassName="font-bold uppercase tracking-[1.4px] text-black text-[12px]"
            contentTopClassName="mt-8"
            statsSectionClassName="flex flex-wrap gap-8"
            body={founder.body}
          />
        </div>
      </div>
    </section>
  );
}
