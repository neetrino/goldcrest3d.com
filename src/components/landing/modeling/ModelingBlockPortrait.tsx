import { LANDING_IMAGE_IDS } from "@/constants";
import { ModelingCard } from "./ModelingCard";

function portraitLayerBackground(imageUrl: string): string {
  return `url("${imageUrl}") #E0F2F1 center / cover no-repeat`;
}

type ModelingBlockPortraitProps = {
  imageUrlDesktop: string;
  imageUrlMobile: string;
  imageUrlTablet: string;
  /** True when portrait slot has a dedicated tablet R2 asset (not default-only). */
  tabletAssetPresent: boolean;
  titleDesktop: string;
  titleMobile: string;
  titleTablet: string;
  titleDesktopOffsetY: number;
  titleDesktopOffsetX: number;
  titleMobileOffsetY: number;
  titleMobileOffsetX: number;
  titleTabletOffsetY: number;
  titleTabletOffsetX: number;
  descriptionLinesDesktop: string[];
  descriptionLinesMobile: string[];
  descriptionLinesTablet: string[];
  bodyDesktopOffsetY: number;
  bodyDesktopOffsetX: number;
  bodyMobileOffsetY: number;
  bodyMobileOffsetX: number;
  bodyTabletOffsetY: number;
  bodyTabletOffsetX: number;
};

export function ModelingBlockPortrait({
  imageUrlDesktop,
  imageUrlMobile,
  imageUrlTablet,
  tabletAssetPresent,
  titleDesktop,
  titleMobile,
  titleTablet,
  titleDesktopOffsetY,
  titleDesktopOffsetX,
  titleMobileOffsetY,
  titleMobileOffsetX,
  titleTabletOffsetY,
  titleTabletOffsetX,
  descriptionLinesDesktop,
  descriptionLinesMobile,
  descriptionLinesTablet,
  bodyDesktopOffsetY,
  bodyDesktopOffsetX,
  bodyMobileOffsetY,
  bodyMobileOffsetX,
  bodyTabletOffsetY,
  bodyTabletOffsetX,
}: ModelingBlockPortraitProps) {
  const sameUrl = imageUrlDesktop === imageUrlMobile;
  const tabletBg =
    tabletAssetPresent && imageUrlTablet.length > 0
      ? portraitLayerBackground(imageUrlTablet)
      : undefined;
  return (
    <ModelingCard
      title={titleDesktop}
      titleMobile={titleMobile}
      titleTablet={titleTablet}
      titleOffsetYDesktop={titleDesktopOffsetY}
      titleOffsetXDesktop={titleDesktopOffsetX}
      titleOffsetYMobile={titleMobileOffsetY}
      titleOffsetXMobile={titleMobileOffsetX}
      titleOffsetYTablet={titleTabletOffsetY}
      titleOffsetXTablet={titleTabletOffsetX}
      description=""
      descriptionLines={[...descriptionLinesDesktop]}
      descriptionLinesMobile={[...descriptionLinesMobile]}
      descriptionLinesTablet={[...descriptionLinesTablet]}
      descriptionOffsetYDesktop={bodyDesktopOffsetY}
      descriptionOffsetXDesktop={bodyDesktopOffsetX}
      descriptionOffsetYMobile={bodyMobileOffsetY}
      descriptionOffsetXMobile={bodyMobileOffsetX}
      descriptionOffsetYTablet={bodyTabletOffsetY}
      descriptionOffsetXTablet={bodyTabletOffsetX}
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
      imageLayerBackgroundTablet={tabletBg != null ? { background: tabletBg } : undefined}
      imageSrcTablet={tabletAssetPresent ? imageUrlTablet : undefined}
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
