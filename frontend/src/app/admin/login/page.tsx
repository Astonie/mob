"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MobLogo } from "@/components/ui/logo";
import { clearSession, getToken, setSession, validateToken } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [twoFactorToken, setTwoFactorToken] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  // Already have a valid token (e.g. came back from the public site)? Skip login.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const token = getToken();
      if (token && (await validateToken(token))) {
        if (!cancelled) router.replace("/admin");
        return;
      }
      if (token && !cancelled) clearSession();
      if (!cancelled) setChecking(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const url = twoFactorToken
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/two-factor/verify`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`;
      const body = twoFactorToken
        ? { two_factor_token: twoFactorToken, code }
        : { email, password };
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(body),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.message || "Login failed");
      if (j.data?.requires_two_factor) {
        setTwoFactorToken(j.data.two_factor_token);
        setMsg("Enter the 6-digit code from your authenticator app.");
        return;
      }
      setSession(j.data.token, j.data.user);
      router.push("/admin");
    } catch (err: unknown) {
      setMsg(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      {checking ? (
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-[#0F4A6B]" />
      ) : (
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <MobLogo />
          </div>
          <h1 className="mt-6 font-serif text-2xl font-bold text-[#0a1f2e]">CMS Login</h1>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium text-slate-700">Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mining.example"
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
            {twoFactorToken && (
              <div>
                <label htmlFor="code" className="mb-1.5 block text-[13px] font-medium text-slate-700">Authentication code</label>
                <input
                  id="code"
                  type="text"
                  inputMode="numeric"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="123456"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-[#0F4A6B] focus:outline-none focus:ring-2 focus:ring-[#0F4A6B]/20 transition-all"
                />
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="flex h-11 w-full items-center justify-center rounded-lg bg-[#0F4A6B] text-white text-sm font-semibold hover:bg-[#0a334d] transition-all shadow-sm disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
            <div className="text-right">
              <Link href="/admin/forgot" className="text-[13px] font-medium text-[#0F4A6B] hover:underline">Forgot password?</Link>
            </div>
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
      )}
    </div>
  );
}
