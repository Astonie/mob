import { getPage } from "@/lib/api";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
export const revalidate=3600;
export const metadata={title:"About"};
export default async function About(){
  let page = null;
  try {
    const res = await getPage("about");
    page = res.data;
  } catch {
    page = null;
  }
  if (page) return <BlockRenderer blocks={page.blocks} />;
  return <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10"><h1 className="font-serif text-4xl font-bold">About Us</h1><p className="mt-4 text-slate-600">Our purpose: to create enduring value through responsible mining.</p></div>;
}
