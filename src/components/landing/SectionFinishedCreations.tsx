"use client";

import { LANDING_SECTION_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import Image from "next/image";
import { useState } from "react";

/** Figma: row1 — 3 images, row2 — 4 images (extra ring). Equal cells, gap 16px. */
const ROW1_IMAGES = [
  LANDING_IMAGES.finishedCnc,
  LANDING_IMAGES.finishedCopper,
  LANDING_IMAGES.finishedOpacity,
];
const ROW2_IMAGES = [
  LANDING_IMAGES.finishedCopper,
  LANDING_IMAGES.finishedOpacity,
  LANDING_IMAGES.finishedCnc,
  LANDING_IMAGES.finishedCopper,
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
        <div className="mt-9 flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4">
            {ROW1_IMAGES.map((src, i) => (
              <div
                key={`r1-${i}`}
                className="relative aspect-square overflow-hidden rounded-[16px]"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 390px"
                  unoptimized
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {ROW2_IMAGES.map((src, i) => (
              <div
                key={`r2-${i}`}
                className="relative aspect-square overflow-hidden rounded-[16px]"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 290px"
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
