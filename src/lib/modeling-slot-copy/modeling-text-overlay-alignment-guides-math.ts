import type { ModelingOverlayLayerKey } from "@/lib/modeling-slot-copy/modeling-text-overlay-layout";

/** Ignore duplicate targets closer than this (px) in frame space. */
const TARGET_DEDUPE_PX = 0.75;

const MAX_LINE_RECTS = 24;

export type FrameLocalPx = {
  readonly left: number;
  readonly right: number;
  readonly top: number;
  readonly bottom: number;
  readonly centerX: number;
  readonly centerY: number;
};

function dedupeSortedPx(values: readonly number[], frameSpan: number): number[] {
  const sorted = [...values].sort((a, b) => a - b);
  const out: number[] = [];
  const minGap = Math.min(TARGET_DEDUPE_PX, frameSpan * 0.0005);
  for (const v of sorted) {
    if (out.length === 0 || Math.abs(v - out[out.length - 1]!) > minGap) {
      out.push(v);
    }
  }
  return out;
}

export function rectToFrameLocalPx(rect: DOMRectReadOnly, frame: DOMRectReadOnly): FrameLocalPx {
  const left = rect.left - frame.left;
  const right = rect.right - frame.left;
  const top = rect.top - frame.top;
  const bottom = rect.bottom - frame.top;
  return {
    left,
    right,
    top,
    bottom,
    centerX: (left + right) / 2,
    centerY: (top + bottom) / 2,
  };
}

export function getInnerLineRects(layerEl: HTMLElement, layerKey: ModelingOverlayLayerKey): DOMRect[] {
  const inner =
    layerKey === "title"
      ? layerEl.querySelector("h3")
      : layerEl.querySelector(".modeling-slot-rich-body");
  if (!inner) {
    return [];
  }
  const rects = inner.getClientRects();
  const out: DOMRect[] = [];
  for (let i = 0; i < rects.length && out.length < MAX_LINE_RECTS; i += 1) {
    out.push(rects[i]!);
  }
  return out;
}

export function collectVerticalTargetsPx(
  frameW: number,
  other: FrameLocalPx,
  otherLines: readonly DOMRect[],
  frame: DOMRectReadOnly,
): number[] {
  const xs: number[] = [0, frameW / 2, frameW, other.left, other.right, other.centerX];
  for (const lr of otherLines) {
    const fl = rectToFrameLocalPx(lr, frame);
    xs.push(fl.left, fl.right, fl.centerX);
  }
  return dedupeSortedPx(xs, frameW);
}

export function collectHorizontalTargetsPx(
  frameH: number,
  other: FrameLocalPx,
  otherLines: readonly DOMRect[],
  frame: DOMRectReadOnly,
): number[] {
  const ys: number[] = [0, frameH / 2, frameH, other.top, other.bottom, other.centerY];
  for (const lr of otherLines) {
    const fl = rectToFrameLocalPx(lr, frame);
    ys.push(fl.top, fl.bottom, fl.centerY);
  }
  return dedupeSortedPx(ys, frameH);
}

export function movingLineRectsAfterShift(
  layerEl: HTMLElement,
  layerKey: ModelingOverlayLayerKey,
  frame: DOMRectReadOnly,
  deltaXPx: number,
  deltaYPx: number,
): FrameLocalPx[] {
  const rects = getInnerLineRects(layerEl, layerKey);
  if (rects.length === 0) {
    return [];
  }
  return rects.map((r) => {
    const shifted = new DOMRect(
      r.left + deltaXPx,
      r.top + deltaYPx,
      r.width,
      r.height,
    );
    return rectToFrameLocalPx(shifted, frame);
  });
}

export function activeVerticalGuidesPx(
  moving: FrameLocalPx,
  movingLines: readonly FrameLocalPx[],
  targets: readonly number[],
  thresholdPx: number,
): number[] {
  const hit = new Set<number>();
  const tryHit = (edgePx: number) => {
    for (const t of targets) {
      if (Math.abs(edgePx - t) <= thresholdPx) {
        hit.add(t);
      }
    }
  };
  tryHit(moving.left);
  tryHit(moving.right);
  tryHit(moving.centerX);
  for (const ln of movingLines) {
    tryHit(ln.left);
    tryHit(ln.right);
    tryHit(ln.centerX);
  }
  return [...hit].sort((a, b) => a - b);
}

export function activeHorizontalGuidesPx(
  moving: FrameLocalPx,
  movingLines: readonly FrameLocalPx[],
  targets: readonly number[],
  thresholdPx: number,
): number[] {
  const hit = new Set<number>();
  const tryHit = (edgePx: number) => {
    for (const t of targets) {
      if (Math.abs(edgePx - t) <= thresholdPx) {
        hit.add(t);
      }
    }
  };
  tryHit(moving.top);
  tryHit(moving.bottom);
  tryHit(moving.centerY);
  for (const ln of movingLines) {
    tryHit(ln.top);
    tryHit(ln.bottom);
    tryHit(ln.centerY);
  }
  return [...hit].sort((a, b) => a - b);
}

export function bestSnap1D(
  rawCenter: number,
  size: number,
  targets: readonly number[],
  frameSpan: number,
  thresholdPx: number,
): number {
  const half = size / 2;
  const minC = half;
  const maxC = frameSpan - half;
  const clampC = (c: number): number => Math.min(Math.max(c, minC), maxC);

  let best: number | null = null;
  let bestDist = Infinity;

  const tryCandidate = (candidateCenter: number): void => {
    const c = clampC(candidateCenter);
    const dist = Math.abs(c - rawCenter);
    if (dist > thresholdPx) {
      return;
    }
    if (dist < bestDist - 1e-6) {
      bestDist = dist;
      best = c;
      return;
    }
    if (Math.abs(dist - bestDist) <= 1e-6 && best !== null) {
      best = Math.min(best, c);
    }
  };

  for (const t of targets) {
    tryCandidate(t + half);
    tryCandidate(t - half);
    tryCandidate(t);
  }

  return best ?? clampC(rawCenter);
}
