/**
 * Բաժանարար գիծ section-ների միջև — նկարի մեջ նշված կարմիր գծի անալոգը։
 * Պինդ ֆոնով wrapper, որպեսզի գիծը չկորչի հերոյի/պատկերի գրադիենտի մեջ։
 */

type SectionDividerVariant = "white" | "onLight";

const LINE_CLASS: Record<SectionDividerVariant, string> = {
  white: "bg-white",
  onLight: "bg-neutral-500",
};

/** Պինդ ֆոն, որպեսզի գիծը չկորչի գրադիենտ/պատկերի մեջ */
const WRAPPER_BG = "bg-neutral-100";

type SectionDividerProps = {
  variant?: SectionDividerVariant;
};

export function SectionDivider({ variant = "onLight" }: SectionDividerProps) {
  return (
    <div
      className={`w-full shrink-0 ${WRAPPER_BG}`}
      aria-hidden
    >
      <div
        className={`h-2 w-full shrink-0 ${LINE_CLASS[variant]}`}
        role="presentation"
      />
    </div>
  );
}
