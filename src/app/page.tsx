import { LandingNav } from "@/components/landing/LandingNav";
import { LandingSections } from "@/components/landing/LandingSections";

export default function Home() {
  return (
    <>
      <LandingNav />
      <main className="min-h-screen">
        <LandingSections />
      </main>
    </>
  );
}
