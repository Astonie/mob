import Link from "next/link";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { getPage } from "@/lib/api";
export const revalidate=3600;
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){ const {slug}=await params; try{ const {data}=await getPage(slug); return {title:data.title,description:data.excerpt||undefined}}catch{return {title:"Page"}}}
export default async function DynamicPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; if(["projects","minerals","news","careers","api","sustainability","about","contact","search"].includes(slug)) notFound();
  let page; try{ page=(await getPage(slug)).data }catch{ notFound() }
  return <><div className="mx-auto max-w-7xl px-6 lg:px-8 py-6 text-xs tracking-widest text-slate-500"><Link href="/" className="hover:text-slate-900">HOME</Link> / {page.title.toUpperCase()}</div><BlockRenderer blocks={page.blocks} /></>;
}
