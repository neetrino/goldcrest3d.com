"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

import {
  updateModelingSlotCopy,
  type SiteMediaActionResult,
} from "@/app/actions/site-media";
import type { AdminModelingSlotRow } from "@/lib/site-media/get-site-media-admin";
import { MODELING_SLOT_KEYS } from "@/lib/site-media/site-media.registry";

import { MediaFormSubmitButton } from "./MediaFormSubmitButton";
import { ModelingSlotFormMessages } from "./ModelingSlotFormMessages";

type ModelingSlotCopyEditorProps = {
  row: AdminModelingSlotRow;
};

export function ModelingSlotCopyEditor({ row }: ModelingSlotCopyEditorProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, formAction, isPending] = useActionState<
    SiteMediaActionResult | null,
    FormData
  >(updateModelingSlotCopy, null);

  useEffect(() => {
    if (state?.ok) {
      setIsModalOpen(false);
      router.refresh();
    }
  }, [router, state?.ok]);

  const showEmphasisField = row.slotKey === MODELING_SLOT_KEYS.HIGH_JEWELRY;

  return (
    <form
      action={formAction}
      className="rounded-xl border border-slate-200/90 bg-white p-4"
      aria-label={`Edit text content for ${row.label}`}
    >
      <input type="hidden" name="slotKey" value={row.slotKey} />
      <div className="rounded-lg border border-slate-200 bg-slate-50/70">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left transition hover:bg-slate-100/70"
        >
          <div>
            <p className="text-sm font-semibold text-slate-900">Text content</p>
            <p className="mt-0.5 text-xs text-slate-600">
              Click to open editor in full screen.
            </p>
          </div>
          <span className="text-slate-500">⤢</span>
        </button>
      </div>

      {isModalOpen ? (
        <div
          className="fixed inset-0 z-50 flex min-h-screen w-screen items-center justify-center bg-slate-900/70 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Text content editor for ${row.label}`}
        >
          <div className="max-h-[96vh] w-full max-w-6xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
              <div>
                <p className="text-sm font-semibold text-slate-900">Text content</p>
                <p className="text-xs text-slate-600">{row.label}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-md border border-slate-200 px-2.5 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <p className="mb-4 text-sm text-slate-600">
                Each line break creates a new visual line. Leave fields empty to hide text on the
                site.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-slate-700">Desktop title</span>
                  <textarea
                    name="titleDesktop"
                    rows={3}
                    defaultValue={row.titleDesktop}
                    disabled={isPending}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-slate-700">Mobile title</span>
                  <textarea
                    name="titleMobile"
                    rows={3}
                    defaultValue={row.titleMobile}
                    disabled={isPending}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
                  />
                </label>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-slate-700">Desktop description</span>
                  <textarea
                    name="bodyDesktop"
                    rows={10}
                    defaultValue={row.bodyDesktop}
                    disabled={isPending}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-slate-700">Mobile description</span>
                  <textarea
                    name="bodyMobile"
                    rows={10}
                    defaultValue={row.bodyMobile}
                    disabled={isPending}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
                  />
                </label>
              </div>

              {showEmphasisField ? (
                <label className="mt-4 flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-slate-700">
                    Desktop highlighted fragment
                  </span>
                  <input
                    type="text"
                    name="desktopLine1Emphasis"
                    defaultValue={row.desktopLine1Emphasis}
                    disabled={isPending}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 shadow-sm outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
                  />
                </label>
              ) : (
                <input type="hidden" name="desktopLine1Emphasis" value="" />
              )}

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  disabled={isPending}
                >
                  Cancel
                </button>
                <MediaFormSubmitButton pendingLabel="Saving…">Save text content</MediaFormSubmitButton>
              </div>

              <ModelingSlotFormMessages state={state} />
            </div>
          </div>
        </div>
      ) : null}
    </form>
  );
}
