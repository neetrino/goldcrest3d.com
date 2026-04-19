"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/auth";
import { MANUFACTURING_SPECIALIZATION_ITEMS } from "@/constants/manufacturing-specialization";
import { prisma } from "@/lib/db";
import {
  DEFAULT_MANUFACTURING_IMAGE_TRANSFORM,
  normalizeManufacturingImageTransform,
} from "@/lib/manufacturing-intelligence/manufacturing-image-transform";
import { manufacturingIntelligenceCopy } from "@/lib/manufacturing-intelligence-copy/manufacturing-intelligence-copy-prisma";
import {
  getManufacturingItemDescriptionKey,
  getManufacturingItemTitleKey,
  MANUFACTURING_SECTION_COPY_KEYS,
} from "@/lib/manufacturing-intelligence-copy/manufacturing-intelligence-copy.keys";
import { logger } from "@/lib/logger";
import { modelingSpecializationCopy } from "@/lib/modeling-specialization-copy/modeling-specialization-copy-prisma";
import { normalizeModelingSpecializationCopyPayload } from "@/lib/modeling-specialization-copy/normalize-modeling-specialization-copy";
import { siteMediaItem } from "@/lib/site-media/site-media-prisma";
import {
  SITE_MEDIA_GROUP_KEYS,
  MODELING_SLOT_KEYS,
  type ModelingSlotKey,
  type SiteMediaGroupKey,
} from "@/lib/site-media/site-media.registry";
import {
  deleteObjectFromR2,
  uploadModelingMobileImageToR2,
  uploadSiteMediaToR2,
} from "@/lib/storage";
import { validateSiteMediaImage } from "@/lib/validations/siteMediaImage";
import {
  POWER_BANNER_KEY_SET,
  POWER_BANNER_KEYS,
  POWER_BANNER_SLOT_IDS,
  type PowerBannerKey,
  type PowerBannerViewport,
  POWER_BANNER_VIEWPORT_SET,
} from "@/lib/power-banner-copy/power-banner-keys";
import {
  manufacturingIntelligenceHeadingFormSchema,
  manufacturingIntelligenceItemFormSchema,
} from "@/lib/validations/manufacturingIntelligenceItem";
import { modelingSpecializationCopyFormSchema } from "@/lib/validations/modelingSpecializationCopy";

const MODELING_SLOT_SET = new Set<string>(Object.values(MODELING_SLOT_KEYS));
const MANUFACTURING_SLOT_SET = new Set<string>(
  MANUFACTURING_SPECIALIZATION_ITEMS.map((item) => item.id),
);
const MANUFACTURING_SORT_ORDER = new Map<string, number>(
  MANUFACTURING_SPECIALIZATION_ITEMS.map((item, index) => [item.id, index]),
);

export type ModelingSlotImageVariant = "desktop" | "mobile";
export type HeroBannerImageVariant = "desktop" | "mobile";

const ORDERED_GROUPS = new Set<SiteMediaGroupKey>([
  SITE_MEDIA_GROUP_KEYS.FINISHED_CREATIONS_ROW1,
  SITE_MEDIA_GROUP_KEYS.FINISHED_CREATIONS_ROW2,
]);

const MAX_ORDERED_ITEMS = 12;
const HERO_BANNER_SORT_ORDER = new Map<string, number>(
  POWER_BANNER_KEYS.map((key, index) => [key, index]),
);

export type SiteMediaActionResult =
  | { ok: true }
  | { ok: false; error: string };

function revalidateSite() {
  revalidatePath("/admin/media");
  revalidatePath("/");
}

async function requireAdmin(): Promise<SiteMediaActionResult | null> {
  const session = await requireAdminSession();
  if (!session) {
    return { ok: false, error: "Unauthorized." };
  }
  return null;
}

export async function upsertModelingSlotImage(
  slotKey: string,
  variant: ModelingSlotImageVariant,
  formData: FormData,
): Promise<SiteMediaActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (!MODELING_SLOT_SET.has(slotKey)) {
    return { ok: false, error: "Invalid slot." };
  }
  if (variant !== "desktop" && variant !== "mobile") {
    return { ok: false, error: "Invalid variant." };
  }
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Choose an image file." };
  }
  const err = validateSiteMediaImage(file);
  if (err) return { ok: false, error: err };

  const isDesktop = variant === "desktop";
  const newKey = isDesktop
    ? await uploadSiteMediaToR2(file)
    : await uploadModelingMobileImageToR2(file);
  if (!newKey) {
    return {
      ok: false,
      error: isDesktop
        ? "Upload failed. Check R2 configuration."
        : "Upload failed. The image could not be processed (try PNG, JPEG, or WebP) or R2 is misconfigured.",
    };
  }

  const typedSlot = slotKey as ModelingSlotKey;
  try {
    const existing = await siteMediaItem.findUnique({
      where: { slotId: typedSlot },
    });

    if (existing) {
      const oldKey = isDesktop ? existing.r2ObjectKey : existing.r2ObjectKeyMobile;
      if (oldKey) {
        await deleteObjectFromR2(oldKey);
      }
      await siteMediaItem.update({
        where: { id: existing.id },
        data: isDesktop
          ? { r2ObjectKey: newKey }
          : { r2ObjectKeyMobile: newKey },
      });
    } else {
      await siteMediaItem.create({
        data: {
          sectionKey: SITE_MEDIA_GROUP_KEYS.MODELING_SPECIALIZATION,
          slotId: typedSlot,
          sortOrder: 0,
          r2ObjectKey: isDesktop ? newKey : null,
          r2ObjectKeyMobile: isDesktop ? null : newKey,
        },
      });
    }
  } catch (e) {
    logger.error("upsertModelingSlotImage", e);
    await deleteObjectFromR2(newKey);
    return { ok: false, error: "Could not save metadata." };
  }

  revalidateSite();
  return { ok: true };
}

export async function updateModelingSlotCopy(
  _prev: SiteMediaActionResult | null,
  formData: FormData,
): Promise<SiteMediaActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const parsed = modelingSpecializationCopyFormSchema.safeParse({
    slotKey: formData.get("slotKey"),
    titleDesktop: formData.get("titleDesktop"),
    titleMobile: formData.get("titleMobile"),
    bodyDesktop: formData.get("bodyDesktop"),
    bodyMobile: formData.get("bodyMobile"),
    desktopLine1Emphasis: formData.get("desktopLine1Emphasis"),
  });
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      error:
        fieldErrors.slotKey?.[0] ??
        fieldErrors.titleDesktop?.[0] ??
        fieldErrors.titleMobile?.[0] ??
        fieldErrors.bodyDesktop?.[0] ??
        fieldErrors.bodyMobile?.[0] ??
        fieldErrors.desktopLine1Emphasis?.[0] ??
        "Invalid input.",
    };
  }

  const payload = normalizeModelingSpecializationCopyPayload({
    titleDesktop: parsed.data.titleDesktop,
    titleMobile: parsed.data.titleMobile,
    bodyDesktop: parsed.data.bodyDesktop,
    bodyMobile: parsed.data.bodyMobile,
    desktopLine1Emphasis: parsed.data.desktopLine1Emphasis,
  });

  try {
    await modelingSpecializationCopy.upsert({
      where: { slotKey: parsed.data.slotKey },
      create: {
        slotKey: parsed.data.slotKey,
        ...payload,
      },
      update: {
        titleDesktop: payload.titleDesktop,
        titleMobile: payload.titleMobile,
        bodyDesktop: payload.bodyDesktop,
        bodyMobile: payload.bodyMobile,
        desktopLine1Emphasis: payload.desktopLine1Emphasis,
      },
    });
  } catch (e) {
    logger.error("updateModelingSlotCopy", e);
    return { ok: false, error: "Could not save text content." };
  }

  revalidateSite();
  return { ok: true };
}

export async function upsertManufacturingIntelligenceImage(
  itemId: string,
  formData: FormData,
): Promise<SiteMediaActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;
  if (!MANUFACTURING_SLOT_SET.has(itemId)) {
    return { ok: false, error: "Invalid manufacturing item." };
  }
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Choose an image file." };
  }
  const err = validateSiteMediaImage(file);
  if (err) return { ok: false, error: err };

  const newKey = await uploadSiteMediaToR2(file);
  if (!newKey) {
    return { ok: false, error: "Upload failed. Check R2 configuration." };
  }

  try {
    const existing = await siteMediaItem.findUnique({ where: { slotId: itemId } });
    if (existing) {
      if (existing.r2ObjectKey) {
        await deleteObjectFromR2(existing.r2ObjectKey);
      }
      await siteMediaItem.update({
        where: { id: existing.id },
        data: {
          sectionKey: SITE_MEDIA_GROUP_KEYS.MANUFACTURING_INTELLIGENCE,
          r2ObjectKey: newKey,
        },
      });
    } else {
      await siteMediaItem.create({
        data: {
          sectionKey: SITE_MEDIA_GROUP_KEYS.MANUFACTURING_INTELLIGENCE,
          slotId: itemId,
          sortOrder: MANUFACTURING_SORT_ORDER.get(itemId) ?? 0,
          r2ObjectKey: newKey,
          layoutMeta: DEFAULT_MANUFACTURING_IMAGE_TRANSFORM,
        },
      });
    }
  } catch (e) {
    logger.error("upsertManufacturingIntelligenceImage", e);
    await deleteObjectFromR2(newKey);
    return { ok: false, error: "Could not save metadata." };
  }

  revalidateSite();
  return { ok: true };
}

export async function upsertHeroBannerImage(
  bannerKey: string,
  viewport: HeroBannerImageVariant,
  formData: FormData,
): Promise<SiteMediaActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (!POWER_BANNER_KEY_SET.has(bannerKey)) {
    return { ok: false, error: "Invalid hero banner." };
  }
  if (!POWER_BANNER_VIEWPORT_SET.has(viewport)) {
    return { ok: false, error: "Invalid image viewport." };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Choose an image file." };
  }
  const err = validateSiteMediaImage(file);
  if (err) return { ok: false, error: err };

  const newKey = await uploadSiteMediaToR2(file);
  if (!newKey) {
    return { ok: false, error: "Upload failed. Check R2 configuration." };
  }

  const typedKey = bannerKey as PowerBannerKey;
  const typedViewport = viewport as PowerBannerViewport;
  const slotId = POWER_BANNER_SLOT_IDS[typedViewport][typedKey];

  try {
    const existing = await siteMediaItem.findUnique({ where: { slotId } });
    if (existing) {
      if (existing.r2ObjectKey) {
        await deleteObjectFromR2(existing.r2ObjectKey);
      }
      await siteMediaItem.update({
        where: { id: existing.id },
        data: {
          sectionKey: SITE_MEDIA_GROUP_KEYS.HERO_BANNERS,
          r2ObjectKey: newKey,
          r2ObjectKeyMobile: null,
        },
      });
    } else {
      await siteMediaItem.create({
        data: {
          sectionKey: SITE_MEDIA_GROUP_KEYS.HERO_BANNERS,
          slotId,
          sortOrder: HERO_BANNER_SORT_ORDER.get(typedKey) ?? 0,
          r2ObjectKey: newKey,
          r2ObjectKeyMobile: null,
        },
      });
    }
  } catch (e) {
    logger.error("upsertHeroBannerImage", e);
    await deleteObjectFromR2(newKey);
    return { ok: false, error: "Could not save metadata." };
  }

  revalidateSite();
  return { ok: true };
}

export async function updateManufacturingIntelligenceHeadings(
  _prev: SiteMediaActionResult | null,
  formData: FormData,
): Promise<SiteMediaActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;
  const parsed = manufacturingIntelligenceHeadingFormSchema.safeParse({
    desktopHeading: formData.get("desktopHeading"),
    mobileHeading: formData.get("mobileHeading"),
    desktopHeadingKey: formData.get("desktopHeadingKey"),
    mobileHeadingKey: formData.get("mobileHeadingKey"),
  });
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      error:
        fieldErrors.desktopHeading?.[0] ??
        fieldErrors.mobileHeading?.[0] ??
        "Invalid heading values.",
    };
  }
  try {
    await manufacturingIntelligenceCopy.upsert({
      where: { key: MANUFACTURING_SECTION_COPY_KEYS.HEADING_DESKTOP },
      create: {
        key: MANUFACTURING_SECTION_COPY_KEYS.HEADING_DESKTOP,
        value: parsed.data.desktopHeading,
      },
      update: { value: parsed.data.desktopHeading },
    });
    await manufacturingIntelligenceCopy.upsert({
      where: { key: MANUFACTURING_SECTION_COPY_KEYS.HEADING_MOBILE },
      create: {
        key: MANUFACTURING_SECTION_COPY_KEYS.HEADING_MOBILE,
        value: parsed.data.mobileHeading,
      },
      update: { value: parsed.data.mobileHeading },
    });
  } catch (e) {
    logger.error("updateManufacturingIntelligenceHeadings", e);
    return { ok: false, error: "Could not save headings." };
  }
  revalidateSite();
  return { ok: true };
}

export async function updateManufacturingIntelligenceItem(
  _prev: SiteMediaActionResult | null,
  formData: FormData,
): Promise<SiteMediaActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const parsed = manufacturingIntelligenceItemFormSchema.safeParse({
    itemId: formData.get("itemId"),
    title: formData.get("title"),
    description: formData.get("description"),
    imageAlt: formData.get("imageAlt"),
    zoom: formData.get("zoom"),
    offsetX: formData.get("offsetX"),
    offsetY: formData.get("offsetY"),
  });
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      error:
        fieldErrors.itemId?.[0] ??
        fieldErrors.title?.[0] ??
        fieldErrors.description?.[0] ??
        fieldErrors.imageAlt?.[0] ??
        fieldErrors.zoom?.[0] ??
        fieldErrors.offsetX?.[0] ??
        fieldErrors.offsetY?.[0] ??
        "Invalid input.",
    };
  }

  const { itemId, title, description, imageAlt } = parsed.data;
  const transform = normalizeManufacturingImageTransform({
    zoom: parsed.data.zoom,
    offsetX: parsed.data.offsetX,
    offsetY: parsed.data.offsetY,
  });

  try {
    await prisma.$transaction(async (tx) => {
      const transactionalClient = tx as typeof tx & {
        siteMediaItem: typeof siteMediaItem;
        manufacturingIntelligenceCopy: {
          upsert: (args: object) => Promise<unknown>;
        };
      };
      await transactionalClient.manufacturingIntelligenceCopy.upsert({
        where: { key: getManufacturingItemTitleKey(itemId) },
        create: { key: getManufacturingItemTitleKey(itemId), value: title },
        update: { value: title },
      });
      await transactionalClient.manufacturingIntelligenceCopy.upsert({
        where: { key: getManufacturingItemDescriptionKey(itemId) },
        create: { key: getManufacturingItemDescriptionKey(itemId), value: description },
        update: { value: description },
      });
      const existing = await transactionalClient.siteMediaItem.findUnique({
        where: { slotId: itemId },
      });
      if (existing) {
        await transactionalClient.siteMediaItem.update({
          where: { id: existing.id },
          data: {
            sectionKey: SITE_MEDIA_GROUP_KEYS.MANUFACTURING_INTELLIGENCE,
            alt: imageAlt,
            layoutMeta: transform,
          },
        });
      } else {
        await transactionalClient.siteMediaItem.create({
          data: {
            sectionKey: SITE_MEDIA_GROUP_KEYS.MANUFACTURING_INTELLIGENCE,
            slotId: itemId,
            sortOrder: MANUFACTURING_SORT_ORDER.get(itemId) ?? 0,
            alt: imageAlt,
            layoutMeta: transform,
          },
        });
      }
    });
  } catch (e) {
    logger.error("updateManufacturingIntelligenceItem", e);
    return { ok: false, error: "Could not save manufacturing content." };
  }

  revalidateSite();
  return { ok: true };
}

export async function addOrderedGalleryImage(
  groupKey: SiteMediaGroupKey,
  formData: FormData,
): Promise<SiteMediaActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (!ORDERED_GROUPS.has(groupKey)) {
    return { ok: false, error: "Invalid group." };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Choose an image file." };
  }
  const err = validateSiteMediaImage(file);
  if (err) return { ok: false, error: err };

  const count = await siteMediaItem.count({ where: { sectionKey: groupKey } });
  if (count >= MAX_ORDERED_ITEMS) {
    return { ok: false, error: `Maximum ${MAX_ORDERED_ITEMS} images in this row.` };
  }

  const newKey = await uploadSiteMediaToR2(file);
  if (!newKey) {
    return { ok: false, error: "Upload failed. Check R2 configuration." };
  }

  const slotId = crypto.randomUUID();
  try {
    await siteMediaItem.create({
      data: {
        sectionKey: groupKey,
        slotId,
        sortOrder: count,
        r2ObjectKey: newKey,
      },
    });
  } catch (e) {
    logger.error("addOrderedGalleryImage", e);
    await deleteObjectFromR2(newKey);
    return { ok: false, error: "Could not save metadata." };
  }

  revalidateSite();
  return { ok: true };
}

export async function replaceOrderedGalleryImage(
  id: string,
  formData: FormData,
): Promise<SiteMediaActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Choose an image file." };
  }
  const err = validateSiteMediaImage(file);
  if (err) return { ok: false, error: err };

  const existing = await siteMediaItem.findUnique({ where: { id } });
  if (!existing || !ORDERED_GROUPS.has(existing.sectionKey as SiteMediaGroupKey)) {
    return { ok: false, error: "Item not found." };
  }

  const newKey = await uploadSiteMediaToR2(file);
  if (!newKey) {
    return { ok: false, error: "Upload failed. Check R2 configuration." };
  }

  try {
    if (existing.r2ObjectKey) {
      await deleteObjectFromR2(existing.r2ObjectKey);
    }
    await siteMediaItem.update({
      where: { id },
      data: { r2ObjectKey: newKey },
    });
  } catch (e) {
    logger.error("replaceOrderedGalleryImage", e);
    await deleteObjectFromR2(newKey);
    return { ok: false, error: "Could not update image." };
  }

  revalidateSite();
  return { ok: true };
}

export async function deleteOrderedGalleryImage(
  id: string,
): Promise<SiteMediaActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const existing = await siteMediaItem.findUnique({ where: { id } });
  if (!existing || !ORDERED_GROUPS.has(existing.sectionKey as SiteMediaGroupKey)) {
    return { ok: false, error: "Item not found." };
  }

  try {
    await siteMediaItem.delete({ where: { id } });
    if (existing.r2ObjectKey) {
      await deleteObjectFromR2(existing.r2ObjectKey);
    }
    const rest = await siteMediaItem.findMany({
      where: { sectionKey: existing.sectionKey },
      orderBy: { sortOrder: "asc" },
    });
    await prisma.$transaction(async (tx) => {
      const sm = tx as typeof tx & { siteMediaItem: typeof siteMediaItem };
      for (let index = 0; index < rest.length; index++) {
        const row = rest[index];
        if (!row) continue;
        await sm.siteMediaItem.update({
          where: { id: row.id },
          data: { sortOrder: index },
        });
      }
    });
  } catch (e) {
    logger.error("deleteOrderedGalleryImage", e);
    return { ok: false, error: "Could not delete image." };
  }

  revalidateSite();
  return { ok: true };
}

export async function reorderOrderedGallery(
  groupKey: SiteMediaGroupKey,
  orderedIds: string[],
): Promise<SiteMediaActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (!ORDERED_GROUPS.has(groupKey)) {
    return { ok: false, error: "Invalid group." };
  }

  const existing = await siteMediaItem.findMany({
    where: { sectionKey: groupKey },
  });
  if (orderedIds.length !== existing.length) {
    return { ok: false, error: "Order list does not match items." };
  }
  const idSet = new Set(existing.map((r) => r.id));
  for (const id of orderedIds) {
    if (!idSet.has(id)) {
      return { ok: false, error: "Invalid item id in order." };
    }
  }

  try {
    await prisma.$transaction(async (tx) => {
      const sm = tx as typeof tx & { siteMediaItem: typeof siteMediaItem };
      for (let index = 0; index < orderedIds.length; index++) {
        const id = orderedIds[index];
        if (id === undefined) continue;
        await sm.siteMediaItem.update({
          where: { id },
          data: { sortOrder: index },
        });
      }
    });
  } catch (e) {
    logger.error("reorderOrderedGallery", e);
    return { ok: false, error: "Could not save order." };
  }

  revalidateSite();
  return { ok: true };
}
