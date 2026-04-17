import {
  GetAQuoteButton,
  HERO_SECTION2_GET_QUOTE_BUTTON_ID,
} from "@/components/landing/GetAQuoteButton";
import type { PowerBannerCopyEntry } from "@/lib/power-banner-copy/power-banner-copy.types";

import { RenderingHeroSlideTitle } from "./RenderingHeroSlideTitle";
import { RenderingHeroSubtitleLines } from "./RenderingHeroSubtitleLines";
import { HeroTextNudgeWrapper } from "./HeroTextNudgeWrapper";

type RenderingHeroSlideCopyProps = {
  copy: PowerBannerCopyEntry;
  layoutMeta?: unknown | null;
};

export function RenderingHeroSlideCopy({
  copy,
  layoutMeta,
}: RenderingHeroSlideCopyProps) {
  return (
    <div className="relative z-10 flex h-full w-full flex-col items-start justify-end px-6 pb-16 pt-16 md:absolute md:left-0 md:right-auto md:top-[38%] md:max-w-[min(520px,44vw)] md:-translate-y-1/2 md:items-start md:justify-center md:pl-12 md:pr-6 md:pb-0 md:pt-0 lg:pl-20">
      <HeroTextNudgeWrapper layoutMeta={layoutMeta}>
        <div className="power-banners-section2-text-cluster flex w-full flex-col items-start gap-8 text-left text-white">
          <RenderingHeroSlideTitle title={copy.title} />
          <RenderingHeroSubtitleLines body={copy.body} />
          <GetAQuoteButton
            id={HERO_SECTION2_GET_QUOTE_BUTTON_ID}
            variant="gold"
            className="shrink-0 self-start"
          />
        </div>
      </HeroTextNudgeWrapper>
    </div>
  );
}
