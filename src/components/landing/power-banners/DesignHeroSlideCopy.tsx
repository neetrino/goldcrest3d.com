import {
  GetAQuoteButton,
  HERO_SECTION3_GET_QUOTE_BUTTON_ID,
} from "@/components/landing/GetAQuoteButton";
import type { PowerBannerCopyEntry } from "@/lib/power-banner-copy/power-banner-copy.types";
import { looksLikeHeroBannerRichBody } from "@/lib/power-banner-copy/looks-like-hero-banner-rich-body";
import { resolveDesignSubtitleDisplay } from "./resolve-power-banner-display";
import { HeroBannerBodyRichText } from "./HeroBannerBodyRichText";
import {
  HERO_SIDE_COPY_COLUMN_MAX_CLASS,
  SECTION3_TEXT_COLUMN_TOP_MD_CLASS,
} from "./power-banners-layout.constants";

type DesignHeroSlideCopyProps = {
  copy: PowerBannerCopyEntry;
};

export function DesignHeroSlideCopy({ copy }: DesignHeroSlideCopyProps) {
  const desktopBody = copy.body.trim();
  const mobileBody = copy.mobileBody.trim();
  const useRichDesktopBody = looksLikeHeroBannerRichBody(desktopBody);
  const useRichMobileBody = looksLikeHeroBannerRichBody(mobileBody);

  const desktopPlain = resolveDesignSubtitleDisplay(desktopBody, "desktop");
  const mobilePlain = resolveDesignSubtitleDisplay(mobileBody, "mobile");

  const clusterClass = copy.heroTextLayoutMobile
    ? "power-banners-section3-text-cluster hidden w-full flex-col items-end gap-7 text-right text-[#121212] md:flex md:translate-y-0 md:items-start md:gap-8 md:text-left"
    : "power-banners-section3-text-cluster flex w-full flex-col items-end gap-7 text-right text-[#121212] max-md:-translate-y-[7.5rem] md:translate-y-0 md:items-start md:gap-8 md:text-left";

  return (
    <div
      className={`relative z-10 flex h-full w-full flex-col items-start justify-end px-6 pb-16 pt-16 md:absolute md:left-0 md:right-auto ${SECTION3_TEXT_COLUMN_TOP_MD_CLASS} ${HERO_SIDE_COPY_COLUMN_MAX_CLASS} md:-translate-y-1/2 md:items-start md:justify-center md:pl-12 md:pr-6 md:pb-0 md:pt-0 lg:pl-20`}
    >
      <div className={clusterClass}>
        <h1 className="hero-primary-title-typography-design inline-block max-w-[min(100%,494px)] whitespace-normal text-balance md:whitespace-nowrap">
          <span className="md:hidden">{copy.mobileTitle}</span>
          <span className="hidden md:inline">{copy.title}</span>
        </h1>
        <div className="flex w-full flex-col items-end gap-0.5 md:items-start md:gap-1">
          <div className="w-full min-w-0 max-w-full self-end text-right max-md:-translate-y-5 md:-translate-y-4 md:self-start md:text-left">
            <div className="md:hidden">
              {mobileBody.length > 0 ? (
                useRichMobileBody ? (
                  <div className="hero-primary-subtitle-typography-design w-full whitespace-normal [&_.hero-banner-rich-body]:whitespace-normal">
                    <HeroBannerBodyRichText
                      body={mobileBody}
                      className="hero-banner-rich-body w-full [&_li]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5 [&_p]:mb-2 [&_p:last-child]:mb-0"
                    />
                  </div>
                ) : (
                  <p className="hero-primary-subtitle-typography-design">
                    {mobilePlain.lines.map((line, i) => (
                      <span
                        key={i}
                        className={
                          mobilePlain.useDefaultLineBreakLayout
                            ? "block"
                            : "block whitespace-normal"
                        }
                      >
                        {line}
                      </span>
                    ))}
                  </p>
                )
              ) : null}
            </div>
            <div className="hidden md:block">
              {desktopBody.length > 0 ? (
                useRichDesktopBody ? (
                  <div className="hero-primary-subtitle-typography-design w-full whitespace-normal [&_.hero-banner-rich-body]:whitespace-normal">
                    <HeroBannerBodyRichText
                      body={desktopBody}
                      className="hero-banner-rich-body w-full [&_li]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5 [&_p]:mb-2 [&_p:last-child]:mb-0"
                    />
                  </div>
                ) : (
                  <p className="hero-primary-subtitle-typography-design">
                    {desktopPlain.lines.map((line, i) => (
                      <span
                        key={i}
                        className={
                          desktopPlain.useDefaultLineBreakLayout
                            ? "block"
                            : "block whitespace-normal"
                        }
                      >
                        {line}
                      </span>
                    ))}
                  </p>
                )
              ) : null}
            </div>
          </div>
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
