import { getSiteMediaAdminBundle } from "@/lib/site-media/get-site-media-admin";

import { MediaManagerClient } from "./MediaManagerClient";

export default async function AdminMediaPage() {
  const bundle = await getSiteMediaAdminBundle();

  return (
    <div className="mx-auto max-w-5xl overflow-auto px-4 py-6 sm:px-6">
      <header className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-2xl font-semibold text-[var(--foreground)]">
          Media Manager
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Manage landing images: files live in Cloudflare R2; Neon stores metadata only (object
          key, order, slot). The homepage updates after each successful upload.
        </p>
      </header>
      <MediaManagerClient bundle={bundle} />
    </div>
  );
}
