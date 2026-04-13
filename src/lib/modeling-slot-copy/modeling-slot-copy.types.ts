import type { ModelingSlotKey } from "@/lib/site-media/site-media.registry";

export type ModelingSlotCopyEntry = {
  title: string;
  body: string;
};

export type ModelingSlotCopyBundle = Record<ModelingSlotKey, ModelingSlotCopyEntry>;
