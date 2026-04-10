"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import { updatePowerBannerCopy } from "@/app/actions/power-banner-copy";
import type { PowerBannerKey } from "@/lib/power-banner-copy/power-banner-keys";
import { POWER_BANNER_ADMIN_LABELS } from "@/lib/power-banner-copy/power-banner-defaults";
import type { PowerBannerCopyEntry } from "@/lib/power-banner-copy/power-banner-copy.types";

import { MediaFormSubmitButton } from "./MediaFormSubmitButton";
import { PowerBannerCopyMessages } from "./PowerBannerCopyMessages";

type PowerBannerCopyEditorProps = {
  bannerKey: PowerBannerKey;
  initial: PowerBannerCopyEntry;
};

export function PowerBannerCopyEditor({
  bannerKey,
  initial,
}: PowerBannerCopyEditorProps) {
  const router = useRouter();
  const meta = POWER_BANNER_ADMIN_LABELS[bannerKey];

  const [state, formAction] = useActionState(updatePowerBannerCopy, null);

  useEffect(() => {
    if (state?.ok) {
      router.refresh();
    }
  }, [state?.ok, router]);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6"
      aria-label={`Edit hero text for ${meta.name}`}
    >
      <input type="hidden" name="bannerKey" value={bannerKey} />

      <div className="border-b border-slate-200/80 pb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#e2c481]">
          Hero banner
        </p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
          {meta.name}
        </h3>
        <p className="mt-1 text-sm text-slate-600">{meta.hint}</p>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor={`power-banner-title-${bannerKey}`}
          className="text-sm font-medium text-slate-800"
        >
          Title
        </label>
        <textarea
          id={`power-banner-title-${bannerKey}`}
          name="title"
          rows={2}
          required
          defaultValue={initial.title}
          className="min-h-[3rem] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-slate-200 transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
        />
        <p className="text-xs text-slate-500">
          Optional line break in the title adjusts how the title stacks on small screens.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor={`power-banner-body-${bannerKey}`}
          className="text-sm font-medium text-slate-800"
        >
          Description
        </label>
        <textarea
          id={`power-banner-body-${bannerKey}`}
          name="body"
          rows={5}
          required
          defaultValue={initial.body}
          className="min-h-[8rem] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-slate-200 transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-200/80"
        />
        <p className="text-xs text-slate-500">
          Optional line breaks control line wrapping on the hero. Leave as a single paragraph to
          match the original layout when text matches the defaults.
        </p>
      </div>

      <PowerBannerCopyMessages state={state} />

      <MediaFormSubmitButton pendingLabel="Saving…">Save banner text</MediaFormSubmitButton>
    </form>
  );
}
