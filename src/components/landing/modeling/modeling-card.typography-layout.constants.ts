/** With `mobileHipHopTypography`, stack lines from this index are `hidden min-[755px]:block` (tail desktop-only on mobile). */
export const HIPHOP_MOBILE_HIDDEN_LINES_FROM_INDEX = 2;

/**
 * Hip-Hop tablet tier (755px–1023px): body copy smaller than desktop overlay so it does not crowd the title.
 * Applied only on the tablet-only description wrapper in `ModelingCardDescriptionContent`.
 */
export const HIPHOP_TABLET_DESCRIPTION_CLASS =
  "min-[755px]:max-w-[min(100%,calc(480px*var(--ms,1)))] min-[755px]:font-manrope min-[755px]:font-light min-[755px]:text-[calc(12px*var(--ms,1)*var(--mt,1))] min-[755px]:leading-[calc(17px*var(--ms,1)*var(--mt,1))]";

/** 3D Portrait — mobile overlay only below 755px; desktop uses existing Manrope + absolute layout. */
export const PORTRAIT_MOBILE_OVERLAY_TITLE_CLASS =
  "flex w-full flex-col items-end gap-0 font-sans text-[calc(20px*var(--ms,1)*var(--mt,1))] font-bold leading-[calc(20px*var(--ms,1)*var(--mt,1))] tracking-[-0.449px] text-black";

/** Tablet portrait overlay title (755px–1023px) — same scale as Hip-Hop / other modeling cards at 755px+. */
export const PORTRAIT_TABLET_OVERLAY_TITLE_CLASS =
  "flex w-full flex-col items-end gap-0 font-manrope text-[calc(32px*var(--ms,1)*var(--mt,1))] font-extrabold leading-[calc(24px*var(--ms,1)*var(--mt,1))] tracking-normal text-black scale-x-105 origin-right";

export const PORTRAIT_MOBILE_TITLE_FULL = "3D Portrait Jewelry";

export const PORTRAIT_MOBILE_OVERLAY_DESC_CLASS =
  "w-[calc(155px*var(--ms,1))] max-w-full text-right font-sans text-[calc(12px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(0.8125rem*var(--ms,1)*var(--mt,1))] text-[#364153]";

/** Tablet portrait slot body (755px–1023px): wider than mobile overlay so tablet lines match design copy (not 155px reflow). */
export const PORTRAIT_TABLET_OVERLAY_DESC_CLASS =
  "w-[min(100%,calc(300px*var(--ms,1)))] max-w-full text-right font-manrope text-[calc(14px*var(--ms,1)*var(--mt,1))] font-light leading-[calc(22px*var(--ms,1)*var(--mt,1))] text-black/70";

/** Default bridal CMS second paragraph; extra top margin separates it from the first block. */
export const BRIDAL_DESCRIPTION_SECURE_PRONG_LINE =
  "Secure prong architecture developed for long-term wear.";

/** Mobile (≤754px): light gap before the secure-prong line (subsection). */
export const BRIDAL_MOBILE_SECURE_PRONG_MARGIN_TOP_CLASS =
  "mt-[calc(0.45rem*var(--ms,1))]";

/** Tablet/desktop bridal stack: larger gap before the secure-prong line. */
export const BRIDAL_STACK_SECURE_PRONG_MARGIN_TOP_CLASS =
  "mt-[calc(0.875rem*var(--ms,1))]";

export const DEFAULT_IMAGE_POSITION = "center center";
