import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject } from "@/lib/api";
import { PageHeader } from "@/components/ui/PageHeader";
import { getProjectImage } from "@/lib/images";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const { data } = await getProject(slug);
    return { title: `${data.name} | Mob Limited`, description: data.summary ?? undefined };
  } catch {
    return { title: "Project | Mob Limited" };
  }
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let project;
  try {
    const res = await getProject(slug);
    project = res.data;
  } catch {
    notFound();
  }

  const facts = [
    { label: "Status", value: project.status },
    { label: "Stage", value: project.stage || "—" },
    { label: "Type", value: project.project_type || "—" },
    { label: "Country", value: project.country || "—" },
    { label: "Ownership", value: project.ownership_percentage || "—" },
    { label: "Code", value: project.code || "—" },
  ];

  return (
    <div>
      <div className="relative overflow-hidden bg-[#0a1f2e]">
        <div className="absolute inset-0">
          <img src={getProjectImage(project.slug)} alt="" className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f2e] via-[#0a1f2e]/80 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-12 lg:py-16">
          <Link href="/projects" className="text-[12px] tracking-widest text-white/50 hover:text-white transition-colors">← BACK TO PROJECTS</Link>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold tracking-wider">{project.status.toUpperCase()}</span>
            {project.stage && <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold tracking-wider">{project.stage.toUpperCase()}</span>}
            <span className="px-2.5 py-1 rounded-full bg-[#0F4A6B] text-white text-[11px] font-semibold tracking-wider">{project.country}</span>
          </div>
          <h1 className="mt-4 font-serif text-3xl lg:text-4xl font-bold tracking-tight text-white">{project.name}</h1>
          <p className="mt-4 text-white/70 max-w-3xl leading-7">{project.summary}</p>
          {project.minerals?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.minerals.map((m: any) => (
                <Link key={m.slug} href={`/minerals/${m.slug}`} className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-colors">
                  {m.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#0a1f2e]">Overview</h2>
              <div className="prose prose-slate mt-4 max-w-none text-[15px] leading-7 text-slate-700" dangerouslySetInnerHTML={{ __html: project.description || "<p>No description available.</p>" }} />
            </div>
          </div>
          <aside className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-[11px] font-bold tracking-[0.14em] text-slate-500 uppercase">Project Facts</h3>
              <dl className="mt-4 space-y-3">
                {facts.map((fact) => (
                  <div key={fact.label} className="flex justify-between items-baseline gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                    <dt className="text-[13px] text-slate-500">{fact.label}</dt>
                    <dd className="text-[13px] font-semibold text-slate-900 text-right">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <Link href="/contact" className="flex h-11 items-center justify-center rounded-lg bg-[#0F4A6B] text-white text-sm font-semibold hover:bg-[#0a334d] transition-all shadow-sm">
              Enquire About Project
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
