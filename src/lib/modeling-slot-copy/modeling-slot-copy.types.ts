import type { ModelingSlotKey } from "@/lib/site-media/site-media.registry";

export type ModelingSlotCopyEntry = {
  /** Desktop / tablet (md+) title; line breaks allowed. */
  title: string;
  /** Optional title for viewports below `md`. Empty string uses `title` everywhere. */
  titleMobile: string;
  /** Desktop / tablet (md+) rich HTML. */
  body: string;
  /** Optional rich HTML for mobile (viewports below md). Empty string uses `body` everywhere. */
  bodyMobile: string;
};

export type ModelingSlotCopyBundle = Record<ModelingSlotKey, ModelingSlotCopyEntry>;
