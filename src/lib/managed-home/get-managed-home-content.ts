import { logger } from "@/lib/logger";
import { prisma } from "@/lib/db";

import { isMigrationPendingError } from "@/lib/site-media/is-migration-pending-error";

import {
  buildDefaultManufacturingPayload,
  getManagedHomeDefaults,
  PHILOSOPHY_DEFAULTS,
} from "./managed-home-defaults";
import { MANAGED_HOME_SECTION_KEYS } from "./managed-home-section-keys";
import {
  type ManagedHomeBundle,
  founderPayloadSchema,
  manufacturingPayloadSchema,
  modelingPayloadSchema,
  philosophyPayloadSchema,
  processPayloadSchema,
} from "./managed-home-schemas";

function mergeManufacturingPayload(
  raw: unknown,
  defaults: ReturnType<typeof buildDefaultManufacturingPayload>,
): ManagedHomeBundle["manufacturing"] {
  const parsed = manufacturingPayloadSchema.safeParse(raw);
  if (!parsed.success) {
    return defaults;
  }
  const overrideById = new Map(parsed.data.items.map((i) => [i.id, i]));
  return {
    sectionTitle: parsed.data.sectionTitle,
    items: defaults.items.map((d) => {
      const o = overrideById.get(d.id);
      if (!o) return d;
      return {
        id: d.id,
        title: o.title,
        description: o.description ?? d.description,
        detailImageAlt: o.detailImageAlt ?? d.detailImageAlt,
      };
    }),
  };
}

function mergeModelingPayload(
  raw: unknown,
  defaults: ManagedHomeBundle["modeling"],
): ManagedHomeBundle["modeling"] {
  const parsed = modelingPayloadSchema.safeParse(raw);
  if (!parsed.success) {
    return defaults;
  }
  return {
    sectionTitle: parsed.data.sectionTitle,
    cards: parsed.data.cards ?? defaults.cards,
  };
}

/**
 * Loads editable homepage copy from Neon; merges with canonical defaults when missing or invalid.
 */
export async function getManagedHomeBundle(): Promise<ManagedHomeBundle> {
  const base = getManagedHomeDefaults();
  let rows: { sectionKey: string; payload: unknown }[] = [];
  try {
    rows = await prisma.managedHomeContent.findMany();
  } catch (err) {
    if (isMigrationPendingError(err)) {
      logger.info("getManagedHomeBundle: migration pending, defaults");
    } else {
      logger.error("getManagedHomeBundle: unexpected DB error", err);
    }
    return base;
  }

  const map = new Map(rows.map((r) => [r.sectionKey, r.payload]));

  const philosophyRaw = map.get(MANAGED_HOME_SECTION_KEYS.PHILOSOPHY);
  const philosophyParsed = philosophyPayloadSchema.safeParse(philosophyRaw);
  const philosophy = philosophyParsed.success
    ? philosophyParsed.data
    : PHILOSOPHY_DEFAULTS;

  const modelingRaw = map.get(MANAGED_HOME_SECTION_KEYS.MODELING);
  const modeling = mergeModelingPayload(modelingRaw, base.modeling);

  const manufacturingRaw = map.get(MANAGED_HOME_SECTION_KEYS.MANUFACTURING);
  const manufacturing = mergeManufacturingPayload(
    manufacturingRaw,
    buildDefaultManufacturingPayload(),
  );

  const founderRaw = map.get(MANAGED_HOME_SECTION_KEYS.FOUNDER);
  const founderParsed = founderPayloadSchema.safeParse(founderRaw);
  const founder = founderParsed.success ? founderParsed.data : base.founder;

  const processRaw = map.get(MANAGED_HOME_SECTION_KEYS.PROCESS);
  const processParsed = processPayloadSchema.safeParse(processRaw);
  const process = processParsed.success ? processParsed.data : base.process;

  return {
    philosophy,
    modeling,
    manufacturing,
    founder,
    process,
  };
}
