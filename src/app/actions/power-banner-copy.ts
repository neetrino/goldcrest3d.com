"use server";

import { revalidatePath } from "next/cache";

import { requireAdminSession } from "@/auth";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { getHeroBannerBodyPlainTextLength } from "@/lib/power-banner-copy/hero-banner-body-plain-text-length";
import { finalizeHeroBannerBodyHtml } from "@/lib/power-banner-copy/sanitize-hero-banner-body";
import { isMigrationPendingError } from "@/lib/site-media/is-migration-pending-error";
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
    title: formData.get("title"),
    body: formData.get("body"),
  });

  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      first.bannerKey?.[0] ??
      first.title?.[0] ??
      first.body?.[0] ??
      "Invalid input.";
    return { ok: false, error: msg };
  }

  const { bannerKey, title, body } = parsed.data;
  const bodyStored = finalizeHeroBannerBodyHtml(body);
  if (getHeroBannerBodyPlainTextLength(bodyStored) === 0) {
    return { ok: false, error: "Description is required." };
  }

  try {
    await prisma.powerBannerCopy.upsert({
      where: { bannerKey },
      create: {
        bannerKey,
        title,
        body: bodyStored,
      },
      update: { title, body: bodyStored },
    });
  } catch (err) {
    if (isMigrationPendingError(err)) {
      return {
        ok: false,
        error:
          "Database schema is out of date. Run: pnpm prisma migrate deploy (or migrate dev locally), then try again.",
      };
    }
    logger.error("updatePowerBannerCopy: failed to upsert", err);
    return {
      ok: false,
      error: "Could not save. Try again or check the database connection.",
    };
  }

  revalidateHeroCopy();
  return { ok: true };
}
