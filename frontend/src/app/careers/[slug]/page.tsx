import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { apiBaseUrl } from "@/lib/api";
import { CareerApplyForm } from "./apply-form";
import { sanitizeHtml } from "@/lib/sanitize";

export const revalidate = 600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const API = apiBaseUrl();
  try {
    const r = await fetch(`${API}/api/v1/careers/${slug}`, { next: { revalidate: 600 } });
    if (!r.ok) throw new Error();
    const j = await r.json();
    return { title: `${j.data.title} | Mob Limited`, description: j.data.summary || undefined };
  } catch {
    return { title: "Career | Mob Limited" };
  }
}

export default async function CareerDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const API = apiBaseUrl();
  let career = null;
  try {
    const r = await fetch(`${API}/api/v1/careers/${slug}`, { next: { revalidate: 600 } });
    if (!r.ok) throw new Error();
    const j = await r.json();
    career = j.data;
  } catch {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title={career.title}
        subtitle={career.summary}
        breadcrumbs={[
          { label: "Careers", href: "/careers" },
          { label: career.title },
        ]}
      />
      <div className="mx-auto max-w-3xl px-6 lg:px-8 py-12">
        <div className="flex flex-wrap items-center gap-3 text-[12px] text-slate-500">
          {career.department && <span className="px-2.5 py-1 rounded-full bg-[#0F4A6B]/10 text-[#0F4A6B] font-semibold">{career.department}</span>}
          {career.location && <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">{career.location}</span>}
          {career.employment_type && <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">{career.employment_type.replace("_", " ")}</span>}
        </div>
        <div className="prose prose-slate mt-8 max-w-none text-[15px] leading-7 text-slate-700" dangerouslySetInnerHTML={{ __html: sanitizeHtml(career.description) }} />
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-serif text-lg font-bold text-[#0a1f2e]">Apply for this role</h3>
          <p className="mt-2 text-sm text-slate-600">Submit your application with resume and cover letter.</p>
          <CareerApplyForm slug={slug} />
        </div>
      </div>
    </div>
  );
}
