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

type ManufacturingAccordionRowProps = {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
};

function ManufacturingAccordionRow({
  title,
  isOpen,
  onToggle,
}: ManufacturingAccordionRowProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex h-[69px] w-full shrink-0 items-center justify-between bg-transparent px-[30px] text-left transition-colors hover:bg-black/[0.02]"
      aria-expanded={isOpen}
    >
      <span className="manufacturing-intelligence-accordion-label pr-4">
        {title}
      </span>
      <span
        className={`flex h-[13.63px] w-6 shrink-0 items-center justify-center transition-transform duration-200 ${
          isOpen ? "-rotate-90" : "rotate-90"
        }`}
        aria-hidden
        data-landing-image={LANDING_IMAGE_IDS.MANUFACTURING_ICON_DOWN}
      >
        <span className="relative h-6 w-[13.63px]">
          <Image
            src={LANDING_IMAGES.iconDown}
            alt=""
            width={24}
            height={24}
            className="h-full w-full object-contain"
            unoptimized
          />
        </span>
      </span>
    </button>
  );
}

export function SectionManufacturing() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id={LANDING_SECTION_IDS.MANUFACTURING}
      className="overflow-hidden bg-[#f8f7f6] px-4 py-16 md:px-6 md:py-24"
      aria-labelledby="manufacturing-heading"
    >
      <div className="mx-auto w-full max-w-[1612px]">
        <h2
          id="manufacturing-heading"
          className="manufacturing-intelligence-heading text-left"
        >
          Manufacturing Intelligence
        </h2>

        <div className="manufacturing-intelligence-card-shell mt-[76px] overflow-hidden rounded-none bg-[linear-gradient(-65.02deg,#f8f7f6_0.94%,#c0c6cd_99.4%)]">
          <div className="grid min-h-0 grid-cols-1 gap-10 py-10 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:gap-0 lg:py-0 lg:pl-[2.61%] lg:pr-[4.59%]">
            <div className="flex min-w-0 flex-col divide-y divide-black/10 lg:pt-[94px]">
              {ACCORDION_ITEMS.map((item, i) => (
                <ManufacturingAccordionRow
                  key={item.title}
                  title={item.title}
                  isOpen={openIndex === i}
                  onToggle={() =>
                    setOpenIndex(openIndex === i ? null : i)
                  }
                />
              ))}
            </div>

            <div className="manufacturing-intelligence-image-column relative min-h-[280px] w-full lg:min-h-0">
              <div
                className="manufacturing-intelligence-image-frame relative mx-auto aspect-[750/625] w-full overflow-hidden lg:ml-auto lg:mr-0"
                data-landing-image={LANDING_IMAGE_IDS.MANUFACTURING_MAIN}
              >
                <Image
                  src={LANDING_IMAGES.manufacturing}
                  alt="CAD workspace and jewelry model"
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="manufacturing-intelligence-photo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
