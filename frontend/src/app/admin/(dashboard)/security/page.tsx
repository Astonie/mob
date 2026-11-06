"use client";
import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin";

export default function SecurityPage() {
  const [secret, setSecret] = useState<string | null>(null);
  const [otpauth, setOtpauth] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [disableCode, setDisableCode] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [enabled, setEnabled] = useState<boolean>(false);
  const [sessions, setSessions] = useState<any[]>([]);
  const [curPw, setCurPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  async function load() {
    try {
      const me = await adminFetch<any>("/auth/me");
      setEnabled(!!me.data?.two_factor_enabled);
    } catch {}
    try {
      const s = await adminFetch<{ data: any[] }>("/auth/sessions");
      setSessions(Array.isArray(s) ? s : s.data ?? []);
    } catch {}
  }
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const me = await adminFetch<any>("/auth/me");
        if (!cancelled) setEnabled(!!me.data?.two_factor_enabled);
      } catch {}
      try {
        const s = await adminFetch<{ data: any[] }>("/auth/sessions");
        if (!cancelled) setSessions(Array.isArray(s) ? s : s.data ?? []);
      } catch {}
    })();
    return () => { cancelled = true; };
  }, []);

  async function setup2fa() {
    setErr(null); setMsg(null);
    try {
      const r = await adminFetch<{ data: { secret: string; otpauth_url: string } }>("/auth/two-factor/setup", { method: "POST" });
      setSecret(r.data.secret); setOtpauth(r.data.otpauth_url);
    } catch (e) { setErr((e as Error).message); }
  }
  async function confirm2fa() {
    setErr(null); setMsg(null);
    try {
      await adminFetch("/auth/two-factor/confirm", { method: "POST", json: { code } });
      setMsg("Two-factor authentication enabled."); setSecret(null); setCode("");
      load();
    } catch (e) { setErr((e as Error).message); }
  }
  async function disable2fa() {
    setErr(null); setMsg(null);
    try {
      await adminFetch("/auth/two-factor/disable", { method: "POST", json: { password, code: disableCode || undefined } });
      setMsg("Two-factor authentication disabled."); setPassword(""); setDisableCode("");
      load();
    } catch (e) { setErr((e as Error).message); }
  }
  async function changePw() {
    setErr(null); setMsg(null);
    try {
      await adminFetch("/auth/password/change", { method: "POST", json: { current_password: curPw, password: newPw, password_confirmation: confirmPw } });
      setMsg("Password changed."); setCurPw(""); setNewPw(""); setConfirmPw("");
    } catch (e) { setErr((e as Error).message); }
  }
  async function revoke(id: string) {
    await adminFetch(`/auth/sessions/${id}`, { method: "DELETE" });
    load();
  }
  async function revokeAll() {
    await adminFetch("/auth/sessions/revoke-all", { method: "POST" });
    load();
  }

  return (
    <div className="space-y-8">
      <h1 className="font-serif text-xl font-bold">Security</h1>
      {err && <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{err}</div>}
      {msg && <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">{msg}</div>}

      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-sm font-bold tracking-wide text-slate-700">Two-factor authentication</h2>
        <p className="mt-1 text-sm text-slate-500">Status: {enabled ? "Enabled" : "Disabled"}</p>
        {!enabled && !secret && (
          <button onClick={setup2fa} className="mt-3 rounded-lg bg-[#0F4A6B] px-4 py-2 text-sm text-white hover:bg-[#0d3d59]">Set up 2FA</button>
        )}
        {secret && (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-slate-600">Scan this secret in your authenticator app (or enter manually):</p>
            <code className="block rounded bg-slate-100 px-3 py-2 font-mono text-sm break-all">{secret}</code>
            {otpauth && <p className="text-xs text-slate-400 break-all">{otpauth}</p>}
            <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="6-digit code" className="w-40 rounded-lg border px-3 py-2 text-sm" />
            <button onClick={confirm2fa} className="rounded-lg bg-[#0F4A6B] px-4 py-2 text-sm text-white hover:bg-[#0d3d59]">Confirm</button>
          </div>
        )}
        {enabled && (
          <div className="mt-4 space-y-2">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Current password" className="w-full max-w-xs rounded-lg border px-3 py-2 text-sm" />
            <input value={disableCode} onChange={(e) => setDisableCode(e.target.value)} placeholder="Authenticator code" className="w-full max-w-xs rounded-lg border px-3 py-2 text-sm" />
            <button onClick={disable2fa} className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50">Disable 2FA</button>
          </div>
        )}
      </section>

      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-sm font-bold tracking-wide text-slate-700">Change password</h2>
        <div className="mt-3 grid gap-3 max-w-sm">
          <input type="password" value={curPw} onChange={(e) => setCurPw(e.target.value)} placeholder="Current password" className="rounded-lg border px-3 py-2 text-sm" />
          <input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="New password (min 12 chars)" className="rounded-lg border px-3 py-2 text-sm" />
          <input type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} placeholder="Confirm new password" className="rounded-lg border px-3 py-2 text-sm" />
          <button onClick={changePw} className="rounded-lg bg-[#0F4A6B] px-4 py-2 text-sm text-white hover:bg-[#0d3d59]">Change password</button>
        </div>
      </section>

      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold tracking-wide text-slate-700">Active sessions</h2>
          <button onClick={revokeAll} className="text-xs text-red-600 hover:underline">Revoke all others</button>
        </div>
        <div className="mt-3 space-y-2">
          {sessions.map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded border px-3 py-2 text-sm">
              <div>
                <div className="font-medium">{s.name} {s.is_current && <span className="text-xs text-emerald-600">(current)</span>}</div>
                <div className="text-xs text-slate-500">{s.created_at}</div>
              </div>
              {!s.is_current && (
                <button onClick={() => revoke(s.id)} className="text-xs text-red-600 hover:underline">Revoke</button>
              )}
            </div>
          ))}
          {!sessions.length && <p className="text-sm text-slate-500">No sessions.</p>}
        </div>
      </section>
    </div>
  );
}
