"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma/client";

import { requireAdminSession } from "@/auth";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { POWER_BANNER_DEFAULT_COPY } from "@/lib/power-banner-copy/power-banner-defaults";
import { POWER_BANNER_KEY_SET } from "@/lib/power-banner-copy/power-banner-keys";
import { finalizeHeroBannerBodyHtml } from "@/lib/power-banner-copy/sanitize-hero-banner-body";
import { deleteObjectFromR2, uploadSiteMediaToR2 } from "@/lib/storage";
import { validateSiteMediaImage } from "@/lib/validations/siteMediaImage";
import { isMigrationPendingError } from "@/lib/site-media/is-migration-pending-error";

import type { PowerBannerKey } from "@/lib/power-banner-copy/power-banner-keys";

export type PowerBannerHeroImageActionResult =
  | { ok: true }
  | { ok: false; error: string };

function revalidateHero(): void {
  revalidatePath("/admin/media");
  revalidatePath("/");
}

async function requireAdmin(): Promise<PowerBannerHeroImageActionResult | null> {
  const session = await requireAdminSession();
  if (!session) {
    return { ok: false, error: "Unauthorized." };
  }
  return null;
}

function parseBannerKey(raw: unknown): PowerBannerKey | null {
  if (typeof raw !== "string" || !POWER_BANNER_KEY_SET.has(raw)) {
    return null;
  }
  return raw as PowerBannerKey;
}

export async function uploadPowerBannerHeroImage(
  _prev: PowerBannerHeroImageActionResult | null,
  formData: FormData,
): Promise<PowerBannerHeroImageActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const bannerKey = parseBannerKey(formData.get("bannerKey"));
  if (!bannerKey) {
    return { ok: false, error: "Invalid banner." };
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
    const existing = await prisma.powerBannerCopy.findUnique({
      where: { bannerKey },
    });
    if (existing?.r2ObjectKey && existing.r2ObjectKey !== newKey) {
      await deleteObjectFromR2(existing.r2ObjectKey);
    }

    const defaults = POWER_BANNER_DEFAULT_COPY[bannerKey];
    await prisma.powerBannerCopy.upsert({
      where: { bannerKey },
      create: {
        bannerKey,
        title: defaults.title,
        body: finalizeHeroBannerBodyHtml(defaults.body),
        r2ObjectKey: newKey,
      },
      update: {
        r2ObjectKey: newKey,
        heroImageLayout: Prisma.DbNull as unknown as Prisma.InputJsonValue,
      },
    });
  } catch (e) {
    logger.error("uploadPowerBannerHeroImage: failed", e);
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

  revalidateHero();
  return { ok: true };
}

export async function clearPowerBannerHeroImage(
  _prev: PowerBannerHeroImageActionResult | null,
  formData: FormData,
): Promise<PowerBannerHeroImageActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const bannerKey = parseBannerKey(formData.get("bannerKey"));
  if (!bannerKey) {
    return { ok: false, error: "Invalid banner." };
  }

  try {
    const existing = await prisma.powerBannerCopy.findUnique({
      where: { bannerKey },
    });
    if (!existing?.r2ObjectKey) {
      revalidateHero();
      return { ok: true };
    }
    await deleteObjectFromR2(existing.r2ObjectKey);
    await prisma.powerBannerCopy.update({
      where: { bannerKey },
      data: {
        r2ObjectKey: null,
        heroImageLayout: Prisma.DbNull as unknown as Prisma.InputJsonValue,
      },
    });
  } catch (e) {
    logger.error("clearPowerBannerHeroImage: failed", e);
    if (isMigrationPendingError(e)) {
      return {
        ok: false,
        error:
          "Database schema is out of date. Run: pnpm prisma migrate deploy (or migrate dev locally), then try again.",
      };
    }
    return { ok: false, error: "Could not reset image. Try again." };
  }

  revalidateHero();
  return { ok: true };
}
