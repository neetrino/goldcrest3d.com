import { getSiteMediaAdminBundle } from "@/lib/site-media/get-site-media-admin";

import { MediaManagerClient } from "./MediaManagerClient";

export default async function AdminMediaPage() {
  const bundle = await getSiteMediaAdminBundle();

  return (
    <div className="mx-auto max-w-5xl overflow-auto px-4 py-8 sm:px-6">
      <header className="mb-10 border-b border-slate-200 pb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-700/90">
          Site content
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--foreground)]">
          Media Manager
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
          Upload and organize images that appear on the public site. Pick a file, confirm the
          preview, and you&apos;re done — updates apply as soon as each upload succeeds.
        </p>
      </header>
      <MediaManagerClient bundle={bundle} />
    </div>
  );
}
