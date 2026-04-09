import { LANDING_IMAGE_IDS } from "@/constants";
import { ModelingCard } from "./ModelingCard";

function portraitLayerBackground(imageUrl: string): string {
  return `url("${imageUrl}") #E0F2F1 center / cover no-repeat`;
}

const PORTRAIT_DESCRIPTION_LINES = [
  "Advanced pavé and fine-setting structures",
  "developed with micron-level precision.",
  "Invisible settings and ultra-thin tolerances",
  "engineered with strict structural discipline.",
] as const;

/** Below `sm` only; desktop unchanged. */
const PORTRAIT_DESCRIPTION_LINES_MOBILE = [
  "Advanced pavé and fine-setting structures developed with micron-level precision.",
  "Invisible settings and ultra-thin tolerances engineered with strict structural discipline.",
] as const;

type ModelingBlockPortraitProps = {
  imageUrlDesktop: string;
  imageUrlMobile: string;
};

export function ModelingBlockPortrait({
  imageUrlDesktop,
  imageUrlMobile,
}: ModelingBlockPortraitProps) {
  const sameUrl = imageUrlDesktop === imageUrlMobile;
  return (
    <ModelingCard
      title="High Jewelry"
      description=""
      descriptionLines={[...PORTRAIT_DESCRIPTION_LINES]}
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
      descriptionBlockTop="45%"
      descriptionBlockLeft="-13%"
      desktopOverlayShiftClassName="lg:translate-x-[calc(2rem*var(--ms,1))] lg:translate-y-[calc(2.25rem*var(--ms,1))]"
      mobilePortraitTypography
    />
  );
}
