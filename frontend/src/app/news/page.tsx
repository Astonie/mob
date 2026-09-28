import Link from "next/link";
import { getNews } from "@/lib/api";
import { formatDate } from "@/lib/utils";
export const revalidate=600;
export const metadata={title:"News & Media"};
export default async function NewsPage({searchParams}:{searchParams:Promise<{page?:string}>}){
  const {page}=await searchParams; let data=null; try{ data=await getNews(page?`page=${page}`:undefined)}catch{}
  const articles=data?.data ?? [];
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
      <h1 className="font-serif text-4xl font-bold">News & Media</h1>
      <p className="mt-3 text-slate-600">Press releases, operational updates and ESG stories.</p>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {articles.map((a:any)=><Link key={a.slug} href={`/news/${a.slug}`} className="group border border-slate-200 bg-white">
          <div className="aspect-[16/9] bg-slate-100 border-b flex items-center justify-center text-xs text-slate-400">Image</div>
          <div className="p-5"><div className="text-xs tracking-widest text-slate-500">{a.category?.name?.toUpperCase()} • {a.published_at?formatDate(a.published_at):""}</div><h3 className="mt-2 font-semibold leading-5 group-hover:text-[#0F4A6B] line-clamp-2">{a.title}</h3><p className="mt-2 text-sm text-slate-600 line-clamp-2">{a.excerpt}</p></div>
        </Link>)}
      </div>
      {!articles.length && <div className="mt-10 text-center text-sm text-slate-500 border border-dashed p-10">No articles.</div>}
    </div>
  );
}
