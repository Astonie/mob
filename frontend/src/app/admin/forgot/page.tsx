"use client";

import { useState } from "react";
import Link from "next/link";
import { MobLogo } from "@/components/ui/logo";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.message || "Failed");
      setSent(true);
    } catch (err: unknown) {
      setMsg(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <MobLogo />
          <h1 className="mt-6 font-serif text-2xl font-bold text-[#0a1f2e]">Forgot Password</h1>
          {sent ? (
            <div className="mt-4 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-700">
              Password reset link sent to your email if it exists.
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium text-slate-700">Email</label>
                <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm" />
              </div>
              <button disabled={loading} className="flex h-11 w-full items-center justify-center rounded-lg bg-[#0F4A6B] text-white text-sm font-semibold hover:bg-[#0a334d]">{loading ? "Sending..." : "Send reset link"}</button>
              {msg && <div className="mt-2 text-sm text-red-700">{msg}</div>}
            </form>
          )}
          <p className="mt-4 text-sm"><Link href="/admin/login" className="text-[#0F4A6B] hover:underline">Back to login</Link></p>
        </div>
      </div>
    </div>
  );
}
