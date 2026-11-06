"use client";
import { useEffect, useState, useCallback } from "react";
import { adminFetch, uploadMedia, type PaginatedResponse } from "@/lib/admin";
import { publicMediaUrl } from "@/lib/api";

export type ResourceField = {
  key: string;
  label: string;
  kind: "text" | "textarea" | "html" | "select" | "checkbox" | "date" | "number" | "image";
  options?: string[];
  required?: boolean;
  placeholder?: string;
  half?: boolean;
};

export type ResourceColumn = {
  key: string;
  label: string;
  render?: (row: Record<string, unknown>) => React.ReactNode;
};

type Props = {
  endpoint: string;
  title: string;
  subtitle?: string;
  rowKey: string;
  fields: ResourceField[];
  columns: ResourceColumn[];
  defaults: Record<string, unknown>;
  searchable?: boolean;
  createLabel?: string;
  extraActions?: (row: Record<string, unknown>, reload: () => void) => React.ReactNode;
};

function StatusBadge({ value }: { value: unknown }) {
  const v = String(value ?? "");
  const good = ["published", "open", "approved", "active", "replied"].includes(v);
  const pending = ["draft", "review", "new", "pending", "scheduled"].includes(v);
  return (
    <span
      className={`inline-block rounded-lg border px-2 py-0.5 text-xs ${
        good
          ? "border-green-200 bg-green-50 text-green-700"
          : pending
            ? "border-amber-200 bg-amber-50 text-amber-700"
            : "border-slate-200 bg-slate-50 text-slate-600"
      }`}
    >
      {v || "—"}
    </span>
  );
}

export { StatusBadge };

function ImageField({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (path: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const src = publicMediaUrl(typeof value === "string" ? value : null);

  async function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const asset = await uploadMedia(file, "team");
      onChange(asset.path);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex items-start gap-3">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="preview" className="h-full w-full object-cover" />
        ) : (
          <span className="text-[10px] text-slate-400">none</span>
        )}
      </div>
      <div className="flex-1">
        <label className="inline-flex h-9 cursor-pointer items-center rounded-lg border px-3 text-sm text-slate-700 hover:bg-slate-50">
          {uploading ? "Uploading…" : src ? "Replace photo" : "Upload photo"}
          <input type="file" accept=".jpg,.jpeg,.png,.webp" onChange={pick} disabled={uploading} className="hidden" />
        </label>
        {src && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="ml-2 text-xs text-red-600 hover:underline"
          >
            Remove
          </button>
        )}
        <div className="mt-1 truncate font-mono text-[11px] text-slate-400" title={typeof value === "string" ? value : ""}>
          {typeof value === "string" && value ? value : "jpg/png/webp, max 10MB"}
        </div>
        {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
      </div>
    </div>
  );
}

function initialValues(defaults: Record<string, unknown>): Record<string, unknown> {
  return structuredClone(defaults);
}

export default function ResourceAdmin({
  endpoint,
  title,
  subtitle,
  rowKey,
  fields,
  columns,
  defaults,
  searchable,
  createLabel = "Create",
  extraActions,
}: Props) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Record<string, unknown>>(() => initialValues(defaults));
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(
    (p = page, q = search) => {
      const params = new URLSearchParams({ page: String(p), per_page: "15" });
      if (q) params.set("search", q);
      adminFetch<PaginatedResponse<Record<string, unknown>> | { data: Record<string, unknown>[] }>(
        `/${endpoint}?${params}`
      )
        .then((j) => {
          const paginated = j as PaginatedResponse<Record<string, unknown>>;
          const list = paginated.data ?? [];
          setRows(list);
          if (paginated.current_page) {
            setPage(paginated.current_page);
            setLastPage(paginated.last_page ?? 1);
            setTotal(paginated.total ?? list.length);
          } else {
            setPage(1);
            setLastPage(1);
            setTotal(list.length);
          }
        })
        .catch((e) => {
          if (e.status !== 401) setErr(e.message);
        })
        .finally(() => setLoading(false));
    },
    [endpoint, page, search]
  );

  useEffect(() => {
    load(1, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  function startCreate() {
    setForm(initialValues(defaults));
    setEditingKey(null);
    setCreating(true);
    setErr(null);
    setOk(null);
  }

  function startEdit(row: Record<string, unknown>) {
    const f = initialValues(defaults);
    for (const field of fields) {
      const v = row[field.key];
      if (field.kind === "checkbox") f[field.key] = Boolean(v);
      else if (field.kind === "date") f[field.key] = v ? String(v).slice(0, 10) : "";
      else if (v === null || v === undefined) f[field.key] = "";
      else if (typeof v === "object") f[field.key] = JSON.stringify(v, null, 2);
      else f[field.key] = String(v);
    }
    setForm(f);
    setEditingKey(String(row[rowKey]));
    setCreating(false);
    setErr(null);
    setOk(null);
  }

  function cancel() {
    setCreating(false);
    setEditingKey(null);
    setErr(null);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErr(null);
    const payload: Record<string, unknown> = {};
    for (const field of fields) {
      let v = form[field.key];
      if (field.kind === "checkbox") v = Boolean(v);
      else if (field.kind === "number") v = v === "" || v === null ? null : Number(v);
      else if (field.kind === "date") v = v === "" ? null : v;
      else if (field.kind === "html" || field.kind === "textarea" || field.kind === "text" || field.kind === "select" || field.kind === "image") {
        v = v === undefined ? null : v;
      }
      payload[field.key] = v;
    }
    try {
      if (editingKey) {
        await adminFetch(`/${endpoint}/${encodeURIComponent(editingKey)}`, { method: "PUT", json: payload });
        setOk("Saved — public site updated");
      } else {
        await adminFetch(`/${endpoint}`, { json: payload });
        setOk(`Created — public site updated`);
      }
      setCreating(false);
      setEditingKey(null);
      load(1, search);
    } catch (e2) {
      setErr((e2 as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function remove(row: Record<string, unknown>) {
    const key = String(row[rowKey]);
    const label = String(row.title ?? row.name ?? row.question ?? key);
    if (!window.confirm(`Delete "${label}"?`)) return;
    try {
      await adminFetch(`/${endpoint}/${encodeURIComponent(key)}`, { method: "DELETE" });
      setOk("Deleted");
      load(page, search);
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

  const editing = Boolean(editingKey) || creating;

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-xl font-bold">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {searchable && (
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && load(1, search)}
              placeholder="Search…"
              className="rounded-lg border px-3 py-2 text-sm"
            />
          )}
          <button
            onClick={startCreate}
            className="h-10 rounded-lg bg-[#0F4A6B] px-4 text-sm text-white hover:bg-[#0d3d59]"
          >
            + New
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

      {editing && (
        <form onSubmit={submit} className="mt-4 rounded-lg border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-bold tracking-wide text-slate-700">
            {editingKey ? "Edit" : "New"} {title.toLowerCase().replace(/s$/, "")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field.key} className={field.half ? "sm:col-span-1" : field.kind === "textarea" || field.kind === "html" ? "sm:col-span-2" : ""}>
                <label className="mb-1 block text-xs font-medium text-slate-500">
                  {field.label}
                  {field.required && <span className="text-red-500"> *</span>}
                </label>
                {field.kind === "select" ? (
                  <select
                    value={String(form[field.key] ?? "")}
                    onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                    className="w-full rounded-lg border px-3 py-2 text-sm"
                    required={field.required}
                  >
                    <option value="">—</option>
                    {field.options?.map((o) => (
                      <option key={o} value={o}>
                        {o.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                ) : field.kind === "checkbox" ? (
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={Boolean(form[field.key])}
                      onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.checked }))}
                    />
                    {field.placeholder ?? "enabled"}
                  </label>
                ) : field.kind === "textarea" || field.kind === "html" ? (
                  <textarea
                    value={String(form[field.key] ?? "")}
                    onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                    rows={field.kind === "html" ? 10 : 4}
                    required={field.required}
                    placeholder={field.placeholder}
                    className={`w-full rounded-lg border px-3 py-2 text-sm ${field.kind === "html" ? "font-mono text-xs leading-5" : ""}`}
                  />
                ) : field.kind === "image" ? (
                  <ImageField
                    value={form[field.key]}
                    onChange={(path) => setForm((f) => ({ ...f, [field.key]: path }))}
                  />
                ) : (
                  <input
                    type={field.kind === "date" ? "date" : field.kind === "number" ? "number" : "text"}
                    value={String(form[field.key] ?? "")}
                    onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                    required={field.required}
                    placeholder={field.placeholder}
                    className="w-full rounded-lg border px-3 py-2 text-sm"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-5 flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#0F4A6B] px-5 py-2 text-sm font-medium text-white hover:bg-[#0d3d59] disabled:opacity-50"
            >
              {saving ? "Saving…" : editingKey ? "Save changes" : createLabel}
            </button>
            <button
              type="button"
              onClick={cancel}
              className="rounded-lg border px-5 py-2 text-sm text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mt-6 overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b bg-slate-50 text-xs text-slate-500">
            <tr>
              {columns.map((c) => (
                <th key={c.key} className="px-4 py-2 text-left">
                  {c.label}
                </th>
              ))}
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((row) => (
              <tr key={String(row[rowKey])}>
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-2 align-top">
                    {c.render ? c.render(row) : c.key === "status" || c.key === "content_status" ? (
                      <StatusBadge value={row[c.key]} />
                    ) : (
                      String(row[c.key] ?? "—")
                    )}
                  </td>
                ))}
                <td className="px-4 py-2">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => startEdit(row)}
                      className="rounded-lg border px-3 py-1 text-xs text-[#0F4A6B] hover:bg-[#0F4A6B]/5"
                    >
                      Edit
                    </button>
                    {extraActions?.(row, () => load(page, search))}
                    <button
                      onClick={() => remove(row)}
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
        {!rows.length && (
          <div className="p-6 text-center text-sm text-slate-500">Nothing here yet.</div>
        )}
      </div>

      {lastPage > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
          <span>
            {total} total · page {page} of {lastPage}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => load(page - 1, search)}
              className="rounded-lg border px-3 py-1.5 disabled:opacity-40"
            >
              ← Prev
            </button>
            <button
              disabled={page >= lastPage}
              onClick={() => load(page + 1, search)}
              className="rounded-lg border px-3 py-1.5 disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
