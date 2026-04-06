"use client";

import { useCallback, useId, useMemo, useRef, useState } from "react";

type OrderNewClientEmailFieldProps = {
  leadEmails: string[];
  disabled: boolean;
  inputClassName: string;
};

/**
 * Client email input for New Order with optional suggestions from Inbox/Leads.
 */
export function OrderNewClientEmailField({
  leadEmails,
  disabled,
  inputClassName,
}: OrderNewClientEmailFieldProps) {
  const listId = useId();
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (q.length === 0) return leadEmails;
    return leadEmails.filter((email) => email.toLowerCase().includes(q));
  }, [leadEmails, value]);

  const showList = open && leadEmails.length > 0 && filtered.length > 0;

  const clearBlurTimeout = useCallback(() => {
    if (blurTimeoutRef.current === null) return;
    clearTimeout(blurTimeoutRef.current);
    blurTimeoutRef.current = null;
  }, []);

  const openSuggestions = useCallback(() => {
    clearBlurTimeout();
    if (leadEmails.length > 0) setOpen(true);
  }, [clearBlurTimeout, leadEmails.length]);

  const handleBlur = () => {
    clearBlurTimeout();
    blurTimeoutRef.current = setTimeout(() => {
      setOpen(false);
      blurTimeoutRef.current = null;
    }, 180);
  };

  const selectEmail = (email: string) => {
    clearBlurTimeout();
    setValue(email);
    setOpen(false);
  };

  return (
    <div className="relative">
      <input
        id="order-clientEmail"
        name="clientEmail"
        type="email"
        required
        autoComplete="email"
        disabled={disabled}
        value={value}
        onChange={(e) => {
          const next = e.target.value;
          setValue(next);
          if (leadEmails.length > 0) setOpen(true);
        }}
        onFocus={openSuggestions}
        onClick={openSuggestions}
        onBlur={handleBlur}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
        role="combobox"
        aria-expanded={showList}
        aria-controls={showList ? listId : undefined}
        aria-autocomplete="list"
        className={inputClassName}
        placeholder="email@example.com"
      />
      {showList && (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 mt-1 max-h-48 overflow-y-auto rounded-md border border-neutral-200 bg-white py-1 shadow-lg"
        >
          {filtered.map((email) => (
            <li key={email} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={email === value}
                className="w-full px-3 py-2 text-left text-sm text-[var(--foreground)] hover:bg-neutral-50 focus:bg-neutral-50 focus:outline-none"
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectEmail(email);
                }}
              >
                {email}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
