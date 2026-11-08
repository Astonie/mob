@extends('layouts.app')

@section('title', 'Mob Limited — Integrated Mining & Mineral Consultancy')

@section('content')
<section class="relative overflow-hidden bg-[#061a2a] text-white">
  <div class="absolute inset-0">
    @if(!empty($home->hero_image))
      <img src="/storage/{{ $home->hero_image }}" alt="" class="h-full w-full object-cover opacity-30">
      <div class="absolute inset-0 bg-gradient-to-b from-[#0a1f2e]/60 via-[#0a1f2e]/80 to-[#0a1f2e]"></div>
    @else
      <div class="absolute inset-0 bg-gradient-to-br from-[#0a2e4a] via-[#0F4A6B] to-[#0a1f2e]"></div>
    @endif
  </div>
  <div class="relative mx-auto max-w-7xl px-6 lg:px-8 py-24 lg:py-32">
    <p class="text-[11px] tracking-[0.22em] text-white/70 font-semibold flex items-center gap-3"><span class="h-px w-8 bg-white/40"></span> MALAWI • SADC • COPPERBELT</p>
    <h1 class="mt-5 font-serif text-5xl lg:text-[52px] font-bold tracking-tight leading-[1.02]">Integrated Mining<br>and Mineral<br>Consultancy</h1>
    <p class="mt-6 text-[17px] leading-7 text-white/80 max-w-2xl">Malawi-based, SADC-wide — from greenfield exploration in Lilongwe to mine development across Zambia, DRC, Mozambique &amp; Tanzania. JORC, NI 43-101 &amp; SAMREC compliant. 120+ projects.</p>
    <div class="mt-9 flex flex-wrap gap-3">
      <a href="/services" class="h-[46px] px-8 inline-flex items-center rounded-lg bg-white text-[#0F4A6B] text-[13px] font-bold hover:bg-white/90 transition shadow-lg">Explore Services</a>
      <a href="/contact" class="h-[46px] px-8 inline-flex items-center rounded-lg border border-white/30 text-white text-[13px] font-semibold hover:bg-white/10">Contact Lilongwe HQ</a>
    </div>
  </div>
</section>

<section class="border-y border-slate-200 bg-white">
  <div class="mx-auto max-w-7xl px-6 lg:px-8 py-9 grid grid-cols-2 lg:grid-cols-4 gap-8">
    @foreach([['Projects Delivered','120+'],['Years in SADC','10+'],['JORC Resources Defined','2.1 Bt'],['SADC Countries','8']] as [$label,$value])
      <div class="border-l-[3px] border-[#0F4A6B] pl-5">
        <div class="font-serif text-[28px] font-bold text-[#0a1f2e] leading-none">{{ $value }}</div>
        <div class="text-[11px] tracking-[0.16em] text-slate-500 mt-2 font-medium">{{ strtoupper($label) }}</div>
      </div>
    @endforeach
  </div>
</section>

<section class="mx-auto max-w-7xl px-6 lg:px-8 py-16">
  <div class="grid lg:grid-cols-2 gap-8 items-center mb-16">
    <div>
      <p class="text-[11px] tracking-[0.22em] text-[#0F4A6B] font-bold">SADC MINING EXCELLENCE</p>
      <h2 class="mt-3 font-serif text-3xl font-bold tracking-tight text-[#0a1f2e]">From discovery to development</h2>
      <p class="mt-4 text-[15px] leading-7 text-slate-600">Technical excellence across exploration, resource modelling, mine planning and ESG — trusted by juniors, majors and funds across 8 SADC countries.</p>
    </div>
    @if(!empty($home->hero_image))
      <div class="relative overflow-hidden rounded-2xl aspect-[4/3] shadow-lg">
        <img src="/storage/{{ $home->hero_image }}" alt="Mining operations" class="h-full w-full object-cover">
      </div>
    @endif
  </div>
  <div class="max-w-2xl">
    <p class="text-[11px] tracking-[0.22em] text-[#0F4A6B] font-bold">OUR CORE SERVICES</p>
    <h2 class="mt-3 font-serif text-3xl font-bold tracking-tight text-[#0a1f2e]">Seven disciplines. One integrated team.</h2>
  </div>
  <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
    @foreach(\App\Models\Page::where('status','published')->whereNotIn('slug',['home','about','services','news','careers','contact','privacy','terms'])->orderBy('sort_order')->get() as $svc)
      <a href="/services/{{ $svc->slug }}" class="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:-translate-y-0.5 hover:border-[#0F4A6B]/40 hover:shadow-lg transition-all">
        <span class="font-serif text-[13px] font-bold tracking-widest text-[#0F4A6B]">{{ $svc->sort_order ? str_pad($svc->sort_order,2,'0',STR_PAD_LEFT) : '' }}</span>
        <h3 class="mt-3 font-serif text-[17px] font-bold leading-tight text-[#0a1f2e] group-hover:text-[#0F4A6B]">{{ $svc->title }}</h3>
        <p class="mt-2.5 flex-1 text-[13px] leading-6 text-slate-600">{{ $svc->excerpt }}</p>
      </a>
    @endforeach
  </div>
</section>

<section class="bg-[#f8f9fb] border-y border-slate-200">
  <div class="mx-auto max-w-7xl px-6 lg:px-8 py-16">
    <h2 class="font-serif text-2xl font-bold tracking-tight">Commodities we sign off</h2>
    <div class="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      @foreach(\App\Models\Mineral::where('status','published')->take(4)->get() as $m)
        <div class="bg-white rounded-xl border border-slate-200 p-5">
          <div class="font-serif text-[16px] font-bold">{{ $m->name }}</div>
          <p class="mt-2 text-[13px] leading-5 text-slate-600">{{ $m->summary }}</p>
        </div>
      @endforeach
    </div>
  </div>
</section>
@endsection