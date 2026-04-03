"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type AdminLeadsUnreadContextValue = {
  /** Unread count shown on the Inbox/Leads nav badge. */
  displayUnreadCount: number;
  /** Call when an unread lead is opened (marks read on server); decrements badge immediately. */
  reportUnreadLeadOpened: () => void;
};

const AdminLeadsUnreadContext = createContext<AdminLeadsUnreadContextValue | null>(
  null,
);

type AdminLeadsUnreadProviderProps = {
  serverUnreadCount: number;
  children: ReactNode;
};

/**
 * Keeps sidebar unread badge in sync with server count while allowing instant updates
 * when a lead is opened (layout RSC props may not refresh on `router.refresh()`).
 */
export function AdminLeadsUnreadProvider({
  serverUnreadCount,
  children,
}: AdminLeadsUnreadProviderProps) {
  const [displayUnreadCount, setDisplayUnreadCount] = useState(serverUnreadCount);

  useEffect(() => {
    setDisplayUnreadCount(serverUnreadCount);
  }, [serverUnreadCount]);

  const reportUnreadLeadOpened = useCallback(() => {
    setDisplayUnreadCount((c) => Math.max(0, c - 1));
  }, []);

  const value: AdminLeadsUnreadContextValue = {
    displayUnreadCount,
    reportUnreadLeadOpened,
  };

  return (
    <AdminLeadsUnreadContext.Provider value={value}>
      {children}
    </AdminLeadsUnreadContext.Provider>
  );
}

export function useAdminLeadsUnread(): AdminLeadsUnreadContextValue {
  const ctx = useContext(AdminLeadsUnreadContext);
  if (!ctx) {
    throw new Error("useAdminLeadsUnread must be used within AdminLeadsUnreadProvider");
  }
  return ctx;
}
