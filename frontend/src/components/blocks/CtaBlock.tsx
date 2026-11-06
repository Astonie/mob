import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { getSiteSettingsSafe, settingString, mediaSrc } from "@/lib/api";

export async function CtaBlock({ data }: { data: { heading: string; text?: string; cta_label?: string; cta_url?: string } }) {
  const settings = await getSiteSettingsSafe().catch(() => null);
  const ctaBg = mediaSrc(settingString(settings, "appearance.cta_bg", "")) || "";
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
      <Reveal variant="scale">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d3d59] via-[#0F4A6B] to-[#0a2e4a] px-8 lg:px-12 py-10 lg:py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xl shadow-[#0F4A6B]/20 grain">{ctaBg && (<div className="absolute inset-0 opacity-25"><img src={ctaBg} alt="" className="h-full w-full object-cover" /></div>)}
          <div className="absolute -top-24 right-10 h-64 w-64 rounded-full bg-[#2A7FA3]/40 blur-3xl animate-drift pointer-events-none" />
          <div className="absolute -bottom-28 left-1/3 h-56 w-56 rounded-full bg-white/10 blur-3xl animate-drift-slow pointer-events-none" />
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg viewBox="0 0 400 100" className="h-full w-full" preserveAspectRatio="none">
              <path d="M0 80 L60 20 L90 15 L45 80 Z" fill="white" />
              <path d="M45 80 L90 15 L110 35 L130 10 L180 80 Z" fill="white" />
            </svg>
          </div>
          <div className="relative">
            <h3 className="font-serif text-2xl lg:text-[28px] font-bold tracking-tight text-white">{data.heading}</h3>
            {data.text && <p className="mt-2 text-[14px] leading-6 text-white/80 max-w-xl">{data.text}</p>}
          </div>
          {data.cta_label && (
            <Link
              href={data.cta_url || "#"}
              className="btn-shine btn-glow relative shrink-0 inline-flex h-12 px-8 items-center rounded-lg bg-white text-[#0F4A6B] text-[13px] font-bold tracking-wide hover:bg-white/90 transition shadow-lg"
            >
              {data.cta_label}
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          )}
        </div>
      </Reveal>
    </section>
  );
}
