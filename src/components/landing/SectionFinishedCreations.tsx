"use client";

import { LANDING_SECTION_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import Image from "next/image";
import { useState } from "react";

/** Figma: Slide1 row 3 images 725/790/790 h420; Slide2 row 5 images 480/480/440/480/480 h256. Dots: 4, one active. */
const ROW1_IMAGES = [
  { src: LANDING_IMAGES.finishedCnc, w: 725, h: 420 },
  { src: LANDING_IMAGES.finishedCopper, w: 790, h: 420 },
  { src: LANDING_IMAGES.finishedOpacity, w: 790, h: 420 },
];
const ROW2_IMAGES = [
  { src: LANDING_IMAGES.finishedCopper, w: 480, h: 256 },
  { src: LANDING_IMAGES.finishedOpacity, w: 480, h: 256 },
  { src: LANDING_IMAGES.finishedCnc, w: 440, h: 256 },
  { src: LANDING_IMAGES.finishedCopper, w: 480, h: 256 },
  { src: LANDING_IMAGES.finishedOpacity, w: 480, h: 256 },
];

export function SectionFinishedCreations() {
  const [activeDot, setActiveDot] = useState(0);

  return (
    <section
      id={LANDING_SECTION_IDS.FINISHED_CREATIONS}
      className="bg-[#f8f7f6] px-4 py-[81px] md:px-6 md:py-[81px]"
      aria-labelledby="finished-heading"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="finished-heading"
          className="font-manrope text-center font-normal leading-[40px] tracking-[-0.9px] text-black text-[48px]"
        >
          Finished Creations
        </h2>
        <div className="mt-[27px] flex flex-col gap-[10px]">
          <div className="flex flex-wrap justify-center gap-[10px]">
            {ROW1_IMAGES.map((item, i) => (
              <div
                key={`r1-${i}`}
                className="relative h-[256px] flex-1 min-w-[200px] max-w-[725px] overflow-hidden rounded-[16px] md:h-[420px]"
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 725px"
                  unoptimized
                />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-[10px]">
            {ROW2_IMAGES.map((item, i) => (
              <div
                key={`r2-${i}`}
                className="relative h-[180px] min-w-[120px] flex-1 max-w-[480px] overflow-hidden rounded-[16px] md:h-[256px]"
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 480px"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
        <div
          className="mt-[27px] flex justify-center items-center gap-[6px]"
          aria-label="Carousel indicators"
        >
          {[0, 1, 2, 3].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveDot(i)}
              className={`h-[9px] rounded-full border-0 transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#c69f58] ${
                activeDot === i
                  ? "w-5 rounded-[4.5px] bg-[#181610]"
                  : "w-[9px] bg-[rgba(24,22,16,0.2)]"
              }`}
              aria-current={activeDot === i ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
