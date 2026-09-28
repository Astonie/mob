import Link from "next/link";
import Image from "next/image";
import { getProjects } from "@/lib/api";
import { getProjectImage } from "@/lib/images";

export const revalidate = 600;
export const metadata = { title: "Projects — Malawi & SADC | Mob Limited" };

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  let data = null;
  try {
    const res = await getProjects(status ? `status=${status}` : undefined);
    data = res;
  } catch {
    data = null;
  }
  const projects = data?.data ?? [];
  return (
    <div>
      <div className="relative overflow-hidden bg-[#0F4A6B]">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1600&auto=format&fit=crop&q=80" alt="SADC mining" fill className="object-cover opacity-20" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F4A6B] to-[#0F4A6B]/70" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-12">
          <p className="text-[11px] tracking-[0.18em] text-white/70 font-semibold">MALAWI • SADC REGION</p>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-white mt-2">Projects Across the SADC</h1>
          <p className="mt-3 text-white/80 max-w-3xl leading-7">From Kasiya rutile in Malawi to Kolwezi cobalt in DRC and Balama graphite in Mozambique — Mob’s footprint spans 8 SADC countries, JORC/NI 43-101 compliant.</p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        <div className="flex gap-2 text-sm">
          {[
            ["All", ""],
            ["Operation", "operation"],
            ["Development", "development"],
            ["Exploration", "exploration"],
          ].map(([label, val]) => (
            <Link key={label} href={val ? `/projects?status=${val}` : "/projects"} className={`px-4 py-2 border text-[13px] font-medium ${status === val || (!status && !val) ? "bg-[#0F4A6B] text-white border-[#0F4A6B]" : "border-slate-300 hover:bg-slate-50"}`}>{label}</Link>
          ))}
        </div>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="group border border-slate-200 bg-white overflow-hidden hover-lift">
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <Image src={getProjectImage(p.slug)} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-2 left-2 text-[11px] tracking-[0.14em] text-white bg-black/30 backdrop-blur px-2 py-1 rounded-sm">{p.status.toUpperCase()} • {p.country ?? "SADC"}</div>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-bold leading-tight group-hover:text-[#0F4A6B] line-clamp-2">{p.name}</h3>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2 leading-6">{p.summary}</p>
                <div className="mt-3 flex gap-1.5 flex-wrap">
                  {p.minerals.slice(0, 3).map((m) => (
                    <span key={m.slug} className="px-2 py-1 bg-[#f8f9fb] text-xs border border-slate-200">{m.name}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
        {!projects.length && <div className="mt-12 text-center text-sm text-slate-500 border border-dashed p-10">No projects match this filter — or API unavailable.</div>}
      </div>
    </div>
  );
}
