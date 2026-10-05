import { getPage } from "@/lib/api";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { PageHeader } from "@/components/ui/PageHeader";
import { miningImages } from "@/lib/images";

export const revalidate = 3600;
export const metadata = { title: "About | Mob Limited", description: "Malawi-based, SADC-wide mining consultancy. JORC, NI 43-101 & SAMREC compliant. 120+ projects across 8 SADC countries." };

export default async function About() {
  let page = null;
  try {
    const res = await getPage("about");
    page = res.data;
  } catch {
    page = null;
  }

  if (page) return <BlockRenderer blocks={page.blocks} />;

  return (
    <div>
      <PageHeader
        title="About Mob Limited"
        subtitle="Malawi-based, SADC-wide. From greenfield exploration to mine development — we de-risk your resource with world-class technical excellence."
        breadcrumbs={[{ label: "About" }]}
        image={miningImages.hero2}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#0a1f2e]">Our Story</h2>
            <p className="mt-4 text-[15px] leading-7 text-slate-700">
              Mob Limited is a Malawi-based integrated mining and mineral consultancy serving the entire SADC region. With over 10 years of experience and 120+ projects delivered, we provide JORC, NI 43-101 and SAMREC compliant technical services across the full mining value chain.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-slate-700">
              From our headquarters in Lilongwe, Malawi, we support exploration, resource estimation, mine planning, ESG and permitting across 8 SADC countries — including Zambia, DRC, Mozambique, Tanzania, South Africa, Zimbabwe, Botswana and Namibia.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-[11px] font-bold tracking-[0.14em] text-slate-500 uppercase">Our Values</h3>
            <ul className="mt-4 space-y-4">
              {[
                { title: "Technical Excellence", desc: "JORC/NI 43-101 compliant work by qualified professionals" },
                { title: "Integrity", desc: "Transparent, honest advice that de-risks your investment" },
                { title: "Sustainability", desc: "ESG-first approach to mining development" },
                { title: "Local Impact", desc: "Building capacity and opportunity across the SADC region" },
              ].map((v) => (
                <li key={v.title} className="flex gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#0F4A6B] shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{v.title}</div>
                    <div className="text-sm text-slate-600">{v.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          {[
            { value: "120+", label: "Projects Delivered" },
            { value: "10+", label: "Years Experience" },
            { value: "8", label: "SADC Countries" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className="font-serif text-3xl font-bold text-[#0F4A6B]">{stat.value}</div>
              <div className="mt-1 text-[11px] tracking-[0.14em] text-slate-500 uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
