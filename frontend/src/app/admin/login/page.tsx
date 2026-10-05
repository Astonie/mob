"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MobLogo } from "@/components/ui/logo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.message || "Login failed");
      localStorage.setItem("cms_token", j.data.token);
      localStorage.setItem("cms_user", JSON.stringify(j.data.user));
      router.push("/admin");
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
          <div className="flex items-center gap-3">
            <MobLogo />
          </div>
          <h1 className="mt-6 font-serif text-2xl font-bold text-[#0a1f2e]">CMS Login</h1>
          <p className="mt-2 text-sm text-slate-600">Sanctum bearer token — stored in localStorage, sent as Authorization: Bearer</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium text-slate-700">Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@moblimited.com"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-[#0F4A6B] focus:outline-none focus:ring-2 focus:ring-[#0F4A6B]/20 transition-all"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-[13px] font-medium text-slate-700">Password</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-[#0F4A6B] focus:outline-none focus:ring-2 focus:ring-[#0F4A6B]/20 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex h-11 w-full items-center justify-center rounded-lg bg-[#0F4A6B] text-white text-sm font-semibold hover:bg-[#0a334d] transition-all shadow-sm disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          {msg && (
            <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              {msg}
            </div>
          )}
        </div>
        <p className="mt-4 text-center text-xs text-slate-500">
          Private CMS — authorized personnel only
        </p>
      </div>
    </div>
  );
}
