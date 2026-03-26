"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";

import {
  addOrderedGalleryImage,
  deleteOrderedGalleryImage,
  reorderOrderedGallery,
  type SiteMediaActionResult,
} from "@/app/actions/site-media";
import type { AdminOrderedItemRow } from "@/lib/site-media/get-site-media-admin";
import {
  SITE_MEDIA_GROUP_KEYS,
  type SiteMediaGroupKey,
} from "@/lib/site-media/site-media.registry";

import { ReplaceOrderedGalleryImageForm } from "./ReplaceOrderedGalleryImageForm";

const MAX_ITEMS = 12;

type AddFormProps = {
  groupKey: SiteMediaGroupKey;
  canAdd: boolean;
};

function AddForm({ groupKey, canAdd }: AddFormProps) {
  const router = useRouter();
  const [state, formAction] = useActionState(
    async (
      _prev: SiteMediaActionResult | null,
      formData: FormData,
    ): Promise<SiteMediaActionResult | null> => {
      return addOrderedGalleryImage(groupKey, formData);
    },
    null,
  );

  useEffect(() => {
    if (state?.ok) {
      router.refresh();
    }
  }, [state?.ok, router]);

  if (!canAdd) {
    return (
      <p className="text-xs text-slate-500">Maximum of {MAX_ITEMS} images reached.</p>
    );
  }

  return (
    <form action={formAction} className="flex flex-wrap items-end gap-2 rounded-lg border border-dashed border-slate-300 p-4">
      <label className="text-sm text-slate-700">
        Add image
        <input
          name="file"
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="mt-1 block w-full max-w-xs text-sm"
          required
        />
      </label>
      <button
        type="submit"
        className="rounded-lg bg-amber-600 px-3 py-2 text-sm font-medium text-white hover:bg-amber-700"
      >
        Add
      </button>
      {state && !state.ok && (
        <p className="w-full text-sm text-red-600">{state.error}</p>
      )}
      {state?.ok && <p className="text-sm text-emerald-700">Added.</p>}
    </form>
  );
}

type OrderedGallerySectionProps = {
  title: string;
  description: string;
  groupKey: SiteMediaGroupKey;
  items: AdminOrderedItemRow[];
  /** Short label for “which row” (e.g. Top row / Bottom row) — shown in each card. */
  rowContextLabel: string;
};

export function OrderedGallerySection({
  title,
  description,
  groupKey,
  items,
  rowContextLabel,
}: OrderedGallerySectionProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const ids = items.map((i) => i.id);

  const move = (index: number, delta: number) => {
    const nextIndex = index + delta;
    if (nextIndex < 0 || nextIndex >= ids.length) return;
    const next = [...ids];
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
        "Delete this image from the gallery and remove the file from R2 storage?",
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

  return (
    <section className="rounded-xl border border-slate-200 bg-[#fafafa] p-6">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-600">{description}</p>

      <div className="mt-6 space-y-6">
        {items.length === 0 && (
          <p className="text-sm text-slate-600">
            No database rows yet — the homepage shows built-in local/Figma fallbacks.
          </p>
        )}
        {items.map((item, index) => {
          const positionLabel = `${rowContextLabel} · slide ${index + 1}`;
          return (
          <div
            key={item.id}
            className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="overflow-hidden rounded-lg border-2 border-slate-300 bg-slate-100 shadow-md ring-1 ring-slate-200/90">
              <div className="relative aspect-video w-full min-h-[200px]">
                {item.displayUrl ? (
                  <Image
                    src={item.displayUrl}
                    alt={`Current image for ${positionLabel}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 900px"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full min-h-[200px] items-center justify-center px-3 text-center text-sm text-slate-500">
                    No image URL — upload a file below
                  </div>
                )}
              </div>
              <div className="border-t border-slate-200/80 bg-slate-900/90 px-3 py-2.5 text-white">
                <p className="text-sm font-semibold leading-snug">{positionLabel}</p>
                <p className="mt-1 text-xs text-white/85">
                  Order {index + 1} · slot{" "}
                  <code className="rounded bg-white/10 px-1 py-0.5">{item.slotKey}</code>
                </p>
              </div>
            </div>
            <div className="min-w-0 flex-1 space-y-2">
              <div className="rounded-md border border-amber-200/90 bg-amber-50/80 px-3 py-2">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-900/90">
                  You are editing this preview
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  id{" "}
                  <code className="rounded bg-white/80 px-1 py-0.5 text-slate-800">
                    {item.id.slice(0, 8)}…
                  </code>
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={pending || index === 0}
                  onClick={() => move(index, -1)}
                  className="rounded border border-slate-300 bg-white px-2 py-1 text-xs disabled:opacity-40"
                >
                  Up
                </button>
                <button
                  type="button"
                  disabled={pending || index >= items.length - 1}
                  onClick={() => move(index, 1)}
                  className="rounded border border-slate-300 bg-white px-2 py-1 text-xs disabled:opacity-40"
                >
                  Down
                </button>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => onDelete(item.id)}
                  className="rounded border border-red-200 bg-red-50 px-2 py-1 text-xs text-red-800 hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
              <ReplaceOrderedGalleryImageForm
                item={item}
                positionLabel={positionLabel}
              />
            </div>
          </div>
          );
        })}

        <AddForm groupKey={groupKey} canAdd={items.length < MAX_ITEMS} />
      </div>
    </section>
  );
}

type FinishedCreationsGalleryProps = {
  row1: AdminOrderedItemRow[];
  row2: AdminOrderedItemRow[];
};

export function FinishedCreationsGallery({
  row1,
  row2,
}: FinishedCreationsGalleryProps) {
  return (
    <div className="space-y-8">
      <OrderedGallerySection
        title="Finished Creations — top row"
        description="Large carousel images. Order maps to carousel “pages”."
        groupKey={SITE_MEDIA_GROUP_KEYS.FINISHED_CREATIONS_ROW1}
        items={row1}
        rowContextLabel="Top row"
      />
      <OrderedGallerySection
        title="Finished Creations — bottom row"
        description="Smaller row; pairs with the top row by page index."
        groupKey={SITE_MEDIA_GROUP_KEYS.FINISHED_CREATIONS_ROW2}
        items={row2}
        rowContextLabel="Bottom row"
      />
    </div>
  );
}
