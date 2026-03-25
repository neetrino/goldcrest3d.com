"use client";

import { LANDING_IMAGE_IDS, LANDING_SECTION_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

type GalleryItem = {
  id: string;
  imageId: string;
  src: string;
  objectPositionClass?: string;
};

/** Carousel: 4 large images that rotate infinitely. Add more to extend. */
const ROW1_IMAGES: GalleryItem[] = [
  { id: "row1-img-1", imageId: LANDING_IMAGE_IDS.FINISHED_1, src: "/images/finished/block1-portrait-jewelry.png", objectPositionClass: "gallery-object-position-portrait" },
  { id: "row1-img-2", imageId: LANDING_IMAGE_IDS.FINISHED_2, src: "/images/finished/block2-ancient-heritage.png" },
  { id: "row1-img-3", imageId: LANDING_IMAGE_IDS.FINISHED_3, src: "/images/finished/block3-hiphop.png" },
  { id: "row1-img-4", imageId: LANDING_IMAGE_IDS.FINISHED_4, src: LANDING_IMAGES.modelingBridal },
];

/** Carousel: 5 small images that rotate together with row1. */
const ROW2_ITEM_WIDTH = 420;
const ROW2_ITEM_HEIGHT = 232;
const ROW2_GAP = 8;

const ROW2_IMAGES: GalleryItem[] = [
  { id: "row2-img-1", imageId: LANDING_IMAGE_IDS.FINISHED_4, src: "/images/finished/small-block-bridal-1.png" },
  { id: "row2-img-2", imageId: LANDING_IMAGE_IDS.FINISHED_5, src: "/images/finished/small-block-bridal-2.png" },
  { id: "row2-img-3", imageId: LANDING_IMAGE_IDS.FINISHED_6, src: "/images/finished/small-block-portrait.png" },
  { id: "row2-img-4", imageId: LANDING_IMAGE_IDS.FINISHED_7, src: LANDING_IMAGES.modelingMechanical },
  { id: "row2-img-5", imageId: LANDING_IMAGE_IDS.FINISHED_7, src: "/images/finished/small-block-bridal-1.png" },
];

const TOTAL_PAGES = ROW1_IMAGES.length;
const SLOT_WIDTH = 670;
const SLOT_HEIGHT = 370;
const SLOT_GAP = 8;
const TRANSLATE_PER_PAGE = SLOT_WIDTH + SLOT_GAP;

const ROW2_IMAGE_COUNT = ROW2_IMAGES.length;

/** Mobile gallery: taller than desktop slot ratio (same width, more height). */
const MOBILE_BLOCK_HEIGHT_SCALE = 1.3;
/** Mobile small row only: extra scale on top of `MOBILE_BLOCK_HEIGHT_SCALE`. */
const MOBILE_SMALL_BLOCK_SIZE_SCALE = 0.95;
const MOBILE_ROW1_ASPECT_HEIGHT = Math.round(SLOT_HEIGHT * MOBILE_BLOCK_HEIGHT_SCALE);
const MOBILE_ROW2_ASPECT_HEIGHT = Math.round(
  ROW2_ITEM_HEIGHT * MOBILE_BLOCK_HEIGHT_SCALE * MOBILE_SMALL_BLOCK_SIZE_SCALE,
);

/** Minimum horizontal distance to count as swipe; ignores small jitter. */
const MOBILE_SWIPE_THRESHOLD_PX = 48;
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

export function SectionFinishedCreations() {
  const [activePage, setActivePage] = useState(0);
  const mobileSwipeStartRef = useRef<{ x: number; y: number } | null>(null);

  const goPrev = useCallback(() => {
    setActivePage((p) => (p <= 0 ? TOTAL_PAGES - 1 : p - 1));
  }, []);

  const goNext = useCallback(() => {
    setActivePage((p) => (p >= TOTAL_PAGES - 1 ? 0 : p + 1));
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

  const row2TranslatePerPage = ROW2_ITEM_WIDTH + ROW2_GAP;
  const row2ViewportWidth = ROW2_ITEM_WIDTH * 5 + ROW2_GAP * 4;

  const mobileRow1Left = ROW1_IMAGES[activePage % TOTAL_PAGES];
  const mobileRow1Right = ROW1_IMAGES[(activePage + 1) % TOTAL_PAGES];
  const mobileRow2First = activePage % ROW2_IMAGE_COUNT;
  const mobileRow2Items = [
    ROW2_IMAGES[mobileRow2First],
    ROW2_IMAGES[(mobileRow2First + 1) % ROW2_IMAGE_COUNT],
    ROW2_IMAGES[(mobileRow2First + 2) % ROW2_IMAGE_COUNT],
  ] as const;

  return (
    <section
      id={LANDING_SECTION_IDS.FINISHED_CREATIONS}
      className="bg-white px-4 pt-[56px] pb-10 md:px-6"
      aria-labelledby="finished-heading"
    >
      <div className="mx-auto max-w-[1980px]">
        <div className="flex w-full md:contents">
          <h2 id="finished-heading" className={FINISHED_HEADING_CLASS}>
            Finished Creations
          </h2>
        </div>
        <div className="mt-9 flex flex-col gap-2 max-md:items-stretch md:items-center">
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
                    sizes="(max-width: 767px) 50vw, 670px"
                    unoptimized
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
                      sizes="(max-width: 767px) 50vw, 420px"
                      unoptimized
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="hidden flex-col items-center gap-2 md:flex">
            <div
              className="overflow-hidden"
              style={{ width: SLOT_WIDTH * 4 + SLOT_GAP * 3 }}
            >
              <div
                className="flex gap-x-2 transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(-${(activePage % TOTAL_PAGES) * TRANSLATE_PER_PAGE}px)`,
                }}
              >
                {row1StripImages.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    data-landing-image={item.imageId}
                    className="relative h-[370px] flex-shrink-0 overflow-hidden rounded-none"
                    style={{ width: SLOT_WIDTH }}
                  >
                    <Image
                      src={item.src}
                      alt=""
                      fill
                      className={`object-cover ${item.objectPositionClass ?? ""}`.trim()}
                      sizes="670px"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
            <div
              className="overflow-hidden"
              style={{ width: row2ViewportWidth }}
            >
              <div
                className="flex gap-x-2 transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(-${(activePage % ROW2_IMAGES.length) * row2TranslatePerPage}px)`,
                }}
              >
                {row2StripImages.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    data-landing-image={item.imageId}
                    className="relative flex-shrink-0 overflow-hidden rounded-none"
                    style={{ width: ROW2_ITEM_WIDTH, height: ROW2_ITEM_HEIGHT }}
                  >
                    <Image
                      src={item.src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="420px"
                      unoptimized
                    />
                  </div>
                ))}
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
            className="flex h-8 w-8 items-center justify-center rounded-none border-0 bg-transparent text-[#181610] transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#c69f58]"
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
            className="flex h-8 w-8 items-center justify-center rounded-none border-0 bg-transparent text-[#181610] transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#c69f58]"
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
