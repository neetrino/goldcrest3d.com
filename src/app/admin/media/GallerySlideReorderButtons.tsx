"use client";

type GallerySlideReorderButtonsProps = {
  index: number;
  total: number;
  pending: boolean;
  onMove: (index: number, delta: number) => void;
};

export function GallerySlideReorderButtons({
  index,
  total,
  pending,
  onMove,
}: GallerySlideReorderButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        disabled={pending || index === 0}
        onClick={() => onMove(index, -1)}
        title="Show this image earlier in the carousel"
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span aria-hidden>↑</span>
        Earlier
      </button>
      <button
        type="button"
        disabled={pending || index >= total - 1}
        onClick={() => onMove(index, 1)}
        title="Show this image later in the carousel"
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span aria-hidden>↓</span>
        Later
      </button>
    </div>
  );
}
