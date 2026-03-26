import { LANDING_SECTION_IDS } from "@/constants";
import { QuoteForm } from "@/components/quote-form/QuoteForm";

/** Mobile: Inter 12/16, tracking 1.2px. `md:` — previous Inquiry label (Manrope 10px bold). */
const QUOTE_INQUIRY_LABEL_CLASS =
  "text-center font-sans text-xs font-normal leading-4 tracking-[1.2px] text-[#C69F58] uppercase not-italic md:font-manrope md:text-[10px] md:font-bold md:leading-[15px] md:tracking-[3px]";

/**
 * Mobile: Inter 30/36, flex `1 0 0`, #000, tracking 0.396px.
 * `md:` — SF Compact 58px / 457, #181610 (unchanged desktop).
 */
const QUOTE_SUBMIT_HEADING_CLASS =
  "mt-2 min-w-0 flex-[1_0_0] text-center font-sans text-[30px] font-bold leading-[36px] tracking-[0.396px] text-black not-italic md:mt-[30px] md:flex-none md:font-[\"SF_Compact\",-apple-system,BlinkMacSystemFont,sans-serif] md:text-[58px] md:font-[457] md:leading-[48px] md:tracking-[-1.2px] md:text-[#181610]";

/** Mobile: Inter 16/24, 283px wide, #6A7282. Tighter `mt` vs desktop; form `mt` compensates so layout below stays aligned. */
const QUOTE_SUBTITLE_CLASS =
  "mt-3 mx-auto w-full max-w-[283px] shrink-0 text-center font-sans text-base font-light leading-6 tracking-[-0.312px] text-[#6A7282] not-italic md:mt-[29.25px] md:max-w-none md:font-manrope md:text-[20px] md:leading-[28px] md:tracking-normal md:text-[rgba(24,22,16,0.5)]";

export function SectionQuote() {
  return (
    <section
      id={LANDING_SECTION_IDS.QUOTE}
      className="bg-white px-4 py-[73px] md:px-8 md:py-[73px]"
      aria-labelledby="quote-heading"
    >
      <div className="mx-auto max-w-[848px]">
        <p className={QUOTE_INQUIRY_LABEL_CLASS}>Inquiry</p>
        <div className="flex w-full md:contents">
          <h2 id="quote-heading" className={QUOTE_SUBMIT_HEADING_CLASS}>
            Submit Project
          </h2>
        </div>
        <p className={QUOTE_SUBTITLE_CLASS}>
          Start your next engineering project{' '}
          <span className="whitespace-nowrap md:whitespace-normal">with precision.</span>
        </p>
        <div className="mt-[113.25px] md:mt-[96px]">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
