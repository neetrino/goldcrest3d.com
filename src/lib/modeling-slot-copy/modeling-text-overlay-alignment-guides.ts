import {
  activeHorizontalGuidesPx,
  activeVerticalGuidesPx,
  bestSnap1D,
  collectHorizontalTargetsPx,
  collectVerticalTargetsPx,
  MODELING_TEXT_OVERLAY_DRAG_OVERFLOW_FRAC,
  movingLineRectsAfterShift,
  rectToFrameLocalPx,
  type FrameLocalPx,
  getInnerLineRects,
} from "@/lib/modeling-slot-copy/modeling-text-overlay-alignment-guides-math";
import type { ModelingOverlayLayerKey } from "@/lib/modeling-slot-copy/modeling-text-overlay-layout";

/** Max distance (px) to treat edges/centers as aligned and to soft-snap. */
export const MODELING_TEXT_OVERLAY_ALIGN_THRESHOLD_PX = 4;

export type ModelingTextOverlayAlignmentGuides = {
  readonly vertical: readonly number[];
  readonly horizontal: readonly number[];
};

/**
 * Computes soft-snapped center position (frame-local px) and active alignment guides
 * for the moving overlay layer while dragging or nudging.
 */
export function computeOverlayAlignment(
  frameRect: DOMRectReadOnly,
  movingKey: ModelingOverlayLayerKey,
  movingLayerEl: HTMLElement,
  otherLayerEl: HTMLElement,
  rawCenterXPx: number,
  rawCenterYPx: number,
  options?: {
    readonly snap?: boolean;
    readonly thresholdPx?: number;
    /** When false, snapping/guides use only frame edges+center (no coupling to other text layer). */
    readonly includeOtherLayerTargets?: boolean;
  },
): {
  readonly centerXPx: number;
  readonly centerYPx: number;
  readonly xPct: number;
  readonly yPct: number;
  readonly guides: ModelingTextOverlayAlignmentGuides;
} {
  const snap = options?.snap ?? true;
  const thresholdPx = options?.thresholdPx ?? MODELING_TEXT_OVERLAY_ALIGN_THRESHOLD_PX;
  const includeOtherLayerTargets = options?.includeOtherLayerTargets ?? true;

  const frameW = frameRect.width;
  const frameH = frameRect.height;

  const movingBox = movingLayerEl.getBoundingClientRect();
  const otherBox = otherLayerEl.getBoundingClientRect();

  const w = movingBox.width;
  const h = movingBox.height;

  if (frameW < 1 || frameH < 1) {
    return {
      centerXPx: 0,
      centerYPx: 0,
      xPct: 0,
      yPct: 0,
      guides: { vertical: [], horizontal: [] },
    };
  }
  if (w < 1 || h < 1) {
    return {
      centerXPx: rawCenterXPx,
      centerYPx: rawCenterYPx,
      xPct: (rawCenterXPx / frameW) * 100,
      yPct: (rawCenterYPx / frameH) * 100,
      guides: { vertical: [], horizontal: [] },
    };
  }

  const otherLocal = rectToFrameLocalPx(otherBox, frameRect);
  const otherLines = getInnerLineRects(otherLayerEl, movingKey === "title" ? "body" : "title");

  const oldCenterX = movingBox.left + movingBox.width / 2 - frameRect.left;
  const oldCenterY = movingBox.top + movingBox.height / 2 - frameRect.top;
  const verticalTargets = includeOtherLayerTargets
    ? collectVerticalTargetsPx(frameW, otherLocal, otherLines, frameRect)
    : [0, frameW / 2, frameW];
  const horizontalTargets = includeOtherLayerTargets
    ? collectHorizontalTargetsPx(frameH, otherLocal, otherLines, frameRect)
    : [0, frameH / 2, frameH];

  const overflowX = frameW * MODELING_TEXT_OVERLAY_DRAG_OVERFLOW_FRAC;
  const overflowY = frameH * MODELING_TEXT_OVERLAY_DRAG_OVERFLOW_FRAC;
  const clampedCenterX = Math.min(
    Math.max(rawCenterXPx, w / 2 - overflowX),
    frameW - w / 2 + overflowX,
  );
  const clampedCenterY = Math.min(
    Math.max(rawCenterYPx, h / 2 - overflowY),
    frameH - h / 2 + overflowY,
  );

  const centerXSnapped = snap
    ? bestSnap1D(rawCenterXPx, w, verticalTargets, frameW, thresholdPx)
    : clampedCenterX;
  const centerYSnapped = snap
    ? bestSnap1D(rawCenterYPx, h, horizontalTargets, frameH, thresholdPx)
    : clampedCenterY;

  const finalCenterX = centerXSnapped;
  const finalCenterY = centerYSnapped;

  const finalDeltaX = finalCenterX - oldCenterX;
  const finalDeltaY = finalCenterY - oldCenterY;

  const movingFinal: FrameLocalPx = {
    left: movingBox.left - frameRect.left + finalDeltaX,
    right: movingBox.right - frameRect.left + finalDeltaX,
    top: movingBox.top - frameRect.top + finalDeltaY,
    bottom: movingBox.bottom - frameRect.top + finalDeltaY,
    centerX: finalCenterX,
    centerY: finalCenterY,
  };

  const finalLines = movingLineRectsAfterShift(
    movingLayerEl,
    movingKey,
    frameRect,
    finalDeltaX,
    finalDeltaY,
  );

  const vPx = activeVerticalGuidesPx(movingFinal, finalLines, verticalTargets, thresholdPx);
  const hPx = activeHorizontalGuidesPx(movingFinal, finalLines, horizontalTargets, thresholdPx);

  const guides: ModelingTextOverlayAlignmentGuides = {
    vertical: vPx.map((px) => (px / frameW) * 100),
    horizontal: hPx.map((py) => (py / frameH) * 100),
  };

  const xPct = (finalCenterX / frameW) * 100;
  const yPct = (finalCenterY / frameH) * 100;

  return {
    centerXPx: finalCenterX,
    centerYPx: finalCenterY,
    xPct,
    yPct,
    guides,
  };
}
