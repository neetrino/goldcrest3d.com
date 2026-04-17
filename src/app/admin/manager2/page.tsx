import { getManagedHomeBundle } from "@/lib/managed-home/get-managed-home-content";
import { getPowerBannerCopyBundle } from "@/lib/power-banner-copy/get-power-banner-copy";
import { getLandingSiteMedia } from "@/lib/site-media/get-landing-site-media";
import { getSiteMediaAdminBundle } from "@/lib/site-media/get-site-media-admin";

import { Manager2Client } from "./Manager2Client";

export default async function AdminManager2Page() {
  const [managedHome, powerBannerCopy, siteMedia, mediaAdmin] = await Promise.all([
    getManagedHomeBundle(),
    getPowerBannerCopyBundle(),
    getLandingSiteMedia(),
    getSiteMediaAdminBundle(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <header className="mb-8 border-b border-slate-200 pb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#e2c481]">
          Homepage CMS
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--foreground)]">
          Admin Manager2
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          Edit landing copy and image placement for hero slides, philosophy, modeling cards,
          manufacturing intelligence, founder, and process. The preview uses the same
          components as the public site — save to apply changes.
        </p>
      </header>
      <Manager2Client
        initialManaged={managedHome}
        powerBannerCopy={powerBannerCopy}
        siteMedia={siteMedia}
        modelingAdminSlots={mediaAdmin.modeling}
      />
    </div>
  );
}
