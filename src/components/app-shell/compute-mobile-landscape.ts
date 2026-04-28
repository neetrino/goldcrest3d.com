import { MOBILE_LANDSCAPE_MEDIA_QUERY } from "./mobile-portrait-enforcer.constants";

function isMobileClassDevice(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }
  if (window.matchMedia("(pointer: coarse)").matches) {
    return true;
  }
  if (window.matchMedia("(hover: none)").matches && navigator.maxTouchPoints > 0) {
    return true;
  }
  return navigator.maxTouchPoints > 0 && !window.matchMedia("(pointer: fine)").matches;
}

/**
 * Returns true when the viewport should show the portrait-only overlay:
 * touch-class device, non-desktop width band, landscape orientation.
 */
export function computeMobileLandscape(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  if (!isMobileClassDevice()) {
    return false;
  }

  if (window.matchMedia(MOBILE_LANDSCAPE_MEDIA_QUERY).matches) {
    return true;
  }

  const w = window.innerWidth;
  const h = window.innerHeight;
  const isLandscape = w > h;
  const narrowBand = window.matchMedia("(max-width: 1023px)").matches;

  // iOS/WebKit can briefly lag `orientation` in matchMedia; dual-axis guard avoids flicker.
  return narrowBand && isLandscape;
}
