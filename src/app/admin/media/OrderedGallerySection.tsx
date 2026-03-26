"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";

import {
  addOrderedGalleryImage,
  deleteOrderedGalleryImage,
  replaceOrderedGalleryImage,
  reorderOrderedGallery,
  type SiteMediaActionResult,
} from "@/app/actions/site-media";
import type { AdminOrderedItemRow } from "@/lib/site-media/get-site-media-admin";
import {
  SITE_MEDIA_GROUP_KEYS,
  type SiteMediaGroupKey,
} from "@/lib/site-media/site-media.registry";

const MAX_ITEMS = 12;

type ReplaceFormProps = {
  item: AdminOrderedItemRow;
};

function ReplaceForm({ item }: ReplaceFormProps) {
  const router = useRouter();
  const [state, formAction] = useActionState(
    async (
      _prev: SiteMediaActionResult | null,
      formData: FormData,
    ): Promise<SiteMediaActionResult | null> => {
      return replaceOrderedGalleryImage(item.id, formData);
    },
    null,
  );

  useEffect(() => {
    if (state?.ok) {
      router.refresh();
    }
  }, [state?.ok, router]);

  return (
    <form action={formAction} className="flex flex-wrap items-end gap-2">
      <label className="text-xs text-slate-600">
        Replace
        <input
          name="file"
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="mt-1 block w-full text-sm"
          required
        />
      </label>
      <button
        type="submit"
        className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-800 hover:bg-slate-50"
      >
        Upload
      </button>
      {state && !state.ok && (
        <span className="w-full text-xs text-red-600">{state.error}</span>
      )}
      {state?.ok && <span className="text-xs text-emerald-700">OK</span>}
    </form>
  );
}

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
};

export function OrderedGallerySection({
  title,
  description,
  groupKey,
  items,
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
        {items.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-start"
          >
            <div className="relative h-28 w-40 shrink-0 overflow-hidden rounded-md bg-slate-100">
              {item.displayUrl ? (
                <Image
                  src={item.displayUrl}
                  alt={item.altText || ""}
                  fill
                  className="object-cover"
                  sizes="160px"
                  unoptimized
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-slate-500">
                  No URL
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1 space-y-2">
              <p className="text-xs text-slate-500">
                Order: {index + 1} · id:{" "}
                <code className="rounded bg-slate-100 px-1">{item.id.slice(0, 8)}…</code>
              </p>
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
              <ReplaceForm item={item} />
            </div>
          </div>
        ))}

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
      />
      <OrderedGallerySection
        title="Finished Creations — bottom row"
        description="Smaller row; pairs with the top row by page index."
        groupKey={SITE_MEDIA_GROUP_KEYS.FINISHED_CREATIONS_ROW2}
        items={row2}
      />
    </div>
  );
}
