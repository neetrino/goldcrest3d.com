"use server";

import { hashSync } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/auth";
import { prisma } from "@/lib/db";
import {
  changeLoginSchema,
  changePasswordSchema,
} from "@/lib/validations/adminCredentials";

const BCRYPT_ROUNDS = 10;

export type UpdateLoginResult =
  | { success: true }
  | { success: false; error: string; clearCurrentVerification?: boolean }
  | null;

export type UpdatePasswordResult =
  | { success: true }
  | { success: false; error: string }
  | null;

/**
 * Server Action: update admin login identifier (stored in User.email).
 * Requires `currentLogin` to match DB, then sets `newLogin` (uniqueness, must differ).
 */
export async function updateAdminLogin(
  _prev: UpdateLoginResult,
  formData: FormData,
): Promise<UpdateLoginResult> {
  const session = await requireAdminSession();
  if (!session?.user?.email) {
    return { success: false, error: "Unauthorized." };
  }

  const rawCurrent = formData.get("currentLogin");
  const rawNew = formData.get("newLogin");
  const currentLoginInput = typeof rawCurrent === "string" ? rawCurrent : "";
  const newLoginInput = typeof rawNew === "string" ? rawNew : "";

  const parsed = changeLoginSchema.safeParse({
    currentLogin: currentLoginInput,
    newLogin: newLoginInput,
  });
  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors;
    const msg =
      flat.currentLogin?.[0] ??
      flat.newLogin?.[0] ??
      "Invalid login.";
    return { success: false, error: msg };
  }

  const userId = (session.user as { id?: string }).id;
  if (!userId) return { success: false, error: "Unauthorized." };

  const userRow = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true },
  });
  const storedLogin = (userRow?.email ?? "").trim();
  if (!storedLogin) {
    return { success: false, error: "Could not verify your account login." };
  }

  if (parsed.data.currentLogin !== storedLogin) {
    return {
      success: false,
      error:
        "The current login you entered does not match your account. Check and try again.",
      clearCurrentVerification: true,
    };
  }

  if (parsed.data.newLogin === storedLogin) {
    return {
      success: false,
      error: "New login must be different from your current login.",
    };
  }

  const existing = await prisma.user.findFirst({
    where: { email: parsed.data.newLogin },
  });
  if (existing && existing.id !== userId) {
    return { success: false, error: "This login is already in use." };
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { email: parsed.data.newLogin },
    });
    revalidatePath("/admin/settings");
    revalidatePath("/admin");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update login. Please try again." };
  }
}

/**
 * Server Action: update admin password. Requires current password; hashes new password.
 * Signature compatible with useActionState(prevState, formData).
 */
export async function updateAdminPassword(
  _prev: UpdatePasswordResult,
  formData: FormData,
): Promise<UpdatePasswordResult> {
  const session = await requireAdminSession();
  if (!session?.user) return { success: false, error: "Unauthorized." };

  const userId = (session.user as { id?: string }).id;
  if (!userId) return { success: false, error: "Unauthorized." };

  const currentPassword =
    typeof formData.get("currentPassword") === "string"
      ? formData.get("currentPassword")
      : "";
  const newPassword =
    typeof formData.get("newPassword") === "string"
      ? formData.get("newPassword")
      : "";
  const confirmNewPassword =
    typeof formData.get("confirmNewPassword") === "string"
      ? formData.get("confirmNewPassword")
      : "";

  const parsed = changePasswordSchema.safeParse({
    currentPassword,
    newPassword,
    confirmNewPassword,
  });
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const msg =
      errors.currentPassword?.[0] ??
      errors.newPassword?.[0] ??
      errors.confirmNewPassword?.[0] ??
      "Invalid input.";
    return { success: false, error: msg };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { password: true },
  });
  if (!user?.password) {
    return { success: false, error: "Account not found or cannot change password." };
  }

  const { compareSync } = await import("bcryptjs");
  if (!compareSync(parsed.data.currentPassword, user.password)) {
    return { success: false, error: "Current password is incorrect." };
  }

  const hashed = hashSync(parsed.data.newPassword, BCRYPT_ROUNDS);
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });
    revalidatePath("/admin/settings");
    return { success: true };
  } catch {
    return {
      success: false,
      error: "Failed to update password. Please try again.",
    };
  }
}
