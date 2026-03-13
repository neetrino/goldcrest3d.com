"use client";

import { LANDING_SECTION_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import Image from "next/image";
import { useState } from "react";

/** Row1: 3 items, Row2: 4 items (incl. extra ring). Each has id gallery-item-1 … gallery-item-7 for per-item sizing. */
const ROW1_ITEMS = [
  { id: "gallery-item-1", src: LANDING_IMAGES.finishedCnc },
  { id: "gallery-item-2", src: LANDING_IMAGES.finishedCopper },
  { id: "gallery-item-3", src: LANDING_IMAGES.finishedOpacity },
];
const ROW2_ITEMS = [
  { id: "gallery-item-4", src: LANDING_IMAGES.finishedCopper },
  { id: "gallery-item-5", src: LANDING_IMAGES.finishedOpacity },
  { id: "gallery-item-6", src: LANDING_IMAGES.finishedCnc },
  { id: "gallery-item-7", src: LANDING_IMAGES.finishedCopper },
];

export function SectionFinishedCreations() {
  const [activeDot, setActiveDot] = useState(0);

  return (
    <section
      id={LANDING_SECTION_IDS.FINISHED_CREATIONS}
      className="bg-white px-4 pt-[56px] pb-10 md:px-6"
      aria-labelledby="finished-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <h2
          id="finished-heading"
          className="text-center font-semibold leading-tight tracking-tight text-[#181610] text-[28px]"
        >
          Finished Creations
        </h2>
        <div className="mt-9 flex flex-col items-center gap-2">
          <div className="grid grid-cols-[540px_575px_540px] gap-x-2 gap-y-4">
            {ROW1_ITEMS.map((item) => (
              <div
                key={item.id}
                id={item.id}
                className={`relative overflow-hidden rounded-[16px] ${
                  item.id === "gallery-item-1"
                    ? "h-[360px] w-[540px] aspect-[145/84]"
                    : item.id === "gallery-item-2"
                      ? "h-[360px] w-[575px] aspect-[79/42]"
                      : item.id === "gallery-item-3"
                        ? "h-[360px] w-[540px] aspect-[145/84]"
                        : "aspect-square"
                }`}
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
                  sizes={
                    item.id === "gallery-item-1"
                      ? "540px"
                      : item.id === "gallery-item-2"
                        ? "575px"
                        : item.id === "gallery-item-3"
                          ? "540px"
                          : "(max-width: 768px) 33vw, 390px"
                  }
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
                className="relative h-[235px] w-full min-w-0 overflow-hidden rounded-[16px]"
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
