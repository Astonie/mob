"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Dashboard = {
  stats: Record<string, number>;
  recent_news: Array<{ title: string; slug: string; status: string }>;
  recent_projects: Array<{ name: string; slug: string; content_status: string }>;
};

export default function AdminDashboard() {
  const [data, setData] = useState<Dashboard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("cms_token");
    if (!token) { router.replace("/admin/login"); return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    })
      .then((r) => {
        if (r.status === 401) {
          localStorage.removeItem("cms_token");
          localStorage.removeItem("cms_user");
          router.replace("/admin/login");
          throw new Error("Unauthorized");
        }
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json();
      })
      .then((j) => setData(j.data))
      .catch((e) => { if (e.message !== "Unauthorized") setError(e.message); })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-[#0F4A6B]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl">
        <h1 className="font-serif text-3xl font-bold text-[#0a1f2e]">Dashboard</h1>
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
        <button onClick={() => router.push("/admin/login")} className="mt-4 inline-flex h-10 items-center rounded-lg bg-[#0F4A6B] px-5 text-sm font-semibold text-white">Go to Login</button>
      </div>
    );
  }
  if (!data) return null;

  const stats = data.stats;

  const statCards = [
    { label: "Projects", value: stats.projects_total, sub: `${stats.projects_published} published`, icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5", color: "from-[#0F4A6B] to-[#0a2e4a]" },
    { label: "News Articles", value: stats.news_total, sub: `${stats.news_published} published`, icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2", color: "from-[#2A7FA3] to-[#0F4A6B]" },
    { label: "Open Careers", value: stats.careers_open, sub: "open roles", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", color: "from-emerald-500 to-emerald-700" },
    { label: "Media Assets", value: stats.media_total, sub: `${stats.media_size_mb} MB`, icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z", color: "from-amber-500 to-amber-700" },
  ];

  const quickActions = [
    { label: "New Project", href: "/admin/projects", icon: "M12 4v16m8-8H4" },
    { label: "New Article", href: "/admin/news", icon: "M12 4v16m8-8H4" },
    { label: "Upload Media", href: "/admin/media", icon: "M12 4v16m8-8H4" },
    { label: "Site Settings", href: "/admin/settings", icon: "M12 4v16m8-8H4" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.22em] text-[#0F4A6B] font-bold">OVERVIEW</p>
          <h1 className="mt-2 font-serif text-3xl lg:text-4xl font-bold tracking-tight text-[#0a1f2e]">Dashboard</h1>
          <p className="mt-2 text-sm text-slate-600">Content-driven CMS — all public site data flows through /api/v1</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((a) => (
            <Link key={a.label} href={a.href} className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-[12px] font-semibold text-slate-700 hover:border-[#0F4A6B]/40 hover:text-[#0F4A6B] transition-colors shadow-sm">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={a.icon} /></svg>
              {a.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((c) => (
          <div key={c.label} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-lg transition-all">
            <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${c.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
            <div className="relative flex items-start justify-between gap-3">
              <div>
                <div className="text-[11px] tracking-widest text-slate-500 font-medium">{c.label.toUpperCase()}</div>
                <div className="mt-2 font-serif text-3xl font-bold text-[#0a1f2e]">{c.value}</div>
                <div className="mt-1 text-xs text-slate-500">{c.sub}</div>
              </div>
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${c.color} text-white shadow-sm`}>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path strokeLinecap="round" strokeLinejoin="round" d={c.icon} /></svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
            <div className="font-semibold text-sm text-[#0a1f2e]">Recent Projects</div>
            <Link href="/admin/projects" className="text-[12px] font-semibold text-[#0F4A6B] hover:underline">View all →</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {data.recent_projects.map((p) => (
              <div key={p.slug} className="px-5 py-3.5 flex items-center justify-between gap-3 text-sm">
                <span className="text-slate-900 font-medium truncate">{p.name}</span>
                <span className={`shrink-0 px-2 py-0.5 text-xs rounded-full border ${p.content_status === "published" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-700"}`}>{p.content_status}</span>
              </div>
            ))}
            {data.recent_projects.length === 0 && <div className="px-5 py-8 text-sm text-slate-500 text-center">No projects yet.</div>}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
            <div className="font-semibold text-sm text-[#0a1f2e]">Recent News</div>
            <Link href="/admin/news" className="text-[12px] font-semibold text-[#0F4A6B] hover:underline">View all →</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {data.recent_news.map((n) => (
              <div key={n.slug} className="px-5 py-3.5 flex items-center justify-between gap-3 text-sm">
                <span className="text-slate-900 font-medium truncate">{n.title}</span>
                <span className="shrink-0 text-xs text-slate-500">{n.status}</span>
              </div>
            ))}
            {data.recent_news.length === 0 && <div className="px-5 py-8 text-sm text-slate-500 text-center">No articles yet.</div>}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="font-semibold text-sm text-[#0a1f2e]">Publishing Workflow</div>
        <p className="mt-1 text-xs text-slate-500">Content moves through these stages before going live.</p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          {["draft", "review", "approved", "published", "archived"].map((s, i, arr) => (
            <span key={s} className="flex items-center gap-2">
              <span className={`px-3 py-1.5 rounded-full border font-medium ${
                s === "published" ? "border-emerald-200 bg-emerald-50 text-emerald-700" :
                s === "approved" ? "border-blue-200 bg-blue-50 text-blue-700" :
                s === "review" ? "border-amber-200 bg-amber-50 text-amber-700" :
                "border-slate-200 bg-slate-50 text-slate-600"
              }`}>{s}</span>
              {i < arr.length - 1 && <span className="text-slate-300">→</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
