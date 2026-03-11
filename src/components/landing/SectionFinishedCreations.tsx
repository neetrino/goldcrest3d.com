import { LANDING_SECTION_IDS } from "@/constants";
import { LANDING_IMAGES } from "@/constants/landing-assets";
import Image from "next/image";

const GALLERY_IMAGES = [
  LANDING_IMAGES.finishedCnc,
  LANDING_IMAGES.finishedCopper,
  LANDING_IMAGES.finishedOpacity,
  LANDING_IMAGES.finishedCopper,
  LANDING_IMAGES.finishedCnc,
  LANDING_IMAGES.finishedOpacity,
];

export function SectionFinishedCreations() {
  return (
    <section
      id={LANDING_SECTION_IDS.FINISHED_CREATIONS}
      className="bg-[#f8f7f6] px-4 py-16 md:px-6 md:py-24"
      aria-labelledby="finished-heading"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="finished-heading"
          className="font-manrope text-center font-normal leading-[40px] tracking-[-0.9px] text-black text-[48px]"
        >
          Finished Creations
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_IMAGES.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative aspect-[4/3] overflow-hidden rounded-[16px]"
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                unoptimized
              />
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center gap-2" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-[var(--foreground)]/30" />
          <span className="h-2 w-2 rounded-full bg-[#c69f58]" />
          <span className="h-2 w-2 rounded-full bg-[var(--foreground)]/30" />
        </div>
      </div>
    </section>
  );
}
