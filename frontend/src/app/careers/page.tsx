import Link from "next/link";
import { getCareers } from "@/lib/api";
export const revalidate=600;
export const metadata={title:"Careers"};
export default async function CareersPage(){
  let data=null; try{ data=await getCareers(); }catch{}
  const careers=data?.data ?? [];
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
      <h1 className="font-serif text-4xl font-bold">Careers</h1>
      <p className="mt-3 text-slate-600 max-w-2xl">Join 12,400 people building the energy transition. Roles in geology, mining, processing, ESG, finance and community.</p>
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        {careers.map((c:any)=><Link key={c.slug} href={`/careers/${c.slug}`} className="border border-slate-200 p-6 bg-white hover:border-slate-300">
          <div className="text-xs tracking-widest text-slate-500">{c.department?.toUpperCase()} • {c.location}</div>
          <h3 className="mt-2 font-semibold">{c.title}</h3>
          <p className="mt-2 text-sm text-slate-600 line-clamp-2">{c.summary}</p>
          <span className="mt-3 inline-flex text-sm font-medium text-[#0F4A6B]">{c.employment_type?.replace("_"," ")} →</span>
          {c.deadline && <div className="mt-2 text-xs text-slate-500">Closes {c.deadline}</div>}
        </Link>)}
      </div>
      {!careers.length && <div className="mt-10 text-center text-sm text-slate-500 border border-dashed p-10">No open roles — check back soon.</div>}
    </div>
  );
}
