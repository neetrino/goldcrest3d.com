"use client";

import {
  startTransition,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  resolveManufacturingDetailImageDimensions,
  type ManufacturingDetailPhotoLayout,
  type ManufacturingSpecializationItem,
} from "@/constants/manufacturing-specialization";
import { MANUFACTURING_IMAGE_TRANSITION_MS } from "./manufacturing-image.constants";

export type ManufacturingDetailPayload = {
  id: ManufacturingSpecializationItem["id"];
  src: string;
  alt: string;
  widthPx: number;
  heightPx: number;
  photoLayout: ManufacturingDetailPhotoLayout;
};

type UseManufacturingDetailLayersArgs = {
  activeItem: ManufacturingSpecializationItem | undefined;
};

type SlotIndex = 0 | 1;

/**
 * Two stable image slots (ping-pong). Item-to-item crossfade never moves the
 * visible asset to a different React node — only the hidden slot updates, then
 * the old front slot is cleared after the opacity transition.
 */
export function useManufacturingDetailLayers({
  activeItem,
}: UseManufacturingDetailLayersArgs) {
  const activeDetail = useMemo<ManufacturingDetailPayload | null>(() => {
    if (!activeItem?.detailImageSrc) return null;
    const dims = resolveManufacturingDetailImageDimensions(
      activeItem.detailPhotoLayout,
    );
    return {
      id: activeItem.id,
      src: activeItem.detailImageSrc,
      alt: activeItem.detailImageAlt ?? "",
      widthPx: dims.widthPx,
      heightPx: dims.heightPx,
      photoLayout: dims.photoLayout,
    };
  }, [activeItem]);

  const [slot0, setSlot0] = useState<ManufacturingDetailPayload | null>(null);
  const [slot1, setSlot1] = useState<ManufacturingDetailPayload | null>(null);
  /** Which slot currently holds the visible image after the last completed transition. */
  const [frontSlot, setFrontSlot] = useState<SlotIndex>(0);
  const [slot0Visible, setSlot0Visible] = useState(false);
  const [slot1Visible, setSlot1Visible] = useState(false);
  /** During item→item crossfade, incoming slot stacks above for a clean overlap. */
  const [elevatedSlot, setElevatedSlot] = useState<SlotIndex | null>(null);

  const activeDetailRef = useRef(activeDetail);
  const slot0Ref = useRef(slot0);
  const slot1Ref = useRef(slot1);
  const frontSlotRef = useRef(frontSlot);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useLayoutEffect(() => {
    activeDetailRef.current = activeDetail;
    slot0Ref.current = slot0;
    slot1Ref.current = slot1;
    frontSlotRef.current = frontSlot;
  }, [activeDetail, slot0, slot1, frontSlot]);

  useLayoutEffect(() => {
    const target = activeDetail;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!target) {
      startTransition(() => {
        setElevatedSlot(null);
        setSlot0Visible(false);
        setSlot1Visible(false);
      });
      if (!slot0Ref.current && !slot1Ref.current) {
        return;
      }
      timeoutRef.current = setTimeout(() => {
        startTransition(() => {
          setSlot0(null);
          setSlot1(null);
        });
        timeoutRef.current = null;
      }, MANUFACTURING_IMAGE_TRANSITION_MS);
      return;
    }

    const s0 = slot0Ref.current;
    const s1 = slot1Ref.current;
    const front = frontSlotRef.current as SlotIndex;
    const frontPayload = front === 0 ? s0 : s1;

    if (frontPayload?.id === target.id) {
      startTransition(() => {
        if (front === 0) {
          setSlot0Visible(true);
          setSlot1Visible(false);
        } else {
          setSlot1Visible(true);
          setSlot0Visible(false);
        }
        setElevatedSlot(null);
      });
      return;
    }

    if (!s0 && !s1) {
      startTransition(() => {
        setElevatedSlot(null);
        setSlot0(target);
        setSlot0Visible(false);
        setSlot1Visible(false);
        setFrontSlot(0);
      });
      requestAnimationFrame(() => {
        setSlot0Visible(true);
      });
      return;
    }

    const back: SlotIndex = front === 0 ? 1 : 0;
    const crossfadeTargetId = target.id;

    startTransition(() => {
      setElevatedSlot(back);
      if (back === 0) {
        setSlot0(target);
        setSlot0Visible(false);
      } else {
        setSlot1(target);
        setSlot1Visible(false);
      }
    });

    requestAnimationFrame(() => {
      if (back === 0) {
        setSlot0Visible(true);
        setSlot1Visible(false);
      } else {
        setSlot1Visible(true);
        setSlot0Visible(false);
      }
    });

    const oldFront = front;
    timeoutRef.current = setTimeout(() => {
      const latest = activeDetailRef.current;
      if (!latest || latest.id !== crossfadeTargetId) {
        timeoutRef.current = null;
        return;
      }
      startTransition(() => {
        if (oldFront === 0) {
          setSlot0(null);
        } else {
          setSlot1(null);
        }
        setFrontSlot(back);
        setElevatedSlot(null);
      });
      timeoutRef.current = null;
    }, MANUFACTURING_IMAGE_TRANSITION_MS);
  }, [activeDetail]);

  const detailObscuresDefault =
    (slot0 !== null && slot0Visible) || (slot1 !== null && slot1Visible);

  return {
    slot0,
    slot1,
    slot0Visible,
    slot1Visible,
    elevatedSlot,
    detailObscuresDefault,
  };
}
