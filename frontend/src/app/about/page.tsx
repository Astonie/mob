import Link from "next/link";
import { HeroBlock } from "@/components/blocks/HeroBlock";
import { getPage, getSiteSettingsSafe, settingString } from "@/lib/api";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { miningImages } from "@/lib/images";

export const revalidate = 3600;
export const metadata = { title: "About | Mob Limited", description: "Malawi-based, SADC-wide mining consultancy. JORC, NI 43-101 & SAMREC compliant. 120+ projects across 8 SADC countries." };

export default async function About() {
  const [page, settings] = await Promise.all([
    getPage("about").then((r) => r.data).catch(() => null),
    getSiteSettingsSafe(),
  ]);

  return (
    <>
      {page ? (
        <BlockRenderer blocks={page.blocks} />
      ) : (
        <FallbackAbout settings={settings} />
      )}
    </>
  );
}

function FallbackAbout({ settings }: { settings: Record<string, unknown> | null }) {
  const heroTitle = settingString(settings, "content.about_hero_title", "About Mob Limited");
  const heroSubtitle = settingString(settings, "content.about_hero_subtitle", "Malawi-based, SADC-wide. From greenfield exploration to mine development — we de-risk your resource with world-class technical excellence.");

  const values = [
    { title: "Integrity", desc: "We do what is right, always.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
    { title: "Safety", desc: "We protect our people, our clients & our environment.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" },
    { title: "Quality", desc: "We deliver excellence through proven standards.", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
    { title: "Partnership", desc: "We build lasting relationships for shared success.", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  ];

  const stats = [
    { value: "120+", label: "Projects Delivered" },
    { value: "10+", label: "Years Experience" },
    { value: "8", label: "SADC Countries" },
    { value: "50+", label: "Professionals" },
  ];

  const capabilities = [
    "Exploration & Targeting",
    "Resource Estimation (JORC / NI 43-101 / SAMREC)",
    "Mine Planning & Optimisation",
    "Metallurgy & Processing",
    "ESG & Permitting",
    "Geotechnical & Hydrogeology",
    "Due Diligence & Valuation",
    "Capacity Building & Training",
  ];

  return (
    <div>
      <HeroBlock data={{ heading: heroTitle, subheading: heroSubtitle, cta_label: "Talk to us", cta_url: "/contact", image: miningImages.hero2 }} />

      {/* Story */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <p className="text-[11px] tracking-[0.22em] text-[#0F4A6B] font-bold">OUR STORY</p>
            <h2 className="mt-3 font-serif text-3xl lg:text-4xl font-bold tracking-tight text-[#0a1f2e] leading-tight">
              Malawi-based. SADC-wide. <span className="text-[#0F4A6B]">Built for the Copperbelt and beyond.</span>
            </h2>
            <div className="mt-6 space-y-4 text-[16px] leading-8 text-slate-700">
              <p>
                Mob Limited is a Malawi-based integrated mining and mineral consultancy serving the entire SADC region. With over a decade of experience and 120+ projects delivered, we provide JORC, NI 43-101 and SAMREC compliant technical services across the full mining value chain.
              </p>
              <p>
                From our headquarters in Lilongwe, we support exploration, resource estimation, mine planning, ESG and permitting across 8 SADC countries — Zambia, DRC, Mozambique, Tanzania, South Africa, Zimbabwe, Botswana and Namibia.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/services" className="inline-flex h-11 px-6 items-center rounded-lg bg-[#0F4A6B] text-white text-[13px] font-semibold tracking-wide hover:bg-[#0a334d] transition-colors shadow-sm">
                Our services
              </Link>
              <Link href="/team" className="inline-flex h-11 px-6 items-center rounded-lg border border-slate-300 text-[#0a1f2e] text-[13px] font-semibold tracking-wide hover:bg-slate-50 transition-colors">
                Meet our team
              </Link>
              <Link href="/contact" className="inline-flex h-11 px-6 items-center rounded-lg border border-slate-300 text-[#0a1f2e] text-[13px] font-semibold tracking-wide hover:bg-slate-50 transition-colors">
                Talk to us
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a2e4a] via-[#0F4A6B] to-[#061a2a] p-8 text-white shadow-xl grain">
              <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-[#2A7FA3]/30 blur-3xl" />
              <p className="text-[11px] tracking-[0.22em] text-white/70 font-bold">WHY MOB</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-white/90">
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#7cc4e3] shrink-0" />Qualified professionals across geology, mining, processing and ESG</li>
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#7cc4e3] shrink-0" />Reporting codes: JORC, NI 43-101, SAMREC</li>
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#7cc4e3] shrink-0" />End-to-end: exploration to mine development</li>
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#7cc4e3] shrink-0" />Lender and regulator-ready deliverables</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#0a2e4a] text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-serif text-4xl lg:text-5xl font-bold tracking-tight">{s.value}</div>
                <div className="mt-2 text-[11px] tracking-[0.18em] text-white/60 uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="max-w-2xl">
          <p className="text-[11px] tracking-[0.22em] text-[#0F4A6B] font-bold">OUR VALUES</p>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#0a1f2e]">What we stand for</h2>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v) => (
            <div key={v.title} className="card-interactive rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0F4A6B]/10 text-[#0F4A6B]">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={v.icon} />
                </svg>
              </div>
              <h3 className="mt-4 font-serif text-[17px] font-bold text-[#0a1f2e]">{v.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <p className="text-[11px] tracking-[0.22em] text-[#0F4A6B] font-bold">CAPABILITIES</p>
              <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#0a1f2e]">What we do</h2>
              <p className="mt-4 text-[15px] leading-7 text-slate-600">
                Full-spectrum technical services for the mining value chain, delivered to international reporting standards.
              </p>
              <Link href="/services" className="mt-6 inline-flex text-[13px] font-bold tracking-wide text-[#0F4A6B] hover:underline underline-offset-4">
                All services →
              </Link>
            </div>
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-3">
              {capabilities.map((c) => (
                <div key={c} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0F4A6B] shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d3d59] via-[#0F4A6B] to-[#0a2e4a] px-8 lg:px-12 py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xl shadow-[#0F4A6B]/20 grain">
          <div>
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-white">Ready to de-risk your next project?</h2>
            <p className="mt-2 text-white/80 text-[15px]">Talk to our Lilongwe team — response within one business day.</p>
          </div>
          <Link href="/contact" className="inline-flex h-12 px-8 items-center rounded-lg bg-white text-[#0F4A6B] text-[13px] font-bold tracking-wide hover:bg-white/90 transition-colors shadow-lg shrink-0">
            Get in touch →
          </Link>
        </div>
      </section>
    </div>
  );
}
