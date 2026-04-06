import { redirect } from "next/navigation";
import { auth } from "@/auth";

/**
 * /admin — authenticated landing: neutral home (no section pre-selected). Unauthenticated users sign in first.
 */
export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/signin?callbackUrl=/admin");
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 py-10 sm:px-6">
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-semibold text-slate-900">Engineering Admin</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Choose a section from the sidebar to get started — inbox, orders, or media.
          </p>
        </div>
      </div>
    </div>
  );
}
