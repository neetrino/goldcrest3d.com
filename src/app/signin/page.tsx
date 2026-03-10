import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { SigninForm } from "./SigninForm";

const DEFAULT_CALLBACK = "/admin/leads";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const session = await auth();
  if (session?.user) redirect(DEFAULT_CALLBACK);

  const { callbackUrl } = await searchParams;
  const safeCallback =
    typeof callbackUrl === "string" &&
    callbackUrl.startsWith("/admin") &&
    !callbackUrl.includes("..")
      ? callbackUrl
      : DEFAULT_CALLBACK;

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-semibold text-center text-[var(--foreground)]">
          Admin — Sign in
        </h1>
        <SigninForm callbackUrl={safeCallback} />
      </div>
    </main>
  );
}
