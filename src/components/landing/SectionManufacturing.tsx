"use client";

import { LANDING_IMAGE_IDS, LANDING_SECTION_IDS } from "@/constants";
import {
  MANUFACTURING_SPECIALIZATION_IDS,
  type ManufacturingSpecializationId,
} from "@/constants/manufacturing-specialization";
import {
  MANUFACTURING_TRANSFORM_BASE_FRAME_HEIGHT_PX,
  MANUFACTURING_TRANSFORM_BASE_FRAME_WIDTH_PX,
} from "@/lib/manufacturing-intelligence/manufacturing-image-transform";
import type {
  ManufacturingIntelligenceContent,
  ManufacturingIntelligenceItemContent,
} from "@/lib/manufacturing-intelligence/manufacturing-intelligence.types";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ManufacturingIntelligenceDetailImageFrame } from "./ManufacturingIntelligenceDetailImageFrame";
import { useManufacturingDetailLayers } from "./useManufacturingDetailLayers";

/** Figma accordion chevron â€” 24Ã—14, Õ¶Õ¥Ö€Ö„Ö‡Õ« Õ½Õ¬Õ¡Ö„ */
const MANUFACTURING_ACCORDION_CHEVRON_WIDTH_PX = 24;
const MANUFACTURING_ACCORDION_CHEVRON_HEIGHT_PX = 14;

type ManufacturingAccordionRowProps = {
  item: ManufacturingIntelligenceItemContent;
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

type SectionManufacturingProps = {
  desktopContent: ManufacturingIntelligenceContent;
  mobileContent: ManufacturingIntelligenceContent;
  initialIsMobileViewport: boolean;
};

const MOBILE_BREAKPOINT_MEDIA_QUERY = "(max-width: 1023px)";

export function SectionManufacturing({
  desktopContent,
  mobileContent,
  initialIsMobileViewport,
}: SectionManufacturingProps) {
  const desktopImageFrameRef = useRef<HTMLDivElement | null>(null);
  const mobileImageFrameRef = useRef<HTMLDivElement | null>(null);
  const [frameSize, setFrameSize] = useState({
    frameWidthPx: MANUFACTURING_TRANSFORM_BASE_FRAME_WIDTH_PX,
    frameHeightPx: MANUFACTURING_TRANSFORM_BASE_FRAME_HEIGHT_PX,
  });
  const [isMobileViewport, setIsMobileViewport] = useState(initialIsMobileViewport);
  const manufacturing = isMobileViewport ? mobileContent : desktopContent;

  useEffect(() => {
    const mediaQueryList = window.matchMedia(MOBILE_BREAKPOINT_MEDIA_QUERY);
    const syncViewport = () => {
      setIsMobileViewport(mediaQueryList.matches);
    };
    syncViewport();
    mediaQueryList.addEventListener("change", syncViewport);
    return () => {
      mediaQueryList.removeEventListener("change", syncViewport);
    };
  }, []);

  const [activeId, setActiveId] = useState<ManufacturingSpecializationId>(
    MANUFACTURING_SPECIALIZATION_IDS.WALL_THICKNESS_ENGINEERING,
  );

  const activeItem = useMemo(
    () =>
      manufacturing.items.find((item) => item.id === activeId) ??
      manufacturing.items[0],
    [activeId, manufacturing.items],
  );

  const {
    slot0,
    slot1,
    slot0Visible,
    slot1Visible,
    elevatedSlot,
  } = useManufacturingDetailLayers({ activeItem });

  const handleToggle = (id: ManufacturingSpecializationId) => {
    setActiveId((prev) => (prev === id ? prev : id));
  };

  useLayoutEffect(() => {
    const frame = isMobileViewport ? mobileImageFrameRef.current : desktopImageFrameRef.current;
    if (!frame) return;
    const syncFrameSize = () => {
      const nextWidth = frame.clientWidth;
      const nextHeight = frame.clientHeight;
      if (nextWidth <= 0 || nextHeight <= 0) return;
      setFrameSize({
        frameWidthPx: nextWidth,
        frameHeightPx: nextHeight,
      });
    };
    syncFrameSize();
    const observer = new ResizeObserver(syncFrameSize);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [isMobileViewport, activeId]);

  const detailLayersProps = {
    slot0,
    slot1,
    slot0Visible,
    slot1Visible,
    elevatedSlot,
    frameSize,
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
          {manufacturing.headingDesktop}
        </h2>

        <div className="manufacturing-intelligence-card-shell mt-0 overflow-hidden rounded-none bg-[linear-gradient(-65.02deg,#f8f7f6_0.94%,#c0c6cd_99.4%)] lg:mt-[76px]">
          <div className="grid min-h-0 grid-cols-1 gap-12 py-12 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:gap-0 lg:py-0 lg:pl-[2.61%] lg:pr-[4.59%]">
            <h2 className="manufacturing-intelligence-heading mx-auto w-[257px] max-w-full text-center font-sans text-[30px] font-medium leading-[36px] tracking-[0.396px] text-black lg:hidden">
              {manufacturing.headingMobile}
            </h2>

            <div className="flex min-w-0 flex-col divide-y divide-black/10 lg:pt-[50px]">
              {manufacturing.items.map((item) => (
                <div key={item.id} className="flex min-w-0 flex-col">
                  <ManufacturingAccordionRow
                    item={item}
                    isActive={activeId === item.id}
                    onToggle={() => handleToggle(item.id)}
                  />
                  {isMobileViewport && activeId === item.id ? (
                    <div className="px-[30px] pb-6 pt-4">
                      <div className="relative min-h-[240px] w-full">
                        <ManufacturingIntelligenceDetailImageFrame
                          {...detailLayersProps}
                          ref={mobileImageFrameRef}
                          frameClassName="manufacturing-intelligence-image-frame relative mx-auto aspect-[750/625] w-full overflow-hidden"
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            {!isMobileViewport ? (
              <div className="manufacturing-intelligence-image-column relative min-h-[280px] w-full lg:min-h-0">
                <ManufacturingIntelligenceDetailImageFrame
                  {...detailLayersProps}
                  ref={desktopImageFrameRef}
                  frameClassName="manufacturing-intelligence-image-frame relative mx-auto aspect-[750/625] w-full overflow-hidden lg:ml-auto lg:mr-0"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
