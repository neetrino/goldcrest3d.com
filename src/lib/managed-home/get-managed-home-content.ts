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
  type ModelingCardFields,
  type ModelingCardsPayload,
  founderPayloadSchema,
  legacyFlatModelingPayloadSchema,
  manufacturingPayloadSchema,
  modelingPayloadSchema,
  philosophyPayloadSchema,
  processPayloadSchema,
} from "./managed-home-schemas";
import { MODELING_SLOT_KEYS } from "@/lib/site-media/site-media.registry";

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

const MODELING_SLOT_LIST = [
  MODELING_SLOT_KEYS.HIP_HOP,
  MODELING_SLOT_KEYS.BRIDAL,
  MODELING_SLOT_KEYS.PORTRAIT,
  MODELING_SLOT_KEYS.MECHANICAL,
  MODELING_SLOT_KEYS.HERITAGE,
  MODELING_SLOT_KEYS.HIGH_JEWELRY,
] as const;

function pickCardFields(
  src: ModelingCardFields | undefined,
): ModelingCardFields | undefined {
  if (!src) return undefined;
  const { title, titleLine1, titleLine2, descriptionLines } = src;
  if (
    title == null &&
    titleLine1 == null &&
    titleLine2 == null &&
    (descriptionLines == null || descriptionLines.length === 0)
  ) {
    return undefined;
  }
  return { title, titleLine1, titleLine2, descriptionLines };
}

function mergeModelingCards(
  incoming: ModelingCardsPayload | null | undefined,
  fallback: ModelingCardsPayload | undefined,
): ModelingCardsPayload | undefined {
  const inc = incoming ?? undefined;
  const merged: ModelingCardsPayload = {};
  let any = false;
  for (const key of MODELING_SLOT_LIST) {
    const next = pickCardFields(inc?.[key]) ?? pickCardFields(fallback?.[key]);
    if (next) {
      merged[key] = next;
      any = true;
    }
  }
  return any ? merged : undefined;
}

function migrateLegacyFlatModeling(
  raw: unknown,
): ManagedHomeBundle["modeling"] | null {
  const legacy = legacyFlatModelingPayloadSchema.safeParse(raw);
  if (!legacy.success) {
    return null;
  }
  const { sectionTitle, cards } = legacy.data;
  if (!cards) {
    return {
      desktop: { sectionTitle, cards: undefined },
      mobile: { sectionTitle, cards: undefined },
    };
  }

  const desktopCards: ModelingCardsPayload = {};
  const mobileCards: ModelingCardsPayload = {};

  for (const key of MODELING_SLOT_LIST) {
    const c = cards[key];
    if (!c) continue;

    const shared: ModelingCardFields = {
      title: c.title,
      titleLine1: c.titleLine1,
      titleLine2: c.titleLine2,
    };

    const mobileLines =
      c.descriptionLinesMobile && c.descriptionLinesMobile.length > 0
        ? c.descriptionLinesMobile
        : c.descriptionLines;
    const desktopLines =
      c.descriptionLinesDesktop && c.descriptionLinesDesktop.length > 0
        ? c.descriptionLinesDesktop
        : c.descriptionLines;

    const hasMeta =
      shared.title != null ||
      shared.titleLine1 != null ||
      shared.titleLine2 != null;

    if (hasMeta || (mobileLines && mobileLines.length > 0)) {
      mobileCards[key] = {
        ...shared,
        ...(mobileLines && mobileLines.length > 0
          ? { descriptionLines: mobileLines }
          : {}),
      };
    }

    if (hasMeta || (desktopLines && desktopLines.length > 0)) {
      desktopCards[key] = {
        ...shared,
        ...(desktopLines && desktopLines.length > 0
          ? { descriptionLines: desktopLines }
          : {}),
      };
    }
  }

  return {
    desktop: {
      sectionTitle,
      cards:
        Object.keys(desktopCards).length > 0 ? desktopCards : undefined,
    },
    mobile: {
      sectionTitle,
      cards: Object.keys(mobileCards).length > 0 ? mobileCards : undefined,
    },
  };
}

function mergeModelingPayload(
  raw: unknown,
  defaults: ManagedHomeBundle["modeling"],
): ManagedHomeBundle["modeling"] {
  const parsed = modelingPayloadSchema.safeParse(raw);
  if (parsed.success) {
    const { desktop, mobile } = parsed.data;
    return {
      desktop: {
        sectionTitle: desktop.sectionTitle.trim()
          ? desktop.sectionTitle
          : defaults.desktop.sectionTitle,
        cards: mergeModelingCards(desktop.cards, defaults.desktop.cards),
      },
      mobile: {
        sectionTitle: mobile.sectionTitle.trim()
          ? mobile.sectionTitle
          : defaults.mobile.sectionTitle,
        cards: mergeModelingCards(mobile.cards, defaults.mobile.cards),
      },
    };
  }

  const migrated = migrateLegacyFlatModeling(raw);
  if (migrated) {
    return {
      desktop: {
        sectionTitle: migrated.desktop.sectionTitle,
        cards: mergeModelingCards(
          migrated.desktop.cards,
          defaults.desktop.cards,
        ),
      },
      mobile: {
        sectionTitle: migrated.mobile.sectionTitle,
        cards: mergeModelingCards(
          migrated.mobile.cards,
          defaults.mobile.cards,
        ),
      },
    };
  }

  if (raw != null) {
    const failed = modelingPayloadSchema.safeParse(raw);
    logger.info(
      `mergeModelingPayload: invalid modeling JSON in DB, using defaults: ${JSON.stringify(failed.error?.issues ?? [])}`,
    );
  }
  return defaults;
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
