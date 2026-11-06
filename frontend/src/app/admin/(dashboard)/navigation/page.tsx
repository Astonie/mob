"use client";
import { useEffect, useState } from "react";
import { adminFetch, revalidateTags } from "@/lib/admin";

type NavItem = {
  id: string;
  title: string;
  url: string | null;
  type: string;
  target: string;
  sort_order: number;
  is_active: boolean;
  parent_id: string | null;
  children?: NavItem[];
};

type Menu = { id: string; name: string; slug: string; location: string | null; items: NavItem[] };

function flatten(items: NavItem[]): NavItem[] {
  return items.flatMap((i) => [i, ...flatten(i.children ?? [])]);
}

export default function NavigationAdmin() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [activeSlug, setActiveSlug] = useState<string>("");
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState({ title: "", url: "", type: "internal", target: "_self", sort_order: 0, is_active: true });
  const [adding, setAdding] = useState(false);

  function load() {
    adminFetch<Menu[]>("/admin/navigation-menus")
      .then((data) => {
        setMenus(data);
        if (data.length && !activeSlug) setActiveSlug(data[0].slug);
      })
      .catch((e) => {
        if (e.status !== 401) setErr(e.message);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  const active = menus.find((m) => m.slug === activeSlug);
  const items = active ? flatten(active.items ?? []) : [];

  function startAdd() {
    setDraft({ title: "", url: "", type: "internal", target: "_self", sort_order: items.length, is_active: true });
    setAdding(true);
    setEditingId(null);
    setErr(null);
  }

  function startEdit(item: NavItem) {
    setDraft({
      title: item.title,
      url: item.url ?? "",
      type: item.type,
      target: item.target,
      sort_order: item.sort_order,
      is_active: item.is_active,
    });
    setEditingId(item.id);
    setAdding(false);
    setErr(null);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!active) return;
    setErr(null);
    setOk(null);
    try {
      if (editingId) {
        await adminFetch(`/admin/navigation-items/${editingId}`, { method: "PUT", json: { ...draft } });
        setOk("Item saved");
      } else {
        await adminFetch(`/admin/navigation-menus/${active.slug}/items`, { json: { ...draft } });
        setOk("Item added");
      }
      setAdding(false);
      setEditingId(null);
      load();
      void revalidateTags(["nav:main", "nav:footer", "nav:mobile"]);
    } catch (e2) {
      setErr((e2 as Error).message);
    }
  }

  async function removeItem(item: NavItem) {
    if (!window.confirm(`Remove "${item.title}" from menu?`)) return;
    try {
      await adminFetch(`/admin/navigation-items/${item.id}`, { method: "DELETE" });
      load();
      void revalidateTags(["nav:main", "nav:footer", "nav:mobile"]);
    } catch (e) {
      setErr((e as Error).message);
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
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-xl font-bold">Navigation</h1>
          <p className="mt-1 text-sm text-slate-500">
            Header and footer menus on the public site — links, order and visibility.
          </p>
        </div>
        <button
          onClick={startAdd}
          className="h-10 rounded-lg bg-[#0F4A6B] px-4 text-sm text-white hover:bg-[#0d3d59]"
          disabled={!active}
        >
          + Add link
        </button>
      </div>

      {err && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{err}</div>
      )}
      {ok && (
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">{ok}</div>
      )}

      <div className="mt-4 flex gap-2">
        {menus.map((m) => (
          <button
            key={m.slug}
            onClick={() => {
              setActiveSlug(m.slug);
              setAdding(false);
              setEditingId(null);
            }}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              activeSlug === m.slug
                ? "bg-[#0F4A6B] text-white"
                : "border bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>

      {(adding || editingId) && active && (
        <form onSubmit={submit} className="mt-4 grid gap-3 rounded-lg border bg-white p-4 shadow-sm sm:grid-cols-6">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-slate-500">Label</label>
            <input
              value={draft.title}
              onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-slate-500">URL</label>
            <input
              value={draft.url}
              onChange={(e) => setDraft((d) => ({ ...d, url: e.target.value }))}
              placeholder="/about"
              className="w-full rounded-lg border px-3 py-2 font-mono text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">Type</label>
            <select
              value={draft.type}
              onChange={(e) => setDraft((d) => ({ ...d, type: e.target.value }))}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            >
              <option value="internal">internal</option>
              <option value="external">external</option>
              <option value="page">page</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">Order</label>
            <input
              type="number"
              value={draft.sort_order}
              onChange={(e) => setDraft((d) => ({ ...d, sort_order: Number(e.target.value) }))}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>
          <div className="sm:col-span-6 flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={draft.is_active}
                onChange={(e) => setDraft((d) => ({ ...d, is_active: e.target.checked }))}
              />
              Visible
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={draft.target === "_blank"}
                onChange={(e) => setDraft((d) => ({ ...d, target: e.target.checked ? "_blank" : "_self" }))}
              />
              Open in new tab
            </label>
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setAdding(false);
                  setEditingId(null);
                }}
                className="rounded-lg border px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button className="rounded-lg bg-[#0F4A6B] px-5 py-2 text-sm font-medium text-white hover:bg-[#0d3d59]">
                {editingId ? "Save link" : "Add link"}
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="mt-6 overflow-hidden rounded-lg border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b bg-slate-50 text-xs text-slate-500">
            <tr>
              <th className="px-4 py-2 text-left">Label</th>
              <th className="px-4 py-2 text-left">URL</th>
              <th className="px-4 py-2 text-left">Order</th>
              <th className="px-4 py-2 text-left">Visible</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-2 font-medium">
                  {item.title}
                  {item.children?.length ? (
                    <span className="ml-2 text-xs text-slate-400">+{item.children.length} child</span>
                  ) : null}
                </td>
                <td className="px-4 py-2 font-mono text-xs text-slate-500">{item.url}</td>
                <td className="px-4 py-2">{item.sort_order}</td>
                <td className="px-4 py-2">
                  <span className={item.is_active ? "text-green-700" : "text-slate-400"}>
                    {item.is_active ? "● live" : "○ hidden"}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(item)}
                      className="rounded-lg border px-3 py-1 text-xs text-[#0F4A6B] hover:bg-[#0F4A6B]/5"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeItem(item)}
                      className="rounded-lg border border-red-200 px-3 py-1 text-xs text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!items.length && (
          <div className="p-6 text-center text-sm text-slate-500">No links in this menu.</div>
        )}
      </div>
    </div>
  );
}
