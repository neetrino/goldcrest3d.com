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
          className='text-center text-[38px] font-[457] leading-[40px] font-["SF_Compact",-apple-system,BlinkMacSystemFont,sans-serif] md:font-manrope md:text-[48px] md:font-normal md:leading-[40px] md:tracking-[-0.9px]'
        >
          <span className="block text-[#ddab52] md:inline">Goldcrest </span>
          <span className="block text-[#ddab52] md:inline">Engineering </span>
          <span className="block font-[790] text-black md:inline md:font-bold">Philosophy</span>
        </h2>
        <blockquote className='mt-[42px] text-center text-[16px] font-[350] leading-[24px] text-[rgba(24,22,16,0.8)] font-["SF_Compact",-apple-system,BlinkMacSystemFont,sans-serif] md:font-manrope md:text-[30px] md:font-light md:leading-[36px]'>
          &ldquo;We design with manufacturing awareness.
          <br />
          We engineer with structural responsibility.
          <br />
          We eliminate risks at the digital stage.
          <br />
          <br />
          <span className="font-[790] text-[#181610] md:font-extrabold">
            Precision is not optional. It is the standard.
          </span>
          &rdquo;
        </blockquote>
      </div>
    </section>
  );
}
