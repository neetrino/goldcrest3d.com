import { useLayoutEffect, useState, type RefObject } from "react";

const SLOT_GAP = 8;

export type FinishedCreationsCarouselMetrics = {
  row1SlideWidth: number;
  row2SlideWidth: number;
  row1TranslatePx: number;
  row2TranslatePx: number;
};

const MIN_ROW1_SLIDE_PX = 160;
const MIN_ROW2_SLIDE_PX = 120;

/**
 * Fluid slide widths for desktop carousel: viewport matches container width,
 * translate uses measured slot width + gap (no fixed 2704px strip).
 */
export function useFinishedCreationsCarouselMetrics(
  containerRef: RefObject<HTMLElement | null>,
  visibleSlotsRow1: number,
  visibleSlotsRow2: number,
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
      const gaps1 = Math.max(0, visibleSlotsRow1 - 1) * SLOT_GAP;
      const gaps2 = Math.max(0, visibleSlotsRow2 - 1) * SLOT_GAP;
      const r1 = Math.max(
        MIN_ROW1_SLIDE_PX,
        (w - gaps1) / Math.max(1, visibleSlotsRow1),
      );
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
  }, [containerRef, visibleSlotsRow1, visibleSlotsRow2]);

  return {
    row1SlideWidth,
    row2SlideWidth,
    row1TranslatePx: row1SlideWidth + SLOT_GAP,
    row2TranslatePx: row2SlideWidth + SLOT_GAP,
  };
}
