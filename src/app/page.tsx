import { LandingNav } from "@/components/landing/LandingNav";
import { LandingSections } from "@/components/landing/LandingSections";
import { getLandingSiteMedia } from "@/lib/site-media/get-landing-site-media";

export default async function Home() {
  const siteMedia = await getLandingSiteMedia();
  return (
    <>
      <LandingNav />
      <main className="min-h-screen pt-[length:var(--landing-nav-height)]">
        <LandingSections siteMedia={siteMedia} />
      </main>
    </>
  );
}
