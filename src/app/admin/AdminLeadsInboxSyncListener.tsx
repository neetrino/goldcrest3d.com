"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  ADMIN_LEADS_BROADCAST_CHANNEL,
  type AdminLeadsBroadcastMessage,
} from "@/lib/adminLeadsBroadcast";

function isLeadCreatedMessage(data: unknown): data is AdminLeadsBroadcastMessage {
  if (data === null || typeof data !== "object") return false;
  const o = data as Record<string, unknown>;
  return o.type === "lead-created" && typeof o.at === "number";
}

/**
 * When the public quote form saves a lead, `notifyAdminLeadsUpdated()` posts here;
 * we soft-refresh RSC so inbox and sidebar counts update without a full reload.
 */
export function AdminLeadsInboxSyncListener() {
  const router = useRouter();

  useEffect(() => {
    let bc: BroadcastChannel;
    try {
      bc = new BroadcastChannel(ADMIN_LEADS_BROADCAST_CHANNEL);
    } catch {
      return;
    }

    const onMessage = (ev: MessageEvent<unknown>) => {
      if (!isLeadCreatedMessage(ev.data)) return;
      router.refresh();
    };

    bc.addEventListener("message", onMessage);
    return () => {
      bc.removeEventListener("message", onMessage);
      bc.close();
    };
  }, [router]);

  return null;
}
