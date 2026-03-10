"use server";

import { redirect } from "next/navigation";
import { signIn, signOut } from "@/lib/auth";

export type SignInResult = { error?: string };

/**
 * Server Action: credentials sign-in for admin.
 */
export async function signInAction(
  _prev: SignInResult,
  formData: FormData,
): Promise<SignInResult> {
  const login = formData.get("login");
  const password = formData.get("password");
  if (typeof login !== "string" || !login.trim() || typeof password !== "string") {
    return { error: "Please enter email or username and password." };
  }

  const result = await signIn("credentials", {
    login: login.trim(),
    password,
    redirect: false,
  });

  if (result?.error) return { error: "Invalid email/username or password." };
  if (result?.ok) {
    const callbackUrl = formData.get("callbackUrl");
    const safePath =
      typeof callbackUrl === "string" &&
      callbackUrl.startsWith("/admin") &&
      !callbackUrl.includes("..")
        ? callbackUrl
        : "/admin/leads";
    redirect(safePath);
  }
  return { error: "Sign-in failed." };
}

/**
 * Server Action: sign out and redirect to signin.
 */
export async function signOutAction() {
  await signOut({ redirect: false });
  redirect("/signin");
}
