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
  const email = formData.get("email");
  const password = formData.get("password");
  if (typeof email !== "string" || typeof password !== "string") {
    return { error: "Please enter email and password." };
  }

  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (result?.error) return { error: "Invalid email or password." };
  if (result?.ok) redirect("/admin/leads");
  return { error: "Sign-in failed." };
}

/**
 * Server Action: sign out and redirect to signin.
 */
export async function signOutAction() {
  await signOut({ redirect: false });
  redirect("/auth/signin");
}
