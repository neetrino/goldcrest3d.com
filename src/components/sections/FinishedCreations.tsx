import { SectionContainer } from "./SectionContainer";

/** Desktop ref: large 725×420, small 480×256. Aspect ratios preserved. */
const LARGE_ASPECT = 725 / 420;
const SMALL_ASPECT = 480 / 256;

const GALLERY_IMAGES = [
  {
    url: "https://www.figma.com/api/mcp/asset/b6b7288b-228f-4298-b818-31caf1f2ddfe",
    large: true,
  },
  {
    url: "https://www.figma.com/api/mcp/asset/c1a62b0f-9091-4723-aae1-e74aa6c830f0",
    large: false,
  },
  {
    url: "https://www.figma.com/api/mcp/asset/2a3e2d3f-abf0-489a-b4cc-9e6a2296cf0e",
    large: false,
  },
  {
    url: "https://www.figma.com/api/mcp/asset/3452675e-f998-4255-88ed-b07484e6f9ce",
    large: false,
  },
  {
    url: "https://www.figma.com/api/mcp/asset/4f3be8fd-d7a3-4957-ad15-5b9e6c7d6f0b",
    large: false,
  },
  {
    url: "https://www.figma.com/api/mcp/asset/9b4a9d66-bd71-4538-8e66-f4b45ebe384b",
    large: false,
  },
  {
    url: "https://www.figma.com/api/mcp/asset/b6b7288b-228f-4298-b818-31caf1f2ddfe",
    large: false,
  },
  {
    url: "https://www.figma.com/api/mcp/asset/c1a62b0f-9091-4723-aae1-e74aa6c830f0",
    large: false,
  },
];

export function FinishedCreations() {
  const largeItems = GALLERY_IMAGES.filter((i) => i.large);
  const smallItems = GALLERY_IMAGES.filter((i) => !i.large);

  return (
    <SectionContainer className="bg-white">
      <div className="container-narrow mx-auto">
        <h2 className="text-[var(--color-charcoal)] text-[clamp(1.75rem,3vw,2.5rem)] font-normal mb-8 lg:mb-12">
          Finished Creations
        </h2>

        {/* Responsive grid: mobile 1 col, tablet 2, desktop top row 1 large + 2 small, bottom 4 small */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3">
          {/* Large tile: spans 2 rows on lg, full width on small */}
          <div className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
            <div
              className="w-full h-full min-h-[200px] rounded-lg overflow-hidden bg-cover bg-center"
              style={{
                aspectRatio: String(LARGE_ASPECT),
                backgroundImage: `url(${largeItems[0]?.url ?? GALLERY_IMAGES[0].url})`,
              }}
            />
          </div>
          {smallItems.slice(0, 5).map((item, i) => (
            <div key={i} className="min-h-[140px] lg:min-h-0">
              <div
                className="w-full h-full min-h-[140px] rounded-lg overflow-hidden bg-cover bg-center"
                style={{
                  aspectRatio: String(SMALL_ASPECT),
                  backgroundImage: `url(${item.url})`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Pagination / slider hint (visual only for now) */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            className="p-2 rounded-full border border-[var(--color-slate-border)] hover:bg-black/5 transition-colors"
            aria-label="Previous"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div className="flex gap-1.5">
            {[1, 2, 3].map((i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${i === 1 ? "bg-[var(--color-primary)]" : "bg-[var(--color-slate-border)]"}`}
                aria-hidden
              />
            ))}
          </div>
          <button
            type="button"
            className="p-2 rounded-full border border-[var(--color-slate-border)] hover:bg-black/5 transition-colors"
            aria-label="Next"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </SectionContainer>
  );
}
