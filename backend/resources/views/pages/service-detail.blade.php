@extends('layouts.app')
@section('title', $page->title . ' | Mob Limited')
@section('content')
<section class="relative overflow-hidden bg-[#061a2a] text-white py-20 lg:py-28">
  <div class="absolute inset-0">
    @if(!empty($page->hero_image))
      <img src="/storage/{{ $page->hero_image }}" alt="" class="h-full w-full object-cover opacity-40">
      <div class="absolute inset-0 bg-gradient-to-r from-[#0a1f2e]/90 via-[#0F4A6B]/70 to-transparent"></div>
    @else
      <div class="absolute inset-0 bg-gradient-to-br from-[#0a2e4a] via-[#0F4A6B] to-[#0a1f2e]"></div>
    @endif
  </div>
  <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
    <nav class="text-[12px] text-white/60 mb-6">
      <a href="/" class="hover:text-white">Home</a> <span class="mx-2">/</span>
      <a href="/services" class="hover:text-white">Services</a> <span class="mx-2">/</span>
      <span class="text-white/90">{{ $page->title }}</span>
    </nav>
    <p class="text-[11px] tracking-[0.22em] text-white/70 font-semibold">OUR CORE SERVICES</p>
    <h1 class="mt-5 font-serif text-4xl lg:text-6xl font-bold tracking-tight leading-[1.05] max-w-3xl">{{ $page->title }}</h1>
    <p class="mt-6 text-lg leading-7 text-white/85 max-w-2xl font-light">{{ $page->excerpt }}</p>
    <div class="mt-8 flex flex-wrap gap-3">
      <a href="/contact" class="inline-flex h-12 px-8 items-center rounded-lg bg-white dark:bg-[#112233] text-[#0F4A6B] text-[13px] font-bold hover:bg-white dark:bg-[#112233]/90 transition shadow-lg">Talk to us</a>
      <a href="/services" class="inline-flex h-12 px-8 items-center rounded-lg border border-white/30 text-white text-[13px] font-semibold hover:bg-white dark:bg-[#112233]/10">All services</a>
    </div>
  </div>
</section>

<section class="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-24">
  <div class="grid lg:grid-cols-12 gap-10">
    <div class="lg:col-span-8">
      <div class="prose prose-slate max-w-none prose-headings:font-serif prose-headings:tracking-tight prose-p:leading-7 prose-a:text-[#0F4A6B] prose-li:leading-7 prose-ul:space-y-2">
        @foreach($page->blocks as $block)
          @if($block->type === 'rich_text')
            {!! $block->data['content'] !!}
          @endif
        @endforeach
      </div>
    </div>
    <div class="lg:col-span-4">
      <div class="sticky top-24 rounded-2xl bg-gradient-to-br from-[#0a2e4a] via-[#0F4A6B] to-[#061a2a] p-8 text-white shadow-xl">
        <p class="text-[11px] tracking-[0.22em] text-white/70 font-bold">READY TO START?</p>
        <h3 class="mt-3 font-serif text-2xl font-bold leading-tight">De-risk your next project with Mob.</h3>
        <p class="mt-3 text-sm leading-6 text-white/80">Talk to our Lilongwe team — response within one business day.</p>
        <a href="/contact" class="mt-6 inline-flex h-11 w-full items-center justify-center rounded-lg bg-white dark:bg-[#112233] text-[#0F4A6B] text-[13px] font-bold hover:bg-white dark:bg-[#112233]/90 transition-colors shadow-lg">Get in touch →</a>
      </div>
    </div>
  </div>
</section>

<section class="bg-[#f8f9fb] dark:bg-white/5 border-y border-slate-200 dark:border-white/10">
  <div class="mx-auto max-w-7xl px-6 lg:px-8 py-16">
    <div class="flex items-end justify-between gap-4 mb-8">
      <div>
        <p class="text-[11px] tracking-[0.22em] text-[#0F4A6B] font-bold">OTHER SERVICES</p>
        <h2 class="mt-2 font-serif text-2xl font-bold tracking-tight text-[#0a1f2e] dark:text-white">Explore more disciplines</h2>
      </div>
      <a href="/services" class="text-[13px] font-semibold text-[#0F4A6B] hover:underline underline-offset-4">All services →</a>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      @foreach(\App\Models\Page::where('status','published')->whereIn('slug',['geological-services','mineral-exploration','surveying-gis-remote-sensing','geophysical-services','mining-consultancy','environmental-regulatory-services','project-management-technical-support'])->where('slug','!=',$page->slug)->orderBy('sort_order')->take(3)->get() as $svc)
        <a href="/services/{{ $svc->slug }}" class="group block border rounded-xl p-6 bg-white dark:bg-[#112233] shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all">
          <h3 class="font-serif text-[16px] font-bold text-[#0a1f2e] dark:text-white group-hover:text-[#0F4A6B]">{{ $svc->title }}</h3>
          <p class="mt-2 text-[13px] leading-6 text-slate-600 dark:text-slate-300 line-clamp-3">{{ $svc->excerpt }}</p>
          <span class="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#0F4A6B]">Learn more →</span>
        </a>
      @endforeach
    </div>
  </div>
</section>
@endsection