import type { ModelingSlotKey } from "@/lib/site-media/site-media.registry";

import type { ModelingTextOverlayLayout } from "./modeling-text-overlay-layout";

export type ModelingSlotCopyEntry = {
  /** Desktop / tablet (md+) title; line breaks allowed. Empty string renders no title. */
  title: string;
  /** Optional title for viewports below `md`. Empty string uses `title` everywhere. */
  titleMobile: string;
  /** Desktop / tablet (md+) rich HTML. Empty string renders no description. */
  body: string;
  /** Optional rich HTML for mobile (viewports below md). Empty string uses `body` everywhere. */
  bodyMobile: string;
  /** When set with `textLayoutMobile`, homepage uses absolute overlay for md+ (Media Manager). */
  textLayoutDesktop: ModelingTextOverlayLayout | null;
  /** When set with `textLayoutDesktop`, homepage uses absolute overlay below md. */
  textLayoutMobile: ModelingTextOverlayLayout | null;
};

export type ModelingSlotCopyBundle = Record<ModelingSlotKey, ModelingSlotCopyEntry>;
