/** With `mobileHipHopTypography`, stack lines from this index are `hidden sm:block` (tail desktop-only on mobile). */
export const HIPHOP_MOBILE_HIDDEN_LINES_FROM_INDEX = 2;

/**
 * Hip-Hop tablet tier (md–lg): body copy smaller than desktop overlay so it does not crowd the title.
 * Applied only on the tablet-only description wrapper in `ModelingCardDescriptionContent`.
 */
export const HIPHOP_TABLET_DESCRIPTION_CLASS =
  "md:max-w-[min(100%,calc(480px*var(--ms,1)))] md:font-manrope md:font-light md:text-[calc(12px*var(--ms,1)*var(--mt,1))] md:leading-[calc(17px*var(--ms,1)*var(--mt,1))]";

/** 3D Portrait — `sm:hidden` overlay only; desktop uses existing Manrope + absolute layout. */
export const PORTRAIT_MOBILE_OVERLAY_TITLE_CLASS =
  "flex w-full flex-col items-end gap-0 font-sans text-[calc(20px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(20px*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] text-black";

export const PORTRAIT_MOBILE_TITLE_FULL = "3D Portrait Jewelry";

export const PORTRAIT_MOBILE_OVERLAY_DESC_CLASS =
  "w-[calc(155px*var(--ms,1))] max-w-full text-right font-sans text-[calc(12px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(1rem*var(--ms,1)*var(--mt,1))] text-[#364153]";

export const DEFAULT_IMAGE_POSITION = "center center";
