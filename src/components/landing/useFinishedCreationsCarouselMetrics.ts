import { useLayoutEffect, useState, type RefObject } from "react";

const SLOT_GAP = 8;

/** Row1: four segments in view → three gaps. Edge slides show `p` × slide width. */
const ROW1_PEEK_GAP_COUNT = 3;

export type FinishedCreationsCarouselMetrics = {
  row1SlideWidth: number;
  row2SlideWidth: number;
  row1TranslatePx: number;
  row2TranslatePx: number;
  /** Left-align strip so edge slides peek; 0 when no peek mode. */
  row1PeekOffsetPx: number;
  /** Row2 peek-five; 0 when no peek mode. */
  row2PeekOffsetPx: number;
};

const MIN_ROW1_SLIDE_PX = 160;
const MIN_ROW2_SLIDE_PX = 120;

/**
 * Fluid slide widths from one desktop gallery container (full bleed).
 * Row1 **peek-four**: `W = (w − 3×gap) / (2 + 2p)`, offset `(1−p)×W`.
 * Row2 optional **peek-five** (3 full + ½+½): `W = (w − (n+1)×gap) / (n + 2p)`, offset `(1−p)×W`.
 */
export function useFinishedCreationsCarouselMetrics(
  containerRef: RefObject<HTMLElement | null>,
  visibleSlotsRow1: number,
  visibleSlotsRow2: number,
  row1PeekEdgeVisibleFraction?: number,
  row2PeekEdgeVisibleFraction?: number,
  row2PeekFullCenterSlides?: number,
): FinishedCreationsCarouselMetrics {
  const [row1SlideWidth, setRow1SlideWidth] = useState(670);
  const [row2SlideWidth, setRow2SlideWidth] = useState(420);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) {
      return;
    }
    const measure = () => {
      const w = el.getBoundingClientRect().width;
      if (w <= 0) {
        return;
      }
      let r1: number;
      if (
        row1PeekEdgeVisibleFraction !== undefined &&
        row1PeekEdgeVisibleFraction > 0 &&
        row1PeekEdgeVisibleFraction < 0.5
      ) {
        const p = row1PeekEdgeVisibleFraction;
        r1 =
          (w - ROW1_PEEK_GAP_COUNT * SLOT_GAP) / (2 + 2 * p);
      } else {
        const gaps1 = Math.max(0, visibleSlotsRow1 - 1) * SLOT_GAP;
        r1 = (w - gaps1) / Math.max(1, visibleSlotsRow1);
      }
      r1 = Math.max(MIN_ROW1_SLIDE_PX, r1);

      let r2: number;
      const useRow2Peek =
        row2PeekEdgeVisibleFraction !== undefined &&
        row2PeekFullCenterSlides !== undefined &&
        row2PeekEdgeVisibleFraction > 0 &&
        row2PeekEdgeVisibleFraction <= 0.5 &&
        row2PeekFullCenterSlides >= 1;

      if (useRow2Peek) {
        const p = row2PeekEdgeVisibleFraction;
        const nFull = row2PeekFullCenterSlides;
        const gapCount = nFull + 1;
        r2 =
          (w - gapCount * SLOT_GAP) / (nFull + 2 * p);
      } else {
        const gaps2 = Math.max(0, visibleSlotsRow2 - 1) * SLOT_GAP;
        r2 = (w - gaps2) / Math.max(1, visibleSlotsRow2);
      }
      r2 = Math.max(MIN_ROW2_SLIDE_PX, r2);

      setRow1SlideWidth(r1);
      setRow2SlideWidth(r2);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [
    containerRef,
    visibleSlotsRow1,
    visibleSlotsRow2,
    row1PeekEdgeVisibleFraction,
    row2PeekEdgeVisibleFraction,
    row2PeekFullCenterSlides,
  ]);

  const row1PeekOffsetPx =
    row1PeekEdgeVisibleFraction !== undefined &&
    row1PeekEdgeVisibleFraction > 0 &&
    row1PeekEdgeVisibleFraction < 0.5
      ? (1 - row1PeekEdgeVisibleFraction) * row1SlideWidth
      : 0;

  const row2PeekOffsetPx =
    row2PeekEdgeVisibleFraction !== undefined &&
    row2PeekFullCenterSlides !== undefined &&
    row2PeekEdgeVisibleFraction > 0 &&
    row2PeekEdgeVisibleFraction <= 0.5
      ? (1 - row2PeekEdgeVisibleFraction) * row2SlideWidth
      : 0;

  return {
    row1SlideWidth,
    row2SlideWidth,
    row1TranslatePx: row1SlideWidth + SLOT_GAP,
    row2TranslatePx: row2SlideWidth + SLOT_GAP,
    row1PeekOffsetPx,
    row2PeekOffsetPx,
  };
}
