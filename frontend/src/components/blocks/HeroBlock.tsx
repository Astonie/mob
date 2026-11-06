import Link from "next/link";
import Image from "next/image";
import { getSiteSettingsSafe, settingString, mediaSrc } from "@/lib/api";

type HeroData = {
  heading: string;
  subheading?: string;
  cta_label?: string;
  cta_url?: string;
  image?: string;
  eyebrow?: string;
  cta2_label?: string;
  strip?: string[];
};

const DEFAULT_EYEBROW = "MALAWI • SADC • COPPERBELT";
const DEFAULT_CTA2 = "Contact Lilongwe";
const DEFAULT_STRIP = ["LILONGWE HQ", "8 SADC COUNTRIES", "JORC • NI 43-101 • SAMREC", "120+ PROJECTS DELIVERED", "EXPLORATION TO MINE DEVELOPMENT"];

export async function HeroBlock({ data }: { data: HeroData }) {
  const settings = await getSiteSettingsSafe().catch(() => null);
  const heroBg = settingString(settings, "appearance.hero_bg", "");
  const bg = mediaSrc(heroBg || data.image) || "";
  const hasImage = !!bg;
  const eyebrow = data.eyebrow || DEFAULT_EYEBROW;
  const cta2 = data.cta2_label === "" ? null : data.cta2_label || DEFAULT_CTA2;
  const strip = Array.isArray(data.strip) && data.strip.length ? data.strip : DEFAULT_STRIP;
  const marquee = [...strip, ...strip];

  return (
    <section className="relative overflow-hidden bg-[#061a2a] grain">
      {/* base gradient + drifting light orbs */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a2e4a] via-[#0F4A6B] to-[#0a1f2e]" />
      <div className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-[#2A7FA3]/30 blur-3xl animate-drift pointer-events-none" />
      <div className="absolute -bottom-40 right-[-120px] h-[480px] w-[480px] rounded-full bg-[#0a334d]/60 blur-3xl animate-drift-slow pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(124,196,227,0.14),transparent_55%)] pointer-events-none" />

      {hasImage && (
        <div className="absolute inset-0 lg:left-[52%] overflow-hidden">
          <div className="absolute inset-0 kenburns">
            <Image src={bg} alt="" fill className="object-cover opacity-30 lg:opacity-60" unoptimized />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F4A6B] via-[#0F4A6B]/70 to-transparent lg:to-[#0F4A6B]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061a2a]/70 via-transparent to-transparent" />
        </div>
      )}

      {/* mountain silhouette */}
      <svg className="absolute bottom-0 left-0 right-0 w-full h-[38%] opacity-[0.07] pointer-events-none" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path d="M0 280 L220 80 L340 60 L180 280 Z" fill="white" />
        <path d="M180 280 L340 60 L420 120 L520 20 L720 280 Z" fill="white" />
        <path d="M520 20 L720 280 L1440 280 L1440 320 L0 320 Z" fill="white" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-16 lg:pt-24 pb-10">
        <div className="max-w-3xl">
          <p className="animate-in text-[11px] tracking-[0.22em] text-white/70 font-semibold mb-4 flex items-center gap-3" style={{ animationDelay: "0ms" }}>
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-white/60" />
            <span className="glass-dark rounded-full px-3 py-1">{eyebrow}</span>
          </p>
          <h1 className="animate-in font-serif text-4xl lg:text-[52px] font-bold tracking-tight text-white leading-[1.04]" style={{ animationDelay: "90ms" }}>
            {data.heading}
          </h1>
          {data.subheading && (
            <p className="animate-in mt-5 text-[17px] leading-7 text-white/85 max-w-2xl font-light" style={{ animationDelay: "180ms" }}>
              {data.subheading}
            </p>
          )}
          <div className="animate-in mt-8 flex flex-wrap gap-3" style={{ animationDelay: "270ms" }}>
            {data.cta_label && (
              <Link
                href={data.cta_url || "#"}
                className="btn-shine btn-glow inline-flex h-[46px] px-8 items-center rounded-lg bg-white text-[#0F4A6B] text-[13px] font-bold tracking-wide hover:bg-white/90 transition shadow-xl shadow-black/20"
              >
                {data.cta_label}
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )}
            {cta2 && (
              <Link
                href="/contact"
                className="glass-dark inline-flex h-[46px] px-8 items-center rounded-lg text-white text-[13px] font-semibold tracking-wide hover:bg-white/15 transition"
              >
                {cta2}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* marquee credential strip */}
      <div className="relative border-t border-white/10 bg-black/20 backdrop-blur-sm marquee-mask marquee-paused overflow-hidden">
        <div className="marquee-track py-3.5">
          {marquee.map((item, i) => (
            <span key={item + i} className="flex items-center gap-6 pr-6 text-[11px] tracking-[0.2em] text-white/60 whitespace-nowrap">
              <span className="h-1 w-1 rounded-full bg-[#7cc4e3]" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
