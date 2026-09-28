import Link from "next/link";
import { getMinerals } from "@/lib/api";
export const revalidate = 3600;
export const metadata = { title: "Minerals & Commodities" };
export default async function MineralsPage(){
  let minerals=[]; try{ const r=await getMinerals(); minerals=(r as any).data?.data ?? (r as any).data ?? []; }catch{}
  // handle paginated shape
  const list = Array.isArray(minerals) ? minerals : (minerals as any).data ?? [];
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
      <h1 className="font-serif text-4xl font-bold">Minerals & Commodities</h1>
      <p className="mt-4 text-slate-600 max-w-2xl leading-7">Copper, gold, cobalt and nickel — powering electrification from Zambia.</p>
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {list.map((m:any)=><Link key={m.slug} href={`/minerals/${m.slug}`} className="border border-slate-200 bg-white p-6 hover:border-[#0F4A6B]/20">
          <div className="flex h-10 w-10 items-center justify-center bg-slate-900 text-white font-bold text-sm">{m.chemical_symbol || m.name[0]}</div>
          <h3 className="mt-4 font-serif text-lg font-semibold">{m.name}</h3>
          <p className="mt-2 text-sm text-slate-600 line-clamp-3">{m.summary}</p>
          <span className="mt-3 inline-flex text-xs tracking-widest text-slate-500">{m.category?.toUpperCase()}</span>
        </Link>)}
      </div>
      {!list.length && <div className="mt-10 text-center text-sm text-slate-500 border border-dashed p-10">No minerals — API unavailable or empty.</div>}
    </div>
  );
}
