"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma/client";

import { requireAdminSession } from "@/auth";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { POWER_BANNER_DEFAULT_COPY } from "@/lib/power-banner-copy/power-banner-defaults";
import { POWER_BANNER_KEY_SET } from "@/lib/power-banner-copy/power-banner-keys";
import { finalizeHeroBannerBodyHtml } from "@/lib/power-banner-copy/sanitize-hero-banner-body";
import {
  clampImageFraming,
  type ImageFraming,
} from "@/lib/site-media/image-framing";
import { isMigrationPendingError } from "@/lib/site-media/is-migration-pending-error";

import type { PowerBannerKey } from "@/lib/power-banner-copy/power-banner-keys";

export type PowerBannerMobileHeroFramingActionResult =
  | { ok: true }
  | { ok: false; error: string };

const MOBILE_HERO_FRAME_WIDTH = 390;
const MOBILE_HERO_FRAME_HEIGHT = 679;

function revalidateHero(): void {
  revalidatePath("/admin/media");
  revalidatePath("/");
}

async function requireAdmin(): Promise<PowerBannerMobileHeroFramingActionResult | null> {
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

export async function savePowerBannerMobileHeroFraming(
  _prev: PowerBannerMobileHeroFramingActionResult | null,
  formData: FormData,
): Promise<PowerBannerMobileHeroFramingActionResult | null> {
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
    const defaults = POWER_BANNER_DEFAULT_COPY[bannerKey];
    await prisma.powerBannerCopy.upsert({
      where: { bannerKey },
      create: {
        bannerKey,
        title: defaults.title,
        body: finalizeHeroBannerBodyHtml(defaults.body),
        heroImageLayoutMobile: {
          focusX: framing.focusX,
          focusY: framing.focusY,
          zoom: framing.zoom,
          mobilePositionX: framing.focusX,
          mobilePositionY: framing.focusY,
          mobileScale: framing.zoom,
          mobileFrameWidth: MOBILE_HERO_FRAME_WIDTH,
          mobileFrameHeight: MOBILE_HERO_FRAME_HEIGHT,
        } as object,
      },
      update: {
        heroImageLayoutMobile: {
          focusX: framing.focusX,
          focusY: framing.focusY,
          zoom: framing.zoom,
          mobilePositionX: framing.focusX,
          mobilePositionY: framing.focusY,
          mobileScale: framing.zoom,
          mobileFrameWidth: MOBILE_HERO_FRAME_WIDTH,
          mobileFrameHeight: MOBILE_HERO_FRAME_HEIGHT,
        } as object,
      },
    });
  } catch (e) {
    logger.error("savePowerBannerMobileHeroFraming", e);
    if (isMigrationPendingError(e)) {
      return {
        ok: false,
        error:
          "Database schema is out of date. Run: pnpm prisma migrate deploy (or migrate dev locally), then try again.",
      };
    }
    return { ok: false, error: "Could not save mobile framing." };
  }

  revalidateHero();
  return { ok: true };
}

export async function resetPowerBannerMobileHeroFraming(
  _prev: PowerBannerMobileHeroFramingActionResult | null,
  formData: FormData,
): Promise<PowerBannerMobileHeroFramingActionResult | null> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const bannerKey = parseBannerKey(formData.get("bannerKey"));
  if (!bannerKey) {
    return { ok: false, error: "Invalid banner." };
  }

  try {
    const row = await prisma.powerBannerCopy.findUnique({ where: { bannerKey } });
    if (!row) {
      revalidateHero();
      return { ok: true };
    }
    await prisma.powerBannerCopy.update({
      where: { bannerKey },
      data: {
        heroImageLayoutMobile: Prisma.DbNull as unknown as Prisma.InputJsonValue,
      },
    });
  } catch (e) {
    logger.error("resetPowerBannerMobileHeroFraming", e);
    if (isMigrationPendingError(e)) {
      return {
        ok: false,
        error:
          "Database schema is out of date. Run: pnpm prisma migrate deploy (or migrate dev locally), then try again.",
      };
    }
    return { ok: false, error: "Could not reset mobile framing." };
  }

  revalidateHero();
  return { ok: true };
}
