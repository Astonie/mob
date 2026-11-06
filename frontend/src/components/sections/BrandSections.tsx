import Link from "next/link";
import { brandValues, coreServices, valueChain } from "@/lib/brand";

const arrow = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export function ValueChainSection() {
  return (
    <section className="border-y border-slate-200 bg-[#f8f9fb]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="text-[11px] tracking-[0.22em] text-[#0F4A6B] font-bold">THE VALUE CHAIN</p>
            <h2 className="mt-3 font-serif text-3xl lg:text-4xl font-bold tracking-tight text-[#0a1f2e] leading-tight">
              We provide end-to-end solutions across the mining value chain.
            </h2>
            <p className="mt-4 font-serif text-xl italic text-[#0F4A6B]">“Exploring Potential. Delivering Value.”</p>
            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              One integrated team takes you from first geological mapping through to delivery — across Malawi,
              the Copperbelt and the wider SADC region.
            </p>
            <Link
              href="/services"
              className="mt-6 inline-flex items-center gap-2 text-[13px] font-bold tracking-wide text-[#0F4A6B] hover:underline underline-offset-4"
            >
              Explore our services {arrow}
            </Link>
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-x-10 gap-y-10">
            {valueChain.map((step) => (
              <div key={step.key} className="border-t-2 border-[#0F4A6B]/20 pt-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-[22px] font-bold text-[#0F4A6B]/30">{step.key}</span>
                  <h3 className="font-serif text-xl font-bold text-[#0a1f2e]">{step.title}</h3>
                </div>
                <p className="mt-2.5 text-[13.5px] leading-6 text-slate-600">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CoreServicesSection({
  id = "core-services",
  eyebrow = "OUR CORE SERVICES",
  title = "Seven disciplines. One integrated team.",
  intro = "From grass-roots exploration to environmental compliance and project delivery — every service is delivered by senior specialists and reporting-ready teams.",
  showCtaCard = true,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  showCtaCard?: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-[11px] tracking-[0.22em] text-[#0F4A6B] font-bold">{eyebrow}</p>
            <h2 className="mt-3 font-serif text-3xl lg:text-4xl font-bold tracking-tight text-[#0a1f2e] leading-tight">
              {title}
            </h2>
          </div>
          <p className="max-w-md text-[14.5px] leading-7 text-slate-600">{intro}</p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {coreServices.map((service) => (
            <Link
              key={service.key}
              href={service.href ?? "/services#core-services"}
              className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0F4A6B]/40 hover:shadow-lg"
            >
              <span className="font-serif text-[13px] font-bold tracking-widest text-[#0F4A6B]">{service.key}</span>
              <h3 className="mt-3 font-serif text-[17px] font-bold leading-tight text-[#0a1f2e] transition-colors group-hover:text-[#0F4A6B]">
                {service.title}
              </h3>
              <p className="mt-2.5 flex-1 text-[13px] leading-6 text-slate-600">{service.description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#0F4A6B] opacity-0 transition-opacity group-hover:opacity-100">
                Learn more {arrow}
              </span>
            </Link>
          ))}

          {showCtaCard && (
            <Link
              href="/contact"
              className="group flex flex-col justify-between rounded-xl bg-[#0a1f2e] p-6 text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div>
                <span className="text-[10px] font-bold tracking-[0.22em] text-[#7cc4e3]">NEXT STEP</span>
                <h3 className="mt-3 font-serif text-[19px] font-bold leading-tight">Discuss your project with our team.</h3>
                <p className="mt-2.5 text-[13px] leading-6 text-white/70">
                  Scoping, due diligence or a bankable study — we respond within one business day.
                </p>
              </div>
              <span className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-white px-5 text-[12px] font-bold tracking-wide text-[#0F4A6B] transition-colors group-hover:bg-[#f8f9fb]">
                Contact Mob
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export function BrandValuesSection() {
  return (
    <section className="bg-[#0a1f2e] text-white mountain-pattern">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3">
            <p className="text-[11px] tracking-[0.22em] text-[#7cc4e3] font-bold">OUR VALUES</p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight leading-tight">
              The standards behind every engagement.
            </h2>
          </div>
          <div className="lg:col-span-9 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
            {brandValues.map((value) => (
              <div key={value.title} className="border-t border-white/15 pt-5">
                <h3 className="font-serif text-lg font-bold text-white">{value.title}</h3>
                <p className="mt-2 text-[13.5px] leading-6 text-white/70">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
