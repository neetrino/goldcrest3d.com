"use client";

import { LANDING_IMAGE_IDS } from "@/constants";
import {
  getManufacturingDetailPhotoLayoutClassName,
} from "@/constants/manufacturing-specialization";
import type { ManufacturingDetailPayload } from "@/components/landing/useManufacturingDetailLayers";
import {
  getManufacturingImageTransformCssValue,
} from "@/lib/manufacturing-intelligence/manufacturing-image-transform";
import type { ManufacturingImageFrameSize } from "@/lib/manufacturing-intelligence/manufacturing-image-transform";
import Image from "next/image";
import { forwardRef } from "react";
import { MANUFACTURING_IMAGE_OPACITY_CLASS } from "./manufacturing-image.constants";

/**
 * Shared dual-slot manufacturing detail image frame (crossfade). Rendered either
 * in the desktop image column or inline under the active accordion row on mobile — never both.
 */
export const ManufacturingIntelligenceDetailImageFrame = forwardRef<
  HTMLDivElement,
  {
    slot0: ManufacturingDetailPayload | null;
    slot1: ManufacturingDetailPayload | null;
    slot0Visible: boolean;
    slot1Visible: boolean;
    elevatedSlot: 0 | 1 | null;
    frameSize: ManufacturingImageFrameSize;
    frameClassName: string;
  }
>(function ManufacturingIntelligenceDetailImageFrame(
  {
    slot0,
    slot1,
    slot0Visible,
    slot1Visible,
    elevatedSlot,
    frameSize,
    frameClassName,
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className={frameClassName}
      data-landing-image={LANDING_IMAGE_IDS.MANUFACTURING_MAIN}
    >
      {slot0 ? (
        <div
          className={`pointer-events-none absolute inset-0 flex items-center justify-center lg:justify-start ${
            elevatedSlot === 0 ? "z-[2]" : "z-[1]"
          }`}
        >
          <div
            style={{
              transform: getManufacturingImageTransformCssValue(
                slot0.transform,
                frameSize,
              ),
            }}
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
        </div>
      ) : null}
      {slot1 ? (
        <div
          className={`pointer-events-none absolute inset-0 flex items-center justify-center lg:justify-start ${
            elevatedSlot === 1 ? "z-[2]" : "z-[1]"
          }`}
        >
          <div
            style={{
              transform: getManufacturingImageTransformCssValue(
                slot1.transform,
                frameSize,
              ),
            }}
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
        </div>
      ) : null}
    </div>
  );
});
