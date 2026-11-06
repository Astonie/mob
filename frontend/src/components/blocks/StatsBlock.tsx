import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";

export function StatsBlock({ data }: { data: { stats: { label: string; value: string }[] } }) {
  const stats = data.stats ?? [];
  if (!stats.length) return null;
  return (
    <section className="relative border-y border-slate-200/80 bg-gradient-to-b from-white via-[#f4f8fb] to-white overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0F4A6B]/30 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} variant="up">
              <div className="group relative border-l-[3px] border-[#0F4A6B] pl-5 transition-colors hover:border-[#2A7FA3]">
                <div className="font-serif text-[30px] font-bold tracking-tight text-[#0a1f2e] leading-none tabular-nums">
                  <CountUp value={s.value} />
                </div>
                <div className="text-[11px] tracking-[0.16em] text-slate-500 mt-2 font-medium">
                  {s.label.toUpperCase()}
                </div>
                <div className="mt-2 h-[2px] w-12 rounded-full bg-gradient-to-r from-[#0F4A6B] to-[#2A7FA3] transition-all duration-500 group-hover:w-20" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
