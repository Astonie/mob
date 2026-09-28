import Link from "next/link";
import { notFound } from "next/navigation";
import { getMineral } from "@/lib/api";
export const revalidate=3600;
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){ const {slug}=await params; try{const {data}=await getMineral(slug); return {title:data.name,description:data.summary||undefined}}catch{return {title:"Mineral"}}}
export default async function MineralDetail({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; let mineral; try{ mineral=(await getMineral(slug)).data }catch{ notFound() }
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
      <Link href="/minerals" className="text-xs tracking-widest text-slate-500 hover:text-slate-900">← MINERALS</Link>
      <div className="mt-4 flex gap-4 items-start">
        <div className="hidden sm:flex h-16 w-16 items-center justify-center bg-slate-900 text-white font-serif text-xl font-bold">{mineral.chemical_symbol || mineral.name[0]}</div>
        <div>
          <p className="text-xs tracking-widest text-[#0F4A6B] font-semibold">{mineral.category?.toUpperCase()} • {mineral.chemical_symbol}</p>
          <h1 className="font-serif text-4xl font-bold">{mineral.name}</h1>
          <p className="mt-3 text-slate-600 max-w-2xl leading-7">{mineral.summary}</p>
        </div>
      </div>
      <div className="mt-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h3 className="font-semibold">About</h3>
          <p className="mt-2 text-sm leading-7 text-slate-700">{mineral.description || "No description."}</p>
          {mineral.uses && <><h3 className="font-semibold mt-6">Uses</h3><p className="mt-2 text-sm leading-7 text-slate-700">{mineral.uses}</p></>}
          {mineral.projects?.length ? <><h3 className="font-semibold mt-6">Related Projects</h3><div className="mt-3 flex flex-wrap gap-2">{mineral.projects.map((p:any)=><Link key={p.slug} href={`/projects/${p.slug}`} className="px-3 py-1.5 border border-slate-200 text-sm hover:bg-slate-50">{p.name}</Link>)}</div></> : null}
        </div>
        <div className="border border-slate-200 bg-slate-50 p-6 h-fit"><h4 className="font-semibold text-sm">Properties</h4><pre className="mt-3 text-xs bg-white border p-3 overflow-auto">{JSON.stringify(mineral, null, 2).slice(0,1200)}</pre></div>
      </div>
    </div>
  );
}
