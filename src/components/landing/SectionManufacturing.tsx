"use client";

import { LANDING_IMAGE_IDS, LANDING_SECTION_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import Image from "next/image";
import { useState } from "react";

const ACCORDION_ITEMS: Array<{ title: string }> = [
  { title: "Tolerance Control & Assembly Precision" },
  { title: "Mechanical Stress & Load Distribution" },
  { title: "3D Printing Strategy & Resin Behavior" },
  { title: "Casting Compensation & Metal Flow Awareness" },
  { title: "Stone Seat Geometry & Setting Logic" },
  { title: "Wall Thickness Engineering" },
];

export function SectionManufacturing() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id={LANDING_SECTION_IDS.MANUFACTURING}
      className="overflow-hidden bg-[#f8f7f6] px-4 py-16 md:px-6 md:py-24"
      aria-labelledby="manufacturing-heading"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="manufacturing-heading"
          className="font-manrope text-left font-normal leading-[40px] tracking-[-0.9px] text-black text-[48px]"
        >
          Manufacturing Intelligence
        </h2>
        <div
          className="mt-[120px] overflow-hidden rounded-[16px] p-6 lg:p-8"
          style={{
            background:
              "linear-gradient(-65.02deg, rgb(248, 247, 246) 0.94%, rgb(192, 198, 205) 99.4%)",
          }}
        >
          <div className="grid gap-8 lg:grid-cols-[1fr,1fr] lg:items-stretch">
          <div className="space-y-3">
            {ACCORDION_ITEMS.map((item, i) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between rounded-[16px] bg-white p-[30px] text-left shadow-sm transition hover:shadow-md"
                aria-expanded={openIndex === i}
              >
                <span className="font-manrope font-extrabold leading-[28px] text-black text-[18px]">
                  {item.title}
                </span>
                <span
                  className={`block h-6 w-6 shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                  aria-hidden
                  data-landing-image={LANDING_IMAGE_IDS.MANUFACTURING_ICON_DOWN}
                >
                  <Image
                    src={LANDING_IMAGES.iconDown}
                    alt=""
                    width={24}
                    height={24}
                    className="h-full w-full"
                    unoptimized
                  />
                </span>
              </button>
            ))}
          </div>
          <div
            className="relative aspect-[750/625] overflow-hidden rounded-[16px] bg-[#e8eaed] lg:min-h-[400px]"
            data-landing-image={LANDING_IMAGE_IDS.MANUFACTURING_MAIN}
          >
            <Image
              src={LANDING_IMAGES.manufacturing}
              alt="CAD and manufacturing"
              unoptimized
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
