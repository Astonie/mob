import Link from "next/link";
export function CtaBlock({ data }: { data: { heading: string; text?: string; cta_label?: string; cta_url?: string } }) {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
      <div className="relative overflow-hidden bg-[#0F4A6B] px-8 lg:px-12 py-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 400 100" className="h-full w-full" preserveAspectRatio="none"><path d="M0 80 L60 20 L90 15 L45 80 Z" fill="white" /><path d="M45 80 L90 15 L110 35 L130 10 L180 80 Z" fill="white" /></svg>
        </div>
        <div className="relative">
          <h3 className="font-serif text-2xl font-bold tracking-tight text-white">{data.heading}</h3>
          {data.text && <p className="mt-2 text-[14px] leading-6 text-white/80 max-w-xl">{data.text}</p>}
        </div>
        {data.cta_label && <Link href={data.cta_url || "#"} className="relative shrink-0 inline-flex h-11 px-8 items-center bg-white text-[#0F4A6B] text-[13px] font-bold tracking-wide hover:bg-white/90 transition-colors shadow">{data.cta_label}</Link>}
      </div>
    </section>
  );
}
