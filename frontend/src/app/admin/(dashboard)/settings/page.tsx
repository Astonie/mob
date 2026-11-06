"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { adminFetch, revalidateTags, uploadMedia } from "@/lib/admin";
import { mediaSrc } from "@/lib/api";

type SiteSetting = {
  id: string;
  key: string;
  value: unknown;
  type: string;
  group: string;
  description: string | null;
  is_public: boolean;
};

const GROUP_ORDER = ["general", "contact", "social", "seo", "content", "appearance"];
const GROUP_LABELS: Record<string, string> = {
  general: "General",
  contact: "Contact",
  social: "Social Media",
  seo: "SEO",
  content: "Site Copy",
  appearance: "Appearance",
};

export default function SettingsAdmin() {
  const router = useRouter();
  const [rows, setRows] = useState<SiteSetting[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newGroup, setNewGroup] = useState("content");
  const [newValue, setNewValue] = useState("");
  const [uploading, setUploading] = useState<string | null>(null);

  function load() {
    adminFetch<{ data: SiteSetting[] } | SiteSetting[]>("/admin/site-settings")
      .then((res) => {
        const data = Array.isArray(res) ? res : res.data ?? [];
        setRows(data);
        const d: Record<string, string> = {};
        for (const r of data) {
          d[r.key] =
            typeof r.value === "object" && r.value !== null
              ? JSON.stringify(r.value, null, 2)
              : String(r.value ?? "");
        }
        setDrafts(d);
      })
      .catch((e) => {
        if (e.status !== 401) setErr(e.message);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  const grouped = useMemo(() => {
    const map = new Map<string, SiteSetting[]>();
    for (const r of Array.isArray(rows) ? rows : []) {
      const g = r.group || "general";
      if (!map.has(g)) map.set(g, []);
      map.get(g)!.push(r);
    }
    return GROUP_ORDER.filter((g) => map.has(g)).map((g) => [g, map.get(g)!] as const);
  }, [rows]);

  async function save(row: SiteSetting) {
    setSaving(row.key);
    setErr(null);
    setOk(null);
    let value: unknown = drafts[row.key] ?? "";
    if (row.type === "json" || (typeof row.value === "object" && row.value !== null)) {
      try {
        value = JSON.parse(String(drafts[row.key] ?? ""));
      } catch {
        setErr(`${row.key}: value must be valid JSON`);
        setSaving(null);
        return;
      }
    } else if (row.type === "boolean") {
      value = drafts[row.key] === "true";
    }
    try {
      const updated = await adminFetch<{ data: SiteSetting }>(
        `/admin/site-settings/${encodeURIComponent(row.key)}`,
        { method: "PUT", json: { value, type: row.type, group: row.group, description: row.description, is_public: row.is_public } }
      );
      setRows((rs) => rs.map((r) => (r.key === row.key ? updated.data : r)));
      setOk(`Saved ${row.key}`);
      void revalidateTags(["settings"]);
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setSaving(null);
    }
  }

  async function uploadImage(row: SiteSetting, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(row.key);
    setErr(null);
    try {
      const asset = await uploadMedia(file, "branding");
      setDrafts((d) => ({ ...d, [row.key]: asset.path }));
      setSaving(row.key);
      setErr(null);
      try {
        const updated = await adminFetch<{ data: SiteSetting }>(
          `/admin/site-settings/${encodeURIComponent(row.key)}`,
          { method: "PUT", json: { value: asset.path, type: row.type, group: row.group, description: row.description, is_public: row.is_public } }
        );
        setRows((rs) => rs.map((r) => (r.key === row.key ? updated.data : r)));
        setOk(`Uploaded & applied ${asset.file_name}`);
        void revalidateTags(["settings"]);
      } catch (e2) {
        setErr(e2 instanceof Error ? e2.message : "Upload failed");
      } finally {
        setSaving(null);
      }
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Upload failed");
    } finally {
      setUploading(null);
    }
  }

  async function addSetting(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      const created = await adminFetch<{ data: SiteSetting }>("/admin/site-settings", {
        json: { key: newKey.trim(), group: newGroup, type: "text", value: newValue },
      });
      setRows((rs) => [...rs, created.data]);
      setDrafts((d) => ({ ...d, [created.data.key]: newValue }));
      setNewKey("");
      setNewValue("");
      setShowAdd(false);
      setOk(`Added ${created.data.key}`);
      void revalidateTags(["settings"]);
    } catch (e2) {
      setErr((e2 as Error).message);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0F4A6B] border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-xl font-bold">Site Settings</h1>
          <p className="mt-1 text-sm text-slate-500">
            Every public-facing detail — company info, contact, socials, SEO and page copy. Changes go live
            automatically.
          </p>
        </div>
        <button
          onClick={() => setShowAdd((v) => !v)}
          className="h-10 rounded-lg bg-[#0F4A6B] px-4 text-sm text-white hover:bg-[#0d3d59]"
        >
          + Add setting
        </button>
      </div>

      {err && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{err}</div>
      )}
      {ok && (
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
          {ok}
        </div>
      )}

      {showAdd && (
        <form onSubmit={addSetting} className="mt-4 flex flex-wrap items-end gap-3 rounded-lg border bg-white p-4 shadow-sm">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">Key</label>
            <input
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="content.home_why_heading"
              className="w-72 rounded-lg border px-3 py-2 text-sm"
              required
              pattern="[a-zA-Z0-9_.\-]+"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">Group</label>
            <select
              value={newGroup}
              onChange={(e) => setNewGroup(e.target.value)}
              className="rounded-lg border px-3 py-2 text-sm"
            >
              {GROUP_ORDER.map((g) => (
                <option key={g} value={g}>
                  {GROUP_LABELS[g]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-52">
            <label className="mb-1 block text-xs font-medium text-slate-500">Value</label>
            <input
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>
          <button className="h-10 rounded-lg bg-[#0F4A6B] px-4 text-sm text-white hover:bg-[#0d3d59]">Add</button>
        </form>
      )}

      <div className="mt-6 space-y-8">
        {grouped.map(([group, items]) => (
          <section key={group} className="rounded-lg border bg-white shadow-sm">
            <div className="border-b bg-slate-50 px-4 py-3">
              <h2 className="text-sm font-bold tracking-wide text-slate-700">
                {GROUP_LABELS[group] ?? group}
              </h2>
            </div>
            <div className="divide-y">
              {items.map((row) => {
                const draft = drafts[row.key] ?? "";
                const isLong =
                  row.type === "json" ||
                  (typeof row.value === "object" && row.value !== null) ||
                  draft.length > 80 ||
                  row.key.startsWith("content.");
                return (
                  <div key={row.id} className="grid gap-3 px-4 py-4 sm:grid-cols-12 sm:items-start">
                    <div className="sm:col-span-4">
                      <div className="text-sm font-medium text-slate-800">
                        {row.description || row.key}
                      </div>
                      <div className="mt-0.5 font-mono text-[11px] text-slate-400">{row.key}</div>
                      {row.type === "boolean" && (
                        <label className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                          <input
                            type="checkbox"
                            checked={draft === "true"}
                            onChange={(e) =>
                              setDrafts((d) => ({ ...d, [row.key]: e.target.checked ? "true" : "false" }))
                            }
                          />
                          enabled
                        </label>
                      )}
                    </div>
                    <div className="sm:col-span-6">
                      {row.type === "image" ? (
                        <div className="flex items-center gap-3">
                          <div className="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                            {draft ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={mediaSrc(draft) ?? draft}
                                alt="preview"
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="text-[10px] text-slate-400">none</span>
                            )}
                          </div>
                          <label className="inline-flex h-9 shrink-0 cursor-pointer items-center rounded-lg border px-3 text-sm text-slate-700 hover:bg-slate-50">
                            {uploading === row.key ? "Uploading…" : draft ? "Replace" : "Upload"}
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => uploadImage(row, e)} />
                          </label>
                          <input
                            value={draft}
                            onChange={(e) => setDrafts((d) => ({ ...d, [row.key]: e.target.value }))}
                            placeholder="path, URL or /logo.svg"
                            className="w-full min-w-0 rounded-lg border px-3 py-2 text-sm font-mono text-xs"
                          />
                        </div>
                      ) : row.type === "boolean" ? (
                        <div className="text-sm text-slate-600">{draft === "true" ? "true" : "false"}</div>
                      ) : isLong ? (
                        <textarea
                          value={draft}
                          onChange={(e) => setDrafts((d) => ({ ...d, [row.key]: e.target.value }))}
                          rows={row.type === "json" || typeof row.value === "object" ? 5 : 3}
                          className="w-full rounded-lg border px-3 py-2 font-mono text-xs leading-5"
                        />
                      ) : (
                        <input
                          value={draft}
                          onChange={(e) => setDrafts((d) => ({ ...d, [row.key]: e.target.value }))}
                          className="w-full rounded-lg border px-3 py-2 text-sm"
                        />
                      )}
                    </div>
                    <div className="sm:col-span-2 sm:text-right">
                      <button
                        onClick={() => save(row)}
                        disabled={saving === row.key}
                        className="rounded-lg bg-[#0F4A6B] px-4 py-2 text-xs font-medium text-white hover:bg-[#0d3d59] disabled:opacity-50"
                      >
                        {saving === row.key ? "Saving…" : "Save"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
        {!rows.length && (
          <div className="rounded-lg border bg-white p-6 text-center text-sm text-slate-500">
            No settings found. Run the database seeder or add one.
          </div>
        )}
      </div>
    </div>
  );
}
