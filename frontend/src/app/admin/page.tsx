"use client";
import { useEffect, useState } from "react";

type Dashboard = {
  stats: Record<string, number>;
  recent_news: Array<{ title: string; slug: string; status: string }>;
  recent_projects: Array<{ name: string; slug: string; content_status: string }>;
};

export default function AdminDashboard() {
  const [data, setData] = useState<Dashboard | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("cms_token");
    if (!token) {
      setError("Not authenticated — login at /admin/login with admin@mining.example / Admin123!");
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    })
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json();
      })
      .then((j) => setData(j.data))
      .catch((e) => setError(e.message));
  }, []);

  if (error) {
    return (
      <div className="max-w-2xl">
        <h1 className="font-serif text-2xl font-bold">Dashboard</h1>
        <div className="mt-4 border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">{error}</div>
        <a href="/admin/login" className="mt-4 inline-flex h-9 px-5 items-center bg-slate-900 text-white text-sm">Go to Login</a>
      </div>
    );
  }

  if (!data) return <div className="text-sm text-slate-500">Loading dashboard…</div>;

  const stats = data.stats;

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold">Dashboard</h1>
      <p className="text-sm text-slate-600 mt-1">Content-driven CMS — all public site data flows through /api/v1</p>

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          ["Projects", stats.projects_total, `${stats.projects_published} published`],
          ["News", stats.news_total, `${stats.news_published} published`],
          ["Careers Open", stats.careers_open, "open roles"],
          ["Media", stats.media_total, `${stats.media_size_mb} MB`],
        ].map(([label, val, sub]) => (
          <div key={String(label)} className="border border-slate-200 bg-white p-4">
            <div className="text-xs tracking-widest text-slate-500">{String(label).toUpperCase()}</div>
            <div className="font-serif text-2xl font-bold mt-1">{String(val)}</div>
            <div className="text-xs text-slate-500">{String(sub)}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        <div className="border border-slate-200 bg-white">
          <div className="px-4 py-3 border-b border-slate-200 font-semibold text-sm">Recent Projects</div>
          <div className="divide-y">
            {data.recent_projects.map((p) => (
              <div key={p.slug} className="px-4 py-3 flex justify-between text-sm">
                <span>{p.name}</span>
                <span className={`px-2 py-0.5 text-xs border ${p.content_status === "published" ? "bg-green-50 border-green-200 text-green-700" : "bg-amber-50 border-amber-200"}`}>{p.content_status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-slate-200 bg-white">
          <div className="px-4 py-3 border-b border-slate-200 font-semibold text-sm">Recent News</div>
          <div className="divide-y">
            {data.recent_news.map((n) => (
              <div key={n.slug} className="px-4 py-3 flex justify-between text-sm">
                <span className="line-clamp-1">{n.title}</span>
                <span className="text-xs text-slate-500">{n.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 border border-slate-200 bg-white p-4 text-sm">
        <div className="font-semibold">Publishing Workflow</div>
        <div className="mt-2 flex gap-2 text-xs">
          <span className="px-2 py-1 bg-slate-100 border">draft</span>→<span className="px-2 py-1 bg-amber-100 border">review</span>→<span className="px-2 py-1 bg-blue-100 border">approved</span>→<span className="px-2 py-1 bg-green-100 border">published</span>→<span className="px-2 py-1 bg-slate-100 border">archived</span>
          <span className="ml-4 text-slate-500">scheduled_at + Scheduler (every minute) + revalidate webhook</span>
        </div>
      </div>
    </div>
  );
}
