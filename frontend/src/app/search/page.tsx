import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { getSiteSettingsSafe, settingString, apiBaseUrl } from "@/lib/api";
import { EmptyState } from "@/components/ui/Skeleton";

export const metadata = { title: "Search | Mob Limited", description: "Search projects, minerals, news and pages across Mob Limited." };

export default async function Search({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  let results: any[] = [];
  let total = 0;

  if (q) {
    try {
      const API = apiBaseUrl();
      const r = await fetch(`${API}/api/v1/search?q=${encodeURIComponent(q)}`, { next: { revalidate: 60 } });
      const j = await r.json();
      results = j.data || [];
      total = j.meta?.total ?? results.length;
    } catch {}
  }

  const settings = await getSiteSettingsSafe().catch(() => null);

  const typeLabels: Record<string, string> = {
    project: "Projects",
    mineral: "Minerals",
    news: "News",
    page: "Pages",
    career: "Careers",
  };

  return (
    <div>
      <PageHeader
        title={settingString(settings, "content.search_hero_title", "Search")}
        subtitle={settingString(settings, "content.search_hero_subtitle", "Search across projects, minerals, news and pages.")}
        breadcrumbs={[{ label: "Search" }]}
      />
      <div className="mx-auto max-w-3xl px-6 lg:px-8 py-12">
        <form action="/search" method="get" className="flex gap-3">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search projects, minerals, news..."
            className="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-[15px] focus:border-[#0F4A6B] focus:outline-none focus:ring-2 focus:ring-[#0F4A6B]/20 transition-all"
          />
          <button type="submit" className="h-[46px] px-6 rounded-lg bg-[#0F4A6B] text-white text-sm font-semibold hover:bg-[#0a334d] transition-colors shadow-sm">
            Search
          </button>
        </form>
        {q && (
          <p className="mt-4 text-sm text-slate-600">
            {total} result{total !== 1 ? "s" : ""} for &ldquo;{q}&rdquo;
          </p>
        )}
        <div className="mt-6 space-y-3">
          {results.map((r: any) => {
            const href = r.type === "news" ? `/news/${r.slug}` : r.type === "project" ? `/projects/${r.slug}` : r.type === "mineral" ? `/minerals/${r.slug}` : r.type === "career" ? `/careers/${r.slug}` : `/${r.slug}`;
            return (
              <Link key={`${r.type}-${r.id}`} href={href} className="block rounded-xl border border-slate-200 bg-white p-5 hover:border-[#0F4A6B]/30 hover:shadow-sm transition-all">
                <div className="text-[11px] tracking-widest text-slate-500 font-medium">{typeLabels[r.type] || r.type}</div>
                <div className="mt-1 font-serif text-[16px] font-bold text-[#0a1f2e]">{r.title}</div>
                {r.excerpt && <div className="mt-1 text-sm text-slate-600 line-clamp-2">{r.excerpt}</div>}
              </Link>
            );
          })}
        </div>
        {q && results.length === 0 && (
          <EmptyState title="No results found" description="Try different keywords or browse our projects and minerals." />
        )}
      </div>
    </div>
  );
}
