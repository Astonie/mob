@extends('layouts.app')
@section('title','Our Services | Mob Limited')
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
    <p class="text-[11px] tracking-[0.22em] text-white/70 font-semibold">OUR CORE SERVICES</p>
    <h1 class="mt-5 font-serif text-4xl lg:text-5xl font-bold">Our Core Services</h1>
    <p class="mt-4 text-white/80 max-w-2xl">Seven disciplines. One integrated team — delivering JORC, NI 43-101 and SAMREC compliant technical services across the SADC mining value chain.</p>
  </div>
</section>
<section class="mx-auto max-w-7xl px-6 lg:px-8 py-16">
  <div class="grid md:grid-cols-3 gap-6">
    @foreach($servicePages as $svc)
      <a href="/services/{{ $svc->slug }}" class="group card-lift block border rounded-xl p-6 shadow-sm">
        <span class="font-serif text-[13px] font-bold tracking-widest text-[#0F4A6B]">{{ str_pad($loop->iteration, 2, '0', STR_PAD_LEFT) }}</span>
        <h3 class="mt-3 font-serif text-[17px] font-bold text-[#0a1f2e] group-hover:text-[#0F4A6B]">{{ $svc->title }}</h3>
        <p class="mt-2.5 text-[13px] leading-6 text-slate-600">{{ $svc->excerpt }}</p>
        <span class="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#0F4A6B]">Learn more →</span>
      </a>
    @endforeach
  </div>
</section>
@endsection