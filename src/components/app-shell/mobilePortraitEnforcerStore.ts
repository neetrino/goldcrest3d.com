import { computeMobileLandscape } from "./compute-mobile-landscape";

function subscribe(onStoreChange: () => void): () => void {
  const mqLandscape = window.matchMedia("(max-width: 1023px) and (orientation: landscape)");
  const mqNarrow = window.matchMedia("(max-width: 1023px)");

  const run = (): void => {
    onStoreChange();
  };

  mqLandscape.addEventListener("change", run);
  mqNarrow.addEventListener("change", run);
  window.addEventListener("resize", run);
  window.addEventListener("orientationchange", run);

  const vv = window.visualViewport;
  vv?.addEventListener("resize", run);

  return () => {
    mqLandscape.removeEventListener("change", run);
    mqNarrow.removeEventListener("change", run);
    window.removeEventListener("resize", run);
    window.removeEventListener("orientationchange", run);
    vv?.removeEventListener("resize", run);
  };
}

function getSnapshot(): boolean {
  return computeMobileLandscape();
}

function getServerSnapshot(): boolean {
  return false;
}

export const mobilePortraitEnforcerStore = {
  subscribe,
  getSnapshot,
  getServerSnapshot,
};
