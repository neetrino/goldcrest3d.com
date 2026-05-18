import { NextRequest, NextResponse } from "next/server";

import { reconcilePendingArcaPayments } from "@/lib/arca/reconcilePendingPayments";

/**
 * Optional cron: reconcile Arca payments when returnUrl was never hit.
 * Secure with CRON_SECRET (Authorization: Bearer <secret>).
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const cronSecret = process.env.CRON_SECRET?.trim();
  if (!cronSecret) {
    return NextResponse.json(
      { error: "CRON_SECRET is not configured." },
      { status: 501 },
    );
  }

  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const result = await reconcilePendingArcaPayments();
  return NextResponse.json(result);
}
