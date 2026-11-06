"use client";
import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin";

type U = { id: string; name: string; email: string; roles: string[]; two_factor_enabled: boolean; locked: boolean; last_login_at: string | null };

export default function UsersPage() {
  const [users, setUsers] = useState<U[]>([]);
  const [roles, setRoles] = useState<{ name: string }[]>([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", password_confirmation: "", roles: [] as string[] });
  const [editing, setEditing] = useState<U | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  function load() {
    adminFetch<{ data: U[] }>("/admin/users").then((r) => setUsers(Array.isArray(r) ? r : r.data ?? [])).catch((e) => setErr(e.message));
    adminFetch<{ data: { name: string }[] }>("/admin/roles").then((r) => setRoles(Array.isArray(r) ? r : r.data ?? [])).catch(() => {});
  }
  useEffect(load, []);

  async function create(e: React.FormEvent) {
    e.preventDefault(); setErr(null); setOk(null);
    try {
      await adminFetch("/admin/users", { method: "POST", json: form });
      setOk("User created"); setShowAdd(false); setForm({ name: "", email: "", password: "", password_confirmation: "", roles: [] });
      load();
    } catch (e2) { setErr((e2 as Error).message); }
  }
  async function saveEdit(e: React.FormEvent) {
    e.preventDefault(); if (!editing) return; setErr(null); setOk(null);
    try {
      await adminFetch(`/admin/users/${editing.id}`, { method: "PUT", json: { name: editing.name, email: editing.email, roles: editing.roles } });
      setOk("User updated"); setEditing(null); load();
    } catch (e2) { setErr((e2 as Error).message); }
  }
  async function del(u: U) {
    if (!confirm(`Delete ${u.email}?`)) return;
    await adminFetch(`/admin/users/${u.id}`, { method: "DELETE" });
    load();
  }
  async function toggleLock(u: U) {
    await adminFetch(`/admin/users/${u.id}`, { method: "PUT", json: { locked: !u.locked } });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-xl font-bold">Users & Roles</h1>
        <button onClick={() => setShowAdd((v) => !v)} className="rounded-lg bg-[#0F4A6B] px-4 py-2 text-sm text-white hover:bg-[#0d3d59]">+ Add user</button>
      </div>
      {err && <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{err}</div>}
      {ok && <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">{ok}</div>}

      {showAdd && (
        <form onSubmit={create} className="mt-4 grid gap-3 rounded-lg border bg-white p-4 shadow-sm sm:grid-cols-2">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" required className="rounded-lg border px-3 py-2 text-sm" />
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" type="email" required className="rounded-lg border px-3 py-2 text-sm" />
          <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password (min 12)" type="password" required className="rounded-lg border px-3 py-2 text-sm" />
          <input value={form.password_confirmation} onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })} placeholder="Confirm password" type="password" required className="rounded-lg border px-3 py-2 text-sm" />
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-slate-500">Roles</label>
            <div className="flex flex-wrap gap-2">
              {roles.map((r) => (
                <label key={r.name} className="flex items-center gap-1 text-sm">
                  <input type="checkbox" checked={form.roles.includes(r.name)} onChange={(e) => { const v = e.target.checked ? [...form.roles, r.name] : form.roles.filter((x) => x !== r.name); setForm({ ...form, roles: v }); }} />
                  {r.name}
                </label>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2 flex gap-2">
            <button className="rounded-lg bg-[#0F4A6B] px-4 py-2 text-sm text-white hover:bg-[#0d3d59]">Create</button>
            <button type="button" onClick={() => setShowAdd(false)} className="rounded-lg border px-4 py-2 text-sm text-slate-600">Cancel</button>
          </div>
        </form>
      )}

      {editing && (
        <form onSubmit={saveEdit} className="mt-4 grid gap-3 rounded-lg border bg-white p-4 shadow-sm sm:grid-cols-2">
          <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" />
          <input value={editing.email} onChange={(e) => setEditing({ ...editing, email: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" />
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-slate-500">Roles</label>
            <div className="flex flex-wrap gap-2">
              {roles.map((r) => (
                <label key={r.name} className="flex items-center gap-1 text-sm">
                  <input type="checkbox" checked={editing.roles.includes(r.name)} onChange={(e) => { if (!editing) return; const v = e.target.checked ? [...editing.roles, r.name] : editing.roles.filter((x) => x !== r.name); setEditing({ ...editing, roles: v }); }} />
                  {r.name}
                </label>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2 flex gap-2">
            <button className="rounded-lg bg-[#0F4A6B] px-4 py-2 text-sm text-white hover:bg-[#0d3d59]">Save</button>
            <button type="button" onClick={() => setEditing(null)} className="rounded-lg border px-4 py-2 text-sm text-slate-600">Cancel</button>
          </div>
        </form>
      )}

      <div className="mt-6 overflow-hidden rounded-lg border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b bg-slate-50 text-xs text-slate-500">
            <tr><th className="px-4 py-2 text-left">Name</th><th className="px-4 py-2 text-left">Email</th><th className="px-4 py-2 text-left">Roles</th><th className="px-4 py-2 text-left">2FA</th><th className="px-4 py-2 text-left">Status</th><th className="px-4 py-2 text-left">Actions</th></tr>
          </thead>
          <tbody className="divide-y">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="px-4 py-2 font-medium">{u.name}</td>
                <td className="px-4 py-2 text-xs text-slate-500">{u.email}</td>
                <td className="px-4 py-2 text-xs">{u.roles.join(", ") || "—"}</td>
                <td className="px-4 py-2 text-xs">{u.two_factor_enabled ? "On" : "Off"}</td>
                <td className="px-4 py-2 text-xs">{u.locked ? "Locked" : "Active"}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button onClick={() => setEditing(u)} className="rounded border px-2 py-1 text-xs text-[#0F4A6B]">Edit</button>
                    <button onClick={() => toggleLock(u)} className="rounded border px-2 py-1 text-xs text-slate-600">{u.locked ? "Unlock" : "Lock"}</button>
                    <button onClick={() => del(u)} className="rounded border border-red-200 px-2 py-1 text-xs text-red-600">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
