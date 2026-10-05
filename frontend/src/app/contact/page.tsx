"use client";

import { useState } from "react";
import Image from "next/image";
import { miningImages } from "@/lib/images";
import { PageHeader } from "@/components/ui/PageHeader";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", company: "", service: "", message: "", website: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/v1/contact-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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

  const inputClass = "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0F4A6B] focus:outline-none focus:ring-2 focus:ring-[#0F4A6B]/20 transition-all";

  return (
    <div>
      <PageHeader
        title="Contact — Lilongwe HQ"
        subtitle="Malawi-based, SADC-wide. Reach our Lilongwe, Blantyre, Karonga, Kolwezi, Solwezi teams."
        breadcrumbs={[{ label: "Contact" }]}
        image={miningImages.hero}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#0a1f2e]">Visit Us</h2>
              <div className="mt-6 space-y-6">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-[11px] font-bold tracking-[0.14em] text-[#0F4A6B] uppercase">Head Office — Lilongwe</div>
                  <div className="mt-3 text-[15px] text-slate-700 leading-7">
                    Area 47 Sector 3<br />
                    Lilongwe, Malawi<br />
                    <a href="tel:+2651123456" className="text-[#0F4A6B] font-medium hover:underline">+265 1 123 456</a><br />
                    <a href="mailto:info@moblimited.com" className="text-[#0F4A6B] font-medium hover:underline">info@moblimited.com</a>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-[11px] font-bold tracking-[0.14em] text-slate-500 uppercase">SADC Hubs</div>
                  <div className="mt-3 text-[15px] text-slate-600 leading-7">
                    Blantyre (Malawi) • Karonga (Kayelekera)<br />
                    Kolwezi (DRC) • Solwezi (Zambia)<br />
                    Balama (Mozambique) • Windhoek (Namibia)<br />
                    Johannesburg (South Africa)
                  </div>
                </div>
                <div className="relative h-48 rounded-xl overflow-hidden border border-slate-200">
                  <Image src={miningImages.map} alt="SADC map" fill className="object-cover" unoptimized />
                  <div className="absolute inset-0 bg-[#0F4A6B]/10" />
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 shadow-sm">
                    SADC Region — 8 Countries
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-slate-200 bg-white p-6 lg:p-8 shadow-sm">
              <h2 className="font-serif text-xl font-bold text-[#0a1f2e]">Send an enquiry</h2>
              <p className="mt-2 text-sm text-slate-600">For exploration, JORC, ESIA or lender due diligence — response within one business day.</p>
              {status === "success" ? (
                <div className="mt-6 rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
                  <div className="font-semibold">Message sent successfully</div>
                  <p className="mt-1">We'll get back to you within one business day.</p>
                </div>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
