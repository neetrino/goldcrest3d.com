import Link from "next/link";

const IMG_URL =
  "https://www.figma.com/api/mcp/asset/3de5c7ed-2902-4a39-8dab-3695d2cd7600";

export function JewelryDesign() {
  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="w-full max-w-[80rem] mx-auto flex flex-col lg:flex-row min-h-0">
        {/* Content: left on desktop, first on mobile */}
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end bg-white p-[var(--section-padding-x)] py-12 lg:py-16 order-2 lg:order-1">
          <div className="container-narrow max-w-xl lg:max-w-none lg:pr-12 text-center lg:text-left">
            <h2 className="text-[var(--color-charcoal)] font-light text-[clamp(2rem,4vw,3.25rem)] leading-tight">
              Jewelry Design
            </h2>
            <p className="mt-4 text-[var(--color-charcoal-soft)] text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed font-light italic">
              Concept-to-CAD development for legacy collection building. Your
              vision, engineered.
            </p>
            <Link
              href="#contact"
              className="mt-6 inline-flex items-center justify-center h-12 px-8 rounded-full text-base font-bold text-white bg-[var(--color-primary)] hover:opacity-95 transition-opacity"
            >
              Get a Quote
            </Link>
          </div>
        </div>
        {/* Image: 2x2 grid of CAD blueprints in Figma; single fluid image for simplicity */}
        <div
          className="w-full lg:w-1/2 min-h-[280px] lg:min-h-[400px] flex-shrink-0 bg-cover bg-center order-1 lg:order-2"
          style={{ backgroundImage: `url(${IMG_URL})` }}
        />
      </div>
    </section>
  );
}
