"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { MobLogo } from "@/components/ui/logo";

function ResetPasswordForm() {
  const search = useSearchParams();
  const router = useRouter();
  const token = search.get("token") || "";
  const [email, setEmail] = useState(() => search.get("email") || "");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ token, email, password, password_confirmation: confirm }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.message || "Failed");
      setDone(true);
      setTimeout(() => router.push("/admin/login"), 1500);
    } catch (err: unknown) {
      setMsg(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <MobLogo />
        <h1 className="mt-6 font-serif text-2xl font-bold text-[#0a1f2e]">Reset Password</h1>
        {done ? (
          <div className="mt-4 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-700">
            Password reset successful. Redirecting to login…
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-slate-700">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-slate-700">New password</label>
              <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-slate-700">Confirm password</label>
              <input type="password" required minLength={8} value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm" />
            </div>
            <button disabled={loading} className="flex h-11 w-full items-center justify-center rounded-lg bg-[#0F4A6B] text-white text-sm font-semibold hover:bg-[#0a334d] disabled:opacity-60">
              {loading ? "Resetting..." : "Reset password"}
            </button>
            {msg && <div className="mt-2 text-sm text-red-700">{msg}</div>}
          </form>
        )}
        <p className="mt-4 text-sm">
          <Link href="/admin/login" className="text-[#0F4A6B] hover:underline">Back to login</Link>
        </p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Suspense fallback={<div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-[#0F4A6B]" />}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
