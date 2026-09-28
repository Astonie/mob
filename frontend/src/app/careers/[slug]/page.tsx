import { notFound } from "next/navigation";
import Link from "next/link";
export const revalidate=600;
export default async function CareerDetail({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const API=process.env.NEXT_PUBLIC_API_URL||"http://localhost:8000";
  let career=null; try{ const r=await fetch(`${API}/api/v1/careers/${slug}`,{next:{revalidate:600}}); if(!r.ok) throw new Error(); const j=await r.json(); career=j.data; }catch{ notFound() }
  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-8 py-10">
      <Link href="/careers" className="text-xs tracking-widest text-slate-500 hover:text-slate-900">← CAREERS</Link>
      <p className="mt-4 text-xs tracking-widest text-[#0F4A6B] font-semibold">{career.department} • {career.location} • {career.employment_type}</p>
      <h1 className="font-serif text-3xl font-bold mt-2">{career.title}</h1>
      <p className="mt-4 text-slate-600 leading-7">{career.summary}</p>
      <div className="prose prose-slate mt-6 max-w-none" dangerouslySetInnerHTML={{__html: career.description || ""}} />
      <form className="mt-8 border border-slate-200 p-6 bg-slate-50" action="#">
        <h3 className="font-semibold">Apply</h3>
        <p className="text-sm text-slate-600 mt-1">Submit via API POST /api/v1/careers/{slug}/applications (multipart with resume). This form is a UI placeholder — wire to backend.</p>
        <div className="mt-4 grid sm:grid-cols-2 gap-3">
          <input placeholder="First name" className="border px-3 py-2 text-sm" />
          <input placeholder="Last name" className="border px-3 py-2 text-sm" />
          <input placeholder="Email" className="border px-3 py-2 text-sm sm:col-span-2" />
        </div>
        <button className="mt-4 h-9 px-6 bg-slate-900 text-white text-sm font-medium">Submit application</button>
      </form>
    </div>
  );
}
