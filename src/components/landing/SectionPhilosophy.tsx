import { LANDING_SECTION_IDS } from "@/constants";

export function SectionPhilosophy() {
  return (
    <section
      id={LANDING_SECTION_IDS.PHILOSOPHY}
      className="bg-[#f2f3f4] px-4 py-16 md:px-6 md:py-24"
      aria-labelledby="philosophy-heading"
    >
      <div className="mx-auto max-w-4xl px-2 text-center">
        <h2
          id="philosophy-heading"
          className="font-normal leading-[1.2] tracking-[-0.02em] text-[#ddab52] text-[clamp(2rem,5vw,48px)]"
        >
          Goldcrest Engineering Philosophy
        </h2>
        <blockquote className="mt-10 font-light leading-[1.2] text-[var(--foreground)]/80 text-[clamp(1.25rem,2.5vw,30px)]">
          &ldquo;We design with manufacturing awareness. We engineer with
          structural responsibility. We eliminate risks at the digital stage.{" "}
          <strong className="font-extrabold text-[var(--foreground)]">
            Precision is not optional. It is the standard
          </strong>
          .&rdquo;
        </blockquote>
      </div>
    </section>
  );
}
