import type { ModelingSlotKey } from "@/lib/site-media/site-media.registry";

import type { ModelingTextOverlayLayout } from "./modeling-text-overlay-layout";

export type ModelingSlotCopyEntry = {
  /** Desktop / tablet (md+) title; line breaks allowed. Empty string renders no title. */
  title: string;
  /** Mobile-only title (below `md`). Persisted separately from `title`. */
  titleMobile: string;
  /** Desktop / tablet (md+) rich HTML. Empty string renders no description. */
  body: string;
  /** Mobile-only rich HTML (below `md`). Persisted separately from `body`. */
  bodyMobile: string;
  /** When set with `textLayoutMobile`, homepage uses absolute overlay for md+ (Media Manager). */
  textLayoutDesktop: ModelingTextOverlayLayout | null;
  /** When set with `textLayoutDesktop`, homepage uses absolute overlay below md. */
  textLayoutMobile: ModelingTextOverlayLayout | null;
};

export type ModelingSlotCopyBundle = Record<ModelingSlotKey, ModelingSlotCopyEntry>;
