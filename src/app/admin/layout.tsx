import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { AdminLayoutShell } from "./AdminLayoutShell";
import { AdminSignInGate } from "./AdminSignInGate";

/** Leads count and inbox must reflect new submissions without stale RSC cache. */
export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session?.user) {
    return <AdminSignInGate />;
  }

  const leadsUnreadCount = await prisma.lead.count({
    where: { readAt: null },
  });

  return (
    <AdminLayoutShell
      leadsUnreadCount={leadsUnreadCount}
      userName={session.user.name ?? null}
      userImage={session.user.image ?? null}
    >
      {children}
    </AdminLayoutShell>
  );
}
