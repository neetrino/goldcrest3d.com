"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma/client";

import { requireAdminSession } from "@/auth";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { deleteObjectFromR2, uploadSiteMediaToR2 } from "@/lib/storage";
import { validateSiteMediaImage } from "@/lib/validations/siteMediaImage";
import { isMigrationPendingError } from "@/lib/site-media/is-migration-pending-error";
import { FOUNDER_SECTION_ID } from "@/lib/founder-section/founder-section-id";
import { FOUNDER_SECTION_DEFAULT_NAME, FOUNDER_SECTION_DEFAULT_BODY } from "@/lib/founder-section/founder-section-defaults";

export type FounderSectionImageActionResult =
  | { ok: true }
  | { ok: false; error: string };

function revalidateFounderSection(): void {
  revalidatePath("/admin/media");
  revalidatePath("/");
}

async function requireAdmin(): Promise<FounderSectionImageActionResult | null> {
  const session = await requireAdminSession();
  if (!session) {
    return { ok: false, error: "Unauthorized." };
  }
  return null;
}

export async function uploadFounderSectionImage(
  _prev: FounderSectionImageActionResult | null,
  formData: FormData,
): Promise<FounderSectionImageActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

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
    const existing = await prisma.founderSectionCopy.findUnique({
      where: { id: FOUNDER_SECTION_ID },
    });
    if (existing?.r2ObjectKey && existing.r2ObjectKey !== newKey) {
      await deleteObjectFromR2(existing.r2ObjectKey);
    }

    await prisma.founderSectionCopy.upsert({
      where: { id: FOUNDER_SECTION_ID },
      create: {
        id: FOUNDER_SECTION_ID,
        name: FOUNDER_SECTION_DEFAULT_NAME,
        body: FOUNDER_SECTION_DEFAULT_BODY,
        r2ObjectKey: newKey,
      },
      update: {
        r2ObjectKey: newKey,
        heroImageLayout: Prisma.DbNull as unknown as Prisma.InputJsonValue,
      },
    });
  } catch (e) {
    logger.error("uploadFounderSectionImage: failed", e);
    await deleteObjectFromR2(newKey);
    if (isMigrationPendingError(e)) {
      return {
        ok: false,
        error:
          "Database schema is out of date. Run: pnpm prisma migrate deploy (or migrate dev locally), then try again.",
      };
    }
    return { ok: false, error: "Could not save. Try again." };
  }

  revalidateFounderSection();
  return { ok: true };
}

export async function clearFounderSectionImage(
  _prev: FounderSectionImageActionResult | null,
  _formData: FormData,
): Promise<FounderSectionImageActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const existing = await prisma.founderSectionCopy.findUnique({
      where: { id: FOUNDER_SECTION_ID },
    });
    if (!existing?.r2ObjectKey) {
      revalidateFounderSection();
      return { ok: true };
    }
    await deleteObjectFromR2(existing.r2ObjectKey);
    await prisma.founderSectionCopy.update({
      where: { id: FOUNDER_SECTION_ID },
      data: {
        r2ObjectKey: null,
        heroImageLayout: Prisma.DbNull as unknown as Prisma.InputJsonValue,
      },
    });
  } catch (e) {
    logger.error("clearFounderSectionImage: failed", e);
    if (isMigrationPendingError(e)) {
      return {
        ok: false,
        error:
          "Database schema is out of date. Run: pnpm prisma migrate deploy (or migrate dev locally), then try again.",
      };
    }
    return { ok: false, error: "Could not reset image. Try again." };
  }

  revalidateFounderSection();
  return { ok: true };
}
