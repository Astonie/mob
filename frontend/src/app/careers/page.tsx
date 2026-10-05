import Link from "next/link";
import { getCareers } from "@/lib/api";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/Skeleton";

export const revalidate = 600;
export const metadata = { title: "Careers | Mob Limited", description: "Join Mob Limited — roles in geology, mining, processing, ESG, finance and community across the SADC region." };

export default async function CareersPage() {
  let data = null;
  try {
    data = await getCareers();
  } catch {}
  const careers = data?.data ?? [];

  return (
    <div>
      <PageHeader
        title="Careers"
        subtitle="Join our team across the SADC region — roles in geology, mining, processing, ESG, finance and community."
        breadcrumbs={[{ label: "Careers" }]}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        {careers.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {careers.map((c: any) => (
              <Link key={c.slug} href={`/careers/${c.slug}`} className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-[#0F4A6B]/30 hover:shadow-md transition-all">
                <div className="text-[11px] tracking-widest text-slate-500 font-medium">{c.department?.toUpperCase()} • {c.location}</div>
                <h3 className="mt-2 font-serif text-lg font-bold group-hover:text-[#0F4A6B] transition-colors">{c.title}</h3>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">{c.summary}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-flex text-sm font-semibold text-[#0F4A6B]">{c.employment_type?.replace("_", " ")} →</span>
                  {c.deadline && <span className="text-xs text-slate-500">Closes {c.deadline}</span>}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState title="No open roles" description="Check back soon — we're always looking for talented people across the SADC region." />
        )}
      </div>
    </div>
  );
}
