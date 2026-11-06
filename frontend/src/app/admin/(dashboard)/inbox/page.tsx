"use client";
import { useEffect, useState } from "react";
import { adminFetch, type PaginatedResponse } from "@/lib/admin";
import { StatusBadge } from "@/components/admin/ResourceAdmin";

type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  department: string | null;
  message: string;
  status: string;
  internal_notes: string | null;
  created_at: string;
};

type Application = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  status: string;
  internal_notes: string | null;
  cover_letter: string | null;
  resume_path: string | null;
  created_at: string;
  career?: { title: string; slug: string };
};

const CONTACT_STATUSES = ["new", "read", "replied", "archived", "spam"];
const APP_STATUSES = ["pending", "reviewed", "shortlisted", "rejected", "hired"];

export default function InboxAdmin() {
  const [tab, setTab] = useState<"contacts" | "applications">("contacts");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [apps, setApps] = useState<Application[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  function load() {
    Promise.all([
      adminFetch<PaginatedResponse<Contact>>("/admin/contact-submissions"),
      adminFetch<PaginatedResponse<Application>>("/admin/career-applications"),
    ])
      .then(([c, a]) => {
        setContacts(c.data ?? []);
        setApps(a.data ?? []);
      })
      .catch((e) => {
        if (e.status !== 401) setErr(e.message);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function updateContact(id: string, patch: Record<string, unknown>) {
    setErr(null);
    setOk(null);
    try {
      await adminFetch(`/admin/contact-submissions/${id}`, { method: "PATCH", json: patch });
      setOk("Updated");
      load();
    } catch (e) {
      setErr((e as Error).message);
    }
  }

  async function updateApp(id: string, patch: Record<string, unknown>) {
    setErr(null);
    setOk(null);
    try {
      await adminFetch(`/admin/career-applications/${id}`, { method: "PATCH", json: patch });
      setOk("Updated");
      load();
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
      <h1 className="font-serif text-xl font-bold">Inbox</h1>
      <p className="mt-1 text-sm text-slate-500">
        Contact enquiries and job applications from the public site.
      </p>

      {err && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{err}</div>
      )}
      {ok && (
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">{ok}</div>
      )}

      <div className="mt-4 flex gap-2">
        {(
          [
            ["contacts", `Contact messages (${contacts.length})`],
            ["applications", `Job applications (${apps.length})`],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              tab === key ? "bg-[#0F4A6B] text-white" : "border bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {tab === "contacts" &&
          contacts.map((c) => (
            <div key={c.id} className="rounded-lg border bg-white shadow-sm">
              <div className="flex flex-wrap items-center gap-3 px-4 py-3">
                <button onClick={() => setOpenId(openId === c.id ? null : c.id)} className="flex-1 text-left">
                  <div className="text-sm font-medium text-slate-800">
                    {c.name} <span className="font-normal text-slate-500">· {c.company || "no company"}</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {c.email}
                    {c.subject ? ` · ${c.subject}` : ""}
                    {c.department ? ` · ${c.department}` : ""} · {String(c.created_at).slice(0, 10)}
                  </div>
                </button>
                <StatusBadge value={c.status} />
                <select
                  value={c.status}
                  onChange={(e) => updateContact(c.id, { status: e.target.value })}
                  className="rounded-lg border px-2 py-1.5 text-xs"
                >
                  {CONTACT_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              {openId === c.id && (
                <div className="border-t bg-slate-50/60 px-4 py-4">
                  <p className="whitespace-pre-wrap text-sm text-slate-700">{c.message}</p>
                  <div className="mt-3">
                    <label className="mb-1 block text-xs font-medium text-slate-500">Internal notes</label>
                    <div className="flex gap-2">
                      <textarea
                        defaultValue={c.internal_notes ?? ""}
                        id={`notes-${c.id}`}
                        rows={2}
                        className="flex-1 rounded-lg border px-3 py-2 text-sm"
                      />
                      <button
                        onClick={() => {
                          const el = document.getElementById(`notes-${c.id}`) as HTMLTextAreaElement;
                          updateContact(c.id, { internal_notes: el.value });
                        }}
                        className="self-start rounded-lg bg-[#0F4A6B] px-4 py-2 text-xs text-white hover:bg-[#0d3d59]"
                      >
                        Save notes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        {tab === "applications" &&
          apps.map((a) => (
            <div key={a.id} className="rounded-lg border bg-white shadow-sm">
              <div className="flex flex-wrap items-center gap-3 px-4 py-3">
                <button onClick={() => setOpenId(openId === a.id ? null : a.id)} className="flex-1 text-left">
                  <div className="text-sm font-medium text-slate-800">
                    {a.first_name} {a.last_name}{" "}
                    <span className="font-normal text-slate-500">· {a.career?.title ?? "role"}</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {a.email}
                    {a.phone ? ` · ${a.phone}` : ""} · {String(a.created_at).slice(0, 10)}
                  </div>
                </button>
                <StatusBadge value={a.status} />
                <select
                  value={a.status}
                  onChange={(e) => updateApp(a.id, { status: e.target.value })}
                  className="rounded-lg border px-2 py-1.5 text-xs"
                >
                  {APP_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              {openId === a.id && (
                <div className="border-t bg-slate-50/60 px-4 py-4 space-y-3">
                  {a.cover_letter && (
                    <div>
                      <div className="text-xs font-medium text-slate-500">Cover letter</div>
                      <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">{a.cover_letter}</p>
                    </div>
                  )}
                  {a.resume_path && (
                    <a
                      href={`${process.env.NEXT_PUBLIC_API_URL}/storage/${a.resume_path}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-[#0F4A6B] hover:underline"
                    >
                      View resume ↗
                    </a>
                  )}
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-500">Internal notes</label>
                    <div className="flex gap-2">
                      <textarea
                        defaultValue={a.internal_notes ?? ""}
                        id={`appnotes-${a.id}`}
                        rows={2}
                        className="flex-1 rounded-lg border px-3 py-2 text-sm"
                      />
                      <button
                        onClick={() => {
                          const el = document.getElementById(`appnotes-${a.id}`) as HTMLTextAreaElement;
                          updateApp(a.id, { internal_notes: el.value });
                        }}
                        className="self-start rounded-lg bg-[#0F4A6B] px-4 py-2 text-xs text-white hover:bg-[#0d3d59]"
                      >
                        Save notes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        {tab === "contacts" && !contacts.length && (
          <div className="rounded-lg border bg-white p-6 text-center text-sm text-slate-500">
            No contact messages yet.
          </div>
        )}
        {tab === "applications" && !apps.length && (
          <div className="rounded-lg border bg-white p-6 text-center text-sm text-slate-500">
            No job applications yet.
          </div>
        )}
      </div>
    </div>
  );
}
