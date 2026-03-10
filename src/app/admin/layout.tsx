import { auth } from "@/auth";
import { AdminSignInGate } from "./AdminSignInGate";
import { AdminNav } from "./AdminNav";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session?.user) {
    return <AdminSignInGate />;
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-[var(--foreground)]">
      <AdminNav />
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">{children}</main>
    </div>
  );
}
