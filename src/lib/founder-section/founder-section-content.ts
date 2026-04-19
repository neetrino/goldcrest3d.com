import { LANDING_IMAGES } from "@/constants/landing-assets";
import {
  DEFAULT_MANUFACTURING_IMAGE_TRANSFORM,
  parseManufacturingImageTransformFromLayoutMeta,
} from "@/lib/manufacturing-intelligence/manufacturing-image-transform";
import { resolveSiteMediaDisplayUrl } from "@/lib/site-media/resolve-display-url";
import type { SiteMediaItemRow } from "@/lib/site-media/site-media-prisma";
import { SITE_MEDIA_GROUP_KEYS } from "@/lib/site-media/site-media.registry";

import { FOUNDER_SECTION_COPY_KEYS } from "./founder-section-copy.keys";
import { FOUNDER_SECTION_MOBILE_COPY_KEYS } from "./founder-section-mobile-copy.keys";
import { getFounderSectionDefaultCopyMap } from "./get-founder-section-default-copy";
import { getFounderSectionMobileDefaultCopyMap } from "./get-founder-section-mobile-default-copy";
import type { FounderSectionContent } from "./founder-section.types";

type FounderCopyRow = {
  key: string;
  value: string;
};

const FOUNDER_IMAGE_SRC_FALLBACK = LANDING_IMAGES.founder;

export function getFounderDesktopMediaSlotId(): string {
  return "founder-desktop:image-main";
}

export function getFounderMobileMediaSlotId(): string {
  return "founder-mobile:image-main";
}

function resolveImageSrc(row: SiteMediaItemRow | undefined): string {
  const resolved = row?.r2ObjectKey ? resolveSiteMediaDisplayUrl(row.r2ObjectKey) : null;
  return resolved ?? FOUNDER_IMAGE_SRC_FALLBACK;
}

function buildFounderContent(
  copyRows: FounderCopyRow[],
  mediaRow: SiteMediaItemRow | undefined,
  keys: typeof FOUNDER_SECTION_COPY_KEYS | typeof FOUNDER_SECTION_MOBILE_COPY_KEYS,
  defaults: Map<string, string>,
): FounderSectionContent {
  const copyMap = new Map(defaults);
  for (const row of copyRows) {
    copyMap.set(row.key, row.value);
  }
  const bioP3 = copyMap.get("BIO_P3" in keys ? keys.BIO_P3 : keys.BIO_P1) ?? "";
  const bioP4 = copyMap.get("BIO_P4" in keys ? keys.BIO_P4 : keys.BIO_P2) ?? "";
  return {
    heading: copyMap.get(keys.HEADING) ?? "",
    name: copyMap.get(keys.NAME) ?? "",
    bioParagraphs: [
      copyMap.get(keys.BIO_P1) ?? "",
      copyMap.get(keys.BIO_P2) ?? "",
      bioP3,
      bioP4,
    ],
    stats: {
      yearsValue: copyMap.get(keys.STAT_YEARS_VALUE) ?? "",
      yearsCaption: copyMap.get(keys.STAT_YEARS_CAPTION) ?? "",
      projectsValue: copyMap.get(keys.STAT_PROJECTS_VALUE) ?? "",
      projectsCaption: copyMap.get(keys.STAT_PROJECTS_CAPTION) ?? "",
    },
    image: {
      src: resolveImageSrc(mediaRow),
      alt: mediaRow?.alt ?? copyMap.get(keys.IMAGE_ALT) ?? "Founder portrait",
      transform: mediaRow
        ? parseManufacturingImageTransformFromLayoutMeta(mediaRow.layoutMeta)
        : DEFAULT_MANUFACTURING_IMAGE_TRANSFORM,
    },
  };
}

export function buildFounderDesktopContent(
  copyRows: FounderCopyRow[],
  mediaRows: SiteMediaItemRow[],
): FounderSectionContent {
  const mediaRow = mediaRows.find(
    (row) =>
      row.sectionKey === SITE_MEDIA_GROUP_KEYS.FOUNDER_DESKTOP &&
      row.slotId === getFounderDesktopMediaSlotId(),
  );
  return buildFounderContent(
    copyRows,
    mediaRow,
    FOUNDER_SECTION_COPY_KEYS,
    getFounderSectionDefaultCopyMap(),
  );
}

export function buildFounderMobileContent(
  copyRows: FounderCopyRow[],
  mediaRows: SiteMediaItemRow[],
): FounderSectionContent {
  const mediaRow = mediaRows.find(
    (row) =>
      row.sectionKey === SITE_MEDIA_GROUP_KEYS.FOUNDER_MOBILE &&
      row.slotId === getFounderMobileMediaSlotId(),
  );
  return buildFounderContent(
    copyRows,
    mediaRow,
    FOUNDER_SECTION_MOBILE_COPY_KEYS,
    getFounderSectionMobileDefaultCopyMap(),
  );
}
