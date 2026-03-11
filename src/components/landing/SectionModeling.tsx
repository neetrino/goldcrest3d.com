import { LANDING_SECTION_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import Image from "next/image";

const CARDS: Array<{
  title: string;
  description: string;
  image: string;
  gradient?: string;
}> = [
  {
    title: "Hip-Hop Jewelry",
    description:
      "High-mass, fully iced-out structures engineered for structural durability and controlled weight distribution. Advanced pavé density calibration and reinforced stone retention designed for intensive wear and long-term performance.",
    image: LANDING_IMAGES.modelingHipHop,
  },
  {
    title: "Bridal & Engagement",
    description:
      "Engineered engagement and bridal settings built for durability, comfort and precise stone alignment. Secure prong architecture developed for long-term wear.",
    image: LANDING_IMAGES.modelingBridal,
  },
  {
    title: "High Jewelry",
    description:
      "Advanced pavé and fine-setting structures developed with micron-level precision. Invisible settings and ultra-thin tolerances engineered with strict structural discipline.",
    image: LANDING_IMAGES.modelingHighJewelry,
  },
  {
    title: "Mechanical & Lock Systems",
    description:
      "Tolerance-calibrated clasps, hinges and multi-part articulated structures engineered for controlled movement and secure locking performance.",
    image: LANDING_IMAGES.modelingMechanical,
  },
  {
    title: "3D Portrait Jewelry",
    description:
      "High-relief sculptural portraits engineered with controlled volume distribution and balanced weight architecture. Developed to integrate pavé surfaces, deep dimensional detail and reinforced structural support.",
    image: LANDING_IMAGES.modelingPortrait,
  },
  {
    title: "Ancient & Heritage Jewelry",
    description:
      "Cultural and historical motifs re-engineered into structurally optimized, production-ready CAD frameworks. Authentic design language preserved through precise digital reconstruction.",
    image: LANDING_IMAGES.modelingHeritage,
  },
];

export function SectionModeling() {
  return (
    <section
      id={LANDING_SECTION_IDS.SPECIALIZATIONS}
      className="bg-white px-4 py-16 md:px-6 md:py-24"
      aria-labelledby="modeling-heading"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="modeling-heading"
          className="font-manrope text-center font-normal leading-[40px] tracking-[-0.9px] text-[#ddab52] text-[48px]"
        >
          Modeling Specialization
        </h2>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="overflow-hidden rounded-[16px] bg-[#353535] shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 text-white">
                <h3 className="font-manrope font-bold leading-[28px] text-[20px]">
                  {card.title}
                </h3>
                <p className="mt-3 font-manrope font-light leading-[26px] text-white/80 text-[16px]">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
