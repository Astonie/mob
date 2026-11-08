@extends('layouts.app')
@section('title','About | Mob Limited')
@section('content')
<section class="relative overflow-hidden bg-[#061a2a] text-white py-20">
  @if(!empty($page->hero_image))
    <div class="absolute inset-0">
      <img loading="lazy" src="/storage/{{ $page->hero_image }}" alt="" class="h-full w-full object-cover opacity-30">
      <div class="absolute inset-0 bg-gradient-to-b from-[#0a1f2e]/60 via-[#0a1f2e]/80 to-[#0a1f2e]"></div>
    </div>
  @else
    <div class="absolute inset-0 bg-gradient-to-br from-[#0a2e4a] via-[#0F4A6B] to-[#0a1f2e]"></div>
  @endif
  <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
    <nav class="text-[12px] text-white/60 mb-4"><a href="/" class="hover:text-white">Home</a> <span class="mx-2">/</span> <span class="text-white/90">About</span></nav>
    <p class="text-[11px] tracking-[0.22em] text-white/70 font-semibold">MALAWI • SADC • COPPERBELT</p>
    <h1 class="mt-5 font-serif text-4xl lg:text-5xl font-bold">About Mob Limited</h1>
    <p class="mt-4 text-white/80 max-w-2xl">Malawi-based, SADC-wide. From greenfield exploration to mine development — we de-risk your resource with world-class technical excellence.</p>
  </div>
</section>
<section class="mx-auto max-w-7xl px-6 lg:px-8 py-16">
  <div class="grid lg:grid-cols-12 gap-10 items-start">
    <div class="lg:col-span-7">
      <p class="text-[11px] tracking-[0.22em] text-[#0F4A6B] font-bold">OUR STORY</p>
      <h2 class="mt-3 font-serif text-3xl font-bold tracking-tight text-[#0a1f2e] dark:text-white">Malawi-based. SADC-wide. Built for the Copperbelt and beyond.</h2>
      <div class="mt-6 space-y-4 text-[16px] leading-8 text-slate-700 dark:text-slate-200">
        <p>Headquartered in <strong>Lilongwe, Malawi</strong>, Mob Limited is an integrated mining and mineral consultancy serving the entire SADC region. With over a decade of experience and 120+ projects delivered, we provide JORC, NI 43-101 and SAMREC compliant technical services across the full mining value chain.</p>
        <p>From our headquarters in Lilongwe, we support exploration, resource estimation, mine planning, ESG and permitting across 8 SADC countries — combining Malawian field execution with world-class JORC modelling.</p>
      </div>
      <div class="mt-8 flex flex-wrap gap-3">
        <a href="/services" class="inline-flex h-11 px-6 items-center rounded-lg bg-[#0F4A6B] text-white text-[13px] font-semibold hover:bg-[#0a334d] transition-colors">Our services</a>
        <a href="/team" class="inline-flex h-11 px-6 items-center rounded-lg border border-slate-300 text-[#0a1f2e] dark:text-white text-[13px] font-semibold hover:bg-slate-50 dark:bg-white/5 transition-colors">Meet our team</a>
      </div>
    </div>
    <div class="lg:col-span-5">
      <div class="rounded-2xl bg-gradient-to-br from-[#0a2e4a] via-[#0F4A6B] to-[#061a2a] p-8 text-white shadow-xl">
        <p class="text-[11px] tracking-[0.22em] text-white/70 font-bold">WHY MOB</p>
        <ul class="mt-4 space-y-3 text-sm leading-6 text-white/90">
          <li class="flex gap-3"><span class="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#7cc4e3] shrink-0"></span>Qualified professionals across geology, mining, processing and ESG</li>
          <li class="flex gap-3"><span class="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#7cc4e3] shrink-0"></span>Reporting codes: JORC, NI 43-101, SAMREC</li>
          <li class="flex gap-3"><span class="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#7cc4e3] shrink-0"></span>End-to-end: exploration to mine development</li>
          <li class="flex gap-3"><span class="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#7cc4e3] shrink-0"></span>Lender and regulator-ready deliverables</li>
        </ul>
      </div>
    </div>
  </div>
</section>
<section class="bg-[#0a2e4a] text-white">
  <div class="mx-auto max-w-7xl px-6 lg:px-8 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
    @foreach([['Projects Delivered','120+'],['Years Experience','10+'],['SADC Countries','8'],['Professionals','50+']] as [$label,$value])
      <div class="text-center">
        <div class="font-serif text-4xl lg:text-5xl font-bold">{{ $value }}</div>
        <div class="mt-2 text-[11px] tracking-[0.18em] text-white/60 uppercase">{{ $label }}</div>
      </div>
    @endforeach
  </div>
</section>
@endsection