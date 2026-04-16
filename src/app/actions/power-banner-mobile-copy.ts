"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma/client";

import { requireAdminSession } from "@/auth";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { modelingTextOverlayLayoutSchema } from "@/lib/modeling-slot-copy/modeling-text-overlay-layout";
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
    useHeroVisualTextLayout: formData.get("useHeroVisualTextLayout") ?? "0",
    heroTextLayoutMobile: formData.get("heroTextLayoutMobile") ?? "",
  });

  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      first.bannerKey?.[0] ??
      first.mobileTitle?.[0] ??
      first.mobileBody?.[0] ??
      first.heroTextLayoutMobile?.[0] ??
      "Invalid input.";
    return { ok: false, error: msg };
  }

  const { bannerKey, mobileTitle, mobileBody, useHeroVisualTextLayout, heroTextLayoutMobile } =
    parsed.data;
  const mobileBodyStored =
    mobileBody.length > 0 ? finalizeHeroBannerBodyHtml(mobileBody) : "";

  const useVisualLayout = useHeroVisualTextLayout === "1";
  const layoutStored = useVisualLayout
    ? modelingTextOverlayLayoutSchema.parse(JSON.parse(heroTextLayoutMobile ?? "") as unknown)
    : null;

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
        heroTextLayoutMobile:
          layoutStored !== null
            ? (layoutStored as unknown as Prisma.InputJsonValue)
            : Prisma.DbNull,
      },
      update: {
        titleMobile: mobileTitle.length > 0 ? mobileTitle : null,
        bodyMobile: mobileBodyStored.length > 0 ? mobileBodyStored : null,
        heroTextLayoutMobile:
          layoutStored !== null
            ? (layoutStored as unknown as Prisma.InputJsonValue)
            : Prisma.DbNull,
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
