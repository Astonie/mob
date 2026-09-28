export function StatsBlock({ data }: { data: { stats: { label: string; value: string }[] } }) {
  return (
    <section className="border-y border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-9">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {data.stats?.map((s) => (
            <div key={s.label} className="group border-l-[3px] border-[#0F4A6B] pl-5 hover:border-[#2A7FA3] transition-colors">
              <div className="font-serif text-[28px] font-bold tracking-tight text-[#0a1f2e] leading-none">{s.value}</div>
              <div className="text-[11px] tracking-[0.16em] text-slate-500 mt-2 font-medium">{s.label.toUpperCase()}</div>
              <div className="mt-2 h-px w-12 bg-slate-200 group-hover:w-16 group-hover:bg-[#0F4A6B]/20 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
