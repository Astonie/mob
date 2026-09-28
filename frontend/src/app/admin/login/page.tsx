"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@mining.example");
  const [password, setPassword] = useState("Admin123!");
  const [msg, setMsg] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
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
      setMsg(`Logged in as ${j.data.user.roles.join(", ")}`);
      router.push("/admin");
    } catch (err: unknown) {
      setMsg(err instanceof Error ? err.message : "Error");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 border border-slate-200 bg-white p-8">
      <h1 className="font-serif text-xl font-bold">CMS Login</h1>
      <p className="text-sm text-slate-600 mt-1">Sanctum bearer token — stored in localStorage, sent as Authorization: Bearer</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border border-slate-300 px-3 py-2 text-sm" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full border border-slate-300 px-3 py-2 text-sm" />
        <button className="w-full h-10 bg-slate-900 text-white text-sm font-medium">Sign in</button>
      </form>
      {msg && <div className="mt-4 text-sm border p-3 bg-slate-50">{msg}</div>}
      <div className="mt-6 text-xs text-slate-500 leading-5">
        Demo accounts: <br />
        <code className="font-mono">admin@mining.example / Admin123! (super-admin)</code><br />
        <code className="font-mono">editor@mining.example / Editor123! (editor)</code><br />
        <code className="font-mono">test@example.com / password (viewer)</code>
      </div>
      <button
        onClick={() => {
          localStorage.removeItem("cms_token");
          setMsg("Logged out");
        }}
        className="mt-4 text-xs underline"
      >
        Logout (clear token)
      </button>
    </div>
  );
}
