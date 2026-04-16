import type { PowerBannerCopyBundle } from "@/lib/power-banner-copy/power-banner-copy.types";
import { POWER_BANNER_KEYS } from "@/lib/power-banner-copy/power-banner-keys";

import { PowerBannerMobileCopyEditor } from "./PowerBannerMobileCopyEditor";

type PowerBannerMobileCopySectionProps = {
  bundle: PowerBannerCopyBundle;
};

export function PowerBannerMobileCopySection({ bundle }: PowerBannerMobileCopySectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/90 p-6 shadow-sm sm:p-8">
      <div className="border-b border-slate-200/80 pb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#e2c481]">Hero banners</p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">Hero Banners - Mobile</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          Mobile-specific hero editor. Update image, title, description, and optional overlay text for
          small screens only. Leaving fields empty is allowed and does not change desktop/tablet content.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-8">
        {POWER_BANNER_KEYS.map((key) => (
          <PowerBannerMobileCopyEditor key={`mobile-${key}`} bannerKey={key} initial={bundle[key]} />
        ))}
      </div>
    </section>
  );
}
