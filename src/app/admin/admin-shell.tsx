import type { ReactNode } from "react";

/** Constrained content width — matches storefront container rhythm */
export function AdminShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl ${className}`}>{children}</div>;
}
