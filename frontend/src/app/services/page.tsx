import Link from "next/link";
import Image from "next/image";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { CoreServicesSection } from "@/components/sections/BrandSections";
import {
  getPage,
  getMinerals,
  getProjects,
  getEsgContentsSafe,
  getSiteSettingsSafe,
  settingString,
  publicMediaUrl,
  type Mineral,
  type Project,
  type EsgContent,
} from "@/lib/api";
import { miningImages } from "@/lib/images";

export const revalidate = 3600;
export const metadata = {
  title: "Our Services | Mob Limited",
  description:
    "Integrated Mining & Mineral Solutions — geological services, exploration, surveying, geophysics, mining consultancy, environmental compliance and project delivery across the SADC region.",
};

const mineralIcons: Record<string, string> = {
  Copper: "Cu", Cobalt: "Co", Graphite: "C", "Rare Earths": "RE", Gold: "Au", Uranium: "U",
};

export default async function ServicesPage() {
  const [cmsPage, mineralsRes, projectsRes, esg, settings] = await Promise.all([
    getPage("services").then((r) => r.data).catch(() => null),
    getMinerals().catch(() => ({ data: [] as Mineral[] })),
    getProjects("per_page=6").catch(() => ({ data: [] as Project[] })),
    getEsgContentsSafe(),
    getSiteSettingsSafe(),
  ]);

  if (cmsPage) return <BlockRenderer blocks={cmsPage.blocks} />;

  const minerals: Mineral[] = (mineralsRes as any)?.data ?? [];
  const projects: Project[] = (projectsRes as any)?.data ?? [];
  const esgTopics: EsgContent[] = esg ?? [];

  const heroTitle = settingString(settings, "content.services_hero_title", "Our Services");
  const heroSubtitle = settingString(
    settings,
    "content.services_hero_subtitle",
    "Integrated Mining & Mineral Solutions — exploring potential and delivering value from greenfield exploration to mine development across the SADC region."
  );

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-[#0a1f2e] text-white">
        <div className="absolute inset-0">
          <Image src={miningImages.hero} alt="" fill priority className="object-cover opacity-30" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f2e]/60 via-[#0a1f2e]/80 to-[#0a1f2e]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-20 lg:pt-32 lg:pb-28">
          <p className="text-[11px] tracking-[0.32em] text-[#7cc4e3] font-bold">MOB LIMITED — SADC</p>
          <h1 className="mt-5 font-serif text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] max-w-4xl">{heroTitle}</h1>
          <p className="mt-6 max-w-2xl text-lg lg:text-xl leading-8 text-white/80">{heroSubtitle}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="#minerals" className="inline-flex h-12 px-7 items-center rounded-lg bg-white text-[#0F4A6B] text-[13px] font-bold tracking-wide hover:bg-white/90 transition-colors shadow-lg">Explore services</Link>
            <Link href="/contact" className="inline-flex h-12 px-7 items-center rounded-lg border border-white/30 text-white text-[13px] font-bold tracking-wide hover:bg-white/10 transition-colors">Talk to us</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="text-[11px] tracking-[0.22em] text-[#0F4A6B] font-bold">WHAT WE DO</p>
            <h2 className="mt-3 font-serif text-3xl lg:text-5xl font-bold tracking-tight text-[#0a1f2e] leading-tight">Full-spectrum technical services for the mining value chain.</h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[16px] leading-8 text-slate-600">From greenfield exploration to mine development, we deliver JORC, NI 43-101 and SAMREC compliant work across eight SADC countries — lender and regulator ready.</p>
          </div>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {[
            { k: "01", t: "Minerals & Commodities", d: "Copper, cobalt, graphite, rare earths, gold, uranium — powering electrification and the energy transition." },
            { k: "02", t: "Projects & Operations", d: "Exploration to mine development across the Copperbelt and beyond." },
            { k: "03", t: "Sustainability & ESG", d: "Water, biodiversity, community and governance — SADC-grounded, IFC PS compliant." },
          ].map((c) => (
            <div key={c.k} className="group relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl hover:border-[#0F4A6B]/30 transition-all">
              <span className="font-serif text-5xl font-bold text-[#0F4A6B]/15 group-hover:text-[#0F4A6B]/30 transition-colors">{c.k}</span>
              <h3 className="mt-4 font-serif text-xl font-bold text-[#0a1f2e]">{c.t}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <CoreServicesSection
        eyebrow="OUR CORE SERVICES"
        title="Seven disciplines. One integrated team."
        intro="Every discipline in the mining value chain — delivered by senior specialists and reporting-ready teams across the SADC region."
        showCtaCard={false}
      />

      <section id="minerals" className="bg-slate-50 border-y border-slate-200 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-[11px] tracking-[0.22em] text-[#0F4A6B] font-bold">MINERALS & COMMODITIES</p>
              <h2 className="mt-3 font-serif text-3xl lg:text-4xl font-bold tracking-tight text-[#0a1f2e]">Commodities we sign off</h2>
            </div>
            <Link href="/minerals" className="text-[13px] font-bold tracking-wide text-[#0F4A6B] hover:underline underline-offset-4">All minerals →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {minerals.slice(0, 6).map((m: Mineral) => (
              <Link key={m.slug} href={`/minerals/${m.slug}`} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F4A6B]/10 text-[#0F4A6B] font-serif text-lg font-bold group-hover:bg-[#0F4A6B] group-hover:text-white transition-colors">{mineralIcons[m.name] ?? m.name.slice(0, 2)}</span>
                  {m.is_featured && <span className="text-[10px] tracking-[0.18em] font-bold text-amber-600">FEATURED</span>}
                </div>
                <h3 className="mt-5 font-serif text-lg font-bold text-[#0a1f2e] group-hover:text-[#0F4A6B] transition-colors">{m.name}</h3>
                {m.chemical_symbol && <p className="mt-1 text-[12px] font-mono text-slate-400">{m.chemical_symbol}</p>}
                <p className="mt-3 text-sm leading-6 text-slate-600 line-clamp-3">{m.summary || m.description || "Critical mineral for the energy transition."}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-[12px] font-semibold text-[#0F4A6B]">Learn more <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-[11px] tracking-[0.22em] text-[#0F4A6B] font-bold">PROJECTS & OPERATIONS</p>
              <h2 className="mt-3 font-serif text-3xl lg:text-4xl font-bold tracking-tight text-[#0a1f2e]">From discovery to development</h2>
            </div>
            <Link href="/projects" className="text-[13px] font-bold tracking-wide text-[#0F4A6B] hover:underline underline-offset-4">All projects →</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 6).map((p: Project) => {
              const img = miningImages.hero2;
              return (
                <Link key={p.slug} href={`/projects/${p.slug}`} className="group relative overflow-hidden rounded-2xl bg-[#0a1f2e] aspect-[4/3] shadow-md hover:shadow-xl transition-all">
                  <Image src={img} alt={p.name} fill className="object-cover opacity-70 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f2e] via-[#0a1f2e]/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-[10px] tracking-[0.22em] text-[#7cc4e3] font-bold">{p.status?.toUpperCase()}</p>
                    <h3 className="mt-2 font-serif text-xl font-bold text-white leading-tight">{p.name}</h3>
                    {p.location && <p className="mt-1 text-sm text-white/70">{p.location.name}, {p.location.country}</p>}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="sustainability" className="bg-[#0a2e4a] text-white scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-[11px] tracking-[0.22em] text-[#7cc4e3] font-bold">SUSTAINABILITY & ESG</p>
              <h2 className="mt-3 font-serif text-3xl lg:text-4xl font-bold tracking-tight">Responsible mining, SADC-grounded</h2>
            </div>
            <Link href="/sustainability" className="text-[13px] font-bold tracking-wide text-[#7cc4e3] hover:underline underline-offset-4">Full ESG report →</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(esgTopics.length ? esgTopics : []).slice(0, 6).map((e: EsgContent) => (
              <div key={e.slug} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-7 hover:bg-white/10 transition-colors">
                <h3 className="font-serif text-lg font-bold text-white">{e.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/70">{e.summary || e.content?.slice(0, 160)}</p>
              </div>
            ))}
            {esgTopics.length === 0 && (
              <>
                {[
                  { t: "Water — Lake Malawi Basin", d: "Hydro mining, 82% recycle, closed circuit. Zero discharge." },
                  { t: "Biodiversity — Miombo", d: "Restoration, offsets, Lake Malawi catchment." },
                  { t: "Community — SADC Local Content", d: "8-country enterprise, Malawian suppliers, training." },
                  { t: "Climate — Energy", d: "Solar hybrid studies, low-carbon natural rutile." },
                  { t: "Safety — Zero Harm", d: "TRIFR targets, ISO 45001, SADC field HSE." },
                  { t: "Governance — JORC Transparency", d: "JORC/CP, NI 43-101 QP, SAMREC, EITI." },
                ].map((x) => (
                  <div key={x.t} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-7">
                    <h3 className="font-serif text-lg font-bold text-white">{x.t}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/70">{x.d}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
        <div className="max-w-2xl mb-12">
          <p className="text-[11px] tracking-[0.22em] text-[#0F4A6B] font-bold">HOW WE WORK</p>
          <h2 className="mt-3 font-serif text-3xl lg:text-4xl font-bold tracking-tight text-[#0a1f2e]">A clear path from idea to mine</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { n: "01", t: "Explore", d: "Geological mapping, targeting and early-stage evaluation." },
            { n: "02", t: "Evaluate", d: "Resource definition, technical studies and due diligence." },
            { n: "03", t: "Develop", d: "Mine planning, permitting and project delivery." },
            { n: "04", t: "Deliver", d: "Owner's team support, HSE, reporting and field logistics." },
          ].map((s) => (
            <div key={s.n} className="relative rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <span className="font-serif text-4xl font-bold text-[#0F4A6B]/20">{s.n}</span>
              <h3 className="mt-3 font-serif text-lg font-bold text-[#0a1f2e]">{s.t}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0d3d59] via-[#0F4A6B] to-[#0a2e4a] px-8 lg:px-16 py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-2xl shadow-[#0F4A6B]/30 grain">
          <div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white leading-tight">Ready to de-risk your next project?</h2>
            <p className="mt-3 text-white/80 text-[16px] max-w-xl">Talk to our Lilongwe team. Response within one business day.</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/contact" className="inline-flex h-12 px-8 items-center rounded-lg bg-white text-[#0F4A6B] text-[13px] font-bold tracking-wide hover:bg-white/90 transition-colors shadow-lg">Get in touch →</Link>
            <Link href="/projects" className="inline-flex h-12 px-8 items-center rounded-lg border border-white/30 text-white text-[13px] font-bold tracking-wide hover:bg-white/10 transition-colors">View our work</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
