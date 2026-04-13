import type { PointerEvent as ReactPointerEvent } from "react";

type ModelingTextOverlayDragMoveHandleProps = {
  readonly label: string;
  readonly onActivate: () => void;
  readonly onPointerDown: (e: ReactPointerEvent<HTMLButtonElement>) => void;
};

export function ModelingTextOverlayDragMoveHandle({
  label,
  onActivate,
  onPointerDown,
}: ModelingTextOverlayDragMoveHandleProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onPointerDown={(e) => {
        e.stopPropagation();
        onActivate();
        onPointerDown(e);
      }}
      className="absolute left-1/2 top-0 z-20 flex h-7 w-7 -translate-x-1/2 -translate-y-[calc(100%+4px)] cursor-grab items-center justify-center rounded-md border border-slate-400/90 bg-white/95 text-slate-600 shadow-sm hover:bg-white active:cursor-grabbing"
    >
      <span className="flex flex-col gap-0.5" aria-hidden>
        <span className="block h-0.5 w-3 rounded-full bg-slate-500" />
        <span className="block h-0.5 w-3 rounded-full bg-slate-500" />
        <span className="block h-0.5 w-3 rounded-full bg-slate-500" />
      </span>
    </button>
  );
}
