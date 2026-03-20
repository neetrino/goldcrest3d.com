import Link from "next/link";

const IMG_URL =
  "https://www.figma.com/api/mcp/asset/4f3be8fd-d7a3-4957-ad15-5b9e6c7d6f0b";

export function JewelryRendering() {
  return (
    <section className="relative w-full min-h-[clamp(380px,50vw,712px)] flex flex-col lg:flex-row overflow-hidden">
      {/* Image: full width on mobile, ~50% on lg */}
      <div
        className="relative w-full lg:w-1/2 min-h-[280px] lg:min-h-[512px] flex-shrink-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${IMG_URL})` }}
      />
      {/* Content: right on desktop, below image on mobile */}
      <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start bg-[var(--color-charcoal)] p-[var(--section-padding-x)] py-12 lg:py-16">
        <div className="container-narrow max-w-xl lg:max-w-none lg:pl-12 text-center lg:text-right">
          <h2 className="text-white font-light text-[clamp(2rem,4vw,3.25rem)] leading-tight">
            Jewelry Rendering
          </h2>
          <p className="mt-4 text-white/90 text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed font-light italic">
            High-resolution assets for brand presentation and global sales.
            Perfection in every light ray.
          </p>
          <Link
            href="#contact"
            className="mt-6 inline-flex items-center justify-center h-12 px-8 rounded-full text-base font-bold text-white bg-[var(--color-primary)] hover:opacity-95 transition-opacity"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
