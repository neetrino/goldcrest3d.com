import { z } from "zod";

const MIN_PASSWORD_LENGTH = 8;
const MAX_LOGIN_LENGTH = 255;

/** Login identifier (stored in User.email); any non-empty string, not email-only. */
const loginIdentifierSchema = z
  .string()
  .max(MAX_LOGIN_LENGTH, "Login is too long")
  .transform((s) => s.trim())
  .refine((s) => s.length > 0, { message: "Login is required" });

export const changeLoginSchema = z
  .object({
    currentLogin: loginIdentifierSchema,
    newLogin: loginIdentifierSchema,
  })
  .refine((data) => data.newLogin !== data.currentLogin, {
    message: "New login must be different from your current login.",
    path: ["newLogin"],
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

export type ChangeLoginData = z.infer<typeof changeLoginSchema>;
export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
