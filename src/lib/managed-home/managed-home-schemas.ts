import { z } from "zod";

import { MANUFACTURING_SPECIALIZATION_IDS } from "@/constants/manufacturing-specialization";
import { MODELING_SLOT_KEYS } from "@/lib/site-media/site-media.registry";

const manufacturingItemSchema = z.object({
  id: z.enum([
    MANUFACTURING_SPECIALIZATION_IDS.TOLERANCE_CONTROL_ASSEMBLY_PRECISION,
    MANUFACTURING_SPECIALIZATION_IDS.MECHANICAL_STRESS_LOAD_DISTRIBUTION,
    MANUFACTURING_SPECIALIZATION_IDS.PRINTING_STRATEGY_RESIN,
    MANUFACTURING_SPECIALIZATION_IDS.CASTING_COMPENSATION_METAL_FLOW,
    MANUFACTURING_SPECIALIZATION_IDS.STONE_SEAT_GEOMETRY_SETTING,
    MANUFACTURING_SPECIALIZATION_IDS.WALL_THICKNESS_ENGINEERING,
  ]),
  title: z.string(),
  description: z.string().optional(),
  detailImageAlt: z.string().optional(),
});

export const manufacturingPayloadSchema = z.object({
  sectionTitle: z.string(),
  items: z.array(manufacturingItemSchema).min(1),
});

export type ManufacturingPayload = z.infer<typeof manufacturingPayloadSchema>;

const modelingCardSchema = z.object({
  title: z.string().optional(),
  descriptionLines: z.array(z.string()).optional(),
  descriptionLinesDesktop: z.array(z.string()).optional(),
  descriptionLinesMobile: z.array(z.string()).optional(),
  titleLine1: z.string().optional(),
  titleLine2: z.string().optional(),
});

const modelingCardsSchema = z
  .object({
    [MODELING_SLOT_KEYS.HIP_HOP]: modelingCardSchema.optional(),
    [MODELING_SLOT_KEYS.BRIDAL]: modelingCardSchema.optional(),
    [MODELING_SLOT_KEYS.PORTRAIT]: modelingCardSchema.optional(),
    [MODELING_SLOT_KEYS.MECHANICAL]: modelingCardSchema.optional(),
    [MODELING_SLOT_KEYS.HERITAGE]: modelingCardSchema.optional(),
    [MODELING_SLOT_KEYS.HIGH_JEWELRY]: modelingCardSchema.optional(),
  })
  .strict();

export const modelingPayloadSchema = z.object({
  sectionTitle: z.string(),
  cards: modelingCardsSchema.optional(),
});

export type ModelingPayload = z.infer<typeof modelingPayloadSchema>;

export const philosophyPayloadSchema = z.object({
  goldcrest: z.string(),
  engineering: z.string(),
  philosophy: z.string(),
  quoteLines: z.array(z.string()).min(1),
  emphasis: z.string(),
});

export type PhilosophyPayload = z.infer<typeof philosophyPayloadSchema>;

const founderStatSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const founderPayloadSchema = z.object({
  sectionHeading: z.string(),
  name: z.string(),
  bioMobileParagraphs: z.array(z.string()).min(1),
  bioDesktopBlock1: z.string(),
  bioDesktopBlock2: z.string(),
  stats: z.array(founderStatSchema).min(1),
});

export type FounderPayload = z.infer<typeof founderPayloadSchema>;

const processStepSchema = z.object({
  num: z.string(),
  title: z.string(),
  description: z.string(),
});

export const processPayloadSchema = z.object({
  heading: z.string(),
  steps: z.array(processStepSchema).min(1),
});

export type ProcessPayload = z.infer<typeof processPayloadSchema>;

export type ManagedHomeBundle = {
  philosophy: PhilosophyPayload;
  modeling: ModelingPayload;
  manufacturing: ManufacturingPayload;
  founder: FounderPayload;
  process: ProcessPayload;
};
