"use client";

import { useState } from "react";

const inputClass = "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0F4A6B] focus:outline-none focus:ring-2 focus:ring-[#0F4A6B]/20 transition-all";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", company: "", service: "", message: "", website: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/v1/contact-submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || undefined,
          subject: formData.service || undefined,
          message: formData.message,
          website: formData.website,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", company: "", service: "", message: "", website: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="mt-6 rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
        <div className="font-semibold">Message sent successfully</div>
        <p className="mt-1">We&apos;ll get back to you within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid sm:grid-cols-2 gap-4">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-[13px] font-medium text-slate-700">Name *</label>
        <input id="name" required placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium text-slate-700">Email *</label>
        <input id="email" type="email" required placeholder="you@company.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} />
      </div>
      <div>
        <label htmlFor="company" className="mb-1.5 block text-[13px] font-medium text-slate-700">Company</label>
        <input id="company" placeholder="Company name" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className={inputClass} />
      </div>
      <div>
        <label htmlFor="service" className="mb-1.5 block text-[13px] font-medium text-slate-700">Service</label>
        <select id="service" value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className={inputClass}>
          <option value="">Select a service</option>
          <option>Exploration Targeting</option>
          <option>Resource Estimation (JORC)</option>
          <option>Mine Planning & Reserves</option>
          <option>ESG & Permitting</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-1.5 block text-[13px] font-medium text-slate-700">Message *</label>
        <textarea id="message" required rows={5} placeholder="Tell us about your project..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={inputClass} />
      </div>
      <div className="sm:col-span-2">
        <input type="text" name="website" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      </div>
      {status === "error" && (
        <div className="sm:col-span-2 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          Failed to send. Please try again or email us directly.
        </div>
      )}
      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "loading"} className="flex h-12 w-full items-center justify-center rounded-lg bg-[#0F4A6B] text-white text-sm font-semibold hover:bg-[#0a334d] transition-all shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]">
          {status === "loading" ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              Sending...
            </span>
          ) : "Send Message"}
        </button>
        <p className="mt-3 text-xs text-slate-500 text-center">Rate limited 5/min • Honeypot protected</p>
      </div>
    </form>
  );
}
