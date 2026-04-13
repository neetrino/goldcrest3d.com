"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma/client";

import { requireAdminSession } from "@/auth";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import {
  clampImageFraming,
  type ImageFraming,
} from "@/lib/site-media/image-framing";
import { isMigrationPendingError } from "@/lib/site-media/is-migration-pending-error";
import { POWER_BANNER_KEY_SET } from "@/lib/power-banner-copy/power-banner-keys";

import type { PowerBannerKey } from "@/lib/power-banner-copy/power-banner-keys";

export type PowerBannerHeroFramingActionResult =
  | { ok: true }
  | { ok: false; error: string };

function revalidateHero(): void {
  revalidatePath("/admin/media");
  revalidatePath("/");
}

async function requireAdmin(): Promise<PowerBannerHeroFramingActionResult | null> {
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

function parseFramingFromForm(formData: FormData): ImageFraming | null {
  const rawX = formData.get("focusX");
  const rawY = formData.get("focusY");
  const rawZ = formData.get("zoom");
  if (typeof rawX !== "string" || typeof rawY !== "string" || typeof rawZ !== "string") {
    return null;
  }
  return clampImageFraming({
    focusX: Number.parseFloat(rawX),
    focusY: Number.parseFloat(rawY),
    zoom: Number.parseFloat(rawZ),
  });
}

export async function savePowerBannerHeroFraming(
  _prev: PowerBannerHeroFramingActionResult | null,
  formData: FormData,
): Promise<PowerBannerHeroFramingActionResult | null> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const bannerKey = parseBannerKey(formData.get("bannerKey"));
  if (!bannerKey) {
    return { ok: false, error: "Invalid banner." };
  }
  const framing = parseFramingFromForm(formData);
  if (!framing) {
    return { ok: false, error: "Invalid framing values." };
  }

  try {
    const row = await prisma.powerBannerCopy.findUnique({ where: { bannerKey } });
    if (!row?.r2ObjectKey) {
      return { ok: false, error: "Upload a custom hero image before adjusting framing." };
    }
    await prisma.powerBannerCopy.update({
      where: { bannerKey },
      data: { heroImageLayout: framing as object },
    });
  } catch (e) {
    logger.error("savePowerBannerHeroFraming", e);
    if (isMigrationPendingError(e)) {
      return {
        ok: false,
        error:
          "Database schema is out of date. Run: pnpm prisma migrate deploy (or migrate dev locally), then try again.",
      };
    }
    return { ok: false, error: "Could not save framing." };
  }

  revalidateHero();
  return { ok: true };
}

export async function resetPowerBannerHeroFraming(
  _prev: PowerBannerHeroFramingActionResult | null,
  formData: FormData,
): Promise<PowerBannerHeroFramingActionResult | null> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const bannerKey = parseBannerKey(formData.get("bannerKey"));
  if (!bannerKey) {
    return { ok: false, error: "Invalid banner." };
  }

  try {
    await prisma.powerBannerCopy.update({
      where: { bannerKey },
      data: {
        heroImageLayout: Prisma.DbNull as unknown as Prisma.InputJsonValue,
      },
    });
  } catch (e) {
    logger.error("resetPowerBannerHeroFraming", e);
    if (isMigrationPendingError(e)) {
      return {
        ok: false,
        error:
          "Database schema is out of date. Run: pnpm prisma migrate deploy (or migrate dev locally), then try again.",
      };
    }
    return { ok: false, error: "Could not reset framing." };
  }

  revalidateHero();
  return { ok: true };
}
