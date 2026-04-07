"use client";

import { LANDING_IMAGE_IDS, LANDING_SECTION_IDS } from "@/constants";
import {
  getManufacturingDetailPhotoLayoutClassName,
  MANUFACTURING_SPECIALIZATION_IDS,
  MANUFACTURING_SPECIALIZATION_ITEMS,
  type ManufacturingSpecializationId,
  type ManufacturingSpecializationItem,
} from "@/constants/manufacturing-specialization";
import Image from "next/image";
import { useMemo, useState } from "react";
import { MANUFACTURING_IMAGE_OPACITY_CLASS } from "./manufacturing-image.constants";
import { useManufacturingDetailLayers } from "./useManufacturingDetailLayers";

/** Figma accordion chevron â€” 24Ã—14, Õ¶Õ¥Ö€Ö„Ö‡Õ« Õ½Õ¬Õ¡Ö„ */
const MANUFACTURING_ACCORDION_CHEVRON_WIDTH_PX = 24;
const MANUFACTURING_ACCORDION_CHEVRON_HEIGHT_PX = 14;

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
          className={`inline-flex shrink-0 items-center justify-center transition-transform duration-200 ${
            isActive ? "rotate-180" : ""
          }`}
          aria-hidden
          data-landing-image={LANDING_IMAGE_IDS.MANUFACTURING_ICON_DOWN}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={MANUFACTURING_ACCORDION_CHEVRON_WIDTH_PX}
            height={MANUFACTURING_ACCORDION_CHEVRON_HEIGHT_PX}
            viewBox="0 0 24 14"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M23.5227 2.78183L13.1523 13.1523C12.5159 13.7887 11.4841 13.7887 10.8477 13.1523L0.477287 2.78183C-0.159096 2.14545 -0.159096 1.11367 0.477287 0.477286C1.11367 -0.159097 2.14545 -0.159097 2.78183 0.477286L12 9.69546L21.2182 0.477287C21.8546 -0.159096 22.8863 -0.159096 23.5227 0.477287C24.1591 1.11367 24.1591 2.14545 23.5227 2.78183Z"
              fill="black"
            />
          </svg>
        </span>
      </button>
      {showDescription ? (
        <div
          id={`manufacturing-detail-${item.id}`}
          className={
            descriptionHasManualLineBreaks
              ? "overflow-x-visible border-t border-black/[0.06] px-[30px] pb-6 pt-3 text-left md:overflow-x-auto"
              : "border-t border-black/[0.06] px-[30px] pb-6 pt-3 text-left"
          }
        >
          <p
            className={`manufacturing-intelligence-accordion-detail text-[15px] font-normal leading-[22px] tracking-normal text-black/80 ${
              descriptionHasManualLineBreaks
                ? "whitespace-pre-line break-words md:whitespace-pre"
                : ""
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
  const [activeId, setActiveId] = useState<ManufacturingSpecializationId>(
    MANUFACTURING_SPECIALIZATION_IDS.TOLERANCE_CONTROL_ASSEMBLY_PRECISION,
  );

  const activeItem = useMemo(
    () => MANUFACTURING_SPECIALIZATION_ITEMS.find((i) => i.id === activeId),
    [activeId],
  );

  const {
    slot0,
    slot1,
    slot0Visible,
    slot1Visible,
    elevatedSlot,
  } = useManufacturingDetailLayers({ activeItem });

  const handleToggle = (id: ManufacturingSpecializationId) => {
    setActiveId((prev) =>
      prev === id
        ? MANUFACTURING_SPECIALIZATION_IDS.TOLERANCE_CONTROL_ASSEMBLY_PRECISION
        : id,
    );
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
          className="manufacturing-intelligence-heading manufacturing-intelligence-heading-desktop hidden text-left font-manrope text-[48px] font-normal leading-[40px] tracking-[-0.9px] text-black lg:block lg:whitespace-nowrap"
        >
          Manufacturing Intelligence
        </h2>

        <div className="manufacturing-intelligence-card-shell mt-0 overflow-hidden rounded-none bg-[linear-gradient(-65.02deg,#f8f7f6_0.94%,#c0c6cd_99.4%)] lg:mt-[76px]">
          <div className="grid min-h-0 grid-cols-1 gap-12 py-12 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:gap-0 lg:py-0 lg:pl-[2.61%] lg:pr-[4.59%]">
            <h2 className="manufacturing-intelligence-heading mx-auto w-[257px] max-w-full text-center font-sans text-[30px] font-medium leading-[36px] tracking-[0.396px] text-black lg:hidden">
              Manufacturing Intelligence
            </h2>

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
                {slot0 ? (
                  <div
                    className={`pointer-events-none absolute inset-0 flex items-center justify-center lg:justify-start ${
                      elevatedSlot === 0 ? "z-[2]" : "z-[1]"
                    }`}
                  >
                    <Image
                      key="mfg-detail-slot-0"
                      src={slot0.src}
                      alt={slot0.alt}
                      width={slot0.widthPx}
                      height={slot0.heightPx}
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className={`manufacturing-intelligence-photo-detail relative max-h-full ${getManufacturingDetailPhotoLayoutClassName(
                        slot0.photoLayout,
                      )} ${MANUFACTURING_IMAGE_OPACITY_CLASS} ${
                        slot0Visible ? "opacity-100" : "opacity-0"
                      }`}
                      aria-hidden={!slot0Visible}
                    />
                  </div>
                ) : null}
                {slot1 ? (
                  <div
                    className={`pointer-events-none absolute inset-0 flex items-center justify-center lg:justify-start ${
                      elevatedSlot === 1 ? "z-[2]" : "z-[1]"
                    }`}
                  >
                    <Image
                      key="mfg-detail-slot-1"
                      src={slot1.src}
                      alt={slot1.alt}
                      width={slot1.widthPx}
                      height={slot1.heightPx}
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className={`manufacturing-intelligence-photo-detail relative max-h-full ${getManufacturingDetailPhotoLayoutClassName(
                        slot1.photoLayout,
                      )} ${MANUFACTURING_IMAGE_OPACITY_CLASS} ${
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
