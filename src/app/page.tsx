import { LandingNav } from "@/components/landing/LandingNav";
import { LandingSections } from "@/components/landing/LandingSections";
import { getModelingSlotCopyBundle } from "@/lib/modeling-slot-copy/get-modeling-slot-copy";
import { getPowerBannerCopyBundle } from "@/lib/power-banner-copy/get-power-banner-copy";
import { getLandingSiteMedia } from "@/lib/site-media/get-landing-site-media";

export default async function Home() {
  const [siteMedia, powerBannerCopy, modelingSlotCopy] = await Promise.all([
    getLandingSiteMedia(),
    getPowerBannerCopyBundle(),
    getModelingSlotCopyBundle(),
  ]);
  return (
    <>
      <LandingNav />
      <main className="min-h-screen pt-[length:var(--landing-nav-height)]">
        <LandingSections
          siteMedia={siteMedia}
          powerBannerCopy={powerBannerCopy}
          modelingSlotCopy={modelingSlotCopy}
        />
      </main>
    </>
  );
}
