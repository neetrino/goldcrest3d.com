"use client";

import { useEffect, useSyncExternalStore } from "react";

import "./mobile-portrait-enforcer.css";
import { mobilePortraitEnforcerStore } from "./mobilePortraitEnforcerStore";

const OVERLAY_MESSAGE =
  "Please rotate your device and keep it in portrait mode to continue using the application.";

function PortraitPhoneHint() {
  return (
    <div
      aria-hidden
      className="gc-portrait-enforcer__phone-wrap relative mx-auto mb-8 flex h-[104px] w-[52px] shrink-0 items-center justify-center"
    >
      <div className="gc-portrait-enforcer__ring pointer-events-none absolute inset-[-14px] rounded-[28px] border-2 border-[var(--foreground)]/25" />
      <svg
        className="relative z-[1] h-[88px] w-[44px] text-[var(--foreground)]"
        viewBox="0 0 44 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="3"
          y="3"
          width="38"
          height="82"
          rx="6"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <rect x="14" y="10" width="16" height="56" rx="1.5" fill="currentColor" opacity="0.12" />
        <circle cx="22" cy="74" r="3" fill="currentColor" opacity="0.45" />
      </svg>
    </div>
  );
}

/**
 * Full-screen portrait-only gate for touch-class devices in landscape (see `computeMobileLandscape`).
 * Mounted once in the root layout.
 */
export function MobilePortraitEnforcer() {
  const block = useSyncExternalStore(
    mobilePortraitEnforcerStore.subscribe,
    mobilePortraitEnforcerStore.getSnapshot,
    mobilePortraitEnforcerStore.getServerSnapshot,
  );

  useEffect(() => {
    if (!block) {
      return undefined;
    }
    const html = document.documentElement;
    html.classList.add("gc-portrait-enforcer--locks-scroll");
    return () => {
      html.classList.remove("gc-portrait-enforcer--locks-scroll");
    };
  }, [block]);

  if (!block) {
    return null;
  }

  return (
    <div
      aria-modal="true"
      aria-labelledby="gc-portrait-enforcer-title"
      className="gc-portrait-enforcer__overlay fixed inset-0 flex items-center justify-center bg-[var(--background)] px-8 text-center touch-none overscroll-none"
      role="alertdialog"
    >
      <div className="max-w-md touch-none rounded-2xl border border-[var(--foreground)]/10 bg-[var(--background)] px-6 py-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)]">
        <PortraitPhoneHint />
        <h2 className="sr-only" id="gc-portrait-enforcer-title">
          Portrait orientation required
        </h2>
        <p className="text-base font-medium leading-relaxed text-[var(--foreground)]/90 md:text-lg">
          {OVERLAY_MESSAGE}
        </p>
      </div>
    </div>
  );
}
