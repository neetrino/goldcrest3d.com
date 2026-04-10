"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-md border border-neutral-300 bg-[var(--background)] px-3 py-2 pe-10 text-[var(--foreground)] placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400/30 disabled:opacity-60";

export type PasswordInputWithToggleProps = {
  id: string;
  name: string;
  label: string;
  autoComplete: string;
  minLength?: number;
  required?: boolean;
  disabled: boolean;
  ariaDescribedBy?: string;
  /**
   * Starts read-only so browsers skip autofill on load; becomes editable on focus.
   * Use for sensitive “current password” fields where saved credentials must not appear prefilled.
   */
  readOnlyUntilFocused?: boolean;
};

function EyeVisibleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function EyeHiddenIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );
}

/**
 * Password field with show/hide toggle. Default is masked; icon reflects visible state.
 */
export function PasswordInputWithToggle({
  id,
  name,
  label,
  autoComplete,
  minLength,
  required = true,
  disabled,
  ariaDescribedBy,
  readOnlyUntilFocused = false,
}: PasswordInputWithToggleProps) {
  const [visible, setVisible] = useState(false);
  const [editUnlocked, setEditUnlocked] = useState(!readOnlyUntilFocused);
  const readOnly = readOnlyUntilFocused && !editUnlocked;

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[var(--foreground)]"
      >
        {label}
      </label>
      <div className="relative mt-1.5">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          required={required}
          minLength={minLength}
          disabled={disabled}
          readOnly={readOnly}
          onFocus={() => {
            if (readOnlyUntilFocused) setEditUnlocked(true);
          }}
          className={inputClass}
          aria-describedby={ariaDescribedBy}
        />
        <button
          type="button"
          disabled={disabled}
          className="absolute end-1.5 top-1/2 z-10 -translate-y-1/2 rounded p-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/40 disabled:pointer-events-none disabled:opacity-50"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          aria-controls={id}
        >
          {visible ? <EyeHiddenIcon /> : <EyeVisibleIcon />}
        </button>
      </div>
    </div>
  );
}
