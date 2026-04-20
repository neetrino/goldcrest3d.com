import { LANDING_IMAGE_IDS } from "@/constants";
import { ModelingCard } from "./ModelingCard";

function portraitLayerBackground(imageUrl: string): string {
  return `url("${imageUrl}") #E0F2F1 center / cover no-repeat`;
}

type ModelingBlockPortraitProps = {
  imageUrlDesktop: string;
  imageUrlMobile: string;
  titleDesktop: string;
  titleMobile: string;
  titleDesktopOffsetY: number;
  titleMobileOffsetY: number;
  descriptionLinesDesktop: string[];
  descriptionLinesMobile: string[];
  bodyDesktopOffsetY: number;
  bodyMobileOffsetY: number;
};

export function ModelingBlockPortrait({
  imageUrlDesktop,
  imageUrlMobile,
  titleDesktop,
  titleMobile,
  titleDesktopOffsetY,
  titleMobileOffsetY,
  descriptionLinesDesktop,
  descriptionLinesMobile,
  bodyDesktopOffsetY,
  bodyMobileOffsetY,
}: ModelingBlockPortraitProps) {
  const sameUrl = imageUrlDesktop === imageUrlMobile;
  return (
    <ModelingCard
      title={titleDesktop}
      titleMobile={titleMobile}
      titleOffsetYDesktop={titleDesktopOffsetY}
      titleOffsetYMobile={titleMobileOffsetY}
      description=""
      descriptionLines={[...descriptionLinesDesktop]}
      descriptionLinesMobile={[...descriptionLinesMobile]}
      descriptionOffsetYDesktop={bodyDesktopOffsetY}
      descriptionOffsetYMobile={bodyMobileOffsetY}
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
    />
  );
}
