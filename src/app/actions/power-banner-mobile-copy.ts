"use server";

import { revalidatePath } from "next/cache";

import { requireAdminSession } from "@/auth";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { POWER_BANNER_DEFAULT_COPY } from "@/lib/power-banner-copy/power-banner-defaults";
import { finalizeHeroBannerBodyHtml } from "@/lib/power-banner-copy/sanitize-hero-banner-body";
import { isMigrationPendingError } from "@/lib/site-media/is-migration-pending-error";
import { powerBannerMobileCopyFormSchema } from "@/lib/validations/powerBannerCopy";

export type PowerBannerMobileCopyActionResult =
  | { ok: true }
  | { ok: false; error: string };

function revalidateHeroCopy(): void {
  revalidatePath("/admin/media");
  revalidatePath("/");
}

async function requireAdmin(): Promise<PowerBannerMobileCopyActionResult | null> {
  const session = await requireAdminSession();
  if (!session) {
    return { ok: false, error: "Unauthorized." };
  }
  return null;
}

/**
 * Server action - compatible with `useActionState` (prevState, formData).
 */
export async function updatePowerBannerMobileCopy(
  _prev: PowerBannerMobileCopyActionResult | null,
  formData: FormData,
): Promise<PowerBannerMobileCopyActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;

  const parsed = powerBannerMobileCopyFormSchema.safeParse({
    bannerKey: formData.get("bannerKey"),
    mobileTitle: formData.get("mobileTitle"),
    mobileBody: formData.get("mobileBody"),
    mobileOverlayText: formData.get("mobileOverlayText"),
  });

  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      first.bannerKey?.[0] ??
      first.mobileTitle?.[0] ??
      first.mobileBody?.[0] ??
      first.mobileOverlayText?.[0] ??
      "Invalid input.";
    return { ok: false, error: msg };
  }

  const { bannerKey, mobileTitle, mobileBody, mobileOverlayText } = parsed.data;
  const mobileBodyStored =
    mobileBody.length > 0 ? finalizeHeroBannerBodyHtml(mobileBody) : "";

  try {
    const desktopDefaults = POWER_BANNER_DEFAULT_COPY[bannerKey];
    await prisma.powerBannerCopy.upsert({
      where: { bannerKey },
      create: {
        bannerKey,
        title: desktopDefaults.title,
        body: finalizeHeroBannerBodyHtml(desktopDefaults.body),
        titleMobile: mobileTitle.length > 0 ? mobileTitle : null,
        bodyMobile: mobileBodyStored.length > 0 ? mobileBodyStored : null,
        mobileOverlayText: mobileOverlayText.length > 0 ? mobileOverlayText : null,
      },
      update: {
        titleMobile: mobileTitle.length > 0 ? mobileTitle : null,
        bodyMobile: mobileBodyStored.length > 0 ? mobileBodyStored : null,
        mobileOverlayText: mobileOverlayText.length > 0 ? mobileOverlayText : null,
      },
    });
  } catch (err) {
    if (isMigrationPendingError(err)) {
      return {
        ok: false,
        error:
          "Database schema is out of date. Run: pnpm prisma migrate deploy (or migrate dev locally), then try again.",
      };
    }
    logger.error("updatePowerBannerMobileCopy: failed to upsert", err);
    return {
      ok: false,
      error: "Could not save. Try again or check the database connection.",
    };
  }

  revalidateHeroCopy();
  return { ok: true };
}
