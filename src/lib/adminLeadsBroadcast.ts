"use client";

/** Same-origin tabs (e.g. site + /admin) share this channel name. */
export const ADMIN_LEADS_BROADCAST_CHANNEL = "goldcrest-admin-leads-v1";

export type AdminLeadsBroadcastMessage = { type: "lead-created"; at: number };

/**
 * Call after a new lead is persisted from the public quote form so open admin tabs
 * can refresh inbox without polling. Same browser only; no cross-device push.
 */
export function notifyAdminLeadsUpdated(): void {
  try {
    const bc = new BroadcastChannel(ADMIN_LEADS_BROADCAST_CHANNEL);
    const msg: AdminLeadsBroadcastMessage = {
      type: "lead-created",
      at: Date.now(),
    };
    bc.postMessage(msg);
    bc.close();
  } catch {
    // BroadcastChannel missing or blocked
  }
}
