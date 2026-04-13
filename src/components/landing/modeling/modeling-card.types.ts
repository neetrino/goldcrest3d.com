import type { CSSProperties } from "react";

import type { ImageFraming } from "@/lib/site-media/image-framing";

/** Props for one Modeling Specialization card. Լրիվ սյուն, aspect 83/43, սուր անկյուններ. */
export type ModelingCardProps = {
  title: string;
  /**
   * Admin-managed HTML (Media Manager). When set, `descriptionLines*` are ignored and the body is
   * rendered with the same sanitizer as hero banners.
   */
  descriptionRichHtml?: string;
  /** Single paragraph; ignored when descriptionLines or descriptionRichHtml is set. */
  description: string;
  /** When set, description is rendered as one block per line (e.g. Hip-Hop). */
  descriptionLines?: string[];
  /**
   * Hip-Hop: with `mobileHipHopTypography`, `sm+` uses these lines instead of `descriptionLines` (mobile unchanged).
   * Bridal: with `mobileBridalTypography` + row layout, `sm+` can use these as a right-aligned stack instead of the two-line row.
   */
  descriptionLinesDesktop?: string[];
  /**
   * With `mobileBridalTypography`: below `sm`, these lines replace `descriptionLines` (e.g. split first paragraph); `sm+` still uses `descriptionLines`.
   */
  descriptionLinesMobile?: string[];
  /** When omitted, card shows gradient + text only (no image column). */
  imageSrc?: string;
  /** data-landing-image id for this card's image (section-by-section replacement). */
  imageId?: string;
  /** If set, card uses gradient background and image in one half; if not, image is full-cover with text overlay. */
  gradient?: string;
  imageOnLeft: boolean;
  /** Figma: left, right, or center (Bridal is center). */
  textAlign: "left" | "right" | "center";
  /** Figma: blocks 1–3 ExtraBold, 4–6 Bold */
  titleBold?: boolean;
  /** When true, title uses same size as Bridal block: 32px, leading 24px, scale-x-105. */
  titleCompact?: boolean;
  /** Figma: only Ancient & Heritage uses rgba(255,255,255,0.6) for description */
  descriptionMuted?: boolean;
  /** Critical: where the image is anchored (e.g. "right center" so pendant stays visible). */
  imagePosition?: string;
  /** Figma CSS background on full-bleed layer (replaces next/image when set). */
  imageLayerBackground?: CSSProperties;
  /** Second full-bleed background for small viewports when set (with `imageLayerBackground` for `md+`). */
  imageLayerBackgroundMobile?: CSSProperties;
  /**
   * Below `sm`: this URL (static asset); `sm+`: `imageSrc` (CMS / default).
   * Only with `imageSrc` and without `imageLayerBackground`.
   */
  imageSrcMobile?: string;
  /**
   * When `imageSrc` + `imageSrcMobile` or dual layer backgrounds: width at which the desktop asset applies.
   * Use `md` for CMS desktop/mobile pairs so tablets use the desktop file.
   */
  imagePairBreakpoint?: "sm" | "md";
  /** When true, title and description use black text (e.g. Bridal on light background). */
  textDark?: boolean;
  /** Override left inset for text (e.g. "38%") when imageOnLeft. */
  textInsetLeft?: string;
  /** When set with imageOnLeft, shifts the text block left (margin-right on the text container). */
  textShiftLeft?: string;
  /** When true and descriptionLines is used, omit max-width so only explicit line breaks apply. */
  noDescriptionMaxWidth?: boolean;
  /** When true, no fixed inset/margin; text area uses only padding; use textBlockAlign for position. */
  fluidTextLayout?: boolean;
  /** With fluidTextLayout: where the text block sits (start = left, end = right, center). */
  textBlockAlign?: "start" | "end" | "center";
  /** When "row" and descriptionLines, render lines side by side; default "stack". */
  descriptionLayout?: "stack" | "row";
  /** When "start", only the title aligns to the left; description keeps container alignment. */
  titleAlignSelf?: "start" | "end";
  /** Optional margin-right on the title (shifts title left when aligned end). */
  titleMarginRight?: string;
  /** Optional margin-top on the title only (pushes title down). */
  titleMarginTop?: string;
  /** When true and titleMarginTop is set, description gets negative margin so it stays in place. */
  titleMarginTopCompensate?: boolean;
  /** With fluidTextLayout: shift the whole text block right (e.g. "8%"). */
  textBlockMarginLeft?: string;
  /** With fluidTextLayout: shift the whole text block down (e.g. "6%"). */
  textBlockMarginTop?: string;
  /** Margin-top on the description only (moves description down, title unchanged). */
  descriptionMarginTop?: string;
  /** Id for the first description line only (when descriptionLines + row); isolates it for styling. */
  firstDescriptionLineId?: string;
  /** Margin-right on the first description line only (adds space before second line in row layout). */
  firstDescriptionLineMarginRight?: string;
  /** Translate first description line horizontally (e.g. "-6%" moves it left) in row layout. */
  firstDescriptionLineTranslateX?: string;
  /** Translate second description line horizontally (e.g. "-4%" moves it left) in row layout. */
  secondDescriptionLineTranslateX?: string;
  /** When true, title and description are positioned independently (absolute top/left). */
  independentTitleDescription?: boolean;
  /** With independentTitleDescription: title position top (e.g. "18%"). */
  titleBlockTop?: string;
  /** With independentTitleDescription: title position left (e.g. "8%"). */
  titleBlockLeft?: string;
  /** Optional class to shift only title at specific breakpoints (e.g. tablet). */
  titleShiftClassName?: string;
  /** With independentTitleDescription: description position top (e.g. "32%"). */
  descriptionBlockTop?: string;
  /** With independentTitleDescription: description position left (e.g. "8%"). */
  descriptionBlockLeft?: string;
  /** Optional class to shift desktop independent title+description overlay. */
  desktopOverlayShiftClassName?: string;
  /** When set, overrides textAlign for the description block only (e.g. right-aligned lines for flush-right typography). */
  descriptionAlign?: "left" | "right";
  /**
   * Hip-Hop block only: below `sm`, Inter title/body (Figma); `sm+` restores default Manrope layout.
   */
  mobileHipHopTypography?: boolean;
  /**
   * Bridal block only: below `sm`, Inter title + body (Figma); requires `fluidTextLayout` + `descriptionLayout="row"`.
   */
  mobileBridalTypography?: boolean;
  /**
   * 3D Portrait block only: below `sm`, `descriptionLinesMobile` copy; `sm+` keeps absolute title/description + `descriptionLines`.
   */
  mobilePortraitTypography?: boolean;
  /**
   * Optional `next/image` fill layer classes.
   * Default: `object-contain`.
   */
  imageFillClassName?: string;
  /** With `imageSrcMobile`: `sm+` image `className` (e.g. `object-contain`). */
  imageFillClassNameDesktop?: string;
  /** Admin Media Manager focal crop for the desktop/tablet image (when set, overrides `imagePosition` for that layer). */
  imageFramingDesktop?: ImageFraming | null;
  /** Admin focal crop for the mobile image (falls back to desktop framing when omitted). */
  imageFramingMobile?: ImageFraming | null;
};
