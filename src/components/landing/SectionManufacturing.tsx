"use client";

import { LANDING_IMAGE_IDS, LANDING_SECTION_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import {
  MANUFACTURING_DETAIL_IMAGE_HEIGHT_PX,
  MANUFACTURING_DETAIL_IMAGE_WIDTH_PX,
  MANUFACTURING_SPECIALIZATION_ITEMS,
  type ManufacturingSpecializationId,
  type ManufacturingSpecializationItem,
} from "@/constants/manufacturing-specialization";
import Image from "next/image";
import { useState } from "react";

type ManufacturingAccordionRowProps = {
  item: ManufacturingSpecializationItem;
  isActive: boolean;
  onToggle: () => void;
};

function ManufacturingAccordionRow({
  item,
  isActive,
  onToggle,
}: ManufacturingAccordionRowProps) {
  const showDescription = isActive && Boolean(item.description);

  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        className="flex min-h-[69px] w-full shrink-0 items-center justify-between bg-transparent px-[30px] text-left transition-colors hover:bg-black/[0.02]"
        aria-expanded={isActive}
        aria-controls={item.description ? `manufacturing-detail-${item.id}` : undefined}
      >
        <span className="manufacturing-intelligence-accordion-label pr-4">
          {item.title}
        </span>
        <span
          className={`flex h-[13.63px] w-6 shrink-0 items-center justify-center transition-transform duration-200 ${
            isActive ? "-rotate-90" : "rotate-90"
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
      {showDescription ? (
        <div
          id={`manufacturing-detail-${item.id}`}
          className="border-t border-black/[0.06] px-[30px] pb-6 pt-3 text-left"
        >
          <p className="manufacturing-intelligence-accordion-detail text-[15px] font-normal leading-[22px] tracking-normal text-black/80">
            {item.description}
          </p>
        </div>
      ) : null}
    </>
  );
}

export function SectionManufacturing() {
  const [activeId, setActiveId] = useState<ManufacturingSpecializationId | null>(
    null,
  );

  const activeItem = activeId
    ? MANUFACTURING_SPECIALIZATION_ITEMS.find((i) => i.id === activeId)
    : undefined;

  const imageSrc =
    activeItem?.detailImageSrc ?? LANDING_IMAGES.manufacturing;
  const imageAlt =
    activeItem?.detailImageAlt ??
    "CAD workspace and jewelry model";
  const isDetailImageActive = Boolean(activeItem?.detailImageSrc);

  const handleToggle = (id: ManufacturingSpecializationId) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id={LANDING_SECTION_IDS.MANUFACTURING}
      className="overflow-hidden bg-[#f8f7f6] px-4 py-16 md:px-6 md:py-24"
      aria-labelledby="manufacturing-heading"
    >
      <div className="mx-auto w-full max-w-[1612px]">
        <h2
          id="manufacturing-heading"
          className="manufacturing-intelligence-heading text-left font-manrope text-[48px] font-normal leading-[40px] tracking-[-0.9px] text-black"
        >
          Manufacturing Intelligence
        </h2>

        <div className="manufacturing-intelligence-card-shell mt-[76px] overflow-hidden rounded-none bg-[linear-gradient(-65.02deg,#f8f7f6_0.94%,#c0c6cd_99.4%)]">
          <div className="grid min-h-0 grid-cols-1 gap-10 py-10 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:gap-0 lg:py-0 lg:pl-[2.61%] lg:pr-[4.59%]">
            <div className="flex min-w-0 flex-col divide-y divide-black/10 lg:pt-[94px]">
              {MANUFACTURING_SPECIALIZATION_ITEMS.map((item) => (
                <div key={item.id} className="flex min-w-0 flex-col">
                  <ManufacturingAccordionRow
                    item={item}
                    isActive={activeId === item.id}
                    onToggle={() => handleToggle(item.id)}
                  />
                </div>
              ))}
            </div>

            <div className="manufacturing-intelligence-image-column relative min-h-[280px] w-full lg:min-h-0">
              <div
                className="manufacturing-intelligence-image-frame relative mx-auto aspect-[750/625] w-full overflow-hidden lg:ml-auto lg:mr-0"
                data-landing-image={LANDING_IMAGE_IDS.MANUFACTURING_MAIN}
              >
                {isDetailImageActive ? (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <Image
                      key={imageSrc}
                      src={imageSrc}
                      alt={imageAlt}
                      width={MANUFACTURING_DETAIL_IMAGE_WIDTH_PX}
                      height={MANUFACTURING_DETAIL_IMAGE_HEIGHT_PX}
                      unoptimized
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="manufacturing-intelligence-photo-detail relative max-h-full"
                    />
                  </div>
                ) : (
                  <Image
                    key={imageSrc}
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="manufacturing-intelligence-photo"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
