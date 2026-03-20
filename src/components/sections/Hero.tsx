import Link from "next/link";

/** Desktop reference: 1920×883. Fluid height and image, responsive text. */
const HERO_IMAGE_URL =
  "https://www.figma.com/api/mcp/asset/8ad78500-62ed-4f0a-a8cb-e5875f4d30f3";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[clamp(320px,55vw,883px)] flex items-center justify-center overflow-hidden bg-[var(--color-bg-warm)]"
      aria-label="Hero"
    >
      {/* Background image: preserves aspect ~1920/883, covers area */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMAGE_URL})` }}
      />
      <div className="absolute inset-0 bg-[var(--color-charcoal)]/40" />

      {/* Content: centered, responsive typography */}
      <div className="container-narrow relative z-10 flex flex-col items-center justify-center text-center pt-20 pb-16 md:pt-24 md:pb-24">
        <h1 className="text-white font-light text-[clamp(2rem,5vw,3.25rem)] leading-[1.15] tracking-tight max-w-4xl">
          3D Production-Ready Modeling
        </h1>
        <p className="mt-4 text-white/90 text-[clamp(1rem,2vw,1.25rem)] leading-relaxed max-w-2xl font-light italic">
          Engineered for casting, printing and precise stone setting. Every
          micron accounted for.
        </p>
        <Link
          href="#contact"
          className="mt-6 inline-flex items-center justify-center h-12 px-8 rounded-full text-base font-bold text-white bg-[var(--color-primary)] hover:opacity-95 transition-opacity shadow-md"
        >
          Get a Quote
        </Link>
      </div>
    </section>
  );
}
