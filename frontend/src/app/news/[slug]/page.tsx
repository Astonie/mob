import { notFound } from "next/navigation";
import Link from "next/link";
import { getNewsArticle } from "@/lib/api";
import { formatDate } from "@/lib/utils";
export const revalidate=3600;
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){ const {slug}=await params; try{ const {data}=await getNewsArticle(slug); return {title:data.title,description:data.excerpt||undefined}}catch{return {title:"News"}}}
export default async function NewsDetail({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; let article; try{ article=(await getNewsArticle(slug)).data }catch{ notFound() }
  return (
    <article className="mx-auto max-w-3xl px-6 lg:px-8 py-10">
      <Link href="/news" className="text-xs tracking-widest text-slate-500 hover:text-slate-900">← NEWS</Link>
      <p className="mt-4 text-xs tracking-widest text-[#0F4A6B] font-semibold">{article.category?.name?.toUpperCase()} • {article.published_at?formatDate(article.published_at):""}</p>
      <h1 className="font-serif text-3xl font-bold tracking-tight mt-2 leading-tight">{article.title}</h1>
      {article.excerpt && <p className="mt-4 text-lg text-slate-600 leading-7">{article.excerpt}</p>}
      <div className="mt-6 aspect-[16/9] bg-slate-100 border flex items-center justify-center text-xs text-slate-400">Featured Image</div>
      <div className="prose prose-slate max-w-none mt-6" dangerouslySetInnerHTML={{__html: article.content || "<p></p>"}} />
      <div className="mt-6 flex gap-2 flex-wrap">{article.tags.map((t:any)=><span key={t.slug} className="px-2 py-1 bg-slate-100 border text-xs">{t.name}</span>)}</div>
    </article>
  );
}
