import { redirect } from "next/navigation";
import { auth } from "@/auth";

/**
 * /admin — only redirect to Leads after confirmed session; otherwise sign-in.
 */
export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/signin?callbackUrl=/admin/leads");
  }
  redirect("/admin/leads");
}
