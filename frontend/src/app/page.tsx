import Link from "next/link";
import Image from "next/image";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { getPage, getProjects, getMinerals, getNews } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { miningImages, getProjectImage, mineralImages } from "@/lib/images";

export const revalidate = 3600;

async function getHomeData() {
  try {
    const [pageRes, projectsRes, mineralsRes, newsRes] = await Promise.all([
      getPage("home"),
      getProjects("per_page=3&featured=1"),
      getMinerals(),
      getNews("per_page=3&featured=1"),
    ]);
    return { page: pageRes.data, projects: projectsRes.data, minerals: mineralsRes, news: newsRes.data };
  } catch {
    return { page: null, projects: [], minerals: null, news: [] };
  }
}

export default async function HomePage() {
  const { page, projects, minerals, news } = await getHomeData();

  if (page) {
    return (
      <>
        <BlockRenderer blocks={page.blocks} />
        <FeaturedProjects projects={projects} />
        <MineralsStrip minerals={minerals} />
        <LatestNews news={news} />
        <ConsultancyHighlights />
        <TrustBar />
      </>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden bg-[#061a2a]">
        <div className="absolute inset-0">
          <Image src={miningImages.hero} alt="Open pit mine Malawi SADC" fill className="object-cover opacity-35" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a2e4a]/90 via-[#0F4A6B]/85 to-[#061a2a]/90" />
        </div>
        <svg className="absolute bottom-0 left-0 right-0 w-full h-[42%] opacity-[0.08] pointer-events-none" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0 280 L220 80 L340 60 L180 280 Z" fill="white" />
          <path d="M180 280 L340 60 L420 120 L520 20 L720 280 Z" fill="white" />
          <path d="M720 280 L520 20 L1440 280 Z" fill="white" />
        </svg>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl animate-in">
            <p className="text-[11px] tracking-[0.22em] text-white/70 font-semibold flex items-center gap-3"><span className="h-px w-8 bg-white/40" /> MALAWI • SADC • COPPERBELT • 8 COUNTRIES</p>
            <h1 className="mt-5 font-serif text-5xl lg:text-[52px] font-bold tracking-tight text-white leading-[1.02]">
              Integrated Mining<br />and Mineral<br /><span className="text-white/90">Consultancy</span>
            </h1>
            <p className="mt-6 text-[17px] leading-7 text-white/80 max-w-2xl font-light">
              Malawi-based, SADC-wide — from greenfield exploration in Lilongwe to mine development across Zambia, DRC, Mozambique & Tanzania. JORC, NI 43-101 & SAMREC compliant. 120+ projects.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/projects" className="h-[46px] px-8 inline-flex items-center bg-white text-[#0F4A6B] text-[13px] font-bold tracking-wide hover:bg-white/90 transition shadow-lg">Explore Services</Link>
              <Link href="/contact" className="h-[46px] px-8 inline-flex items-center border border-white/30 text-white text-[13px] font-semibold tracking-wide hover:bg-white/10 backdrop-blur">Contact Lilongwe HQ</Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-[11px] tracking-[0.16em] text-white/60">
              <span>Lilongwe HQ • Blantyre • Kolwezi • Solwezi</span><span className="h-3 w-px bg-white/15" /><span>JORC • NI 43-101 • SAMREC</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-9 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            ["Projects Delivered", "120+"],
            ["Years in SADC", "10+"],
            ["JORC Resources Defined", "2.1 Bt"],
            ["SADC Countries", "8"],
          ].map(([label, value]) => (
            <div key={label} className="border-l-[3px] border-[#0F4A6B] pl-5">
              <div className="font-serif text-[28px] font-bold text-[#0a1f2e] leading-none">{value}</div>
              <div className="text-[11px] tracking-[0.16em] text-slate-500 mt-2 font-medium">{label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function FeaturedProjects({ projects }: { projects: unknown[] }) {
  if (!projects?.length) return null;
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8 py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.18em] text-[#0F4A6B] font-bold">SELECTED WORK</p>
          <h2 className="font-serif text-[32px] font-bold tracking-tight leading-none mt-2">From discovery to development</h2>
          <p className="text-sm text-slate-600 mt-3 max-w-2xl">Technical excellence across exploration, resource modelling, mine planning and ESG — trusted by juniors, majors and funds.</p>
        </div>
        <Link href="/projects" className="text-[13px] font-semibold text-[#0F4A6B] hover:underline underline-offset-4">View all projects →</Link>
      </div>
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {(projects as Array<{ name: string; slug: string; summary: string; status: string; location: { name: string } | null }>).map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="group relative overflow-hidden border border-slate-200 bg-white hover-lift">
            <div className="relative h-40 overflow-hidden bg-slate-100">
              <Image src={getProjectImage(p.slug)} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-2 left-3 text-[10px] tracking-[0.14em] text-white/90 bg-black/30 backdrop-blur px-2 py-1 rounded-sm">{p.status?.toUpperCase()} • {p.location?.name || "SADC"}</div>
            </div>
            <div className="h-1 bg-gradient-to-r from-[#0F4A6B] to-[#2A7FA3]" />
            <div className="p-6">
              <h3 className="font-serif text-[18px] font-bold leading-tight group-hover:text-[#0F4A6B] transition-colors line-clamp-2">{p.name}</h3>
              <p className="mt-3 text-[13.5px] leading-6 text-slate-600 line-clamp-2">{p.summary}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0F4A6B]">Explore <span className="transition-transform group-hover:translate-x-1">→</span></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function MineralsStrip({ minerals }: { minerals: unknown }) {
  const list = (minerals as { data?: Array<{ name: string; slug: string; chemical_symbol: string; summary: string }> })?.data ?? [];
  if (!list.length) return null;
  return (
    <section className="bg-[#f8f9fb] border-y border-slate-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-14">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-2xl font-bold tracking-tight">Commodities we sign off</h2>
          <Link href="/minerals" className="text-sm font-semibold text-[#0F4A6B] hover:underline">All minerals →</Link>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {list.slice(0, 4).map((m) => {
            const img = (mineralImages as Record<string, string>)[m.slug] || miningImages.core;
            return (
              <Link key={m.slug} href={`/minerals/${m.slug}`} className="group bg-white border border-slate-200 overflow-hidden hover:border-[#0F4A6B]/20 hover:shadow-sm transition-all">
                <div className="h-28 relative overflow-hidden bg-slate-100">
                  <Image src={img} alt={m.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                  <div className="absolute top-2 left-2 h-8 w-8 bg-[#0F4A6B] text-white flex items-center justify-center text-[11px] font-black">{m.chemical_symbol || m.name[0]}</div>
                </div>
                <div className="p-5">
                  <div className="font-serif text-[16px] font-bold group-hover:text-[#0F4A6B]">{m.name}</div>
                  <p className="mt-2 text-[13px] leading-5 text-slate-600 line-clamp-2">{m.summary}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function LatestNews({ news }: { news: Array<{ title: string; slug: string; excerpt: string | null; published_at: string | null; category: { name: string } | null }> }) {
  if (!news?.length) return null;
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8 py-14">
      <div className="flex items-end justify-between">
        <h2 className="font-serif text-2xl font-bold tracking-tight">Insights</h2>
        <Link href="/news" className="text-sm font-semibold text-[#0F4A6B] hover:underline">All insights →</Link>
      </div>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {news.map((n) => (
          <Link key={n.slug} href={`/news/${n.slug}`} className="group border border-slate-200 bg-white overflow-hidden hover-lift">
            <div className="aspect-[16/10] relative overflow-hidden bg-slate-100 border-b">
              <Image src={miningImages.lab} alt={n.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="p-6">
              <div className="text-[11px] tracking-[0.14em] text-slate-500">{n.category?.name?.toUpperCase()} • {n.published_at ? formatDate(n.published_at) : ""}</div>
              <h3 className="mt-2 font-serif text-[16px] font-bold leading-5 group-hover:text-[#0F4A6B] line-clamp-2">{n.title}</h3>
              <p className="mt-2 text-[13px] text-slate-600 line-clamp-2 leading-5">{n.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ConsultancyHighlights() {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-6">
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white border border-slate-200 p-8 lg:p-10">
          <p className="text-[11px] tracking-[0.18em] text-[#0F4A6B] font-bold">WHY MOB</p>
          <h3 className="font-serif text-2xl font-bold tracking-tight mt-2 leading-tight">Technical rigour. Commercial clarity.</h3>
          <p className="mt-4 text-[14px] leading-7 text-slate-600">We combine field geology, JORC-compliant modelling and DRA-style mine planning with Zambian permitting expertise. Your study stands up to lenders, boards and regulators.</p>
          <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm">
            <div className="flex gap-3"><span className="h-6 w-6 bg-[#0F4A6B]/10 text-[#0F4A6B] flex items-center justify-center text-xs shrink-0">✓</span><span>Exploration targeting & QA/QC</span></div>
            <div className="flex gap-3"><span className="h-6 w-6 bg-[#0F4A6B]/10 text-[#0F4A6B] flex items-center justify-center text-xs shrink-0">✓</span><span>3D resource models (Leapfrog/Isatis)</span></div>
            <div className="flex gap-3"><span className="h-6 w-6 bg-[#0F4A6B]/10 text-[#0F4A6B] flex items-center justify-center text-xs shrink-0">✓</span><span>Pit optimisation & reserves</span></div>
            <div className="flex gap-3"><span className="h-6 w-6 bg-[#0F4A6B]/10 text-[#0F4A6B] flex items-center justify-center text-xs shrink-0">✓</span><span>ESIA, RAP & stakeholder</span></div>
          </div>
          <Link href="/about" className="mt-8 inline-flex text-[13px] font-bold tracking-wide text-[#0F4A6B] hover:underline underline-offset-4">Learn about Mob →</Link>
        </div>
        <div className="lg:col-span-5 bg-[#0F4A6B] text-white p-8 lg:p-10 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10"><svg width="220" height="140" viewBox="0 0 220 140"><path d="M0 110 L60 30 L85 22 L40 110 Z" fill="white" /><path d="M40 110 L85 22 L105 45 L130 12 L180 110 Z" fill="white" /></svg></div>
          <h3 className="font-serif text-2xl font-bold leading-tight relative">Start a project <br />with Mob</h3>
          <p className="mt-3 text-[14px] leading-6 text-white/80 relative">Scoping, PEA, PFS or FS — talk to our principal consultants. Response within one business day.</p>
          <Link href="/contact" className="mt-8 inline-flex h-11 px-7 items-center bg-white text-[#0F4A6B] text-[13px] font-bold tracking-wide hover:bg-white/90 transition relative">Contact Us</Link>
          <Link href="/careers" className="mt-3 block text-sm text-white/70 hover:text-white transition relative">Join Mob — we’re hiring →</Link>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6 flex flex-wrap items-center justify-between gap-4 text-xs tracking-[0.14em] text-slate-500">
        <span>TRUSTED BY JUNIORS • MAJORS • FUNDS • DEVELOPMENT BANKS</span>
        <span className="flex gap-6 font-medium"><span>Zambia</span><span>DRC</span><span>Botswana</span><span>Tanzania</span></span>
      </div>
    </section>
  );
}
