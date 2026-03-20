"use client";

import { useState } from "react";
import { SectionContainer } from "./SectionContainer";

const IMG_URL =
  "https://www.figma.com/api/mcp/asset/26a5204f-008a-4d4e-a1db-4950f22c4093";

const ITEMS = [
  "Tolerance Control & Assembly Precision",
  "Mechanical Stress & Load Distribution",
  "3D Printing Strategy & Resin Behavior",
  "Casting Compensation & Metal Flow Awareness",
  "Stone Seat Geometry & Setting Logic",
  "Wall Thickness Engineering",
];

export function ManufacturingIntelligence() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionContainer id="engineering" className="bg-[var(--color-bg-warm)]">
      <div className="container-narrow mx-auto">
        <h2 className="text-[var(--color-charcoal)] text-[clamp(1.75rem,3vw,2.5rem)] font-normal mb-8 lg:mb-12">
          Manufacturing Intelligence
        </h2>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2 space-y-0">
            {ITEMS.map((label, i) => (
              <button
                key={label}
                type="button"
                className="w-full flex items-center justify-between gap-4 py-4 lg:py-6 px-4 lg:px-6 text-left border-b border-[var(--color-slate-border)] hover:bg-white/50 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="font-bold text-[var(--color-charcoal)] text-base lg:text-lg">
                  {label}
                </span>
                <svg
                  className={`w-6 h-6 shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            ))}
          </div>
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div
              className="w-full max-w-lg aspect-[750/625] rounded-lg overflow-hidden bg-[var(--color-slate-border)] bg-cover bg-center"
              style={{ backgroundImage: `url(${IMG_URL})` }}
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
