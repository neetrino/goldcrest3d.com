"use client";

import { LANDING_SECTION_IDS } from "@/constants";
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
          className="text-center font-normal leading-tight tracking-[-0.02em] text-[var(--foreground)] text-[clamp(2rem,5vw,48px)]"
        >
          Manufacturing Intelligence
        </h2>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr,1fr] lg:items-start">
          <div className="space-y-3">
            {ACCORDION_ITEMS.map((item, i) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between rounded-2xl bg-white p-6 text-left shadow-sm transition hover:shadow-md"
                aria-expanded={openIndex === i}
              >
                <span className="font-extrabold text-[var(--foreground)] text-[18px]">
                  {item.title}
                </span>
                <span
                  className={`block h-6 w-6 shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                  aria-hidden
                >
                  <Image
                    src={LANDING_IMAGES.iconDown}
                    alt=""
                    width={24}
                    height={24}
                    className="h-full w-full"
                  />
                </span>
              </button>
            ))}
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#e8eaed] lg:min-h-[400px]">
            <Image
              src={LANDING_IMAGES.manufacturing}
              alt="CAD and manufacturing"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
