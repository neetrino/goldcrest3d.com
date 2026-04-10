"use client";

import type { PowerBannerCopyActionResult } from "@/app/actions/power-banner-copy";

type PowerBannerCopyMessagesProps = {
  state: PowerBannerCopyActionResult | null;
};

export function PowerBannerCopyMessages({ state }: PowerBannerCopyMessagesProps) {
  if (state && !state.ok) {
    return (
      <p
        className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
        role="alert"
      >
        {state.error}
      </p>
    );
  }
  if (state?.ok) {
    return (
      <p
        className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-900"
        role="status"
      >
        Saved — the homepage hero now uses this text.
      </p>
    );
  }
  return null;
}
