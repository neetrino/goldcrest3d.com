import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { AdminSignInGate } from "./AdminSignInGate";
import { AdminSidebar } from "./AdminSidebar";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session?.user) {
    return <AdminSignInGate />;
  }

  const leadsCount = await prisma.lead.count();

  return (
    <div className="flex min-h-screen bg-[#f8f7f6] text-[var(--foreground)]">
      <AdminSidebar
        leadsCount={leadsCount}
        userName={session.user.name ?? null}
        userImage={session.user.image ?? null}
      />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
