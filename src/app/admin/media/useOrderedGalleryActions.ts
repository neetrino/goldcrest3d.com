"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import {
  deleteOrderedGalleryImage,
  reorderOrderedGallery,
} from "@/app/actions/site-media";
import type { SiteMediaGroupKey } from "@/lib/site-media/site-media.registry";

type UseOrderedGalleryActionsArgs = {
  groupKey: SiteMediaGroupKey;
  orderedIds: string[];
};

/**
 * Reorder and delete handlers for an ordered gallery section (server actions unchanged).
 */
export function useOrderedGalleryActions({
  groupKey,
  orderedIds,
}: UseOrderedGalleryActionsArgs) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const move = (index: number, delta: number) => {
    const nextIndex = index + delta;
    if (nextIndex < 0 || nextIndex >= orderedIds.length) return;
    const next = [...orderedIds];
    const t = next[index];
    const u = next[nextIndex];
    if (t === undefined || u === undefined) return;
    next[index] = u;
    next[nextIndex] = t;
    startTransition(async () => {
      const r = await reorderOrderedGallery(groupKey, next);
      if (!r.ok) {
        window.alert(r.error);
        return;
      }
      router.refresh();
    });
  };

  const onDelete = (id: string) => {
    if (
      !window.confirm(
        "Remove this image from the gallery? It will no longer appear on the site, and the stored file will be deleted.",
      )
    ) {
      return;
    }
    startTransition(async () => {
      const r = await deleteOrderedGalleryImage(id);
      if (!r.ok) {
        window.alert(r.error);
        return;
      }
      router.refresh();
    });
  };

  return { pending, move, onDelete };
}
