"use server";

import { hashSync } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/auth";
import { prisma } from "@/lib/db";
import {
  changeEmailSchema,
  changePasswordSchema,
} from "@/lib/validations/adminCredentials";

const BCRYPT_ROUNDS = 10;

export type UpdateEmailResult =
  | { success: true }
  | { success: false; error: string }
  | null;

export type UpdatePasswordResult =
  | { success: true }
  | { success: false; error: string }
  | null;

/**
 * Server Action: update admin login (email). Validates format and uniqueness.
 * Signature compatible with useActionState(prevState, formData).
 */
export async function updateAdminEmail(
  _prev: UpdateEmailResult,
  formData: FormData,
): Promise<UpdateEmailResult> {
  const session = await requireAdminSession();
  if (!session?.user?.email) {
    return { success: false, error: "Unauthorized." };
  }

  const raw = formData.get("newEmail");
  const newEmail = typeof raw === "string" ? raw.trim().toLowerCase() : "";

  const parsed = changeEmailSchema.safeParse({ newEmail });
  if (!parsed.success) {
    const msg =
      parsed.error.flatten().fieldErrors.newEmail?.[0] ?? "Invalid email.";
    return { success: false, error: msg };
  }

  const userId = (session.user as { id?: string }).id;
  if (!userId) return { success: false, error: "Unauthorized." };

  if (parsed.data.newEmail === session.user.email) {
    return { success: true };
  }

  const existing = await prisma.user.findFirst({
    where: { email: parsed.data.newEmail },
  });
  if (existing && existing.id !== userId) {
    return { success: false, error: "This email is already in use." };
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { email: parsed.data.newEmail },
    });
    revalidatePath("/admin/settings");
    revalidatePath("/admin");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update email. Please try again." };
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
