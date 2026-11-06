"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminFetch } from "@/lib/admin";

type Block = { id?: string; type: string; data: Record<string, unknown>; sort_order: number };
type Page = {
  id: string;
  title: string;
  slug: string;
  status: string;
  excerpt: string | null;
  blocks: Block[];
};

type FieldDef = { key: string; label: string; kind: "text" | "textarea" | "html" | "json" };

const BLOCK_FIELDS: Record<string, FieldDef[]> = {
  hero: [
    { key: "heading", label: "Heading", kind: "text" },
    { key: "subheading", label: "Subheading", kind: "textarea" },
    { key: "eyebrow", label: "Eyebrow (above heading)", kind: "text" },
    { key: "cta_label", label: "CTA label", kind: "text" },
    { key: "cta_url", label: "CTA URL", kind: "text" },
    { key: "cta2_label", label: "Secondary CTA label (empty = hide)", kind: "text" },
    { key: "strip", label: 'Trust strip — JSON array of strings', kind: "json" },
    { key: "image", label: "Background image URL", kind: "text" },
  ],
  rich_text: [{ key: "content", label: "HTML content", kind: "html" }],
  stats: [{ key: "stats", label: 'Stats — JSON array of {"value","label"}', kind: "json" }],
  cta: [
    { key: "heading", label: "Heading", kind: "text" },
    { key: "text", label: "Body text", kind: "textarea" },
    { key: "cta_label", label: "CTA label", kind: "text" },
    { key: "cta_url", label: "CTA URL", kind: "text" },
  ],
  card_grid: [
    { key: "title", label: "Section title", kind: "text" },
    { key: "cards", label: 'Cards — JSON array of {"title","text"}', kind: "json" },
  ],
};

const BLOCK_TYPES = [
  "hero",
  "rich_text",
  "stats",
  "cta",
  "card_grid",
  "project_grid",
  "mineral_grid",
  "news_grid",
  "gallery",
  "image",
  "video",
];

const DEFAULT_DATA: Record<string, Record<string, unknown>> = {
  hero: { heading: "New section", subheading: "" },
  rich_text: { content: "<p>Write your content here…</p>" },
  stats: { stats: [{ value: "0+", label: "Metric" }] },
  cta: { heading: "Call to action", text: "", cta_label: "Contact Us", cta_url: "/contact" },
  card_grid: { title: "", cards: [{ title: "Card", text: "Description" }] },
  project_grid: { title: "Selected work" },
  mineral_grid: { title: "Minerals" },
  news_grid: { title: "Insights" },
  gallery: {},
  image: {},
  video: {},
};

const STATUS_OPTIONS = ["draft", "review", "approved", "published", "archived"];

function displayValue(v: unknown): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "object") return JSON.stringify(v, null, 2);
  return String(v);
}

export default function PagesAdmin() {
  const router = useRouter();
  const [list, setList] = useState<Page[]>([]);
  const [title, setTitle] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState<Page | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", status: "draft", excerpt: "" });
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [openBlock, setOpenBlock] = useState<number | null>(0);
  const [saving, setSaving] = useState(false);
  const [addType, setAddType] = useState("rich_text");

  function load() {
    adminFetch<{ data: Page[] }>("/admin/pages")
      .then((j) => setList(j.data ?? []))
      .catch((e) => {
        if (e.status !== 401) setErr(e.message);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  function select(p: Page) {
    setSelected(p);
    setForm({ title: p.title, slug: p.slug, status: p.status, excerpt: p.excerpt ?? "" });
    const sorted = [...(p.blocks ?? [])].sort((a, b) => a.sort_order - b.sort_order);
    setBlocks(sorted);
    const d: Record<string, string> = {};
    sorted.forEach((b, i) => {
      const defs = BLOCK_FIELDS[b.type];
      if (defs) {
        for (const f of defs) d[`${i}:${f.key}`] = displayValue(b.data?.[f.key]);
      } else {
        d[`${i}:__json`] = JSON.stringify(b.data ?? {}, null, 2);
      }
    });
    setDrafts(d);
    setOpenBlock(0);
    setErr(null);
    setOk(null);
  }

  function draftKey(i: number, key: string) {
    return `${i}:${key}`;
  }

  function getDraft(i: number, key: string, block: Block): string {
    const k = draftKey(i, key);
    if (k in drafts) return drafts[k];
    const defs = BLOCK_FIELDS[block.type];
    const def = defs?.find((f) => f.key === key);
    if (def && (def.kind === "json")) return displayValue(block.data?.[key]);
    return displayValue(block.data?.[key]);
  }

  function setDraft(i: number, key: string, value: string) {
    setDrafts((d) => ({ ...d, [draftKey(i, key)]: value }));
  }

  function resolveData(i: number, block: Block): Record<string, unknown> {
    const defs = BLOCK_FIELDS[block.type];
    if (!defs) {
      const raw = drafts[draftKey(i, "__json")] ?? "{}";
      try {
        return JSON.parse(raw);
      } catch {
        throw new Error(`Block ${i + 1} (${block.type}): data must be valid JSON`);
      }
    }
    const data: Record<string, unknown> = { ...(block.data ?? {}) };
    for (const f of defs) {
      const raw = getDraft(i, f.key, block);
      if (f.kind === "json") {
        try {
          data[f.key] = raw.trim() ? JSON.parse(raw) : null;
        } catch {
          throw new Error(`Block ${i + 1} (${block.type}): ${f.label} must be valid JSON`);
        }
      } else {
        data[f.key] = raw;
      }
    }
    return data;
  }

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      await adminFetch("/admin/pages", {
        json: {
          title,
          status: "draft",
          blocks: [
            { type: "hero", data: { heading: title, subheading: "" }, sort_order: 0 },
            { type: "rich_text", data: { content: `<p>${title}</p>` }, sort_order: 1 },
          ],
        },
      });
      setTitle("");
      setOk(`Created "${title}"`);
      load();
    } catch (e2) {
      setErr((e2 as Error).message);
    }
  }

  async function save() {
    if (!selected) return;
    setSaving(true);
    setErr(null);
    setOk(null);
    try {
      const payloadBlocks = blocks.map((b, i) => ({
        type: b.type,
        data: resolveData(i, b),
        sort_order: i,
      }));
      const updated = await adminFetch<{ data: Page }>(`/admin/pages/${selected.slug}`, {
        method: "PUT",
        json: { title: form.title, slug: form.slug, status: form.status, excerpt: form.excerpt, blocks: payloadBlocks },
      });
      setOk("Saved — live on the public site");
      setSelected(null);
      load();
      return updated;
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!selected) return;
    if (!window.confirm(`Delete page "${selected.title}"? This cannot be undone.`)) return;
    try {
      await adminFetch(`/admin/pages/${selected.slug}`, { method: "DELETE" });
      setSelected(null);
      setOk("Page deleted");
      load();
    } catch (e) {
      setErr((e as Error).message);
    }
  }

  function addBlock() {
    const data = DEFAULT_DATA[addType] ?? {};
    setBlocks((bs) => [...bs, { type: addType, data: structuredClone(data), sort_order: bs.length }]);
    setOpenBlock(blocks.length);
  }

  function moveBlock(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= blocks.length) return;
    setBlocks((bs) => {
      const next = [...bs];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
    setOpenBlock((o) => (o === i ? j : o === j ? i : o));
    setDrafts((d) => {
      const nd = { ...d };
      const keysA = Object.keys(nd).filter((k) => k.startsWith(`${i}:`));
      const keysB = Object.keys(nd).filter((k) => k.startsWith(`${j}:`));
      for (const k of keysA) nd[k.replace(`${i}:`, `__tmp:`)] = nd[k];
      for (const k of keysB) nd[k.replace(`${j}:`, `${i}:`)] = nd[k];
      for (const k of keysA) nd[k.replace(`__tmp:`, `${j}:`)] = nd[k];
      return nd;
    });
  }

  function removeBlock(i: number) {
    setBlocks((bs) => bs.filter((_, idx) => idx !== i));
    setOpenBlock(null);
    setDrafts((d) => {
      const nd: Record<string, string> = {};
      for (const [k, v] of Object.entries(d)) {
        const [idxStr, ...rest] = k.split(":");
        const idx = Number(idxStr);
        if (Number.isNaN(idx)) continue;
        if (idx < i) nd[k] = v;
        if (idx > i) nd[`${idx - 1}:${rest.join(":")}`] = v;
      }
      return nd;
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0F4A6B] border-t-transparent" />
      </div>
    );
  }

  if (selected) {
    return (
      <div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <button onClick={() => setSelected(null)} className="text-sm text-[#0F4A6B] hover:underline">
              ← All pages
            </button>
            <h1 className="mt-1 font-serif text-xl font-bold">Edit: {selected.title}</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={remove}
              className="rounded-lg border border-red-200 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
            >
              Delete page
            </button>
            <button
              onClick={save}
              disabled={saving}
              className="rounded-lg bg-[#0F4A6B] px-5 py-2 text-sm font-medium text-white hover:bg-[#0d3d59] disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save page"}
            </button>
          </div>
        </div>

        {err && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{err}</div>
        )}
        {ok && (
          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
            {ok}
          </div>
        )}

        <div className="mt-4 grid gap-3 rounded-lg border bg-white p-4 shadow-sm sm:grid-cols-4">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-slate-500">Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">Slug (URL)</label>
            <input
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              className="w-full rounded-lg border px-3 py-2 font-mono text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-4">
            <label className="mb-1 block text-xs font-medium text-slate-500">Excerpt</label>
            <input
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-wide text-slate-700">
              Content blocks ({blocks.length})
            </h2>
            <div className="flex gap-2">
              <select
                value={addType}
                onChange={(e) => setAddType(e.target.value)}
                className="rounded-lg border px-2 py-1.5 text-xs"
              >
                {BLOCK_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <button
                onClick={addBlock}
                className="rounded-lg bg-[#0F4A6B] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#0d3d59]"
              >
                + Add block
              </button>
            </div>
          </div>

          {blocks.map((b, i) => {
            const open = openBlock === i;
            const defs = BLOCK_FIELDS[b.type];
            return (
              <div key={`${b.type}-${i}`} className="rounded-lg border bg-white shadow-sm">
                <div className="flex items-center gap-3 px-4 py-3">
                  <button
                    onClick={() => setOpenBlock(open ? null : i)}
                    className="flex-1 text-left"
                  >
                    <span className="mr-2 rounded bg-[#0F4A6B]/10 px-2 py-0.5 font-mono text-[11px] text-[#0F4A6B]">
                      {i + 1}. {b.type}
                    </span>
                    <span className="text-sm text-slate-600">
                      {b.type === "hero"
                        ? getDraft(i, "heading", b)
                        : b.type === "rich_text"
                          ? String(b.data?.content ?? "").replace(/<[^>]*>/g, "").slice(0, 60)
                          : b.type === "cta" || b.type === "card_grid"
                            ? getDraft(i, "heading" in (b.data ?? {}) ? "heading" : "title", b)
                            : ""}
                    </span>
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveBlock(i, -1)}
                      disabled={i === 0}
                      className="rounded border px-2 py-1 text-xs text-slate-500 hover:bg-slate-50 disabled:opacity-30"
                      title="Move up"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveBlock(i, 1)}
                      disabled={i === blocks.length - 1}
                      className="rounded border px-2 py-1 text-xs text-slate-500 hover:bg-slate-50 disabled:opacity-30"
                      title="Move down"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => removeBlock(i)}
                      className="rounded border border-red-200 px-2 py-1 text-xs text-red-500 hover:bg-red-50"
                      title="Remove block"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                {open && (
                  <div className="border-t bg-slate-50/60 px-4 py-4 space-y-3">
                    {defs ? (
                      defs.map((f) => (
                        <div key={f.key}>
                          <label className="mb-1 block text-xs font-medium text-slate-500">{f.label}</label>
                          {f.kind === "text" ? (
                            <input
                              value={getDraft(i, f.key, b)}
                              onChange={(e) => setDraft(i, f.key, e.target.value)}
                              className="w-full rounded-lg border bg-white px-3 py-2 text-sm"
                            />
                          ) : (
                            <textarea
                              value={getDraft(i, f.key, b)}
                              onChange={(e) => setDraft(i, f.key, e.target.value)}
                              rows={f.kind === "html" ? 8 : 4}
                              className="w-full rounded-lg border bg-white px-3 py-2 font-mono text-xs leading-5"
                            />
                          )}
                        </div>
                      ))
                    ) : (
                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-500">
                          Block data — JSON (type: {b.type})
                        </label>
                        <textarea
                          value={getDraft(i, "__json", b)}
                          onChange={(e) => setDraft(i, "__json", e.target.value)}
                          rows={6}
                          className="w-full rounded-lg border bg-white px-3 py-2 font-mono text-xs leading-5"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          {!blocks.length && (
            <div className="rounded-lg border border-dashed bg-white p-6 text-center text-sm text-slate-500">
              No blocks yet — add one below.
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={() => setSelected(null)}
            className="rounded-lg border px-5 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="rounded-lg bg-[#0F4A6B] px-6 py-2 text-sm font-medium text-white hover:bg-[#0d3d59] disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save page"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-serif text-xl font-bold">Pages & Blocks</h1>
      <p className="mt-1 text-sm text-slate-600">
        Build public pages from ordered blocks — hero, rich text, stats, CTA, card grids and more.
      </p>
      <form onSubmit={create} className="mt-4 flex gap-2 rounded-lg border bg-white p-4 shadow-sm">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Page title"
          className="flex-1 rounded-lg border px-3 py-2 text-sm"
          required
        />
        <button className="h-10 rounded-lg bg-[#0F4A6B] px-5 text-sm text-white hover:bg-[#0d3d59]">
          Create page
        </button>
      </form>
      {err && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{err}</div>
      )}
      {ok && (
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
          {ok}
        </div>
      )}
      <div className="mt-6 overflow-hidden rounded-lg border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b bg-slate-50 text-xs text-slate-500">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Slug</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Blocks</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {list.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-2">{p.title}</td>
                <td className="px-4 py-2 font-mono text-xs">/{p.slug}</td>
                <td className="px-4 py-2">
                  <span
                    className={`rounded-lg border px-2 py-0.5 text-xs ${
                      p.status === "published"
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-[#0F4A6B]/20 bg-[#0F4A6B]/5 text-[#0F4A6B]"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-xs">{p.blocks?.length ?? 0}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => select(p)}
                    className="rounded-lg bg-[#0F4A6B] px-3 py-1 text-xs text-white hover:bg-[#0d3d59]"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!list.length && <div className="p-6 text-center text-sm text-slate-500">No pages</div>}
      </div>
    </div>
  );
}
