import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { AdminLayoutShell } from "./AdminLayoutShell";
import { AdminSignInGate } from "./AdminSignInGate";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session?.user) {
    return <AdminSignInGate />;
  }

  const leadsCount = await prisma.lead.count();

  return (
    <AdminLayoutShell
      leadsCount={leadsCount}
      userName={session.user.name ?? null}
      userImage={session.user.image ?? null}
    >
      {children}
    </AdminLayoutShell>
  );
}
