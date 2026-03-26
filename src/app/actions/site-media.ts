"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/auth";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { siteMediaItem } from "@/lib/site-media/site-media-prisma";
import {
  SITE_MEDIA_GROUP_KEYS,
  MODELING_SLOT_KEYS,
  type ModelingSlotKey,
  type SiteMediaGroupKey,
} from "@/lib/site-media/site-media.registry";
import { deleteObjectFromR2, uploadSiteMediaToR2 } from "@/lib/storage";
import { validateSiteMediaImage } from "@/lib/validations/siteMediaImage";

const MODELING_SLOT_SET = new Set<string>(Object.values(MODELING_SLOT_KEYS));

const ORDERED_GROUPS = new Set<SiteMediaGroupKey>([
  SITE_MEDIA_GROUP_KEYS.FINISHED_CREATIONS_ROW1,
  SITE_MEDIA_GROUP_KEYS.FINISHED_CREATIONS_ROW2,
]);

const MAX_ORDERED_ITEMS = 12;

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
  formData: FormData,
): Promise<SiteMediaActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (!MODELING_SLOT_SET.has(slotKey)) {
    return { ok: false, error: "Invalid slot." };
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

  const typedSlot = slotKey as ModelingSlotKey;
  try {
    const existing = await siteMediaItem.findUnique({
      where: { slotId: typedSlot },
    });

    if (existing) {
      if (existing.r2ObjectKey) {
        await deleteObjectFromR2(existing.r2ObjectKey);
      }
      await siteMediaItem.update({
        where: { id: existing.id },
        data: { r2ObjectKey: newKey },
      });
    } else {
      await siteMediaItem.create({
        data: {
          sectionKey: SITE_MEDIA_GROUP_KEYS.MODELING_SPECIALIZATION,
          slotId: typedSlot,
          sortOrder: 0,
          r2ObjectKey: newKey,
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
