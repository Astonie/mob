"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchResult {
  title: string;
  url: string;
  type: string;
}

export function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/v1/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.data || []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative mx-auto mt-20 max-w-2xl px-4">
        <div className="rounded-xl bg-white shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
            <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, minerals, news..."
              className="flex-1 text-[15px] outline-none placeholder:text-slate-400"
            />
            {loading && <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-[#0F4A6B]" />}
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {results.length > 0 && (
            <div className="max-h-80 overflow-y-auto">
              {results.map((r, i) => (
                <Link
                  key={i}
                  href={r.url}
                  onClick={onClose}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                >
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-semibold text-slate-600 uppercase">{r.type}</span>
                  <span className="text-sm text-slate-900">{r.title}</span>
                </Link>
              ))}
            </div>
          )}
          {query && !loading && results.length === 0 && (
            <div className="px-5 py-8 text-center text-sm text-slate-500">No results found</div>
          )}
        </div>
      </div>
    </div>
  );
}
