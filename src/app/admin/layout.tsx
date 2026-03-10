import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { signOutAction } from "@/app/actions/auth";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session?.user) redirect("/auth/signin");

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="border-b border-neutral-200 px-4 py-3">
        <nav className="flex items-center justify-between gap-4">
          <div className="flex gap-4">
            <Link
              href="/admin/leads"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Leads
            </Link>
            <Link
              href="/admin/orders"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Orders
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-600">
              {session.user.email ?? session.user.name ?? "Admin"}
            </span>
            <form action={signOutAction}>
              <button
                type="submit"
                className="text-sm text-neutral-600 hover:text-[var(--foreground)]"
              >
                Sign out
              </button>
            </form>
          </div>
        </nav>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}
