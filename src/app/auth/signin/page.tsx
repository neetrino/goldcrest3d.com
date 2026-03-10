import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AuthSigninForm } from "./AuthSigninForm";

export default async function SignInPage() {
  const session = await auth();
  if (session?.user) redirect("/admin/leads");

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-semibold text-center text-[var(--foreground)]">
          Admin — Մուտք
        </h1>
        <AuthSigninForm />
      </div>
    </main>
  );
}
