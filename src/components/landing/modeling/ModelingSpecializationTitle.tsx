/** Section title copy — single line, centered in fixed block. */
const MODELING_SPECIALIZATION_TITLE = "Modeling Specialization";

/**
 * Modeling Specialization section title.
 * Mobile (Figma): Inter 30px/500, line-height 36px, tracking 0.396px, #DDAB52, one line.
 * md+: Manrope 48px, tracking -0.9px (existing desktop spec).
 */
export function ModelingSpecializationTitle() {
  return (
    <div className="flex h-full w-full min-w-0 items-center justify-center px-1">
      <h2
        id="modeling-specialization"
        className="whitespace-nowrap text-center font-sans text-[30px] font-medium leading-[36px] tracking-[0.396px] text-[#DDAB52] md:font-manrope md:text-[48px] md:font-normal md:leading-[40px] md:tracking-[-0.9px] md:-translate-y-8"
      >
        {MODELING_SPECIALIZATION_TITLE}
      </h2>
    </div>
  );
}
