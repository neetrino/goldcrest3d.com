"use client";

import { LANDING_IMAGE_IDS, LANDING_SECTION_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import Image from "next/image";
import { useCallback, useState } from "react";

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

/** Fixed row — small blocks (480×256), no carousel. */
const ROW2_ITEM_WIDTH = 420;
const ROW2_ITEM_HEIGHT = 232;

const ROW2_ITEMS: GalleryItem[] = [
  { id: "row2-item-1", imageId: LANDING_IMAGE_IDS.FINISHED_4, src: "/images/finished/small-block-bridal-1.png" },
  { id: "row2-item-2", imageId: LANDING_IMAGE_IDS.FINISHED_5, src: "/images/finished/small-block-bridal-2.png" },
  { id: "row2-item-3", imageId: LANDING_IMAGE_IDS.FINISHED_6, src: "/images/finished/small-block-portrait.png" },
  { id: "row2-item-4", imageId: LANDING_IMAGE_IDS.FINISHED_7, src: LANDING_IMAGES.modelingMechanical },
  { id: "row2-item-5", imageId: LANDING_IMAGE_IDS.FINISHED_7, src: "/images/finished/small-block-bridal-1.png" },
];

const TOTAL_PAGES = ROW1_IMAGES.length;
const SLOT_WIDTH = 670;
const SLOT_GAP = 8;
const TRANSLATE_PER_PAGE = SLOT_WIDTH + SLOT_GAP;

export function SectionFinishedCreations() {
  const [activePage, setActivePage] = useState(0);

  const goPrev = useCallback(() => {
    setActivePage((p) => (p <= 0 ? TOTAL_PAGES - 1 : p - 1));
  }, []);

  const goNext = useCallback(() => {
    setActivePage((p) => (p >= TOTAL_PAGES - 1 ? 0 : p + 1));
  }, []);

  /** Images rendered once; sliding via transform. Duplicated for seamless loop. */
  const stripImages = [...ROW1_IMAGES, ...ROW1_IMAGES];

  return (
    <section
      id={LANDING_SECTION_IDS.FINISHED_CREATIONS}
      className="bg-white px-4 pt-[56px] pb-10 md:px-6"
      aria-labelledby="finished-heading"
    >
      <div className="mx-auto max-w-[1980px]">
        <h2
          id="finished-heading"
          className="text-center font-semibold leading-tight tracking-tight text-[#181610] text-[28px]"
        >
          Finished Creations
        </h2>
        <div className="mt-9 flex flex-col items-center gap-2">
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
              {stripImages.map((item, index) => (
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
            className="flex gap-x-2"
            style={{
              width: ROW2_ITEMS.length * ROW2_ITEM_WIDTH + (ROW2_ITEMS.length - 1) * 8,
            }}
          >
            {ROW2_ITEMS.map((item) => (
              <div
                key={item.id}
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
        <nav
          className="mt-10 flex items-center justify-center gap-6 pb-8"
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
