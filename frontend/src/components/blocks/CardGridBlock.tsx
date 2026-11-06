import { Reveal } from "@/components/motion/Reveal";

type Card = { title: string; text: string };

const FALLBACK: Card[] = [
  { title: "Safety", text: "Zero harm, TRIFR 1.2" },
  { title: "Environment", text: "82% water recycled" },
  { title: "Community", text: "US$18M invested 2025" },
];

export function CardGridBlock({ data }: { data: { title?: string; cards?: Card[] } }) {
  const cards = data.cards?.length ? data.cards : FALLBACK;
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8 py-14">
      {data.title && (
        <Reveal variant="fade">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="font-serif text-2xl lg:text-[28px] font-bold tracking-tight text-slate-900">{data.title}</h2>
            <span className="hidden sm:block h-px flex-1 max-w-40 bg-gradient-to-r from-[#0F4A6B]/40 to-transparent mb-3" />
          </div>
        </Reveal>
      )}
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <Reveal key={c.title + i} delay={(i % 3) * 100} variant="up">
            <div className="card-interactive group relative h-full overflow-hidden rounded-xl border border-slate-200 bg-white p-6">
              <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#0F4A6B] to-[#2A7FA3] transition-transform duration-500 group-hover:scale-x-100" />
              <span className="pointer-events-none absolute -right-1 -top-4 font-serif text-[64px] font-bold leading-none text-slate-100 select-none transition-colors duration-500 group-hover:text-[#0F4A6B]/10">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="relative font-semibold text-slate-900">{c.title}</h4>
              <p className="relative mt-2 text-sm text-slate-600 leading-6">{c.text}</p>
              <span className="link-arrow relative mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-wide text-[#0F4A6B] opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                Learn more
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
