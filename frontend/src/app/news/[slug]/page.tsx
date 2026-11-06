import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getNewsArticle } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { PageHeader } from "@/components/ui/PageHeader";
import { sanitizeHtml } from "@/lib/sanitize";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const { data } = await getNewsArticle(slug);
    return { title: `${data.title} | Mob Limited`, description: data.excerpt || undefined };
  } catch {
    return { title: "News | Mob Limited" };
  }
}

export default async function NewsDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let article;
  try {
    article = (await getNewsArticle(slug)).data;
  } catch {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title={article.title}
        subtitle={article.excerpt || undefined}
        breadcrumbs={[
          { label: "News", href: "/news" },
          { label: article.title },
        ]}
      />
      <article className="mx-auto max-w-3xl px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 text-[12px] text-slate-500">
          {article.category && (
            <span className="px-2.5 py-1 rounded-full bg-[#0F4A6B]/10 text-[#0F4A6B] font-semibold">{article.category.name}</span>
          )}
          {article.published_at && <time dateTime={article.published_at}>{formatDate(article.published_at)}</time>}
        </div>
        <div className="mt-8 prose prose-slate max-w-none text-[15px] leading-7 text-slate-700" dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.content) || "<p></p>" }} />
        {article.tags?.length > 0 && (
          <div className="mt-8 flex gap-2 flex-wrap">
            {article.tags.map((t: any) => (
              <span key={t.slug} className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-600">{t.name}</span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
