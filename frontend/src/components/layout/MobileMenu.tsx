"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MobLogo } from "@/components/ui/logo";

interface NavItem {
  title: string;
  url: string;
}

export function MobileMenu({ items, isOpen, onClose }: { items: NavItem[]; isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-[300px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right">
        <div className="flex h-[78px] items-center justify-between border-b border-slate-100 px-6">
          <MobLogo />
          <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-100 transition-colors" aria-label="Close menu">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {items.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                onClick={onClose}
                className="flex items-center justify-between rounded-lg px-4 py-3 text-[15px] font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0F4A6B] transition-colors"
              >
                {item.title}
                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </nav>
        <div className="border-t border-slate-100 p-4">
          <Link
            href="/contact"
            onClick={onClose}
            className="flex h-11 items-center justify-center rounded-lg bg-[#0F4A6B] text-white text-sm font-semibold hover:bg-[#0a334d] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
