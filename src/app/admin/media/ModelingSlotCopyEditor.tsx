"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useMemo, useRef, useState } from "react";

import { updateModelingSlotCopy } from "@/app/actions/modeling-slot-copy";
import type { AdminModelingSlotRow } from "@/lib/site-media/get-site-media-admin";
import type { ModelingSlotKey } from "@/lib/site-media/site-media.registry";
import { MODELING_SLOT_LABELS } from "@/lib/site-media/site-media.registry";
import {
  DEFAULT_MODELING_TEXT_OVERLAY_LAYOUT_DESKTOP,
  DEFAULT_MODELING_TEXT_OVERLAY_LAYOUT_MOBILE,
  hasCustomModelingTextLayout,
} from "@/lib/modeling-slot-copy/modeling-text-overlay-layout";
import type { ModelingSlotCopyEntry } from "@/lib/modeling-slot-copy/modeling-slot-copy.types";
import {
  resolveModelingSlotBodyForMobile,
  resolveModelingSlotTitleForMobile,
} from "@/lib/modeling-slot-copy/resolve-modeling-slot-body-mobile";

import { MediaFormSubmitButton } from "./MediaFormSubmitButton";
import { ModelingSlotCopyMessages } from "./ModelingSlotCopyMessages";
import { ModelingTextOverlayVisualEditor } from "./ModelingTextOverlayVisualEditor";
import { SiteRichHtmlEditor } from "./SiteRichHtmlEditor";

const TITLE_TEXTAREA_CLASS =
  "min-h-[3rem] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-slate-200 transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80";

type ModelingSlotCopyEditorProps = {
  slotKey: ModelingSlotKey;
  initial: ModelingSlotCopyEntry;
  previewRow: AdminModelingSlotRow;
  /** Matches public card: Hip-Hop uses light text; most blocks use dark text on light areas. */
  textDarkPreview: boolean;
};

export function ModelingSlotCopyEditor({
  slotKey,
  initial,
  previewRow,
  textDarkPreview,
}: ModelingSlotCopyEditorProps) {
  const router = useRouter();
  const label = MODELING_SLOT_LABELS[slotKey];

  const [state, formAction] = useActionState(updateModelingSlotCopy, null);
  const [bodyHtml, setBodyHtml] = useState(initial.body);
  const [bodyMobileHtml, setBodyMobileHtml] = useState(initial.bodyMobile);
  const [titleDesktop, setTitleDesktop] = useState(initial.title);
  const [titleMobile, setTitleMobile] = useState(initial.titleMobile);
  const [layoutDesktop, setLayoutDesktop] = useState(
    initial.textLayoutDesktop ?? DEFAULT_MODELING_TEXT_OVERLAY_LAYOUT_DESKTOP,
  );
  const [layoutMobile, setLayoutMobile] = useState(
    initial.textLayoutMobile ?? DEFAULT_MODELING_TEXT_OVERLAY_LAYOUT_MOBILE,
  );
  const [useCustom, setUseCustom] = useState(() =>
    hasCustomModelingTextLayout(initial.textLayoutDesktop, initial.textLayoutMobile),
  );
  const [overlayVariant, setOverlayVariant] = useState<"desktop" | "mobile">("desktop");
  const saveSubmitIntentRef = useRef<string | null>(null);

  useEffect(() => {
    if (state?.ok) {
      router.refresh();
    }
  }, [state?.ok, router]);

  const desktopImageUrl = previewRow.displayUrl;
  const mobileImageUrl = previewRow.displayUrlMobile ?? previewRow.displayUrl;

  const titleForMobilePreview = useMemo(
    () => resolveModelingSlotTitleForMobile({ title: titleDesktop, titleMobile }),
    [titleDesktop, titleMobile],
  );

  const bodyForMobilePreview = useMemo(() => {
    const entry: ModelingSlotCopyEntry = {
      title: titleDesktop,
      titleMobile,
      body: bodyHtml,
      bodyMobile: bodyMobileHtml,
      textLayoutDesktop: null,
      textLayoutMobile: null,
    };
    return resolveModelingSlotBodyForMobile(entry);
  }, [titleDesktop, titleMobile, bodyHtml, bodyMobileHtml]);

  const activeLayout = overlayVariant === "desktop" ? layoutDesktop : layoutMobile;
  const setActiveLayout = overlayVariant === "desktop" ? setLayoutDesktop : setLayoutMobile;

  return (
    <form
      action={formAction}
      className="mt-4 flex flex-col gap-4 border-t border-slate-200/80 pt-4"
      aria-label={`Edit titles and descriptions for ${label}`}
    >
      <input type="hidden" name="slotKey" value={slotKey} />
      <input type="hidden" name="body" value={bodyHtml} />
      <input type="hidden" name="bodyMobile" value={bodyMobileHtml} />
      <input type="hidden" name="useCustomTextLayout" value={useCustom ? "1" : "0"} />
      <input
        type="hidden"
        name="textLayoutDesktop"
        value={useCustom ? JSON.stringify(layoutDesktop) : ""}
      />
      <input
        type="hidden"
        name="textLayoutMobile"
        value={useCustom ? JSON.stringify(layoutMobile) : ""}
      />

      <div className="flex flex-col gap-2 rounded-xl border border-slate-200/90 bg-slate-50/50 p-3">
        <p className="text-sm font-semibold text-slate-900">Desktop / tablet</p>
        <p className="text-xs text-slate-500">
          Shown from the <span className="font-medium text-slate-600">md</span> breakpoint upward.
        </p>

        <div className="flex flex-col gap-2">
          <label
            htmlFor={`modeling-slot-title-desktop-${slotKey}`}
            className="text-sm font-medium text-slate-800"
          >
            Title
          </label>
          <textarea
            id={`modeling-slot-title-desktop-${slotKey}`}
            name="title"
            rows={2}
            required
            value={titleDesktop}
            onChange={(e) => setTitleDesktop(e.target.value)}
            className={TITLE_TEXTAREA_CLASS}
          />
          <p className="text-xs text-slate-500">
            Use a line break in the title when you want multiple lines (same behavior as hero banners).
          </p>
        </div>

        <div className="flex flex-col gap-2 border-t border-slate-200/80 pt-3">
          <span
            id={`modeling-slot-body-desktop-label-${slotKey}`}
            className="text-sm font-medium text-slate-800"
          >
            Description
          </span>
          <SiteRichHtmlEditor
            id={`modeling-slot-body-desktop-${slotKey}`}
            ariaLabelledBy={`modeling-slot-body-desktop-label-${slotKey}`}
            value={bodyHtml}
            onChange={setBodyHtml}
          />
          <p className="text-xs text-slate-500">
            Same sanitizer as hero banners. Saved HTML is rendered on the public site.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-xl border border-slate-200/90 bg-white p-3">
        <p className="text-sm font-semibold text-slate-900">Mobile</p>
        <p className="text-xs text-slate-500">
          Optional separate copy for viewports below <span className="font-medium text-slate-600">md</span>
          . Leave title or description empty to reuse the desktop / tablet version for that part.
        </p>

        <div className="flex flex-col gap-2">
          <label
            htmlFor={`modeling-slot-title-mobile-${slotKey}`}
            className="text-sm font-medium text-slate-800"
          >
            Title
          </label>
          <textarea
            id={`modeling-slot-title-mobile-${slotKey}`}
            name="titleMobile"
            rows={2}
            value={titleMobile}
            onChange={(e) => setTitleMobile(e.target.value)}
            className={TITLE_TEXTAREA_CLASS}
          />
          <p className="text-xs text-slate-500">
            Optional shorter or multi-line title for phones. Empty uses the desktop / tablet title.
          </p>
        </div>

        <div className="flex flex-col gap-2 border-t border-slate-200/80 pt-3">
          <span
            id={`modeling-slot-body-mobile-label-${slotKey}`}
            className="text-sm font-medium text-slate-800"
          >
            Description
          </span>
          <SiteRichHtmlEditor
            id={`modeling-slot-body-mobile-${slotKey}`}
            ariaLabelledBy={`modeling-slot-body-mobile-label-${slotKey}`}
            value={bodyMobileHtml}
            onChange={setBodyMobileHtml}
          />
          <p className="text-xs text-slate-500">
            Optional. Empty uses the desktop / tablet description on small screens.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-slate-200/90 bg-white p-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">Visual text layout (optional)</p>
            <p className="mt-1 max-w-prose text-xs text-slate-500">
              Place title and description on the image with separate Desktop and Mobile layouts. Adjust
              here first, then use either save button below — no need to save after every nudge. Requires
              both layouts when enabled; the homepage matches this preview when saved.
            </p>
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-800">
            <input
              type="checkbox"
              checked={useCustom}
              onChange={(e) => {
                const on = e.target.checked;
                setUseCustom(on);
                if (on) {
                  setLayoutDesktop((prev) => ({ ...prev }));
                  setLayoutMobile((prev) => ({ ...prev }));
                }
              }}
              className="h-4 w-4 rounded border-slate-300 text-[#e2c481] focus:ring-[#e2c481]"
            />
            Use custom overlay positions
          </label>
        </div>

        {useCustom ? (
          <>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setOverlayVariant("desktop")}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  overlayVariant === "desktop"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Desktop / tablet layout
              </button>
              <button
                type="button"
                onClick={() => setOverlayVariant("mobile")}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  overlayVariant === "mobile"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Mobile layout
              </button>
            </div>
            <ModelingTextOverlayVisualEditor
              variant={overlayVariant}
              layout={activeLayout}
              onLayoutChange={setActiveLayout}
              imageUrl={overlayVariant === "desktop" ? desktopImageUrl : mobileImageUrl}
              titleText={
                overlayVariant === "desktop" ? titleDesktop : titleForMobilePreview
              }
              bodyHtml={
                overlayVariant === "desktop" ? bodyHtml : bodyForMobilePreview
              }
              textDarkPreview={textDarkPreview}
              onTitleChange={
                overlayVariant === "desktop" ? setTitleDesktop : setTitleMobile
              }
              onBodyHtmlChange={
                overlayVariant === "desktop" ? setBodyHtml : setBodyMobileHtml
              }
            />
          </>
        ) : null}
      </div>

      <ModelingSlotCopyMessages state={state} />

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-3">
          <MediaFormSubmitButton
            pendingLabel="Saving…"
            submitIntentId="desktop"
            activeSubmitIntentRef={saveSubmitIntentRef}
          >
            Save desktop / tablet copy
          </MediaFormSubmitButton>
          <MediaFormSubmitButton
            pendingLabel="Saving…"
            pendingSpinnerClassName="border-slate-300 border-t-slate-800"
            className="inline-flex min-h-[2.5rem] w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            submitIntentId="mobile"
            activeSubmitIntentRef={saveSubmitIntentRef}
          >
            Save mobile copy
          </MediaFormSubmitButton>
        </div>
        <p className="text-xs text-slate-500">
          Both buttons save the full slot (desktop and mobile titles, descriptions, and optional overlay
          layouts).
        </p>
      </div>
    </form>
  );
}
