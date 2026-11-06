"use client";
import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/admin";

export default function AuditPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    adminFetch<{ data: any[] } | any[]>("/admin/audit-logs?per_page=50")
      .then((r) => setRows(Array.isArray(r) ? r : r.data ?? []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <div className="py-16 text-center text-slate-500">Loading…</div>;
  return (
    <div>
      <h1 className="font-serif text-xl font-bold">Audit Log</h1>
      <div className="mt-4 overflow-hidden rounded-lg border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b bg-slate-50 text-xs text-slate-500">
            <tr><th className="px-4 py-2 text-left">When</th><th className="px-4 py-2 text-left">User</th><th className="px-4 py-2 text-left">Action</th><th className="px-4 py-2 text-left">Target</th><th className="px-4 py-2 text-left">IP</th></tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-2 text-xs text-slate-500">{r.created_at}</td>
                <td className="px-4 py-2">{r.user?.name ?? r.user_id ?? "—"}</td>
                <td className="px-4 py-2">{r.action}</td>
                <td className="px-4 py-2 font-mono text-xs">{r.auditable_type ? r.auditable_type.split("\\\\").pop() : "—"} {r.auditable_id ?? ""}</td>
                <td className="px-4 py-2 text-xs text-slate-500">{r.ip_address}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && <div className="p-6 text-center text-sm text-slate-500">No audit entries.</div>}
      </div>
    </div>
  );
}
