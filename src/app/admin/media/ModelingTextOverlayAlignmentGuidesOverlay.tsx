import type { ModelingTextOverlayAlignmentGuides } from "@/lib/modeling-slot-copy/modeling-text-overlay-alignment-guides";

type ModelingTextOverlayAlignmentGuidesOverlayProps = {
  readonly guides: ModelingTextOverlayAlignmentGuides;
};

export function ModelingTextOverlayAlignmentGuidesOverlay({
  guides,
}: ModelingTextOverlayAlignmentGuidesOverlayProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[15]" aria-hidden>
      {guides.vertical.map((xPct, i) => (
        <div
          key={`align-v-${i}-${xPct.toFixed(3)}`}
          className="absolute top-0 bottom-0 w-px -translate-x-1/2 bg-sky-500/85 shadow-[0_0_1px_rgba(14,165,233,0.6)]"
          style={{ left: `${xPct}%` }}
        />
      ))}
      {guides.horizontal.map((yPct, i) => (
        <div
          key={`align-h-${i}-${yPct.toFixed(3)}`}
          className="absolute left-0 right-0 h-px -translate-y-1/2 bg-sky-500/85 shadow-[0_0_1px_rgba(14,165,233,0.6)]"
          style={{ top: `${yPct}%` }}
        />
      ))}
    </div>
  );
}
