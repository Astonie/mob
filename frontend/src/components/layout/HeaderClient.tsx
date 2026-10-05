"use client";

import { useState } from "react";
import Link from "next/link";
import { MobLogo } from "@/components/ui/logo";
import { MobileMenu } from "./MobileMenu";
import { SearchOverlay } from "./SearchOverlay";

export interface NavItem {
  title: string;
  url: string;
}

export function HeaderClient({ items }: { items: NavItem[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-[78px] items-center justify-between gap-8">
            <Link href="/" className="flex items-center shrink-0">
              <MobLogo />
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {items.map((item) => (
                <Link
                  key={item.title}
                  href={item.url || "#"}
                  className="relative px-3.5 py-2 text-[13.5px] font-medium tracking-wide text-slate-700 hover:text-[#0F4A6B] transition-colors group"
                >
                  {item.title}
                  <span className="absolute inset-x-3 -bottom-1 h-px scale-x-0 bg-[#0F4A6B] transition-transform group-hover:scale-x-100" />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-600"
                aria-label="Search"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <Link href="/contact" className="hidden sm:inline-flex h-10 px-6 items-center justify-center bg-[#0F4A6B] text-white text-[13px] font-semibold tracking-wide hover:bg-[#0a334d] transition-colors shadow-sm rounded-lg">
                Contact Us
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Open menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu items={items} isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
