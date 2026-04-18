"use client";

import type { ReactNode } from "react";

type CanvasMediaStageProps = {
  children: ReactNode;
  className?: string;
};

export function CanvasMediaStage({ children, className }: CanvasMediaStageProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-inner ${
        className ?? ""
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.18)_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-slate-900/5" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
