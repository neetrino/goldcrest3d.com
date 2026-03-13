import { LANDING_SECTION_IDS } from "@/constants";

export function SectionPhilosophy() {
  return (
    <section
      id={LANDING_SECTION_IDS.PHILOSOPHY}
      className="bg-[#f2f3f4] px-4 py-[94px] md:px-6 md:py-[94px]"
      aria-labelledby="philosophy-heading"
    >
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2
          id="philosophy-heading"
          className="font-manrope font-normal leading-[40px] tracking-[-0.9px] text-[#ddab52] text-[48px]"
        >
          Goldcrest Engineering Philosophy
        </h2>
        <blockquote className="mt-[42px] font-manrope text-center font-light leading-[36px] text-[rgba(24,22,16,0.8)] text-[30px]">
          &ldquo;We design with manufacturing awareness.
          <br />
          We engineer with structural responsibility.
          <br />
          We eliminate risks at the digital stage.
          <br />
          <span className="font-extrabold text-[#181610]">
            Precision is not optional. It is the standard
          </span>
          .&rdquo;
        </blockquote>
      </div>
    </section>
  );
}
