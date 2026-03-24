"use client";

import { LANDING_IMAGE_IDS, LANDING_SECTION_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import Image from "next/image";
import { useState } from "react";

/** Row1: 3 items, Row2: 4 items. data-landing-image: finished-1 … finished-7 for section-by-section replacement. */
const ROW1_ITEMS = [
  { id: "gallery-item-1", imageId: LANDING_IMAGE_IDS.FINISHED_1, src: LANDING_IMAGES.finishedCnc },
  { id: "gallery-item-2", imageId: LANDING_IMAGE_IDS.FINISHED_2, src: LANDING_IMAGES.finishedCopper },
  { id: "gallery-item-3", imageId: LANDING_IMAGE_IDS.FINISHED_3, src: LANDING_IMAGES.finishedOpacity },
];
const ROW2_ITEMS = [
  { id: "gallery-item-4", imageId: LANDING_IMAGE_IDS.FINISHED_4, src: LANDING_IMAGES.finishedCopper },
  { id: "gallery-item-5", imageId: LANDING_IMAGE_IDS.FINISHED_5, src: LANDING_IMAGES.finishedOpacity },
  { id: "gallery-item-6", imageId: LANDING_IMAGE_IDS.FINISHED_6, src: LANDING_IMAGES.finishedCnc },
  { id: "gallery-item-7", imageId: LANDING_IMAGE_IDS.FINISHED_7, src: LANDING_IMAGES.finishedCopper },
];

export function SectionFinishedCreations() {
  const [activeDot, setActiveDot] = useState(0);

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
          <div className="grid grid-cols-[650px_650px_650px] gap-x-2 gap-y-4">
            {ROW1_ITEMS.map((item) => (
              <div
                key={item.id}
                id={item.id}
                data-landing-image={item.imageId}
                className="relative h-[406px] w-[650px] overflow-hidden rounded-none"
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  className={
                    item.id === "gallery-item-1"
                      ? "object-cover object-position-[0_-0.215px]"
                      : item.id === "gallery-item-2"
                        ? "object-cover object-position-[0_-176.4975px]"
                        : "object-cover"
                  }
                  sizes="650px"
                  unoptimized
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-[412px_412px_412px_412px] gap-x-2 gap-y-4">
            {ROW2_ITEMS.map((item) => (
              <div
                key={item.id}
                id={item.id}
                data-landing-image={item.imageId}
                className="relative h-[235px] w-full min-w-0 overflow-hidden rounded-none"
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="412px"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
        <div
          className="mt-10 flex justify-center items-center gap-2 pb-8"
          aria-label="Carousel indicators"
        >
          {[0, 1, 2, 3].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveDot(i)}
              className={`h-2 w-2 rounded-full border-0 transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#c69f58] ${
                activeDot === i ? "bg-[#181610]" : "bg-[rgba(24,22,16,0.2)]"
              }`}
              aria-current={activeDot === i ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
