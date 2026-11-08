@extends('layouts.app')

@section('title', 'Mob Limited — Integrated Mining & Mineral Consultancy')

@section('content')
@push('head')
<script type="application/ld+json">
@verbatim
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Mob Limited",
  "url": "https://mobmining.com",
  "logo": "https://mobmining.com/logo-mob.svg",
  "description": "Malawi-based, SADC-wide mining and mineral consultancy. JORC, NI 43-101 & SAMREC compliant.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Area 47 Sector 3",
    "addressLocality": "Lilongwe",
    "addressCountry": "MW"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+265 881 525 611",
    "contactType": "customer service",
    "email": "info@moblimited.com"
  }
}
@endverbatim
</script>
@endpush
<section class="relative overflow-hidden bg-[#061a2a] text-white hero-gradient">
  <div class="absolute inset-0">
    @if(!empty($home->hero_image))
      <img loading="lazy" src="/storage/{{ $home->hero_image }}" alt="" class="h-full w-full object-cover opacity-30">
      <div class="absolute inset-0 bg-gradient-to-b from-[#0a1f2e]/60 via-[#0a1f2e]/80 to-[#0a1f2e]"></div>
    @endif
  </div>
  <div class="relative mx-auto max-w-7xl px-6 lg:px-8 py-24 lg:py-32">
    <p class="text-[11px] tracking-[0.22em] text-white/70 font-semibold flex items-center gap-3"><span class="h-px w-8 bg-white dark:bg-[#112233]/40"></span> MALAWI • SADC • COPPERBELT</p>
    <h1 class="mt-5 font-serif text-5xl lg:text-[52px] font-bold tracking-tight leading-[1.02]">Integrated Mining<br>and Mineral<br>Consultancy</h1>
    <p class="mt-6 text-[17px] leading-7 text-white/80 max-w-2xl">Malawi-based, SADC-wide — from greenfield exploration in Lilongwe to mine development across Zambia, DRC, Mozambique &amp; Tanzania. JORC, NI 43-101 &amp; SAMREC compliant. 120+ projects.</p>
    <div class="mt-9 flex flex-wrap gap-3">
      <a href="/services" class="h-[46px] px-8 inline-flex items-center rounded-lg bg-white dark:bg-[#112233] text-[#0F4A6B] text-[13px] font-bold hover:bg-white dark:bg-[#112233]/90 transition shadow-lg">Explore Services</a>
      <a href="/contact" class="h-[46px] px-8 inline-flex items-center rounded-lg border border-white/30 text-white text-[13px] font-semibold hover:bg-white dark:bg-[#112233]/10">Contact Lilongwe HQ</a>
    </div>
  </div>
</section>

<section class="border-y border-slate-200 bg-white dark:bg-[#0a1f2e]/50 dark:border-white/10">
  <div class="mx-auto max-w-7xl px-6 lg:px-8 py-9 grid grid-cols-2 lg:grid-cols-4 gap-8">
    @foreach([['Projects Delivered','120+'],['Years in SADC','10+'],['JORC Resources Defined','2.1 Bt'],['SADC Countries','8']] as [$label,$value])
      <div class="border-l-[3px] border-[#0F4A6B] pl-5">
        <div class="font-serif text-[28px] font-bold text-[#0a1f2e] dark:text-white dark:text-white leading-none" data-countup="{{ $value }}">{{ $value }}</div>
        <div class="text-[11px] tracking-[0.16em] text-slate-500 dark:text-slate-400 dark:text-slate-400 mt-2 font-medium">{{ strtoupper($label) }}</div>
      </div>
    @endforeach
  </div>
</section>

<section class="mx-auto max-w-7xl px-6 lg:px-8 py-16">
  <div class="grid lg:grid-cols-2 gap-8 items-center mb-16">
    <div>
      <p class="text-[11px] tracking-[0.22em] text-[#0F4A6B] font-bold">SADC MINING EXCELLENCE</p>
      <h2 class="mt-3 font-serif text-3xl font-bold tracking-tight text-[#0a1f2e] dark:text-white">From discovery to development</h2>
      <p class="mt-4 text-[15px] leading-7 text-slate-600 dark:text-slate-300">Technical excellence across exploration, resource modelling, mine planning and ESG — trusted by juniors, majors and funds across 8 SADC countries.</p>
    </div>
    @if(!empty($home->hero_image))
      <div class="relative overflow-hidden rounded-2xl aspect-[4/3] shadow-lg">
        <img loading="lazy" src="/storage/{{ $home->hero_image }}" alt="Mining operations" class="h-full w-full object-cover">
      </div>
    @endif
  </div>
  <div class="max-w-2xl">
    <p class="text-[11px] tracking-[0.22em] text-[#0F4A6B] font-bold">OUR CORE SERVICES</p>
    <h2 class="mt-3 font-serif text-3xl font-bold tracking-tight text-[#0a1f2e] dark:text-white dark:text-white">Seven disciplines. One integrated team.</h2>
  </div>
  <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
    @foreach(\App\Models\Page::where('status','published')->whereIn('slug',['geological-services','mineral-exploration','surveying-gis-remote-sensing','geophysical-services','mining-consultancy','environmental-regulatory-services','project-management-technical-support'])->orderBy('sort_order')->get() as $svc)
      <a href="/services/{{ $svc->slug }}" class="group card-lift flex flex-col rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#112233] p-6 shadow-sm dark:bg-white dark:bg-[#112233]/5 dark:border-white/10">
        <span class="font-serif text-[13px] font-bold tracking-widest text-[#0F4A6B]">{{ str_pad($loop->iteration, 2, '0', STR_PAD_LEFT) }}</span>
        <h3 class="mt-3 font-serif text-[17px] font-bold leading-tight text-[#0a1f2e] dark:text-white group-hover:text-[#0F4A6B]">{{ $svc->title }}</h3>
        <p class="mt-2.5 flex-1 text-[13px] leading-6 text-slate-600 dark:text-slate-300">{{ $svc->excerpt }}</p>
      </a>
    @endforeach
  </div>
</section>

<section class="mx-auto max-w-7xl px-6 lg:px-8 py-16">
  <div class="max-w-2xl mb-10">
    <p class="text-[11px] tracking-[0.22em] text-[#0F4A6B] font-bold">THE VALUE CHAIN</p>
    <h2 class="mt-3 font-serif text-3xl font-bold tracking-tight text-[#0a1f2e] dark:text-white">We provide end-to-end solutions across the mining value chain.</h2>
    <p class="mt-4 text-[15px] leading-7 text-slate-600 dark:text-slate-300">One integrated team takes you from first geological mapping through to delivery — across Malawi, the Copperbelt and the wider SADC region.</p>
  </div>
  <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
    @foreach([['01','Explore','Geological mapping, targeting and early-stage evaluation.'],['02','Evaluate','Resource definition, technical studies and due diligence.'],['03','Develop','Mine planning, permitting and project delivery.'],['04','Deliver','Owner’s team support, HSE, reporting and field logistics.']] as [$n,$t,$d])
      <div class="relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#112233] p-7 shadow-sm card-lift">
        <span class="font-serif text-4xl font-bold text-[#0F4A6B]/20">{{ $n }}</span>
        <h3 class="mt-3 font-serif text-lg font-bold text-[#0a1f2e] dark:text-white">{{ $t }}</h3>
        <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ $d }}</p>
      </div>
    @endforeach
  </div>
</section>

<section class="bg-[#f8f9fb] dark:bg-white/5 border-y border-slate-200 dark:border-white/10">
  <div class="mx-auto max-w-7xl px-6 lg:px-8 py-16">
    <div class="grid lg:grid-cols-2 gap-8 items-center mb-12">
      <div>
        <p class="text-[11px] tracking-[0.22em] text-[#0F4A6B] font-bold">PROJECT GALLERY</p>
        <h2 class="mt-3 font-serif text-3xl font-bold tracking-tight text-[#0a1f2e] dark:text-white">Mining across the SADC region</h2>
        <p class="mt-4 text-[15px] leading-7 text-slate-600 dark:text-slate-300">From Lilongwe to Kolwezi, Solwezi and beyond — field execution, resource modelling and mine development in action.</p>
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="relative overflow-hidden rounded-xl aspect-square shadow-md hover:shadow-xl transition-shadow"><img loading="lazy" src="https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&auto=format&fit=crop&q=80" alt="Mining" class="h-full w-full object-cover hover:scale-105 transition-transform duration-500"></div>
      <div class="relative overflow-hidden rounded-xl aspect-square shadow-md hover:shadow-xl transition-shadow"><img loading="lazy" src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&auto=format&fit=crop&q=80" alt="Mining" class="h-full w-full object-cover hover:scale-105 transition-transform duration-500"></div>
      <div class="relative overflow-hidden rounded-xl aspect-square shadow-md hover:shadow-xl transition-shadow"><img loading="lazy" src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&auto=format&fit=crop&q=80" alt="Mining" class="h-full w-full object-cover hover:scale-105 transition-transform duration-500"></div>
      <div class="relative overflow-hidden rounded-xl aspect-square shadow-md hover:shadow-xl transition-shadow"><img loading="lazy" src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80" alt="Mining" class="h-full w-full object-cover hover:scale-105 transition-transform duration-500"></div>
    </div>
  </div>
</section>

<section class="mx-auto max-w-7xl px-6 lg:px-8 py-16">
  <h2 class="font-serif text-2xl font-bold tracking-tight">Commodities we sign off</h2>
    <div class="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      @foreach(\App\Models\Mineral::where('status','published')->take(4)->get() as $m)
        <div class="bg-white dark:bg-[#112233] rounded-xl border border-slate-200 dark:border-white/10 p-5">
          <div class="font-serif text-[16px] font-bold">{{ $m->name }}</div>
          <p class="mt-2 text-[13px] leading-5 text-slate-600 dark:text-slate-300">{{ $m->summary }}</p>
        </div>
      @endforeach
    </div>
  </div>
</section>

<section class="mx-auto max-w-7xl px-6 lg:px-8 pb-16">
  <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0d3d59] via-[#0F4A6B] to-[#0a2e4a] px-8 lg:px-16 py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-2xl shadow-[#0F4A6B]/30">
    <div>
      <h2 class="font-serif text-3xl lg:text-4xl font-bold text-white leading-tight">Ready to de-risk your next project?</h2>
      <p class="mt-3 text-white/80 text-[16px] max-w-xl">Talk to our Lilongwe team. Response within one business day.</p>
    </div>
    <div class="flex flex-wrap gap-3 shrink-0">
      <a href="/contact" class="inline-flex h-12 px-8 items-center rounded-lg bg-white dark:bg-[#112233] text-[#0F4A6B] text-[13px] font-bold hover:bg-white dark:bg-[#112233]/90 transition-colors shadow-lg">Get in touch →</a>
      <a href="/services" class="inline-flex h-12 px-8 items-center rounded-lg border border-white/30 text-white text-[13px] font-bold hover:bg-white dark:bg-[#112233]/10 transition-colors">Explore services</a>
    </div>
  </div>
</section>
@endsection