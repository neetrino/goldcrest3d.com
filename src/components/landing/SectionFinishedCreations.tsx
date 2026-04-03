"use client";

import { LANDING_SECTION_IDS } from "@/constants";
import type { FinishedGalleryItem } from "@/lib/site-media/landing-defaults";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { useFinishedCreationsCarouselMetrics } from "@/components/landing/useFinishedCreationsCarouselMetrics";

/** Carousel: small row (row 2) â€” design aspect; slide width is fluid from container. */
const ROW2_ITEM_WIDTH = 420;
const ROW2_ITEM_HEIGHT = 232;

type SectionFinishedCreationsProps = {
  row1: FinishedGalleryItem[];
  row2: FinishedGalleryItem[];
};
const SLOT_WIDTH = 670;
const SLOT_HEIGHT = 370;
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

/** Mobile gallery: slightly taller than desktop slot ratio so blocks feel larger. */
const MOBILE_BLOCK_HEIGHT_SCALE = 1.38;
/** Mobile small row only: extra scale on top of `MOBILE_BLOCK_HEIGHT_SCALE`. */
const MOBILE_SMALL_BLOCK_SIZE_SCALE = 0.95;
const MOBILE_ROW1_ASPECT_HEIGHT = Math.round(SLOT_HEIGHT * MOBILE_BLOCK_HEIGHT_SCALE);
const MOBILE_ROW2_ASPECT_HEIGHT = Math.round(
  ROW2_ITEM_HEIGHT * MOBILE_BLOCK_HEIGHT_SCALE * MOBILE_SMALL_BLOCK_SIZE_SCALE,
);

/** Minimum horizontal distance to count as swipe; ignores small jitter. */
const MOBILE_SWIPE_THRESHOLD_PX = 40;
/** If vertical movement dominates, treat as scroll, not carousel. */
const MOBILE_SWIPE_VERTICAL_TOLERANCE_PX = 45;

/**
 * Mobile top row: bleed past the left edge only (shift left; right stays at viewport).
 * ~144px past the left viewport edge only; extra width matches shift (right at 100vw).
 * `50%` = parent content width. Literal classes for Tailwind JIT.
 */
const MOBILE_TOP_ROW_BLEED_CLASS =
  "shrink-0 max-w-none w-[calc(100vw+144px)] ml-[calc(50%-50vw-144px)]";

/**
 * Mobile small row: full viewport width (symmetric bleed) so 1:2:1 columns align to screen edges.
 */
const MOBILE_SMALL_ROW_CLASS =
  "shrink-0 max-w-none w-[100vw] ml-[calc(50%-50vw)]";

/**
 * Mobile: SF Compact, 30/40, weight 457, flex item `1 0 0` (parent is flex row).
 * `md:` restores previous desktop (Manrope 48px, tracking).
 */
const FINISHED_HEADING_CLASS =
  "-mt-4 min-w-0 flex-[1_0_0] text-center text-[30px] not-italic font-[457] leading-[40px] text-black font-[\"SF_Compact\",-apple-system,BlinkMacSystemFont,sans-serif] md:mt-0 md:flex-none md:font-manrope md:text-[48px] md:font-normal md:leading-[40px] md:tracking-[-0.9px]";

/**
 * Edge-to-edge gallery on md+ (`ml` breakout from centered column).
 */
const FINISHED_GALLERY_BLEED_OUTER_CLASS =
  "flex w-full min-w-0 max-w-full flex-col gap-2 max-md:items-stretch md:ml-[calc(50%-50vw)] md:w-[100vw] md:max-w-[100vw] md:shrink-0 md:self-stretch";

export function SectionFinishedCreations({
  row1,
  row2,
}: SectionFinishedCreationsProps) {
  const ROW1_IMAGES = row1;
  const ROW2_IMAGES = row2;
  const TOTAL_PAGES = Math.max(1, ROW1_IMAGES.length);
  const ROW2_IMAGE_COUNT = Math.max(1, ROW2_IMAGES.length);

  const [activePage, setActivePage] = useState(0);
  const mobileSwipeStartRef = useRef<{ x: number; y: number } | null>(null);

  const goPrev = useCallback(() => {
    setActivePage((p) => (p <= 0 ? TOTAL_PAGES - 1 : p - 1));
  }, [TOTAL_PAGES]);

  const goNext = useCallback(() => {
    setActivePage((p) => (p >= TOTAL_PAGES - 1 ? 0 : p + 1));
  }, [TOTAL_PAGES]);

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

  const desktopCarouselContainerRef = useRef<HTMLDivElement>(null);
  const desktopMetrics = useFinishedCreationsCarouselMetrics(
    desktopCarouselContainerRef,
    DESKTOP_ROW1_VISIBLE_SLOTS_FALLBACK,
    DESKTOP_ROW2_VISIBLE_SLOTS_FALLBACK,
    DESKTOP_ROW1_PEEK_EDGE_VISIBLE_FRACTION,
    DESKTOP_ROW2_PEEK_EDGE_VISIBLE_FRACTION,
    DESKTOP_ROW2_PEEK_FULL_CENTER_SLIDES,
  );

  const mobileRow1Left = ROW1_IMAGES[activePage % TOTAL_PAGES];
  const mobileRow1Right = ROW1_IMAGES[(activePage + 1) % TOTAL_PAGES];
  const mobileRow2First = activePage % ROW2_IMAGE_COUNT;
  const mobileRow2Items = [
    ROW2_IMAGES[mobileRow2First],
    ROW2_IMAGES[(mobileRow2First + 1) % ROW2_IMAGE_COUNT],
    ROW2_IMAGES[(mobileRow2First + 2) % ROW2_IMAGE_COUNT],
  ] as const;

  const desktopRow1TransformPx = Math.round(
    desktopMetrics.row1PeekOffsetPx +
      (activePage % TOTAL_PAGES) * desktopMetrics.row1TranslatePx,
  );
  const desktopRow2TransformPx = Math.round(
    desktopMetrics.row2PeekOffsetPx +
      (activePage % ROW2_IMAGE_COUNT) * desktopMetrics.row2TranslatePx,
  );

  return (
    <section
      id={LANDING_SECTION_IDS.FINISHED_CREATIONS}
      className="overflow-x-clip bg-white px-4 pt-[56px] pb-10 md:px-6"
      aria-labelledby="finished-heading"
    >
      <div className="mx-auto max-w-[1980px]">
        <div className="flex w-full md:contents">
          <h2 id="finished-heading" className={FINISHED_HEADING_CLASS}>
            Finished Creations
          </h2>
        </div>
        <div className="mt-9 flex flex-col gap-2 max-md:items-stretch md:items-stretch">
          <div className={FINISHED_GALLERY_BLEED_OUTER_CLASS}>
            <div
            className="flex w-full max-w-full min-w-0 touch-pan-y flex-col gap-2 max-md:overflow-x-visible md:hidden"
            onPointerDown={onMobileSwipePointerDown}
            onPointerUp={onMobileSwipePointerUp}
            onPointerCancel={onMobileSwipePointerCancel}
            role="presentation"
          >
            <div className={`grid grid-cols-2 gap-1 ${MOBILE_TOP_ROW_BLEED_CLASS}`}>
              {[mobileRow1Left, mobileRow1Right].map((item, index) => (
                <div
                  key={`mobile-row1-${item.id}-${activePage}-${index}`}
                  data-landing-image={item.imageId}
                  className="relative w-full min-w-0 overflow-hidden rounded-none"
                  style={{ aspectRatio: `${SLOT_WIDTH} / ${MOBILE_ROW1_ASPECT_HEIGHT}` }}
                >
                  <Image
                    src={item.src}
                    alt=""
                    fill
                    className={`object-cover ${item.objectPositionClass ?? ""}`.trim()}
                    sizes="(max-width: 767px) 50vw, 50vw"
                  />
                </div>
              ))}
            </div>
            <div
              className={`grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] gap-1 ${MOBILE_SMALL_ROW_CLASS}`}
            >
              {mobileRow2Items.map((item, index) => {
                const sideObjectPositionClass =
                  index === 0 ? "object-right" : index === 2 ? "object-left" : "object-center";
                const isCenter = index === 1;
                return (
                  <div
                    key={`mobile-row2-${item.id}-${activePage}-${index}`}
                    data-landing-image={item.imageId}
                    className="relative min-h-0 min-w-0 overflow-hidden rounded-none"
                    style={
                      isCenter
                        ? { aspectRatio: `${ROW2_ITEM_WIDTH} / ${MOBILE_ROW2_ASPECT_HEIGHT}` }
                        : undefined
                    }
                  >
                    <Image
                      src={item.src}
                      alt=""
                      fill
                      className={`object-cover ${sideObjectPositionClass}`.trim()}
                      sizes="(max-width: 767px) 33vw, 33vw"
                    />
                  </div>
                );
              })}
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
