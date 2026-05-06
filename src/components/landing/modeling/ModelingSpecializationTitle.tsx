/** Section title copy — single line; centered (md+ horizontally centered in the title row). */
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
        className="-translate-y-[calc(1rem*var(--ms,1))] whitespace-nowrap text-center font-sans text-[calc(30px*var(--ms,1))] font-medium leading-[calc(36px*var(--ms,1))] tracking-[0.396px] text-[#e2c481] sm:font-manrope sm:text-[calc(48px*var(--ms,1))] sm:font-normal sm:leading-[calc(40px*var(--ms,1))] sm:tracking-[-0.9px] sm:-translate-y-[calc(2rem*var(--ms,1))]"
      >
        {MODELING_SPECIALIZATION_TITLE}
      </h2>
    </div>
  );
}
