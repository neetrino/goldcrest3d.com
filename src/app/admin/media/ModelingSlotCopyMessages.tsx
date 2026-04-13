import type { ModelingSlotCopyActionResult } from "@/app/actions/modeling-slot-copy";

type ModelingSlotCopyMessagesProps = {
  state: ModelingSlotCopyActionResult | null;
};

export function ModelingSlotCopyMessages({ state }: ModelingSlotCopyMessagesProps) {
  if (state && !state.ok) {
    return (
      <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
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
        Saved — the Modeling Specialization section on the homepage now uses this text.
      </p>
    );
  }
  return null;
}
