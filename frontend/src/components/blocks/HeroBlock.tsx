import Link from "next/link";
import Image from "next/image";

export function HeroBlock({ data }: { data: { heading: string; subheading?: string; cta_label?: string; cta_url?: string; image?: string } }) {
  const hasImage = !!data.image && data.image.startsWith("http");
  return (
    <section className="relative overflow-hidden bg-[#061a2a]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a2e4a] via-[#0F4A6B] to-[#0a1f2e]" />
      {hasImage && (
        <div className="absolute inset-0 lg:left-[52%]">
          <Image src={data.image!} alt="" fill className="object-cover opacity-30 lg:opacity-60" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F4A6B] via-[#0F4A6B]/70 to-transparent lg:to-[#0F4A6B]/20" />
        </div>
      )}
      <svg className="absolute bottom-0 left-0 right-0 w-full h-[38%] opacity-[0.06] pointer-events-none" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path d="M0 280 L220 80 L340 60 L180 280 Z" fill="white" />
        <path d="M180 280 L340 60 L420 120 L520 20 L720 280 Z" fill="white" />
        <path d="M520 20 L720 280 L1440 280 L1440 320 L0 320 Z" fill="white" />
      </svg>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-3xl animate-in">
          <p className="text-[11px] tracking-[0.22em] text-white/70 font-semibold mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-white/40" /> MALAWI • SADC • COPPERBELT
          </p>
          <h1 className="font-serif text-4xl lg:text-[46px] font-bold tracking-tight text-white leading-[1.05]">{data.heading}</h1>
          {data.subheading && <p className="mt-5 text-[17px] leading-7 text-white/85 max-w-2xl font-light">{data.subheading}</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            {data.cta_label && <Link href={data.cta_url || "#"} className="inline-flex h-[46px] px-8 items-center bg-white text-[#0F4A6B] text-[13px] font-bold tracking-wide hover:bg-white/90 transition shadow-lg">{data.cta_label}</Link>}
            <Link href="/contact" className="inline-flex h-[46px] px-8 items-center border border-white/30 text-white text-[13px] font-semibold tracking-wide hover:bg-white/10 backdrop-blur">Contact Lilongwe</Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-5 text-[11px] tracking-[0.16em] text-white/60 border-t border-white/10 pt-6">
            <span>LILONGWE HQ</span><span className="h-3 w-px bg-white/15" /><span>8 SADC COUNTRIES</span><span className="h-3 w-px bg-white/15" /><span>JORC • NI 43-101 • SAMREC</span>
          </div>
        </div>
      </div>
    </section>
  );
}
