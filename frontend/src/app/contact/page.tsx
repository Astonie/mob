import Image from "next/image";
import { miningImages } from "@/lib/images";
export const metadata={title:"Contact — Lilongwe HQ | Mob Limited"};
export default function Contact(){
  return (
    <div>
      <div className="relative h-64 overflow-hidden bg-[#0F4A6B]">
        <Image src={miningImages.hero} alt="Lilongwe" fill className="object-cover opacity-20" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F4A6B] to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-12">
          <h1 className="font-serif text-4xl font-bold text-white">Contact — Lilongwe HQ</h1>
          <p className="mt-3 text-white/80 max-w-2xl">Malawi-based, SADC-wide. Reach our Lilongwe, Blantyre, Karonga, Kolwezi, Solwezi teams.</p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <h3 className="font-serif text-xl font-bold">Visit Us</h3>
          <div className="mt-6 space-y-6 text-sm">
            <div className="border-l-[3px] border-[#0F4A6B] pl-4">
              <div className="font-bold text-[#0F4A6B] text-xs tracking-[0.14em]">HEAD OFFICE — LILONGWE</div>
              <div className="mt-2 text-slate-700 leading-6">Area 47 Sector 3<br />Lilongwe, Malawi<br />+265 1 123 456<br />info@moblimited.com</div>
            </div>
            <div className="border-l border-slate-200 pl-4">
              <div className="font-semibold text-xs tracking-[0.14em] text-slate-500">SADC HUBS</div>
              <div className="mt-2 text-slate-600 leading-6">Blantyre (Malawi) • Karonga (Kayelekera) • Kolwezi (DRC) • Solwezi (Zambia) • Balama (Mozambique) • Windhoek (Namibia) • Johannesburg (SA)</div>
            </div>
            <div className="relative h-48 rounded-sm overflow-hidden border">
              <Image src={miningImages.map} alt="SADC map" fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-[#0F4A6B]/10" />
              <div className="absolute bottom-2 left-2 bg-white px-2 py-1 text-xs font-medium shadow">SADC Region — 8 Countries</div>
            </div>
          </div>
        </div>
        <form className="lg:col-span-7 border border-slate-200 p-6 lg:p-8 bg-white shadow-sm" action="#">
          <h3 className="font-serif text-lg font-bold">Send an enquiry</h3>
          <p className="text-sm text-slate-600 mt-1">For exploration, JORC, ESIA or lender due diligence — response within one business day.</p>
          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            <input placeholder="Name *" className="border border-slate-300 px-3 py-2.5 text-sm focus:border-[#0F4A6B] focus:outline-none" />
            <input placeholder="Email *" className="border border-slate-300 px-3 py-2.5 text-sm focus:border-[#0F4A6B] focus:outline-none" />
            <input placeholder="Company" className="border border-slate-300 px-3 py-2.5 text-sm sm:col-span-2 focus:border-[#0F4A6B] focus:outline-none" />
            <select className="border border-slate-300 px-3 py-2.5 text-sm sm:col-span-2">
              <option>Service — Exploration / Resource / Mine Planning / ESG</option>
              <option>Exploration Targeting</option>
              <option>Resource Estimation (JORC)</option>
              <option>Mine Planning & Reserves</option>
              <option>ESG & Permitting</option>
            </select>
            <textarea placeholder="Message *" rows={5} className="border border-slate-300 px-3 py-2.5 text-sm sm:col-span-2 focus:border-[#0F4A6B] focus:outline-none" />
          </div>
          <button className="mt-6 w-full h-11 bg-[#0F4A6B] text-white text-[13px] font-bold tracking-wide hover:bg-[#0a334d] transition">Send Message</button>
          <p className="mt-3 text-xs text-slate-500 text-center">Rate limited 5/min • Honeypot protected • Private CMS</p>
        </form>
      </div>
    </div>
  );
}
