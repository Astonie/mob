"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminFetch, type PaginatedResponse } from "@/lib/admin";

type MediaItem = {
  id: string;
  original_name: string;
  file_name: string;
  path: string;
  mime_type: string;
  extension: string;
  size: number;
  folder: string;
  created_at: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function formatSize(bytes: number): string {
  if (bytes > 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  if (bytes > 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${bytes} B`;
}

export default function MediaAdmin() {
  const router = useRouter();
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loadingList, setLoadingList] = useState(true);

  function load(p = page) {
    adminFetch<PaginatedResponse<MediaItem>>(`/admin/media?page=${p}&per_page=24`)
      .then((j) => {
        setItems(j.data ?? []);
        setPage(j.current_page ?? 1);
        setLastPage(j.last_page ?? 1);
      })
      .catch((e) => {
        if (e.status !== 401) setErr(e.message);
      })
      .finally(() => setLoadingList(false));
  }

  useEffect(() => {
    load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function upload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const t = localStorage.getItem("cms_token");
    if (!t) {
      router.replace("/admin/login");
      return;
    }
    setLoading(true);
    setErr(null);
    const res = await fetch(`${API_URL}/api/v1/admin/media/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${t}`, Accept: "application/json" },
      body: fd,
    });
    if (res.status === 401) {
      localStorage.removeItem("cms_token");
      localStorage.removeItem("cms_user");
      router.replace("/admin/login");
      return;
    }
    const j = await res.json();
    setLoading(false);
    if (!res.ok) {
      setErr(JSON.stringify(j.errors ?? j.message ?? j));
      return;
    }
    setMsg(`Uploaded ${j.data.original_name}`);
    (e.target as HTMLFormElement).reset();
    load(1);
  }

  async function remove(item: MediaItem) {
    if (!window.confirm(`Delete "${item.original_name}"?`)) return;
    try {
      await adminFetch(`/admin/media/${item.id}`, { method: "DELETE" });
      load(page);
    } catch (e) {
      setErr((e as Error).message);
    }
  }

  return (
    <div>
      <h1 className="font-serif text-xl font-bold">Media Library</h1>
      <p className="mt-1 text-sm text-slate-600">
        Upload images and documents (jpg/png/webp/pdf, max 10MB) — served from the public disk.
      </p>
      <form onSubmit={upload} className="mt-4 flex gap-2 rounded-lg border bg-white p-4 shadow-sm">
        <input
          name="file"
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.pdf"
          className="flex-1 rounded-lg border px-3 py-2 text-sm"
          required
        />
        <input
          name="folder"
          placeholder="folder"
          defaultValue="general"
          className="rounded-lg border px-3 py-2 text-sm"
        />
        <button
          disabled={loading}
          className="h-10 rounded-lg bg-[#0F4A6B] px-5 text-sm text-white hover:bg-[#0d3d59] disabled:opacity-50"
        >
          {loading ? "Uploading…" : "Upload"}
        </button>
      </form>
      {msg && (
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
          {msg}
        </div>
      )}
      {err && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{err}</div>
      )}

      {loadingList ? (
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0F4A6B] border-t-transparent" />
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((m) => (
              <div key={m.id} className="overflow-hidden rounded-lg border bg-white shadow-sm">
                <div className="flex h-32 items-center justify-center bg-slate-100">
                  {m.mime_type.startsWith("image/") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`${API_URL}/storage/${m.path}`}
                      alt={m.original_name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-mono text-xs text-slate-500">{m.extension ?? m.mime_type}</span>
                  )}
                </div>
                <div className="p-3">
                  <div className="truncate text-xs font-medium text-slate-700" title={m.original_name}>
                    {m.original_name}
                  </div>
                  <div className="mt-0.5 text-[11px] text-slate-400">
                    {formatSize(m.size)} · {m.folder}
                  </div>
                  <div className="mt-2 flex gap-2">
                    <a
                      href={`${API_URL}/storage/${m.path}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded border px-2 py-1 text-[11px] text-[#0F4A6B] hover:bg-[#0F4A6B]/5"
                    >
                      Open
                    </a>
                    <button
                      onClick={() => remove(m)}
                      className="rounded border border-red-200 px-2 py-1 text-[11px] text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!items.length && (
            <div className="mt-6 rounded-lg border border-dashed p-8 text-center text-sm text-slate-500">
              No files uploaded yet.
            </div>
          )}
          {lastPage > 1 && (
            <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
              <span>
                Page {page} of {lastPage}
              </span>
              <div className="flex gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => load(page - 1)}
                  className="rounded-lg border px-3 py-1.5 disabled:opacity-40"
                >
                  ← Prev
                </button>
                <button
                  disabled={page >= lastPage}
                  onClick={() => load(page + 1)}
                  className="rounded-lg border px-3 py-1.5 disabled:opacity-40"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
