import { LANDING_SECTION_IDS } from "@/constants";
import { QuoteForm } from "@/components/quote-form/QuoteForm";

export function SectionQuote() {
  return (
    <section
      id={LANDING_SECTION_IDS.QUOTE}
      className="bg-white px-4 py-[73px] md:px-8 md:py-[73px]"
      aria-labelledby="quote-heading"
    >
      <div className="mx-auto max-w-[848px]">
        <p className="font-manrope text-center font-bold leading-[15px] tracking-[3px] text-[#c69f58] text-[10px] uppercase">
          Inquiry
        </p>
        <h2
          id="quote-heading"
          className="mt-[30px] font-manrope text-center font-extrabold leading-[48px] tracking-[-1.2px] text-[#181610] text-[48px]"
        >
          Submit Project
        </h2>
        <p className="mt-[29.25px] font-manrope text-center font-light leading-[28px] text-[rgba(24,22,16,0.5)] text-[20px]">
          Start your next engineering project with precision.
        </p>
        <div className="mt-[96px]">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
