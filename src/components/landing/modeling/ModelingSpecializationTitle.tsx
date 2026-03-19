/** Section title copy — single line, centered in fixed block. */
const MODELING_SPECIALIZATION_TITLE = "Modeling Specialization";

/**
 * Modeling Specialization section title. Figma: 48px, #ddab52, tracking -0.9px.
 * Renders inside a flex wrapper so text is centered in the parent fixed-size block
 * without affecting its dimensions. Parent must set fixed height/width.
 */
export function ModelingSpecializationTitle() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <h2
        id="modeling-specialization"
        className="font-manrope -translate-y-8 text-center text-[48px] font-normal leading-[40px] tracking-[-0.9px] text-[#ddab52]"
      >
        {MODELING_SPECIALIZATION_TITLE}
      </h2>
    </div>
  );
}
