import type { ModelingSlotKey } from "@/lib/site-media/site-media.registry";

export type ModelingSlotCopyEntry = {
  /** Desktop / tablet (md+) title; line breaks allowed. Empty string renders no title. */
  title: string;
  /** Mobile-only title (below `md`). Persisted separately from `title`. */
  titleMobile: string;
  /** Desktop / tablet (md+) rich HTML. Empty string renders no description. */
  body: string;
  /** Mobile-only rich HTML (below `md`). Persisted separately from `body`. */
  bodyMobile: string;
};

export type ModelingSlotCopyBundle = Record<ModelingSlotKey, ModelingSlotCopyEntry>;
