import {
  GetAQuoteButton,
  HERO_SECTION3_GET_QUOTE_BUTTON_ID,
} from "@/components/landing/GetAQuoteButton";
import type { PowerBannerCopyEntry } from "@/lib/power-banner-copy/power-banner-copy.types";
import { resolveDesignSubtitleDisplay } from "./resolve-power-banner-display";
import { SECTION3_TEXT_COLUMN_TOP_MD_CLASS } from "./power-banners-layout.constants";

type DesignHeroSlideCopyProps = {
  copy: PowerBannerCopyEntry;
};

export function DesignHeroSlideCopy({ copy }: DesignHeroSlideCopyProps) {
  const { line1, line2 } = resolveDesignSubtitleDisplay(copy.body);

  return (
    <div
      className={`relative z-10 flex h-full w-full flex-col items-start justify-end px-6 pb-16 pt-16 md:absolute md:left-0 md:right-auto ${SECTION3_TEXT_COLUMN_TOP_MD_CLASS} md:max-w-[min(520px,44vw)] md:-translate-y-1/2 md:items-start md:justify-center md:pl-12 md:pr-6 md:pb-0 md:pt-0 lg:pl-20`}
    >
      <div className="power-banners-section3-text-cluster flex w-full flex-col items-end gap-7 text-right text-[#121212] max-md:-translate-y-[7.5rem] md:translate-y-0 md:items-start md:gap-8 md:text-left">
        <h1 className="hero-primary-title-typography-design inline-block max-w-[min(100%,494px)] whitespace-normal text-balance md:whitespace-nowrap">
          {copy.title}
        </h1>
        <div className="flex w-full flex-col items-end gap-0.5 md:items-start md:gap-1">
          <p className="hero-primary-subtitle-typography-design max-w-[433px] self-end text-right max-md:-translate-y-5 md:max-w-[433px] md:-translate-y-4 md:self-start md:text-left">
            <span className="block">{line1}</span>
            {line2 ? <span className="block">{line2}</span> : null}
          </p>
          <GetAQuoteButton
            id={HERO_SECTION3_GET_QUOTE_BUTTON_ID}
            variant="gold"
            className="shrink-0 self-end md:self-start"
          />
        </div>
      </div>
    </div>
  );
}
