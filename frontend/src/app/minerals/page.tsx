import Link from "next/link";
import Image from "next/image";
import { getMinerals } from "@/lib/api";
import { PageHeader } from "@/components/ui/PageHeader";
import { mineralImages } from "@/lib/images";

export const revalidate = 3600;
export const metadata = { title: "Minerals & Commodities | Mob Limited", description: "Copper, cobalt, graphite, rare earths, gold, uranium — powering electrification across the SADC region." };

export default async function MineralsPage() {
  let minerals = [];
  try {
    const r = await getMinerals();
    minerals = (r as any).data?.data ?? (r as any).data ?? [];
  } catch {}
  const list = Array.isArray(minerals) ? minerals : (minerals as any).data ?? [];

  return (
    <div>
      <PageHeader
        title="Minerals & Commodities"
        subtitle="Copper, cobalt, graphite, rare earths, gold, uranium — powering electrification across the SADC region."
        breadcrumbs={[{ label: "Minerals" }]}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((m: any) => {
            const img = (mineralImages as Record<string, string>)[m.slug];
            return (
              <Link key={m.slug} href={`/minerals/${m.slug}`} className="group rounded-xl border border-slate-200 bg-white overflow-hidden hover:border-[#0F4A6B]/30 hover:shadow-md transition-all">
                {img && (
                  <div className="h-32 relative overflow-hidden bg-slate-100">
                    <Image src={img} alt={m.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                    <div className="absolute top-2 left-2 h-8 w-8 bg-[#0F4A6B] text-white flex items-center justify-center rounded-lg text-[11px] font-bold shadow-sm">
                      {m.chemical_symbol || m.name[0]}
                    </div>
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold group-hover:text-[#0F4A6B] transition-colors">{m.name}</h3>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-2">{m.summary}</p>
                  <span className="mt-3 inline-flex text-[11px] tracking-widest text-slate-500 font-medium">{m.category?.toUpperCase()}</span>
                </div>
              </Link>
            );
          })}
        </div>
        {!list.length && (
          <div className="mt-10 text-center text-sm text-slate-500 border border-dashed border-slate-300 rounded-xl p-10">
            No minerals available — API unavailable or empty.
          </div>
        )}
      </div>
    </div>
  );
}
