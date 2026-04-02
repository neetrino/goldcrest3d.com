import { useLayoutEffect, useState, type RefObject } from "react";

const SLOT_GAP = 8;

/** Four slides in view: three gaps between them; edge slides show `p` × slide width. */
const ROW1_PEEK_GAP_COUNT = 3;

export type FinishedCreationsCarouselMetrics = {
  row1SlideWidth: number;
  row2SlideWidth: number;
  row1TranslatePx: number;
  row2TranslatePx: number;
  /** Left-align strip so edge slides peek; 0 when no peek mode. */
  row1PeekOffsetPx: number;
};

const MIN_ROW1_SLIDE_PX = 160;
const MIN_ROW2_SLIDE_PX = 120;

/**
 * Fluid slide widths from one desktop gallery container (full bleed).
 * Row1 optional **peek-four**: `W = (w − 3×gap) / (2 + 2p)`, translate base `(1−p)×W`.
 */
export function useFinishedCreationsCarouselMetrics(
  containerRef: RefObject<HTMLElement | null>,
  visibleSlotsRow1: number,
  visibleSlotsRow2: number,
  row1PeekEdgeVisibleFraction?: number,
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

      const gaps2 = Math.max(0, visibleSlotsRow2 - 1) * SLOT_GAP;
      const r2 = Math.max(
        MIN_ROW2_SLIDE_PX,
        (w - gaps2) / Math.max(1, visibleSlotsRow2),
      );

      setRow1SlideWidth(r1);
      setRow2SlideWidth(r2);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef, visibleSlotsRow1, visibleSlotsRow2, row1PeekEdgeVisibleFraction]);

  const row1PeekOffsetPx =
    row1PeekEdgeVisibleFraction !== undefined &&
    row1PeekEdgeVisibleFraction > 0 &&
    row1PeekEdgeVisibleFraction < 0.5
      ? (1 - row1PeekEdgeVisibleFraction) * row1SlideWidth
      : 0;

  return {
    row1SlideWidth,
    row2SlideWidth,
    row1TranslatePx: row1SlideWidth + SLOT_GAP,
    row2TranslatePx: row2SlideWidth + SLOT_GAP,
    row1PeekOffsetPx,
  };
}
