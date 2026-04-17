"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, useTransition } from "react";

import {
  updateSiteMediaLayoutMeta,
  upsertHeroSlotImage,
  type SiteMediaActionResult,
} from "@/app/actions/site-media";
import type { LandingSiteMedia } from "@/lib/site-media/get-landing-site-media";
import { parseHeroSlideLayoutMeta } from "@/lib/site-media/visual-layout-meta";
import {
  HERO_SLOT_LABELS,
  ORDERED_HERO_SLOT_KEYS,
  type HeroSlotKey,
} from "@/lib/site-media/site-media.registry";

type Manager2HeroPanelProps = {
  hero: LandingSiteMedia["hero"];
};

type LayerForm = {
  offsetX: number;
  offsetY: number;
  scale: number;
  objectPosition: string;
};

function emptyLayer(): LayerForm {
  return { offsetX: 0, offsetY: 0, scale: 1, objectPosition: "" };
}

function layerFromMeta(
  raw: unknown,
  key: "desktop" | "mobile" | "text",
): LayerForm | null {
  const p = parseHeroSlideLayoutMeta(raw);
  if (!p) return null;
  if (key === "text" && p.text) {
    return {
      offsetX: p.text.offsetX,
      offsetY: p.text.offsetY,
      scale: 1,
      objectPosition: "",
    };
  }
  const layer = key === "desktop" ? p.desktop : p.mobile;
  if (!layer) return null;
  return {
    offsetX: layer.offsetX,
    offsetY: layer.offsetY,
    scale: layer.scale,
    objectPosition: layer.objectPosition ?? "",
  };
}

export function Manager2HeroPanel({ hero }: Manager2HeroPanelProps) {
  const router = useRouter();
  const [slot, setSlot] = useState<HeroSlotKey>(ORDERED_HERO_SLOT_KEYS[0]);
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const meta = hero[slot].layoutMeta;

  const [desktop, setDesktop] = useState<LayerForm>(() => {
    return layerFromMeta(meta, "desktop") ?? emptyLayer();
  });
  const [mobile, setMobile] = useState<LayerForm>(() => {
    return layerFromMeta(meta, "mobile") ?? emptyLayer();
  });
  const [text, setText] = useState<LayerForm>(() => {
    return layerFromMeta(meta, "text") ?? emptyLayer();
  });

  useEffect(() => {
    const m = hero[slot].layoutMeta;
    setDesktop(layerFromMeta(m, "desktop") ?? emptyLayer());
    setMobile(layerFromMeta(m, "mobile") ?? emptyLayer());
    setText(layerFromMeta(m, "text") ?? emptyLayer());
  }, [hero, slot]);

  const [deskState, deskAction, deskPending] = useActionState(
    async (
      _prev: SiteMediaActionResult | null,
      formData: FormData,
    ): Promise<SiteMediaActionResult | null> => {
      return upsertHeroSlotImage(slot, "desktop", formData);
    },
    null,
  );

  const [mobState, mobAction, mobPending] = useActionState(
    async (
      _prev: SiteMediaActionResult | null,
      formData: FormData,
    ): Promise<SiteMediaActionResult | null> => {
      return upsertHeroSlotImage(slot, "mobile", formData);
    },
    null,
  );

  useEffect(() => {
    if (deskState?.ok || mobState?.ok) {
      router.refresh();
    }
  }, [deskState?.ok, mobState?.ok, router]);

  function saveLayout() {
    setMessage(null);
    startTransition(async () => {
      const payload = {
        desktop: {
          offsetX: desktop.offsetX,
          offsetY: desktop.offsetY,
          scale: desktop.scale,
          ...(desktop.objectPosition.trim()
            ? { objectPosition: desktop.objectPosition.trim() }
            : {}),
        },
        mobile: {
          offsetX: mobile.offsetX,
          offsetY: mobile.offsetY,
          scale: mobile.scale,
        },
        text: {
          offsetX: text.offsetX,
          offsetY: text.offsetY,
        },
      };
      const r = await updateSiteMediaLayoutMeta(slot, payload);
      setMessage(r.ok ? "Layout saved." : r.error);
      if (r.ok) {
        router.refresh();
      }
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-700">Slide</label>
        <select
          value={slot}
          onChange={(e) => setSlot(e.target.value as HeroSlotKey)}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          {ORDERED_HERO_SLOT_KEYS.map((k) => (
            <option key={k} value={k}>
              {HERO_SLOT_LABELS[k]}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <form action={deskAction} className="rounded-xl border border-slate-200 p-4">
          <p className="text-sm font-medium text-slate-800">Desktop background</p>
          <input
            type="file"
            name="file"
            accept="image/*"
            className="mt-2 block w-full text-sm"
          />
          <button
            type="submit"
            disabled={deskPending}
            className="mt-2 rounded bg-slate-800 px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50"
          >
            {deskPending ? "Uploading…" : "Upload"}
          </button>
          {deskState && !deskState.ok ? (
            <p className="mt-2 text-xs text-red-600">{deskState.error}</p>
          ) : null}
        </form>
        <form action={mobAction} className="rounded-xl border border-slate-200 p-4">
          <p className="text-sm font-medium text-slate-800">Mobile background</p>
          <input
            type="file"
            name="file"
            accept="image/*"
            className="mt-2 block w-full text-sm"
          />
          <button
            type="submit"
            disabled={mobPending}
            className="mt-2 rounded bg-slate-800 px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50"
          >
            {mobPending ? "Uploading…" : "Upload"}
          </button>
          {mobState && !mobState.ok ? (
            <p className="mt-2 text-xs text-red-600">{mobState.error}</p>
          ) : null}
        </form>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
        <p className="text-sm font-semibold text-slate-800">Desktop image transform</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {(["offsetX", "offsetY", "scale"] as const).map((k) => (
            <label key={k} className="block text-xs text-slate-600">
              {k}
              <input
                type="number"
                step={k === "scale" ? 0.01 : 1}
                value={desktop[k]}
                onChange={(e) =>
                  setDesktop((d) => ({
                    ...d,
                    [k]: Number(e.target.value),
                  }))
                }
                className="mt-1 w-full rounded border border-slate-200 px-2 py-1 text-sm"
              />
            </label>
          ))}
        </div>
        <label className="mt-3 block text-xs text-slate-600">
          Object position (CSS, optional)
          <input
            value={desktop.objectPosition}
            onChange={(e) =>
              setDesktop((d) => ({ ...d, objectPosition: e.target.value }))
            }
            className="mt-1 w-full rounded border border-slate-200 px-2 py-1 text-sm"
            placeholder="e.g. center calc(50% + 16px)"
          />
        </label>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
        <p className="text-sm font-semibold text-slate-800">Mobile image transform</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {(["offsetX", "offsetY", "scale"] as const).map((k) => (
            <label key={k} className="block text-xs text-slate-600">
              {k}
              <input
                type="number"
                step={k === "scale" ? 0.01 : 1}
                value={mobile[k]}
                onChange={(e) =>
                  setMobile((d) => ({
                    ...d,
                    [k]: Number(e.target.value),
                  }))
                }
                className="mt-1 w-full rounded border border-slate-200 px-2 py-1 text-sm"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
        <p className="text-sm font-semibold text-slate-800">Text cluster nudge (px)</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="block text-xs text-slate-600">
            offsetX
            <input
              type="number"
              value={text.offsetX}
              onChange={(e) =>
                setText((t) => ({ ...t, offsetX: Number(e.target.value) }))
              }
              className="mt-1 w-full rounded border border-slate-200 px-2 py-1 text-sm"
            />
          </label>
          <label className="block text-xs text-slate-600">
            offsetY
            <input
              type="number"
              value={text.offsetY}
              onChange={(e) =>
                setText((t) => ({ ...t, offsetY: Number(e.target.value) }))
              }
              className="mt-1 w-full rounded border border-slate-200 px-2 py-1 text-sm"
            />
          </label>
        </div>
      </div>

      <button
        type="button"
        onClick={saveLayout}
        disabled={pending}
        className="rounded-lg bg-[#e2c481] px-4 py-2 text-sm font-semibold text-slate-900 disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save layout for slide"}
      </button>
      {message ? <p className="text-sm text-slate-600">{message}</p> : null}
      <p className="text-xs text-slate-500">
        Hero titles and body copy are edited under Media Manager → Power banner copy, or here
        after we wire the same editors.
      </p>
    </div>
  );
}
