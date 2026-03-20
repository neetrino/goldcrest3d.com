import type { ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Use for full-bleed backgrounds with inner constrained content */
  innerClassName?: string;
}

/**
 * Wrapper for page sections: responsive padding, optional max-width inner.
 */
export function SectionContainer({
  children,
  id,
  className = "",
  innerClassName,
}: SectionContainerProps) {
  const content = innerClassName ? (
    <div className={innerClassName}>{children}</div>
  ) : (
    children
  );

  return (
    <section
      id={id}
      className={`w-full py-[var(--section-padding-y)] px-[var(--section-padding-x)] ${className}`}
    >
      {content}
    </section>
  );
}
