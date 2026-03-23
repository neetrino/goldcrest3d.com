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
import { useMemo, useState } from "react";
import { MANUFACTURING_IMAGE_OPACITY_CLASS } from "./manufacturing-image.constants";
import { useManufacturingDetailLayers } from "./useManufacturingDetailLayers";

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
  const descriptionHasManualLineBreaks = item.description?.includes("\n") ?? false;

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
          className={
            descriptionHasManualLineBreaks
              ? "overflow-x-auto border-t border-black/[0.06] px-[30px] pb-6 pt-3 text-left"
              : "border-t border-black/[0.06] px-[30px] pb-6 pt-3 text-left"
          }
        >
          <p
            className={`manufacturing-intelligence-accordion-detail text-[15px] font-normal leading-[22px] tracking-normal text-black/80 ${
              descriptionHasManualLineBreaks ? "whitespace-pre" : ""
            }`}
          >
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

  const activeItem = useMemo(
    () =>
      activeId
        ? MANUFACTURING_SPECIALIZATION_ITEMS.find((i) => i.id === activeId)
        : undefined,
    [activeId],
  );

  const {
    slot0,
    slot1,
    slot0Visible,
    slot1Visible,
    elevatedSlot,
    detailObscuresDefault,
  } = useManufacturingDetailLayers({ activeItem });

  const defaultManufacturingAlt = "CAD workspace and jewelry model";

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
                <Image
                  src={LANDING_IMAGES.manufacturing}
                  alt={defaultManufacturingAlt}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className={`manufacturing-intelligence-photo ${MANUFACTURING_IMAGE_OPACITY_CLASS} ${
                    detailObscuresDefault
                      ? "pointer-events-none opacity-0"
                      : "opacity-100"
                  }`}
                  aria-hidden={detailObscuresDefault}
                />
                {slot0 ? (
                  <div
                    className={`pointer-events-none absolute inset-0 flex items-center justify-center ${
                      elevatedSlot === 0 ? "z-[2]" : "z-[1]"
                    }`}
                  >
                    <Image
                      key="mfg-detail-slot-0"
                      src={slot0.src}
                      alt={slot0.alt}
                      width={MANUFACTURING_DETAIL_IMAGE_WIDTH_PX}
                      height={MANUFACTURING_DETAIL_IMAGE_HEIGHT_PX}
                      unoptimized
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className={`manufacturing-intelligence-photo-detail relative max-h-full ${MANUFACTURING_IMAGE_OPACITY_CLASS} ${
                        slot0Visible ? "opacity-100" : "opacity-0"
                      }`}
                      aria-hidden={!slot0Visible}
                    />
                  </div>
                ) : null}
                {slot1 ? (
                  <div
                    className={`pointer-events-none absolute inset-0 flex items-center justify-center ${
                      elevatedSlot === 1 ? "z-[2]" : "z-[1]"
                    }`}
                  >
                    <Image
                      key="mfg-detail-slot-1"
                      src={slot1.src}
                      alt={slot1.alt}
                      width={MANUFACTURING_DETAIL_IMAGE_WIDTH_PX}
                      height={MANUFACTURING_DETAIL_IMAGE_HEIGHT_PX}
                      unoptimized
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className={`manufacturing-intelligence-photo-detail relative max-h-full ${MANUFACTURING_IMAGE_OPACITY_CLASS} ${
                        slot1Visible ? "opacity-100" : "opacity-0"
                      }`}
                      aria-hidden={!slot1Visible}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
