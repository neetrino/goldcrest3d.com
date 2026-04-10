import { z } from "zod";

const MIN_PASSWORD_LENGTH = 8;
const MAX_EMAIL_LENGTH = 255;

const emailFieldSchema = z
  .string()
  .min(1, "Email is required")
  .max(MAX_EMAIL_LENGTH, "Email is too long")
  .email("Enter a valid email address")
  .transform((s) => s.trim().toLowerCase());

export const changeEmailSchema = z
  .object({
    currentEmail: emailFieldSchema,
    newEmail: emailFieldSchema,
  })
  .refine((data) => data.newEmail !== data.currentEmail, {
    message: "New email must be different from your current email.",
    path: ["newEmail"],
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters`),
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New password and confirmation do not match",
    path: ["confirmNewPassword"],
  });

export type ChangeEmailData = z.infer<typeof changeEmailSchema>;
export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
