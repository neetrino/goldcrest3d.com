"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { ADMIN_RSC_REFRESH_INTERVAL_MS } from "./admin.constants";

/**
 * Periodically re-fetches server components for the current admin route so new leads
 * and sidebar counts appear without a full page reload. Skips intervals when the tab is hidden.
 */
export function AdminRscAutoRefresh() {
  const router = useRouter();

  useEffect(() => {
    const refreshIfVisible = () => {
      if (document.visibilityState !== "visible") return;
      router.refresh();
    };

    const id = window.setInterval(refreshIfVisible, ADMIN_RSC_REFRESH_INTERVAL_MS);
    const onVisible = () => {
      refreshIfVisible();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [router]);

  return null;
}
