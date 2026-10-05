import Link from "next/link";
import Image from "next/image";
import { getNews } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { PageHeader } from "@/components/ui/PageHeader";
import { ListSkeleton, EmptyState } from "@/components/ui/Skeleton";

export const revalidate = 600;
export const metadata = { title: "News & Media | Mob Limited", description: "Press releases, operational updates and ESG stories from Mob Limited across the SADC region." };

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  let data = null;
  try {
    data = await getNews(page ? `page=${page}` : undefined);
  } catch {}
  const articles = data?.data ?? [];

  return (
    <div>
      <PageHeader
        title="News & Media"
        subtitle="Press releases, operational updates and ESG stories from across the SADC region."
        breadcrumbs={[{ label: "News" }]}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        {articles.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {articles.map((a: any) => (
              <Link key={a.slug} href={`/news/${a.slug}`} className="group rounded-xl border border-slate-200 bg-white overflow-hidden hover:border-[#0F4A6B]/30 hover:shadow-md transition-all">
                <div className="aspect-[16/9] relative overflow-hidden bg-slate-100">
                  <Image src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80" alt={a.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="p-5">
                  <div className="text-[11px] tracking-widest text-slate-500 font-medium">{a.category?.name?.toUpperCase()} • {a.published_at ? formatDate(a.published_at) : ""}</div>
                  <h3 className="mt-2 font-serif text-[16px] font-bold leading-5 group-hover:text-[#0F4A6B] transition-colors line-clamp-2">{a.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-2">{a.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState title="No articles yet" description="Check back soon for the latest news and updates." />
        )}
      </div>
    </div>
  );
}
