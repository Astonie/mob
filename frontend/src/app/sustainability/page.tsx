import Image from "next/image";
import { miningImages } from "@/lib/images";
export const metadata={title:"Sustainability & ESG — SADC | Mob Limited"};
export default function Page(){ return (
  <div>
    <div className="relative h-64 overflow-hidden bg-[#0a1f2e]">
      <Image src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&auto=format&fit=crop&q=80" alt="Sustainability" fill className="object-cover opacity-25" unoptimized />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f2e] to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <p className="text-[11px] tracking-[0.18em] text-white/60 font-bold">ESG • SADC</p>
        <h1 className="font-serif text-4xl font-bold text-white mt-2">Sustainability — Malawi & SADC</h1>
        <p className="mt-3 text-white/75 max-w-2xl leading-7">Water, biodiversity, community and governance — SADC-grounded, IFC PS, Malawi Mines Act compliant.</p>
      </div>
    </div>
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          ["Water — Lake Malawi Basin","Hydro mining, 82% recycle, closed circuit. Zero discharge."],
          ["Biodiversity — Miombo","Restoration, offsets, Lake Malawi catchment."],
          ["Community — SADC Local Content","8-country enterprise, Malawian suppliers, training."],
          ["Climate — Energy","Solar hybrid studies, low-carbon natural rutile (Kasiya)."],
          ["Safety — Zero Harm","TRIFR targets, ISO 45001, SADC field HSE."],
          ["Governance — JORC Transparency","JORC/CP, NI 43-101 QP, SAMREC, EITI."],
        ].map(([t,d])=><div key={t} className="group border border-slate-200 bg-white overflow-hidden hover-lift"><div className="h-36 relative overflow-hidden bg-slate-100"><Image src={miningImages.pit} alt={t} fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized /><div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" /></div><div className="p-6"><h3 className="font-serif text-[16px] font-bold leading-tight">{t}</h3><p className="mt-2 text-sm text-slate-600 leading-6">{d}</p></div></div>)}
      </div>
    </div>
  </div>
);}
