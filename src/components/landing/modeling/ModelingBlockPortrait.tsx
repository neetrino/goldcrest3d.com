import { LANDING_IMAGE_IDS } from "@/constants";
import type { ModelingCardFields } from "@/lib/managed-home/managed-home-schemas";
import { ModelingCard } from "./ModelingCard";
import type { ModelingBlockViewport } from "./ModelingBlockHipHop";
import {
  PORTRAIT_MOBILE_TITLE_FULL,
} from "./modeling-card.typography-layout.constants";

function portraitLayerBackground(imageUrl: string): string {
  return `url("${imageUrl}") #E0F2F1 center / cover no-repeat`;
}

const PORTRAIT_DESCRIPTION_LINES = [
  "Advanced pavé and fine-setting structures",
  "developed with micron-level precision.",
  "Invisible settings and ultra-thin tolerances",
  "engineered with strict structural discipline.",
] as const;

const PORTRAIT_DESCRIPTION_LINES_MOBILE = [
  "Advanced pavé and fine-setting structures",
  "developed with micron-level precision.",
] as const;

type ModelingBlockPortraitProps = {
  imageUrlDesktop: string;
  imageUrlMobile: string;
  managed?: ModelingCardFields;
  viewport: ModelingBlockViewport;
  emulateMobileChrome?: boolean;
};

export function ModelingBlockPortrait({
  imageUrlDesktop,
  imageUrlMobile,
  managed,
  viewport,
  emulateMobileChrome = false,
}: ModelingBlockPortraitProps) {
  const sameUrl = imageUrlDesktop === imageUrlMobile;
  const title = managed?.title ?? PORTRAIT_MOBILE_TITLE_FULL;
  if (viewport === "mobile") {
    const mobileLines =
      managed?.descriptionLines != null && managed.descriptionLines.length > 0
        ? [...managed.descriptionLines]
        : [...PORTRAIT_DESCRIPTION_LINES_MOBILE];
    return (
      <ModelingCard
        title={title}
        description=""
        descriptionLines={[...PORTRAIT_DESCRIPTION_LINES]}
        descriptionLinesMobile={mobileLines}
        imageSrc={imageUrlDesktop}
        imageId={LANDING_IMAGE_IDS.MODELING_PORTRAIT}
        imageOnLeft={false}
        textAlign="left"
        descriptionAlign="right"
        titleCompact
        imagePosition="center center"
        imageLayerBackground={{ background: portraitLayerBackground(imageUrlDesktop) }}
        imageLayerBackgroundMobile={
          sameUrl ? undefined : { background: portraitLayerBackground(imageUrlMobile) }
        }
        imagePairBreakpoint="md"
        textDark
        independentTitleDescription
        titleBlockTop="34%"
        titleBlockLeft="7%"
        titleShiftClassName="md:translate-x-[calc(2.25rem*var(--ms,1))] lg:translate-x-0"
        descriptionBlockTop="42%"
        descriptionBlockLeft="-13%"
        desktopOverlayShiftClassName="lg:translate-x-[calc(2rem*var(--ms,1))] lg:translate-y-[calc(2.25rem*var(--ms,1))]"
        mobilePortraitTypography
        portraitSplitScope="mobile"
        emulateMobileChrome={emulateMobileChrome}
      />
    );
  }

  const lines =
    managed?.descriptionLines != null && managed.descriptionLines.length > 0
      ? [...managed.descriptionLines]
      : [...PORTRAIT_DESCRIPTION_LINES];

  return (
    <ModelingCard
      title={title}
      description=""
      descriptionLines={lines}
      descriptionLinesMobile={[...PORTRAIT_DESCRIPTION_LINES_MOBILE]}
      imageSrc={imageUrlDesktop}
      imageId={LANDING_IMAGE_IDS.MODELING_PORTRAIT}
      imageOnLeft={false}
      textAlign="left"
      descriptionAlign="right"
      titleCompact
      imagePosition="center center"
      imageLayerBackground={{ background: portraitLayerBackground(imageUrlDesktop) }}
      imageLayerBackgroundMobile={
        sameUrl ? undefined : { background: portraitLayerBackground(imageUrlMobile) }
      }
      imagePairBreakpoint="md"
      textDark
      independentTitleDescription
      titleBlockTop="34%"
      titleBlockLeft="7%"
      titleShiftClassName="md:translate-x-[calc(2.25rem*var(--ms,1))] lg:translate-x-0"
      descriptionBlockTop="42%"
      descriptionBlockLeft="-13%"
      desktopOverlayShiftClassName="lg:translate-x-[calc(2rem*var(--ms,1))] lg:translate-y-[calc(2.25rem*var(--ms,1))]"
      mobilePortraitTypography
      portraitSplitScope="desktop"
      emulateMobileChrome={emulateMobileChrome}
    />
  );
}
