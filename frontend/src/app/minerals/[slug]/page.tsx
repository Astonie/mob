import Link from "next/link";
import { notFound } from "next/navigation";
import { getMineral } from "@/lib/api";
import { PageHeader } from "@/components/ui/PageHeader";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const { data } = await getMineral(slug);
    return { title: `${data.name} | Mob Limited`, description: data.summary || undefined };
  } catch {
    return { title: "Mineral | Mob Limited" };
  }
}

export default async function MineralDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let mineral;
  try {
    mineral = (await getMineral(slug)).data;
  } catch {
    notFound();
  }

  const properties = [
    { label: "Chemical Symbol", value: mineral.chemical_symbol || "—" },
    { label: "Category", value: mineral.category || "—" },
    { label: "Related Projects", value: mineral.projects?.length ? `${mineral.projects.length} project${mineral.projects.length > 1 ? "s" : ""}` : "—" },
  ].filter((p) => p.value && p.value !== "—");

  return (
    <div>
      <PageHeader
        title={mineral.name}
        subtitle={mineral.summary || undefined}
        breadcrumbs={[
          { label: "Minerals", href: "/minerals" },
          { label: mineral.name },
        ]}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#0a1f2e]">About</h2>
              <p className="mt-3 text-[15px] leading-7 text-slate-700">{mineral.description || "No description available."}</p>
            </div>
            {mineral.uses && (
              <div>
                <h2 className="font-serif text-xl font-bold text-[#0a1f2e]">Uses</h2>
                <p className="mt-3 text-[15px] leading-7 text-slate-700">{mineral.uses}</p>
              </div>
            )}
            {mineral.projects && mineral.projects.length > 0 && (
              <div>
                <h2 className="font-serif text-xl font-bold text-[#0a1f2e]">Related Projects</h2>
                <div className="mt-4 grid sm:grid-cols-2 gap-3">
                  {mineral.projects.map((p: any) => (
                    <Link
                      key={p.slug}
                      href={`/projects/${p.slug}`}
                      className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 hover:border-[#0F4A6B]/30 hover:shadow-sm transition-all"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0F4A6B]/10 text-[#0F4A6B] text-sm font-bold">
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{p.name}</div>
                        <div className="text-xs text-slate-500">{p.status}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-[11px] font-bold tracking-[0.14em] text-slate-500 uppercase">Properties</h3>
              <dl className="mt-4 space-y-3">
                {properties.map((prop) => (
                  <div key={prop.label} className="flex justify-between items-baseline gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                    <dt className="text-[13px] text-slate-500">{prop.label}</dt>
                    <dd className="text-[13px] font-semibold text-slate-900 text-right">{prop.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-xl bg-[#0F4A6B] p-6 text-white">
              <h3 className="text-[11px] font-bold tracking-[0.14em] text-white/60 uppercase">Mob Limited</h3>
              <p className="mt-2 text-sm text-white/80 leading-6">
                Malawi-based, SADC-wide mining consultancy. JORC, NI 43-101 & SAMREC compliant.
              </p>
              <Link href="/contact" className="mt-4 inline-flex h-10 items-center rounded-lg bg-white px-5 text-[13px] font-semibold text-[#0F4A6B] hover:bg-white/90 transition-colors">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
