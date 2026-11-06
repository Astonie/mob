"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

export function SiteChrome({ header, footer, children }: { header: ReactNode; footer: ReactNode; children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname?.startsWith("/admin/");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {header}
      <main id="main-content" className="flex-1">{children}</main>
      {footer}
      <ScrollToTop />
    </>
  );
}
