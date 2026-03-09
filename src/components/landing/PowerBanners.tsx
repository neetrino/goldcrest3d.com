"use client";

import { LANDING_SECTION_IDS } from "@/constants";
import { useEffect, useState } from "react";

const BANNERS = [
  {
    title: "Goldcrest 3D",
    subtitle: "Մոդելավորում և արտադրություն",
    accent: "3D մոդելավորում, CAD, պատրաստի արտադրանք",
  },
  {
    title: "Ինժեներական ճշգրտություն",
    subtitle: "Մասնագիտացված լուծումներ",
    accent: "Պրոտոտիպից մինչև սերիական արտադրություն",
  },
  {
    title: "Մեկ գործընկեր",
    subtitle: "Գաղափարից մինչև արտադրանք",
    accent: "Մոդելավորում, նյութեր, արտադրություն",
  },
] as const;

const ROTATE_INTERVAL_MS = 6000;

export function PowerBanners() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % BANNERS.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id={LANDING_SECTION_IDS.HERO}
      className="relative min-h-[85vh] overflow-hidden bg-[var(--foreground)]/5"
      aria-label="Գլխավոր բաններ"
    >
      <div className="mx-auto flex min-h-[85vh] max-w-6xl flex-col justify-center px-4 py-20 md:px-6 md:py-28">
        {BANNERS.map((banner, i) => (
          <div
            key={i}
            className="absolute inset-0 flex flex-col justify-center px-4 py-20 md:px-6 md:py-28"
            style={{
              opacity: i === index ? 1 : 0,
              pointerEvents: i === index ? "auto" : "none",
              transition: "opacity 0.6s ease",
            }}
            aria-hidden={i !== index}
          >
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] md:text-5xl lg:text-6xl">
                {banner.title}
              </h1>
              <p className="mt-4 text-lg text-[var(--foreground)]/80 md:text-xl">
                {banner.subtitle}
              </p>
              <p className="mt-2 text-sm text-[var(--foreground)]/60 md:text-base">
                {banner.accent}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div
        className="absolute bottom-8 left-0 right-0 flex justify-center gap-2"
        role="tablist"
        aria-label="Բաններ"
      >
        {BANNERS.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Բաններ ${i + 1}`}
            className={`h-2 w-2 rounded-full bg-[var(--foreground)] transition-colors focus-visible:outline focus-visible:ring-2 focus-visible:ring-[var(--foreground)]/40 ${
              i === index ? "opacity-100" : "opacity-30 hover:opacity-60"
            }`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
