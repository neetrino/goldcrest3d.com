"use client";

import type { CSSProperties } from "react";
import { useMemo } from "react";

import { ModelingBlockBridal } from "@/components/landing/modeling/ModelingBlockBridal";
import { ModelingBlockHeritage } from "@/components/landing/modeling/ModelingBlockHeritage";
import { ModelingBlockHighJewelry } from "@/components/landing/modeling/ModelingBlockHighJewelry";
import { ModelingBlockHipHop } from "@/components/landing/modeling/ModelingBlockHipHop";
import { ModelingBlockMechanical } from "@/components/landing/modeling/ModelingBlockMechanical";
import { ModelingBlockPortrait } from "@/components/landing/modeling/ModelingBlockPortrait";
import type { AdminModelingSlotRow } from "@/lib/site-media/get-site-media-admin";
import type {
  ManagedHomeBundle,
  ModelingCardFields,
  ModelingViewportPayload,
} from "@/lib/managed-home/managed-home-schemas";
import {
  MODELING_SLOT_LABELS,
  ORDERED_MODELING_SLOT_KEYS,
  type ModelingSlotKey,
} from "@/lib/site-media/site-media.registry";

import { ModelingSlotVariantUpload } from "../media/ModelingSlotVariantUpload";

type ModelingEditorProps = {
  value: ManagedHomeBundle["modeling"];
  onChange: (v: ManagedHomeBundle["modeling"]) => void;
  onSave: () => void;
  pending: boolean;
  modelingSlots: AdminModelingSlotRow[];
  /** Which breakpoint copy fields are currently being edited. */
  viewport: "desktop" | "mobile";
  onViewportChange: (v: "desktop" | "mobile") => void;
};

function linesToText(lines: string[] | undefined): string {
  return lines?.join("\n") ?? "";
}

function textToLines(text: string): string[] | undefined {
  if (text.trim().length === 0) {
    return undefined;
  }
  return text.split("\n").map((s) => s.trimEnd());
}

function updateViewport(
  modeling: ManagedHomeBundle["modeling"],
  viewport: "desktop" | "mobile",
  patch: Partial<ModelingViewportPayload>,
): ManagedHomeBundle["modeling"] {
  const cur = modeling[viewport];
  return {
    ...modeling,
    [viewport]: { ...cur, ...patch },
  };
}

function updateCard(
  modeling: ManagedHomeBundle["modeling"],
  viewport: "desktop" | "mobile",
  slotKey: ModelingSlotKey,
  next: ModelingCardFields | undefined,
): ManagedHomeBundle["modeling"] {
  const vp = modeling[viewport];
  const cards = { ...vp.cards };
  if (next == null) {
    delete cards[slotKey];
  } else {
    cards[slotKey] = next;
  }
  return updateViewport(modeling, viewport, {
    cards: Object.keys(cards).length > 0 ? cards : undefined,
  });
}

function resolvePreviewImageUrls(
  row: AdminModelingSlotRow | undefined,
): { desktop: string; mobile: string } | null {
  if (!row) {
    return null;
  }
  const desktop = row.displayUrl ?? row.displayUrlMobile;
  const mobile = row.displayUrlMobile ?? row.displayUrl;
  if (!desktop || !mobile) {
    return null;
  }
  return { desktop, mobile };
}

function renderModelingCardPreview(
  slotKey: ModelingSlotKey,
  row: AdminModelingSlotRow | undefined,
  card: ModelingCardFields | undefined,
  viewport: "desktop" | "mobile",
) {
  const imageUrls = resolvePreviewImageUrls(row);
  if (!imageUrls) {
    return null;
  }
  if (slotKey === "hip_hop") {
    return (
      <ModelingBlockHipHop
        imageUrlDesktop={imageUrls.desktop}
        imageUrlMobile={imageUrls.mobile}
        managed={card}
        viewport={viewport}
        emulateMobileChrome={viewport === "mobile"}
      />
    );
  }
  if (slotKey === "bridal") {
    return (
      <ModelingBlockBridal
        imageUrlDesktop={imageUrls.desktop}
        imageUrlMobile={imageUrls.mobile}
        managed={card}
        viewport={viewport}
        emulateMobileChrome={viewport === "mobile"}
      />
    );
  }
  if (slotKey === "portrait") {
    return (
      <ModelingBlockPortrait
        imageUrlDesktop={imageUrls.desktop}
        imageUrlMobile={imageUrls.mobile}
        managed={card}
        viewport={viewport}
        emulateMobileChrome={viewport === "mobile"}
      />
    );
  }
  if (slotKey === "mechanical") {
    return (
      <ModelingBlockMechanical
        imageUrlDesktop={imageUrls.desktop}
        imageUrlMobile={imageUrls.mobile}
        managed={card}
        viewport={viewport}
        emulateMobileChrome={viewport === "mobile"}
      />
    );
  }
  if (slotKey === "heritage") {
    return (
      <ModelingBlockHeritage
        imageUrlDesktop={imageUrls.desktop}
        imageUrlMobile={imageUrls.mobile}
        managed={card}
        viewport={viewport}
        emulateMobileChrome={viewport === "mobile"}
      />
    );
  }
  return (
    <ModelingBlockHighJewelry
      imageUrlDesktop={imageUrls.desktop}
      imageUrlMobile={imageUrls.mobile}
      managed={card}
      viewport={viewport}
      emulateMobileChrome={viewport === "mobile"}
    />
  );
}

export function ModelingManager2Editor({
  value,
  onChange,
  onSave,
  pending,
  modelingSlots,
  viewport,
  onViewportChange,
}: ModelingEditorProps) {
  const vpPayload = value[viewport];
  const slotRows = useMemo(() => {
    const byKey = new Map(modelingSlots.map((r) => [r.slotKey, r]));
    return ORDERED_MODELING_SLOT_KEYS.map((k) => byKey.get(k));
  }, [modelingSlots]);

  function setSectionTitle(next: string) {
    onChange(updateViewport(value, viewport, { sectionTitle: next }));
  }

  function patchCard(slotKey: ModelingSlotKey, patch: ModelingCardFields) {
    onChange(updateCard(value, viewport, slotKey, patch));
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/80 p-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onViewportChange("desktop")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                viewport === "desktop"
                  ? "bg-[#e2c481] text-slate-900"
                  : "bg-white text-slate-600 ring-1 ring-slate-200"
              }`}
            >
              Desktop
            </button>
            <button
              type="button"
              onClick={() => onViewportChange("mobile")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                viewport === "mobile"
                  ? "bg-[#e2c481] text-slate-900"
                  : "bg-white text-slate-600 ring-1 ring-slate-200"
              }`}
            >
              Mobile
            </button>
          </div>
          <button
            type="button"
            onClick={onSave}
            disabled={pending}
            className="shrink-0 rounded-lg bg-[#e2c481] px-4 py-2 text-sm font-semibold text-slate-900 disabled:opacity-60"
          >
            {pending ? "Saving…" : "Save modeling"}
          </button>
        </div>
        <p className="pl-1 text-xs text-slate-600">
          Copy for <strong>{viewport}</strong> is saved independently. Each card below also has
          separate desktop/mobile image uploads.
        </p>
      </div>

      <label className="block text-sm font-medium text-slate-800">
        Section title ({viewport}) — line breaks are shown on the site
        <textarea
          value={vpPayload.sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
          rows={2}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm leading-snug"
        />
      </label>

      <div className="space-y-6">
        {ORDERED_MODELING_SLOT_KEYS.map((slotKey, idx) => {
          const row = slotRows[idx];
          const label = MODELING_SLOT_LABELS[slotKey];
          const card = vpPayload.cards?.[slotKey];
          const title = card?.title ?? "";
          const line1 = card?.titleLine1 ?? "";
          const line2 = card?.titleLine2 ?? "";
          const body = linesToText(card?.descriptionLines);
          const previewNode = renderModelingCardPreview(slotKey, row, card, viewport);

          return (
            <div
              key={slotKey}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-900">{label}</p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => onViewportChange("desktop")}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      viewport === "desktop"
                        ? "bg-slate-800 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    Desktop
                  </button>
                  <button
                    type="button"
                    onClick={() => onViewportChange("mobile")}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      viewport === "mobile"
                        ? "bg-slate-800 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    Mobile
                  </button>
                </div>
              </div>

              <p className="mt-1 text-xs text-slate-500">
                Editing <strong>{viewport}</strong> copy for this card.
              </p>

              <div className="mt-3 rounded-xl border border-slate-200/90 bg-slate-50 p-2">
                {previewNode ? (
                  <div
                    className={viewport === "mobile" ? "mx-auto w-full max-w-[430px]" : "w-full"}
                    style={
                      {
                        ["--ms" as string]: "0.8",
                        ["--mt" as string]: "0.85",
                      } as CSSProperties
                    }
                  >
                    {previewNode}
                  </div>
                ) : (
                  <p className="px-2 py-6 text-center text-xs text-slate-500">
                    Upload an image for this card to preview it here.
                  </p>
                )}
              </div>

              {row ? (
                <div className="mt-4 grid gap-3 lg:grid-cols-2">
                  <ModelingSlotVariantUpload row={row} variant="desktop" />
                  <ModelingSlotVariantUpload row={row} variant="mobile" />
                </div>
              ) : null}

              <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                {slotKey === "mechanical" ? (
                  <>
                    <label className="block text-xs font-medium text-slate-700">
                      Title line 1
                      <textarea
                        value={line1}
                        rows={2}
                        onChange={(e) =>
                          patchCard(slotKey, {
                            titleLine1: e.target.value || undefined,
                            titleLine2: line2 || undefined,
                            descriptionLines: textToLines(body),
                          })
                        }
                        className="mt-1 w-full rounded border border-slate-200 px-2 py-1.5 text-sm leading-snug"
                      />
                    </label>
                    <label className="block text-xs font-medium text-slate-700">
                      Title line 2
                      <textarea
                        value={line2}
                        rows={2}
                        onChange={(e) =>
                          patchCard(slotKey, {
                            titleLine1: line1 || undefined,
                            titleLine2: e.target.value || undefined,
                            descriptionLines: textToLines(body),
                          })
                        }
                        className="mt-1 w-full rounded border border-slate-200 px-2 py-1.5 text-sm leading-snug"
                      />
                    </label>
                  </>
                ) : null}

                {slotKey === "heritage" && viewport === "desktop" ? (
                  <label className="block text-xs font-medium text-slate-700">
                    Title
                    <textarea
                      value={title}
                      rows={2}
                      onChange={(e) =>
                        patchCard(slotKey, {
                          title: e.target.value || undefined,
                          descriptionLines: textToLines(body),
                        })
                      }
                      className="mt-1 w-full rounded border border-slate-200 px-2 py-1.5 text-sm leading-snug"
                    />
                  </label>
                ) : null}

                {slotKey === "heritage" && viewport === "mobile" ? (
                  <div className="flex gap-2">
                    <label className="block flex-1 text-xs font-medium text-slate-700">
                      Title line 1
                      <textarea
                        value={line1}
                        rows={2}
                        onChange={(e) =>
                          patchCard(slotKey, {
                            titleLine1: e.target.value || undefined,
                            titleLine2: line2 || undefined,
                            descriptionLines: textToLines(body),
                          })
                        }
                        className="mt-1 w-full rounded border border-slate-200 px-2 py-1.5 text-sm leading-snug"
                      />
                    </label>
                    <label className="block flex-1 text-xs font-medium text-slate-700">
                      Title line 2
                      <textarea
                        value={line2}
                        rows={2}
                        onChange={(e) =>
                          patchCard(slotKey, {
                            titleLine1: line1 || undefined,
                            titleLine2: e.target.value || undefined,
                            descriptionLines: textToLines(body),
                          })
                        }
                        className="mt-1 w-full rounded border border-slate-200 px-2 py-1.5 text-sm leading-snug"
                      />
                    </label>
                  </div>
                ) : null}

                {slotKey === "high_jewelry" ? (
                  <label className="block text-xs font-medium text-slate-700">
                    Title
                    <textarea
                      value={title}
                      rows={2}
                      onChange={(e) =>
                        patchCard(slotKey, {
                          title: e.target.value || undefined,
                          descriptionLines: textToLines(body),
                        })
                      }
                      className="mt-1 w-full rounded border border-slate-200 px-2 py-1.5 text-sm leading-snug"
                    />
                  </label>
                ) : null}

                {slotKey === "hip_hop" || slotKey === "bridal" || slotKey === "portrait" ? (
                  <label className="block text-xs font-medium text-slate-700">
                    Card title
                    <textarea
                      value={title}
                      rows={2}
                      onChange={(e) =>
                        patchCard(slotKey, {
                          title: e.target.value || undefined,
                          descriptionLines: textToLines(body),
                        })
                      }
                      className="mt-1 w-full rounded border border-slate-200 px-2 py-1.5 text-sm leading-snug"
                    />
                  </label>
                ) : null}

                <label className="block text-xs font-medium text-slate-700">
                  Body lines (one row per line break on the site)
                  <textarea
                    value={body}
                    onChange={(e) => {
                      const lines = textToLines(e.target.value);
                      if (slotKey === "mechanical") {
                        patchCard(slotKey, {
                          titleLine1: line1 || undefined,
                          titleLine2: line2 || undefined,
                          descriptionLines: lines,
                        });
                      } else if (slotKey === "heritage") {
                        patchCard(slotKey, {
                          ...(viewport === "desktop"
                            ? { title: title || undefined }
                            : { titleLine1: line1 || undefined, titleLine2: line2 || undefined }),
                          descriptionLines: lines,
                        });
                      } else if (slotKey === "high_jewelry") {
                        patchCard(slotKey, {
                          title: title || undefined,
                          descriptionLines: lines,
                        });
                      } else {
                        patchCard(slotKey, {
                          title: title || undefined,
                          descriptionLines: lines,
                        });
                      }
                    }}
                    rows={viewport === "mobile" ? 5 : 8}
                    className="mt-1 w-full rounded border border-slate-200 px-2 py-2 font-sans text-sm leading-relaxed"
                  />
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
