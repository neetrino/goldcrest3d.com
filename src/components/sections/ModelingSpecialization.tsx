import { SectionContainer } from "./SectionContainer";

/** Desktop ref per tile ~942×495. Tiles scale with grid. */
const TILES: Array<{
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  textOnDark: boolean;
  layout: "text-below" | "text-right" | "text-left";
}> = [
  {
    id: "hiphop",
    title: "Hip-Hop Jewelry",
    description:
      "High-mass, fully iced-out structures engineered for structural durability and controlled weight distribution. Advanced pavé density calibration and reinforced stone retention designed for intensive wear and long-term performance.",
    imageUrl:
      "https://www.figma.com/api/mcp/asset/3452675e-f998-4255-88ed-b07484e6f9ce",
    textOnDark: true,
    layout: "text-below",
  },
  {
    id: "bridal",
    title: "Bridal & Engagement",
    description:
      "Engineered engagement and bridal settings built for durability, comfort and precise stone alignment. Secure prong architecture developed for long-term wear.",
    imageUrl:
      "https://www.figma.com/api/mcp/asset/9b4a9d66-bd71-4538-8e66-f4b45ebe384b",
    textOnDark: false,
    layout: "text-right",
  },
  {
    id: "portrait",
    title: "3D Portrait Jewelry",
    description:
      "High-relief sculptural portraits engineered with controlled volume distribution and balanced weight architecture. Developed to integrate pavé surfaces, deep dimensional detail and reinforced structural support for long-term durability.",
    imageUrl:
      "https://www.figma.com/api/mcp/asset/fbbeb4da-4806-4068-abe4-511ccce8753a",
    textOnDark: false,
    layout: "text-left",
  },
  {
    id: "mechanical",
    title: "Mechanical & Lock Systems",
    description:
      "Tolerance-calibrated clasps, hinges and multi-part articulated structures engineered for controlled movement and secure locking performance. Functional systems developed for durability, precision alignment and long-term mechanical reliability.",
    imageUrl:
      "https://www.figma.com/api/mcp/asset/b6b7288b-228f-4298-b818-31caf1f2ddfe",
    textOnDark: true,
    layout: "text-right",
  },
  {
    id: "ancient",
    title: "Ancient & Heritage Jewelry",
    description:
      "Cultural and historical motifs re-engineered into structurally optimized, production-ready CAD frameworks. Authentic design language preserved through precise digital reconstruction and manufacturing awareness.",
    imageUrl:
      "https://www.figma.com/api/mcp/asset/2a3e2d3f-abf0-489a-b4cc-9e6a2296cf0e",
    textOnDark: false,
    layout: "text-left",
  },
  {
    id: "high",
    title: "High Jewelry",
    description:
      "Advanced pavé and fine-setting structures developed with micron-level precision. Invisible settings and ultra-thin tolerances engineered with strict structural discipline.",
    imageUrl:
      "https://www.figma.com/api/mcp/asset/c1a62b0f-9091-4723-aae1-e74aa6c830f0",
    textOnDark: false,
    layout: "text-below",
  },
];

function SpecializationTile({
  title,
  description,
  imageUrl,
  textOnDark,
  layout,
}: (typeof TILES)[number]) {
  const textColor = textOnDark
    ? "text-white"
    : "text-[var(--color-charcoal)]";
  const descColor = textOnDark
    ? "text-white/90"
    : "text-[var(--color-charcoal-soft)]";

  const isHorizontal = layout !== "text-below";
  const contentOrder =
    layout === "text-left"
      ? "flex-col lg:flex-row-reverse"
      : "flex-col lg:flex-row";

  return (
    <article
      className={`flex ${contentOrder} rounded-lg overflow-hidden bg-white shadow-sm border border-[var(--color-slate-border)]`}
    >
      <div
        className={`relative flex-shrink-0 bg-cover bg-center ${isHorizontal ? "w-full lg:w-[55%] aspect-[942/495] lg:aspect-auto lg:min-h-[240px]" : "w-full aspect-[942/280]"}`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div
        className={`flex flex-col justify-center p-6 lg:p-8 ${isHorizontal ? "w-full lg:w-[45%]" : ""}`}
      >
        <h3 className={`font-bold text-[clamp(1.25rem,2vw,1.5rem)] ${textColor}`}>
          {title}
        </h3>
        <p
          className={`mt-2 text-sm lg:text-base leading-relaxed ${descColor}`}
        >
          {description}
        </p>
      </div>
    </article>
  );
}

export function ModelingSpecialization() {
  return (
    <SectionContainer id="specializations" className="bg-white">
      <div className="container-narrow mx-auto">
        <h2 className="text-[var(--color-primary-light)] text-[clamp(1.75rem,3vw,2.5rem)] font-normal text-center mb-10 lg:mb-12">
          Modeling Specialization
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {TILES.map((tile) => (
            <SpecializationTile key={tile.id} {...tile} />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
