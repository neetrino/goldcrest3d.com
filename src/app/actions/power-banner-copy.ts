"use server";

import { revalidatePath } from "next/cache";

import { requireAdminSession } from "@/auth";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import {
  POWER_BANNER_KEYS,
  POWER_BANNER_SLOT_IDS,
  type PowerBannerKey,
  type PowerBannerViewport,
} from "@/lib/power-banner-copy/power-banner-keys";
import { POWER_BANNER_DEFAULT_TRANSFORMS } from "@/lib/power-banner-copy/power-banner-defaults";
import { isMigrationPendingError } from "@/lib/site-media/is-migration-pending-error";
import { siteMediaItem } from "@/lib/site-media/site-media-prisma";
import { SITE_MEDIA_GROUP_KEYS } from "@/lib/site-media/site-media.registry";
import { powerBannerCopyFormSchema } from "@/lib/validations/powerBannerCopy";

export type PowerBannerCopyActionResult =
  | { ok: true }
  | { ok: false; error: string };

function revalidateHeroCopy(): void {
  revalidatePath("/admin/media");
  revalidatePath("/");
}

async function requireAdmin(): Promise<PowerBannerCopyActionResult | null> {
  const session = await requireAdminSession();
  if (!session) {
    return { ok: false, error: "Unauthorized." };
  }
  return null;
}

/**
 * Server action — compatible with `useActionState` (prevState, formData).
 */
export async function updatePowerBannerCopy(
  _prev: PowerBannerCopyActionResult | null,
  formData: FormData,
): Promise<PowerBannerCopyActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const parsed = powerBannerCopyFormSchema.safeParse({
    bannerKey: formData.get("bannerKey"),
    viewport: formData.get("viewport"),
    title: formData.get("title"),
    body: formData.get("body"),
  });

  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      first.bannerKey?.[0] ??
      first.viewport?.[0] ??
      first.title?.[0] ??
      first.body?.[0] ??
      "Invalid input.";
    return { ok: false, error: msg };
  }

  const { bannerKey, viewport, title, body } = parsed.data;
  if (title.length === 0) {
    return { ok: false, error: "Title is required." };
  }
  if (body.length === 0) {
    return { ok: false, error: "Description is required." };
  }

  try {
    await prisma.powerBannerCopy.upsert({
      where: {
        bannerKey_viewport: {
          bannerKey,
          viewport,
        },
      },
      create: {
        bannerKey,
        viewport,
        title,
        body,
      },
      update: { title, body },
    });

    const typedKey = bannerKey as PowerBannerKey;
    const typedViewport = viewport as PowerBannerViewport;
    const slotId = POWER_BANNER_SLOT_IDS[typedViewport][typedKey];
    const defaultTransform = POWER_BANNER_DEFAULT_TRANSFORMS[typedViewport][typedKey];
    const sortOrder = POWER_BANNER_KEYS.indexOf(bannerKey as PowerBannerKey);

    await siteMediaItem.upsert({
      where: { slotId },
      create: {
        sectionKey: SITE_MEDIA_GROUP_KEYS.HERO_BANNERS,
        slotId,
        sortOrder: sortOrder >= 0 ? sortOrder : 0,
        layoutMeta: defaultTransform,
      },
      update: {
        sectionKey: SITE_MEDIA_GROUP_KEYS.HERO_BANNERS,
      },
    });
  } catch (err) {
    logger.error("updatePowerBannerCopy: failed to upsert", err);
    if (isMigrationPendingError(err)) {
      return {
        ok: false,
        error: "Database schema is outdated. Run Prisma migrations and try again.",
      };
    }
    return {
      ok: false,
      error: "Could not save. Try again or check the database connection.",
    };
  }

  revalidateHeroCopy();
  return { ok: true };
}
