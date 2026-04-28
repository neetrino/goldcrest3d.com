import type { PowerBannerCopyBundle } from "@/lib/power-banner-copy/power-banner-copy.types";
import {
  POWER_BANNER_KEYS,
  type PowerBannerViewport,
} from "@/lib/power-banner-copy/power-banner-keys";

import { PowerBannerCopyEditor } from "./PowerBannerCopyEditor";

type PowerBannerCopySectionProps = {
  bundle: PowerBannerCopyBundle;
  viewport: PowerBannerViewport;
};

const VIEWPORT_META: Record<
  PowerBannerViewport,
  {
    sectionTitle: string;
    sectionDescription: string;
    badge: string;
  }
> = {
  desktop: {
    sectionTitle: "Desktop Hero Banners",
    sectionDescription: "Manage desktop-only hero content and images.",
    badge: "Desktop hero banners",
  },
  mobile: {
    sectionTitle: "Mobile Hero Banners",
    sectionDescription: "Manage mobile-only hero content and images.",
    badge: "Mobile hero banners",
  },
};

export function PowerBannerCopySection({ bundle, viewport }: PowerBannerCopySectionProps) {
  const meta = VIEWPORT_META[viewport];
  return (
    <section className="rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/90 p-6 shadow-sm sm:p-8">
      <div className="border-b border-slate-200/80 pb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#e2c481]">
          {meta.badge}
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
          {meta.sectionTitle}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          {meta.sectionDescription}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-8">
        {POWER_BANNER_KEYS.map((key) => (
          <PowerBannerCopyEditor
            key={`${viewport}-${key}-${bundle[viewport][key].imageTransform.zoom}-${bundle[viewport][key].imageTransform.offsetX}-${bundle[viewport][key].imageTransform.offsetY}-${bundle[viewport][key].titleOffsetY}-${bundle[viewport][key].bodyOffsetY}-${bundle[viewport][key].ctaOffsetY}-${bundle[viewport][key].imageObjectKey ?? "default"}`}
            viewport={viewport}
            bannerKey={key}
            initial={bundle[viewport][key]}
          />
        ))}
      </div>
    </section>
  );
}
