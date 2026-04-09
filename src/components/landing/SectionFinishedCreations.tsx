"use client";

import { LANDING_SECTION_IDS } from "@/constants";
import type { FinishedGalleryItem } from "@/lib/site-media/landing-defaults";
import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useFinishedCreationsCarouselMetrics } from "@/components/landing/useFinishedCreationsCarouselMetrics";

/** Carousel: small row (row 2) â€” design aspect; slide width is fluid from container. */
const ROW2_ITEM_WIDTH = 420;
const ROW2_ITEM_HEIGHT = 232;

type SectionFinishedCreationsProps = {
  row1: FinishedGalleryItem[];
  row2: FinishedGalleryItem[];
};
/**
 * Row1 fallback when peek is off (unused if `DESKTOP_ROW1_PEEK_EDGE_VISIBLE_FRACTION` is set).
 */
const DESKTOP_ROW1_VISIBLE_SLOTS_FALLBACK = 4;
/**
 * Larger value â†’ narrower slides, more of left/right slides visible (peek). Was 0.12.
 */
const DESKTOP_ROW1_PEEK_EDGE_VISIBLE_FRACTION = 0.2;
/**
 * Row2 desktop: 5 slides in view â€” 3 full + Â½+Â½ on left/right (`p` = edge fraction).
 */
const DESKTOP_ROW2_PEEK_EDGE_VISIBLE_FRACTION = 0.5;
const DESKTOP_ROW2_PEEK_FULL_CENTER_SLIDES = 3;
/** Fallback if row2 peek params are not used. */
const DESKTOP_ROW2_VISIBLE_SLOTS_FALLBACK = 3;

/** Desktop carousel: one timing curve for both rows (GPU-friendly transform). */
const DESKTOP_CAROUSEL_TRANSITION_MS = 420;
/** Mobile gallery strips use `gap-1` (4px) — same as previous grid spacing. */
const MOBILE_FINISHED_GALLERY_GAP_PX = 4;
const FINISHED_CREATIONS_AUTOPLAY_INTERVAL_MS = 5000;

/** Mobile gallery (`md:hidden` block): fixed block sizes from design. */
const MOBILE_ROW1_ITEM_WIDTH_PX = 310;
const MOBILE_ROW1_ITEM_HEIGHT_PX = 206;
/**
 * Mobile row2 (`md:hidden`): fixed height + equal `flex-1 basis-0` columns (full `100vw` after parent `max-w` fix).
 */
const MOBILE_ROW2_CELL_HEIGHT_PX = 130;
/**
 * Mobile row1 full-bleed breakout: pairs `width` and `marginLeft` (`50% - 50vw - N`).
 * Higher N shifts the strip left (more past the left viewport edge); lower N shifts right.
 */
const MOBILE_TOP_ROW_BLEED_PX = 210;
const LARGE_MOBILE_TOP_ROW_BLEED_PX = 0;
const LARGE_MOBILE_MIN_WIDTH_PX = 430;

/** Mobile row2: pixels past each viewport edge; strip width = `100vw + 2 * N` (symmetric bleed). */
const MOBILE_ROW2_SIDE_BLEED_PX = 68;

/**
 * Mobile-only: shifts both strips right (positive = right).
 * Keep at 0 so the bleed fills the width; large values leave empty space on the left.
 */
const MOBILE_GALLERY_NUDGE_RIGHT_PX = 0;

/** Mobile: sliver of the previous slide on the left edge when `activePage > 0`. */
const MOBILE_CAROUSEL_EDGE_PEEK_PX = 220;
  
/** Layout helpers only; width/margin set inline with `MOBILE_ROW2_SIDE_BLEED_PX`. */
const MOBILE_ROW2_FULL_BLEED_CLASS = "min-w-0 max-w-none shrink-0";

/**
 * Mobile row1 right column: `object-position` x below 50% so the crop reads slightly left
 * (block size unchanged; only focal alignment). Skip when item uses portrait object-position.
 */
const MOBILE_ROW1_RIGHT_OBJECT_POSITION_CLASS =
  "max-md:[object-position:36%_center]";
const GALLERY_OBJECT_POSITION_PORTRAIT_CLASS = "gallery-object-position-portrait";

/** Matches `gap-1` (0.25rem) between mobile gallery cells. */
const MOBILE_GAP_PX = 4;
/** Viewport width showing two row1 cards (matches current two-up layout). */
const MOBILE_ROW1_VIEWPORT_WIDTH_PX =
  MOBILE_ROW1_ITEM_WIDTH_PX * 2 + MOBILE_GAP_PX;

/** Minimum horizontal distance to count as swipe; ignores small jitter. */
const MOBILE_SWIPE_THRESHOLD_PX = 40;
/** If vertical movement dominates, treat as scroll, not carousel. */
const MOBILE_SWIPE_VERTICAL_TOLERANCE_PX = 45;

/**
 * Mobile: SF Compact, 30/40, weight 457, flex item `1 0 0` (parent is flex row).
 * `md:` restores previous desktop (Manrope 48px, tracking).
 */
const FINISHED_HEADING_CLASS =
  "-mt-7 min-w-0 flex-[1_0_0] text-center text-[30px] not-italic font-[457] leading-[40px] text-black font-[\"SF_Compact\",-apple-system,BlinkMacSystemFont,sans-serif] md:-mt-3 md:flex-none md:font-manrope md:text-[48px] md:font-normal md:leading-[40px] md:tracking-[-0.9px]";

/**
 * Edge-to-edge gallery on md+ (`ml` breakout from centered column).
 */
const FINISHED_GALLERY_BLEED_OUTER_CLASS =
  "flex w-full min-w-0 max-w-full flex-col gap-2 max-md:-mx-4 max-md:w-[calc(100%+2rem)] max-md:items-stretch md:ml-[calc(50%-50vw)] md:w-[100vw] md:max-w-[100vw] md:shrink-0 md:self-stretch";

export function SectionFinishedCreations({
  row1,
  row2,
}: SectionFinishedCreationsProps) {
  const ROW1_IMAGES = row1;
  const ROW2_IMAGES = row2;
  const TOTAL_PAGES = Math.max(1, ROW1_IMAGES.length);
  const ROW2_IMAGE_COUNT = Math.max(1, ROW2_IMAGES.length);

  const [activePage, setActivePage] = useState(0);
  const [isLargeMobileViewport, setIsLargeMobileViewport] = useState(false);
  const mobileSwipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const mobileRow2ViewportRef = useRef<HTMLDivElement>(null);
  const [mobileRow2CellWidthPx, setMobileRow2CellWidthPx] = useState(0);

  const goPrev = useCallback(() => {
    setActivePage((p) => (p <= 0 ? TOTAL_PAGES - 1 : p - 1));
  }, [TOTAL_PAGES]);

  const goNext = useCallback(() => {
    setActivePage((p) => (p >= TOTAL_PAGES - 1 ? 0 : p + 1));
  }, [TOTAL_PAGES]);

  useEffect(() => {
    if (TOTAL_PAGES <= 1) {
      return;
    }
    const intervalId = window.setInterval(() => {
      setActivePage((page) => (page >= TOTAL_PAGES - 1 ? 0 : page + 1));
    }, FINISHED_CREATIONS_AUTOPLAY_INTERVAL_MS);
    return () => {
      window.clearInterval(intervalId);
    };
  }, [TOTAL_PAGES]);

  useLayoutEffect(() => {
    const el = mobileRow2ViewportRef.current;
    if (!el) {
      return;
    }
    const measure = () => {
      const w = el.getBoundingClientRect().width;
      if (w <= 0) {
        return;
      }
      const cell = (w - 2 * MOBILE_GAP_PX) / 3;
      setMobileRow2CellWidthPx(Math.max(0, cell));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const updateIsLargeMobileViewport = () => {
      const viewportWidth = window.innerWidth;
      setIsLargeMobileViewport(
        viewportWidth >= LARGE_MOBILE_MIN_WIDTH_PX && viewportWidth < 768,
      );
    };
    updateIsLargeMobileViewport();
    window.addEventListener("resize", updateIsLargeMobileViewport);
    return () => {
      window.removeEventListener("resize", updateIsLargeMobileViewport);
    };
  }, []);

  const onMobileSwipePointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }
    mobileSwipeStartRef.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }, []);

  const onMobileSwipePointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const start = mobileSwipeStartRef.current;
      mobileSwipeStartRef.current = null;
      if (start === null) {
        return;
      }
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
        // Pointer was already released.
      }
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (Math.abs(dy) > MOBILE_SWIPE_VERTICAL_TOLERANCE_PX && Math.abs(dy) > Math.abs(dx)) {
        return;
      }
      if (Math.abs(dx) < MOBILE_SWIPE_THRESHOLD_PX) {
        return;
      }
      if (dx < 0) {
        goNext();
      } else {
        goPrev();
      }
    },
    [goNext, goPrev],
  );

  const onMobileSwipePointerCancel = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    mobileSwipeStartRef.current = null;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Pointer was already released.
    }
  }, []);

  /** Images rendered once; sliding via transform. Duplicated for seamless loop. */
  const row1StripImages = [...ROW1_IMAGES, ...ROW1_IMAGES];
  const row2StripImages = [...ROW2_IMAGES, ...ROW2_IMAGES];

  const mobileRow1OverflowRef = useRef<HTMLDivElement>(null);
  const [mobileRow1SlideWidthPx, setMobileRow1SlideWidthPx] = useState(0);

  useLayoutEffect(() => {
    const el1 = mobileRow1OverflowRef.current;
    const measure = () => {
      if (el1) {
        const w = el1.getBoundingClientRect().width;
        if (w > 0) {
          setMobileRow1SlideWidthPx(
            Math.max(0, (w - MOBILE_FINISHED_GALLERY_GAP_PX) / 2),
          );
        }
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (el1) {
      ro.observe(el1);
    }
    return () => {
      ro.disconnect();
    };
  }, []);

  const desktopCarouselContainerRef = useRef<HTMLDivElement>(null);
  const desktopMetrics = useFinishedCreationsCarouselMetrics(
    desktopCarouselContainerRef,
    DESKTOP_ROW1_VISIBLE_SLOTS_FALLBACK,
    DESKTOP_ROW2_VISIBLE_SLOTS_FALLBACK,
    DESKTOP_ROW1_PEEK_EDGE_VISIBLE_FRACTION,
    DESKTOP_ROW2_PEEK_EDGE_VISIBLE_FRACTION,
    DESKTOP_ROW2_PEEK_FULL_CENTER_SLIDES,
  );

  const mobileRow2StepPx =
    mobileRow2CellWidthPx > 0 ? mobileRow2CellWidthPx + MOBILE_GAP_PX : 0;
  const mobileRow2BaseTransformPx =
    mobileRow2StepPx > 0
      ? (activePage % ROW2_IMAGE_COUNT) * mobileRow2StepPx
      : 0;
  const mobileRow2PeekAdjustPx =
    activePage > 0 && mobileRow2StepPx > 0 ? MOBILE_CAROUSEL_EDGE_PEEK_PX : 0;
  const mobileRow2TransformPx = mobileRow2BaseTransformPx - mobileRow2PeekAdjustPx;

  const desktopRow1TransformPx = Math.round(
    desktopMetrics.row1PeekOffsetPx +
      (activePage % TOTAL_PAGES) * desktopMetrics.row1TranslatePx,
  );
  const desktopRow2TransformPx = Math.round(
    desktopMetrics.row2PeekOffsetPx +
      (activePage % ROW2_IMAGE_COUNT) * desktopMetrics.row2TranslatePx,
  );
  const mobileTopRowBleedPx = isLargeMobileViewport
    ? LARGE_MOBILE_TOP_ROW_BLEED_PX
    : MOBILE_TOP_ROW_BLEED_PX;
  const mobileRow1CardWidthPx =
    isLargeMobileViewport && mobileRow1SlideWidthPx > 0
      ? mobileRow1SlideWidthPx
      : MOBILE_ROW1_ITEM_WIDTH_PX;
  const mobileRow1SlideStepPx = mobileRow1CardWidthPx + MOBILE_GAP_PX;
  const mobileRow1ViewportWidth = isLargeMobileViewport
    ? "100vw"
    : MOBILE_ROW1_VIEWPORT_WIDTH_PX;

  const mobileRow1PeekAdjustPx =
    activePage > 0 ? MOBILE_CAROUSEL_EDGE_PEEK_PX : 0;
  const mobileRow1TranslatePx =
    mobileRow1PeekAdjustPx - activePage * mobileRow1SlideStepPx;

  return (
    <section
      id={LANDING_SECTION_IDS.FINISHED_CREATIONS}
      className="max-md:overflow-x-visible md:overflow-x-clip bg-white px-4 pt-[56px] pb-10 md:px-6"
      aria-labelledby="finished-heading"
    >
      <div className="mx-auto max-w-[1980px]">
        <div className="flex w-full md:contents">
          <h2 id="finished-heading" className={FINISHED_HEADING_CLASS}>
            Finished Creations
          </h2>
        </div>
        <div className="mt-9 flex flex-col gap-2 max-md:items-stretch md:items-stretch">
          <div
            className={`${FINISHED_GALLERY_BLEED_OUTER_CLASS} max-md:max-w-none`}
          >
            <div
            className="flex w-full min-w-0 touch-pan-y flex-col gap-2 max-md:max-w-none max-md:overflow-x-visible md:hidden"
            onPointerDown={onMobileSwipePointerDown}
            onPointerUp={onMobileSwipePointerUp}
            onPointerCancel={onMobileSwipePointerCancel}
            role="presentation"
          >
            <div
              className="flex w-full min-w-0 shrink-0 max-w-none flex-row gap-1"
              style={{
                width: `calc(100vw + ${mobileTopRowBleedPx}px)`,
                marginLeft: `calc(50% - 50vw - ${mobileTopRowBleedPx}px + ${MOBILE_GALLERY_NUDGE_RIGHT_PX}px)`,
              }}
            >
              <div
                ref={mobileRow1OverflowRef}
                className="shrink-0 overflow-hidden"
                style={{ width: mobileRow1ViewportWidth }}
              >
                <div
                  className="flex shrink-0 flex-row gap-1 transition-transform ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:duration-0"
                  style={{
                    transitionDuration: `${DESKTOP_CAROUSEL_TRANSITION_MS}ms`,
                    transform: `translate3d(${mobileRow1TranslatePx}px, 0, 0)`,
                  }}
                >
                  {row1StripImages.map((item, index) => (
                    <div
                      key={`mobile-row1-${item.id}-${index}`}
                      data-landing-image={item.imageId}
                      className="relative shrink-0 overflow-hidden rounded-none"
                      style={{
                        width: mobileRow1CardWidthPx,
                        height: MOBILE_ROW1_ITEM_HEIGHT_PX,
                      }}
                    >
                      <Image
                        src={item.src}
                        alt=""
                        fill
                        className={`object-cover ${item.objectPositionClass ?? ""} ${
                          index === activePage + 1 &&
                          item.objectPositionClass !== GALLERY_OBJECT_POSITION_PORTRAIT_CLASS
                            ? MOBILE_ROW1_RIGHT_OBJECT_POSITION_CLASS
                            : ""
                        }`.trim()}
                        sizes="(max-width: 767px) 310px, 50vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              ref={mobileRow2ViewportRef}
              className={`flex min-w-0 flex-row items-stretch gap-1 overflow-hidden ${MOBILE_ROW2_FULL_BLEED_CLASS}`}
              style={{
                width: `calc(100vw + ${MOBILE_ROW2_SIDE_BLEED_PX * 2}px)`,
                marginLeft: `calc(50% - 50vw - ${MOBILE_ROW2_SIDE_BLEED_PX}px + ${MOBILE_GALLERY_NUDGE_RIGHT_PX}px)`,
              }}
            >
              <div
                className="flex shrink-0 flex-row gap-1 transition-transform ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:duration-0"
                style={{
                  transitionDuration: `${DESKTOP_CAROUSEL_TRANSITION_MS}ms`,
                  transform:
                    mobileRow2StepPx > 0
                      ? `translate3d(-${mobileRow2TransformPx}px, 0, 0)`
                      : "translate3d(0, 0, 0)",
                }}
              >
                {row2StripImages.map((item, index) => (
                  <div
                    key={`mobile-row2-${item.id}-${index}`}
                    data-landing-image={item.imageId}
                    className={`relative overflow-hidden rounded-none ${
                      mobileRow2CellWidthPx > 0
                        ? "shrink-0"
                        : "min-h-0 min-w-0 flex-1 basis-0"
                    }`}
                    style={{
                      width:
                        mobileRow2CellWidthPx > 0
                          ? mobileRow2CellWidthPx
                          : undefined,
                      height: MOBILE_ROW2_CELL_HEIGHT_PX,
                    }}
                  >
                    <Image
                      src={item.src}
                      alt=""
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 767px) 34vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
            </div>
            <div
              ref={desktopCarouselContainerRef}
              className="hidden w-full min-w-0 max-w-full flex-col items-stretch gap-2 md:flex"
            >
              <div className="w-full min-w-0 overflow-hidden">
              <div
                className="flex gap-2 transition-transform ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:duration-0"
                style={{
                  transitionDuration: `${DESKTOP_CAROUSEL_TRANSITION_MS}ms`,
                  transform: `translate3d(-${desktopRow1TransformPx}px, 0, 0)`,
                }}
              >
                {row1StripImages.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    data-landing-image={item.imageId}
                    className="relative aspect-[670/370] shrink-0 overflow-hidden rounded-none"
                    style={{ width: desktopMetrics.row1SlideWidth }}
                  >
                    <Image
                      src={item.src}
                      alt=""
                      fill
                      className={`object-cover ${item.objectPositionClass ?? ""}`.trim()}
                      sizes="(min-width: 768px) 28vw, 670px"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full min-w-0 overflow-hidden">
              <div
                className="flex gap-2 transition-transform ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:duration-0"
                style={{
                  transitionDuration: `${DESKTOP_CAROUSEL_TRANSITION_MS}ms`,
                  transform: `translate3d(-${desktopRow2TransformPx}px, 0, 0)`,
                }}
              >
                {row2StripImages.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    data-landing-image={item.imageId}
                    className="relative shrink-0 overflow-hidden rounded-none"
                    style={{
                      width: desktopMetrics.row2SlideWidth,
                      aspectRatio: `${ROW2_ITEM_WIDTH} / ${ROW2_ITEM_HEIGHT}`,
                    }}
                  >
                    <Image
                      src={item.src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 20vw, 420px"
                    />
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>
        </div>
        <nav
          className="mt-16 flex items-center justify-center gap-6 pb-8 md:mt-16"
          aria-label="Carousel navigation"
        >
          <button
            type="button"
            onClick={goPrev}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-none border-0 bg-transparent text-[#181610] transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#c69f58]"
            aria-label="Previous page"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="flex items-center gap-2" role="tablist" aria-label="Page indicators">
            {Array.from({ length: TOTAL_PAGES }, (_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={activePage === i}
                aria-label={`Page ${i + 1}`}
                onClick={() => setActivePage(i)}
                className={`h-2 rounded-full border-0 transition-all duration-200 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#c69f58] focus:ring-offset-2 ${
                  activePage === i ? "w-6 bg-[#181610]" : "w-2 bg-[#d1d1d1]"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={goNext}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-none border-0 bg-transparent text-[#181610] transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#c69f58]"
            aria-label="Next page"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </nav>
      </div>
    </section>
  );
}
