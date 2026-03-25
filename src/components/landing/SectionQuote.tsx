import { LANDING_SECTION_IDS } from "@/constants";
import { QuoteForm } from "@/components/quote-form/QuoteForm";

/** Desktop (`md:`) — SF Compact 58px / weight 457; mobile — Manrope 48px extrabold. */
const QUOTE_SUBMIT_HEADING_CLASS =
  "mt-0 text-center font-manrope text-[48px] font-extrabold leading-[48px] tracking-[-1.2px] text-[#181610] md:mt-[30px] md:font-[\"SF_Compact\",-apple-system,BlinkMacSystemFont,sans-serif] md:text-[58px] md:font-[457] md:leading-[48px] md:tracking-[-1.2px]";

export function SectionQuote() {
  return (
    <section
      id={LANDING_SECTION_IDS.QUOTE}
      className="bg-white px-4 py-[73px] md:px-8 md:py-[73px]"
      aria-labelledby="quote-heading"
    >
      <div className="mx-auto max-w-[848px]">
        <div className="flex flex-col-reverse md:flex-col">
          <p className="mt-[30px] font-manrope text-center font-bold leading-[15px] tracking-[3px] text-[#c69f58] text-[10px] uppercase md:mt-0">
            Inquiry
          </p>
          <h2 id="quote-heading" className={QUOTE_SUBMIT_HEADING_CLASS}>
            Submit Project
          </h2>
        </div>
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
