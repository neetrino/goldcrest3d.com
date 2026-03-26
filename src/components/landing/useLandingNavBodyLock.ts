import { useEffect } from "react";

/**
 * Locks `document.body` scroll while a mobile overlay is open; restores on unmount.
 * Closes on Escape when `open` is true.
 */
export function useLandingNavBodyLock(open: boolean, onEscape: () => void) {
  useEffect(() => {
    if (!open) {
      return;
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onEscape();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onEscape]);
}
