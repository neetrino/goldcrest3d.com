import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminSettingsForm } from "./AdminSettingsForm";

export default async function AdminSettingsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/signin?callbackUrl=/admin/settings");
  }

  const currentEmail =
    typeof session.user.email === "string" ? session.user.email : "";

  return (
    <div className="mx-auto max-w-2xl overflow-auto px-4 py-6 sm:px-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--foreground)]">
            Settings
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Update your login (email) and password.
          </p>
        </div>
        <AdminSettingsForm currentEmail={currentEmail} />
      </div>
    </div>
  );
}
