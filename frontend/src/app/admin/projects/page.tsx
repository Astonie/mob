"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Project = { id: string; name: string; slug: string; status: string; content_status: string; is_featured: boolean; country: string | null };

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");

  function load() {
    const token = localStorage.getItem("cms_token");
    if (!token) {
      setError("Not authenticated");
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/projects?per_page=20`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    })
      .then((r) => r.json())
      .then((j) => setProjects(j.data.data ?? j.data ?? []))
      .catch((e) => setError(e.message));
  }

  useEffect(() => {
    load();
  }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    const token = localStorage.getItem("cms_token");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/projects`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name, summary, status: "exploration", content_status: "draft" }),
    });
    const j = await res.json();
    if (!res.ok) {
      setError(JSON.stringify(j));
      return;
    }
    setName("");
    setSummary("");
    load();
  }

  async function publish(slug: string) {
    const token = localStorage.getItem("cms_token");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/projects/${slug}/publish`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    });
    if (!res.ok) setError("publish failed");
    else load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-xl font-bold">Projects</h1>
        <Link href="/projects" className="text-sm text-amber-700 hover:underline">
          View public →
        </Link>
      </div>

      <form onSubmit={create} className="mt-4 flex gap-2 border border-slate-200 bg-white p-4">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Project name" className="flex-1 border px-3 py-2 text-sm" required />
        <input value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Summary" className="flex-1 border px-3 py-2 text-sm" />
        <button className="h-10 px-5 bg-slate-900 text-white text-sm">Create draft</button>
      </form>

      {error && <div className="mt-4 text-sm border border-amber-200 bg-amber-50 p-3">{error}</div>}

      <div className="mt-6 border border-slate-200 bg-white">
        <div className="px-4 py-2 border-b bg-slate-50 text-xs tracking-widest text-slate-500">ALL PROJECTS — status via content_status (draft|review|published)</div>
        <table className="w-full text-sm">
          <thead className="text-xs text-slate-500 border-b">
            <tr>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Country</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {projects.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-2">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-slate-500 font-mono">{p.slug}</div>
                </td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-0.5 text-xs border ${p.content_status === "published" ? "bg-green-50 border-green-200 text-green-700" : "bg-amber-50 border-amber-200"}`}>{p.content_status}</span>
                </td>
                <td className="px-4 py-2 text-xs">{p.country ?? "—"}</td>
                <td className="px-4 py-2 flex gap-2">
                  {p.content_status !== "published" && (
                    <button onClick={() => publish(p.slug)} className="px-3 py-1 bg-amber-600 text-white text-xs">
                      Publish
                    </button>
                  )}
                  <a href={`/projects/${p.slug}`} target="_blank" className="px-3 py-1 border text-xs">
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!projects.length && <div className="p-6 text-center text-sm text-slate-500">No projects or not authenticated — login first.</div>}
      </div>

      <p className="mt-4 text-xs text-slate-500">Revalidate: backend publish → webhook POST /api/revalidate?secret= (ISR tag projects) then frontend shows published project.</p>
    </div>
  );
}
