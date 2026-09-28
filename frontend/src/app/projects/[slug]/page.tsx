import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject } from "@/lib/api";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const { data } = await getProject(slug);
    return { title: data.name, description: data.summary ?? undefined };
  } catch {
    return { title: "Project" };
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

  return (
    <div>
      <div className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
          <Link href="/projects" className="text-xs tracking-widest text-slate-400 hover:text-white">← BACK TO PROJECTS</Link>
          <p className="mt-4 text-xs tracking-[0.18em] text-white/60 font-semibold">{project.status.toUpperCase()} • {project.stage?.toUpperCase()}</p>
          <h1 className="font-serif text-4xl font-bold tracking-tight mt-2">{project.name}</h1>
          <p className="mt-4 text-slate-300 max-w-3xl leading-7">{project.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            {project.minerals.map((m) => (
              <span key={m.slug} className="px-2 py-1 border border-white/20">{m.name}</span>
            ))}
            <span className="px-2 py-1 bg-white text-slate-900">{project.country}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h2 className="font-serif text-2xl font-bold">Overview</h2>
          <div className="prose prose-slate mt-4 max-w-none" dangerouslySetInnerHTML={{ __html: project.description || "<p>No description.</p>" }} />
          <div className="mt-8 grid sm:grid-cols-2 gap-4 text-sm">
            <div className="border border-slate-200 p-4"><div className="text-xs tracking-widest text-slate-500">OWNERSHIP</div><div className="font-semibold mt-1">{project.ownership_percentage || "100%"}</div></div>
            <div className="border border-slate-200 p-4"><div className="text-xs tracking-widest text-slate-500">LOCATION</div><div className="font-semibold mt-1">{project.location?.name || project.country}</div></div>
          </div>
        </div>
        <aside className="space-y-6">
          <div className="border border-slate-200 p-6 bg-slate-50">
            <h4 className="font-semibold text-sm">Project Facts</h4>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-slate-500">Status</dt><dd className="font-medium">{project.status}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">Type</dt><dd className="font-medium">{project.project_type ?? "—"}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-500">Code</dt><dd className="font-mono text-xs">{project.code ?? "—"}</dd></div>
            </dl>
          </div>
          <Link href="/contact" className="block text-center h-10 leading-10 bg-[#0F4A6B] text-white text-sm font-medium hover:bg-[#0a334d]">Enquire About Project</Link>
        </aside>
      </div>
    </div>
  );
}
