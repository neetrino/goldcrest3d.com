import type { CSSProperties } from "react";
import { LANDING_IMAGE_IDS, LANDING_SECTION_IDS } from "@/constants";
import type { FounderPayload } from "@/lib/managed-home/managed-home-schemas";
import type { FounderPhotoResolvedMedia } from "@/lib/site-media/get-landing-site-media";
import { parseImageFrameLayout } from "@/lib/site-media/visual-layout-meta";
import Image from "next/image";

const FOUNDER_STAT_NUMBER_CLASS_DEFAULT =
  "font-black leading-[32px] text-[#0f172a] text-[24px] md:text-[28px]";

const FOUNDER_MOBILE_BIO_MAX_WIDTH_CLASS = {
  p1: "max-w-[331px] min-[430px]:max-md:max-w-full",
  p2: "max-w-[342px] min-[430px]:max-md:max-w-full",
  p3: "max-w-[332px] min-[430px]:max-md:max-w-full",
  p4: "max-w-[338px] min-[430px]:max-md:max-w-full",
} as const;

const FOUNDER_MOBILE_BIO_PARAGRAPH_CLASS =
  "w-full font-sans text-base font-light italic leading-6 tracking-[-0.312px] text-black/80 break-words";

const FOUNDER_PHOTO_DESKTOP_NUDGE_LEFT_CLASS =
  "md:max-lg:-translate-x-0 lg:-translate-x-24";

const FOUNDER_SECTION_WRAPPER_CLASS =
  "-mt-8 bg-[#f8f7f6] px-4 pt-0 pb-12 md:-mt-12 md:px-6 md:pt-0 md:pb-16 xl:px-10 xl:pb-20 2xl:px-14 2xl:pb-28";

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
  block1: string;
  block2: string;
};

function FounderBioContentDesktop({
  contentTopClassName,
  block1,
  block2,
}: FounderBioContentDesktopProps) {
  return (
    <div
      className={`space-y-3 font-light italic leading-[22px] text-black text-[14px] md:max-lg:text-[clamp(13px,1.6vw,14px)] md:max-lg:leading-[clamp(20px,2.3vw,22px)] lg:space-y-2.5 xl:space-y-4 ${contentTopClassName}`}
    >
      <p className="whitespace-pre-wrap break-words">{block1}</p>
      <p className="mt-8 whitespace-pre-wrap break-words sm:mt-10 lg:mt-5 xl:mt-10">
        {block2}
      </p>
    </div>
  );
}

type FounderBioContentMobileProps = {
  contentTopClassName: string;
  paragraphs: string[];
};

function FounderBioContentMobile({
  contentTopClassName,
  paragraphs,
}: FounderBioContentMobileProps) {
  const [p1, p2, p3, p4] = paragraphs;
  const widthClasses = [
    FOUNDER_MOBILE_BIO_MAX_WIDTH_CLASS.p1,
    FOUNDER_MOBILE_BIO_MAX_WIDTH_CLASS.p2,
    FOUNDER_MOBILE_BIO_MAX_WIDTH_CLASS.p3,
    FOUNDER_MOBILE_BIO_MAX_WIDTH_CLASS.p4,
  ];
  return (
    <div className={contentTopClassName}>
      <div className="space-y-4">
        <p
          className={`${widthClasses[0]} ${FOUNDER_MOBILE_BIO_PARAGRAPH_CLASS}`}
        >
          {p1}
        </p>
        <p
          className={`${widthClasses[1]} ${FOUNDER_MOBILE_BIO_PARAGRAPH_CLASS}`}
        >
          {p2}
        </p>
      </div>
      <div className="mt-8 space-y-4">
        <p
          className={`${widthClasses[2]} ${FOUNDER_MOBILE_BIO_PARAGRAPH_CLASS}`}
        >
          {p3}
        </p>
        <p
          className={`${widthClasses[3]} ${FOUNDER_MOBILE_BIO_PARAGRAPH_CLASS}`}
        >
          {p4}
        </p>
      </div>
    </div>
  );
}

type FounderBioAndStatsProps = {
  statCaptionClassName: string;
  contentTopClassName: string;
  statsSectionClassName: string;
  statsFirst?: boolean;
  statNumberClassName?: string;
  useMobileBioTypography?: boolean;
  content: FounderPayload;
};

function FounderBioAndStats({
  statCaptionClassName,
  contentTopClassName,
  statsSectionClassName,
  statsFirst = false,
  statNumberClassName = FOUNDER_STAT_NUMBER_CLASS_DEFAULT,
  useMobileBioTypography = false,
  content,
}: FounderBioAndStatsProps) {
  const statsBlock = (
    <div className={statsSectionClassName}>
      {content.stats.map((s) => (
        <div key={s.label}>
          <p className={statNumberClassName}>{s.value}</p>
          <p className={statCaptionClassName}>{s.label}</p>
        </div>
      ))}
    </div>
  );

  const bioBlock = useMobileBioTypography ? (
    <FounderBioContentMobile
      contentTopClassName={contentTopClassName}
      paragraphs={content.bioMobileParagraphs}
    />
  ) : (
    <FounderBioContentDesktop
      contentTopClassName={contentTopClassName}
      block1={content.bioDesktopBlock1}
      block2={content.bioDesktopBlock2}
    />
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
  content: FounderPayload;
  founderPhoto: FounderPhotoResolvedMedia;
};

export function SectionFounder({ content, founderPhoto }: SectionFounderProps) {
  const frame = parseImageFrameLayout(founderPhoto.layoutMeta);
  const founderImageStyle: CSSProperties | undefined = frame
    ? {
        transform: `translate(${frame.offsetX}px, ${frame.offsetY}px) scale(${frame.scale})`,
        transformOrigin: "center center",
      }
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
          {content.sectionHeading}
        </h2>
        <h3 className="-mt-2 mb-3 text-center font-sans text-[30px] font-black leading-[36px] tracking-[0.396px] text-black md:hidden">
          {content.name}
        </h3>
        <div className={FOUNDER_GRADIENT_PANEL_CLASS}>
          <div className={FOUNDER_DESKTOP_TEXT_COLUMN_CLASS}>
            <h3 className={FOUNDER_DESKTOP_HEADING_CLASS}>{content.name}</h3>
            <FounderBioAndStats
              content={content}
              statCaptionClassName="font-bold uppercase tracking-[1.4px] text-white text-[12px] md:text-[13px]"
              contentTopClassName={FOUNDER_DESKTOP_BIO_TOP_MARGIN_CLASS}
              statsSectionClassName={FOUNDER_DESKTOP_STATS_SECTION_CLASS}
            />
          </div>
          <div
            className="relative min-h-0 w-full flex-1 overflow-hidden md:aspect-auto md:h-auto md:max-w-[440px] lg:max-w-[493px] md:min-h-0 md:flex-none md:shrink-0"
            data-landing-image={LANDING_IMAGE_IDS.FOUNDER_PHOTO}
          >
            <Image
              src={founderPhoto.src}
              alt={content.name}
              fill
              className={`object-cover object-center min-[430px]:max-md:object-contain min-[430px]:max-md:object-bottom ${FOUNDER_PHOTO_DESKTOP_NUDGE_LEFT_CLASS}`}
              style={founderImageStyle}
              sizes="(max-width: 768px) 100vw, 493px"
              unoptimized
            />
          </div>
        </div>
        <div className="mt-6 md:hidden">
          <FounderBioAndStats
            content={content}
            statsFirst
            useMobileBioTypography
            statNumberClassName="font-black leading-[32px] text-black text-[24px]"
            statCaptionClassName="font-bold uppercase tracking-[1.4px] text-black text-[12px]"
            contentTopClassName="mt-8"
            statsSectionClassName="flex flex-wrap gap-8"
          />
        </div>
      </div>
    </section>
  );
}
