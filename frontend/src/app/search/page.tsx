import Link from "next/link";
export const metadata={title:"Search"};
export default async function Search({searchParams}:{searchParams:Promise<{q?:string}>}){
  const {q}=await searchParams;
  let results:any[]=[]; let total=0;
  if(q){
    try{
      const API=process.env.NEXT_PUBLIC_API_URL||"http://localhost:8000";
      const r=await fetch(`${API}/api/v1/search?q=${encodeURIComponent(q)}`,{next:{revalidate:60}});
      const j=await r.json(); results=j.data||[]; total=j.meta?.total ?? results.length;
    }catch{}
  }
  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-8 py-10">
      <h1 className="font-serif text-3xl font-bold">Search</h1>
      <form className="mt-4 flex gap-2"><input name="q" defaultValue={q} placeholder="Search pages, projects, minerals, news…" className="flex-1 border border-slate-300 px-4 py-2 text-sm" /><button className="h-10 px-6 bg-slate-900 text-white text-sm font-medium">Search</button></form>
      {q && <p className="mt-4 text-sm text-slate-600">{total} results for “{q}”</p>}
      <div className="mt-6 space-y-3">
        {results.map((r:any)=><Link key={`${r.type}-${r.id}`} href={`/${r.type==="news"?"news":r.type==="projects"?"projects":""}/${r.slug}`.replace("//","/")} className="block border border-slate-200 p-4 hover:bg-slate-50">
          <div className="text-xs tracking-widest text-slate-500">{r.type.toUpperCase()}</div><div className="font-medium">{r.title}</div><div className="text-sm text-slate-600 line-clamp-2">{r.excerpt}</div>
        </Link>)}
      </div>
    </div>
  );
}
