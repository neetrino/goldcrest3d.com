"use client";

import type { ManufacturingIntelligenceCopyActionResult } from "@/app/actions/manufacturing-intelligence-copy";

type ManufacturingIntelligenceCopyMessagesProps = {
  state: ManufacturingIntelligenceCopyActionResult | null;
};

export function ManufacturingIntelligenceCopyMessages({
  state,
}: ManufacturingIntelligenceCopyMessagesProps) {
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
        Saved — the Manufacturing Intelligence section on the homepage now uses this text.
      </p>
    );
  }
  return null;
}
