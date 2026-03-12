import { LANDING_SECTION_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import Image from "next/image";

/** Card definition: title, description, image, layout, and optional gradient. Figma: titles 1–3 ExtraBold, 4–6 Bold. */
const CARDS: Array<{
  title: string;
  description: string;
  image: string;
  gradient?: string;
  imageOnLeft: boolean;
  dark: boolean;
  titleBold?: boolean;
}> = [
  {
    title: "Hip-Hop Jewelry",
    description:
      "High-mass, fully iced-out structures engineered for structural durability and controlled weight distribution. Advanced pavé density calibration and reinforced stone retention designed for intensive wear and long-term performance.",
    image: LANDING_IMAGES.modelingHipHop,
    imageOnLeft: false,
    dark: true,
  },
  {
    title: "Bridal & Engagement",
    description:
      "Engineered engagement and bridal settings built for durability, comfort and precise stone alignment. Secure prong architecture developed for long-term wear.",
    image: LANDING_IMAGES.modelingBridal,
    imageOnLeft: true,
    dark: false,
  },
  {
    title: "High Jewelry",
    description:
      "Advanced pavé and fine-setting structures developed with micron-level precision. Invisible settings and ultra-thin tolerances engineered with strict structural discipline.",
    image: LANDING_IMAGES.modelingHighJewelry,
    gradient:
      "linear-gradient(177.43deg, rgb(53, 53, 53) 19.132%, rgb(196, 195, 195) 96.072%)",
    imageOnLeft: false,
    dark: true,
  },
  {
    title: "Mechanical & Lock Systems",
    description:
      "Tolerance-calibrated clasps, hinges and multi-part articulated structures engineered for controlled movement and secure locking performance. Functional systems developed for durability, precision alignment and long-term mechanical reliability.",
    image: LANDING_IMAGES.modelingMechanical,
    gradient:
      "linear-gradient(167.92deg, rgb(102, 110, 112) 14.648%, rgb(176, 179, 183) 85.526%)",
    imageOnLeft: true,
    dark: false,
    titleBold: true,
  },
  {
    title: "3D Portrait Jewelry",
    description:
      "High-relief sculptural portraits engineered with controlled volume distribution and balanced weight architecture. Developed to integrate pavé surfaces, deep dimensional detail and reinforced structural support for long-term durability.",
    image: LANDING_IMAGES.modelingPortrait,
    gradient:
      "linear-gradient(167.92deg, rgb(6, 6, 6) 14.648%, rgb(192, 162, 102) 73.599%)",
    imageOnLeft: false,
    dark: true,
    titleBold: true,
  },
  {
    title: "Ancient & Heritage Jewelry",
    description:
      "Cultural and historical motifs re-engineered into structurally optimized, production-ready CAD frameworks. Authentic design language preserved through precise digital reconstruction and manufacturing awareness.",
    image: LANDING_IMAGES.modelingHeritage,
    gradient:
      "linear-gradient(167.92deg, rgb(122, 122, 122) 14.648%, rgb(0, 0, 0) 85.526%)",
    imageOnLeft: true,
    dark: true,
    titleBold: true,
  },
];

export function SectionModeling() {
  return (
    <section
      id={LANDING_SECTION_IDS.SPECIALIZATIONS}
      className="bg-white px-4 py-16 md:px-6 md:py-24"
      aria-labelledby="modeling-heading"
    >
      <div className="mx-auto max-w-[1920px]">
        <h2
          id="modeling-heading"
          className="font-manrope text-center font-normal leading-[40px] tracking-[-0.9px] text-[48px] text-[#ddab52]"
        >
          Modeling Specialization
        </h2>

        {/* 2 columns × 3 rows — gap matches Figma spacing */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="flex min-h-[320px] flex-col overflow-hidden rounded-[16px] shadow-lg md:min-h-[400px] md:flex-row lg:min-h-[495px]"
              style={
                card.gradient ? { background: card.gradient } : undefined
              }
            >
              {card.gradient ? (
                <>
                  {card.imageOnLeft ? (
                    <>
                      <div
                        className="relative order-2 h-[240px] shrink-0 overflow-hidden md:order-1 md:h-auto md:w-1/2"
                      >
                        <Image
                          src={card.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          unoptimized
                        />
                      </div>
                      <div
                        className={`order-1 flex flex-col justify-center gap-6 px-6 py-8 md:order-2 md:w-1/2 md:px-8 md:py-10 ${
                          card.dark ? "text-white" : "text-[#333333]"
                        }`}
                      >
                        <h3
                          className={`font-manrope text-right leading-[28px] text-[28px] md:text-[40px] ${
                            card.titleBold ? "font-bold" : "font-extrabold"
                          }`}
                        >
                          {card.title}
                        </h3>
                        <p
                          className={`font-manrope text-right font-light leading-[26px] text-[16px] ${
                            card.dark ? "text-white/60" : "text-[#666666]"
                          }`}
                        >
                          {card.description}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className={`flex flex-col justify-center gap-6 px-6 py-8 md:w-1/2 md:px-8 md:py-10 ${
                          card.dark ? "text-white" : "text-[#333333]"
                        }`}
                      >
                        <h3
                          className={`font-manrope leading-[28px] text-[28px] md:text-[40px] ${
                            card.titleBold ? "font-bold" : "font-extrabold"
                          }`}
                        >
                          {card.title}
                        </h3>
                        <p
                          className={`font-manrope font-light leading-[26px] text-[16px] ${
                            card.dark ? "text-white/80" : "text-[#666666]"
                          }`}
                        >
                          {card.description}
                        </p>
                      </div>
                      <div className="relative h-[240px] shrink-0 overflow-hidden md:h-auto md:w-1/2">
                        <Image
                          src={card.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          unoptimized
                        />
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  {card.imageOnLeft ? (
                    <>
                      <div className="relative order-2 h-[240px] shrink-0 overflow-hidden bg-[#353535] md:order-1 md:h-auto md:w-1/2">
                        <Image
                          src={card.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          unoptimized
                        />
                      </div>
                      <div className="order-1 flex flex-col justify-center gap-6 bg-[#e8e8e8] px-6 py-8 md:order-2 md:w-1/2 md:px-8 md:py-10 text-[#333333]">
                        <h3 className="font-manrope text-right font-extrabold leading-[28px] text-[28px] md:text-[40px]">
                          {card.title}
                        </h3>
                        <p className="font-manrope text-right font-light leading-[26px] text-[16px] text-[#666666]">
                          {card.description}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className={`flex flex-col justify-center gap-6 px-6 py-8 md:w-1/2 md:px-8 md:py-10 ${
                          card.dark
                            ? "bg-[#1a1a1a] text-white"
                            : "bg-[#e8e8e8] text-[#333333]"
                        }`}
                      >
                        <h3 className="font-manrope font-extrabold leading-[28px] text-[28px] md:text-[40px]">
                          {card.title}
                        </h3>
                        <p
                          className={`font-manrope font-light leading-[26px] text-[16px] ${
                            card.dark ? "text-white/80" : "text-[#666666]"
                          }`}
                        >
                          {card.description}
                        </p>
                      </div>
                      <div className="relative h-[240px] shrink-0 overflow-hidden bg-[#353535] md:h-auto md:w-1/2">
                        <Image
                          src={card.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          unoptimized
                        />
                      </div>
                    </>
                  )}
                </>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
