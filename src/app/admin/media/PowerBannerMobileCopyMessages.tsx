import type { PowerBannerMobileCopyActionResult } from "@/app/actions/power-banner-mobile-copy";

type PowerBannerMobileCopyMessagesProps = {
  state: PowerBannerMobileCopyActionResult | null;
};

export function PowerBannerMobileCopyMessages({ state }: PowerBannerMobileCopyMessagesProps) {
  if (!state) return null;
  if (!state.ok) {
    return (
      <p
        className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
        role="alert"
      >
        {state.error}
      </p>
    );
  }
  return (
    <p
      className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-900"
      role="status"
    >
      Mobile hero copy saved.
    </p>
  );
}
