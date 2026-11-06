"use client";

import { useState } from "react";

export function CareerApplyForm({ slug }: { slug: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone: "", cover_letter: "" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/v1/careers/${slug}/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ first_name: "", last_name: "", email: "", phone: "", cover_letter: "" });
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-[#0F4A6B] focus:outline-none focus:ring-2 focus:ring-[#0F4A6B]/20";

  if (status === "success") {
    return (
      <div className="mt-4 rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
        Application submitted successfully.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 grid sm:grid-cols-2 gap-3">
      <input placeholder="First name" required value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} className={inputClass} />
      <input placeholder="Last name" required value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} className={inputClass} />
      <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={`${inputClass} sm:col-span-2`} />
      <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={`${inputClass} sm:col-span-2`} />
      <textarea placeholder="Cover letter" value={form.cover_letter} onChange={(e) => setForm({ ...form, cover_letter: e.target.value })} rows={4} className={`${inputClass} sm:col-span-2`} />
      {status === "error" && (
        <div className="sm:col-span-2 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          Failed to submit. Please try again.
        </div>
      )}
      <button disabled={status === "loading"} className="h-10 rounded-lg bg-[#0F4A6B] text-white text-sm font-semibold sm:col-span-2 hover:bg-[#0a334d] transition-colors shadow-sm disabled:opacity-60">
        {status === "loading" ? "Submitting..." : "Submit application"}
      </button>
    </form>
  );
}
