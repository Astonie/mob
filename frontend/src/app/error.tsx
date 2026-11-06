"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <p className="text-xs font-semibold tracking-[0.18em] text-amber-600">ERROR</p>
      <h1 className="mt-2 font-serif text-4xl font-bold">Something went wrong</h1>
      <p className="mt-4 text-slate-600">
        We couldn&apos;t load this page right now. Your connection to the site is fine — please try again.
      </p>
      {error.digest && (
        <p className="mt-3 font-mono text-xs text-slate-400">Ref: {error.digest}</p>
      )}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => retry()}
          className="inline-flex h-10 items-center bg-slate-900 px-6 text-sm font-medium text-white"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex h-10 items-center border border-slate-300 px-6 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
