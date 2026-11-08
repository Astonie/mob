@extends('layouts.app')
@section('title', $page->title . ' | Mob Limited')
@section('content')
<section class="relative overflow-hidden bg-[#061a2a] text-white py-20">
  <div class="absolute inset-0 bg-gradient-to-br from-[#0a2e4a] via-[#0F4A6B] to-[#0a1f2e]"></div>
  @php $hero = collect($page->blocks)->firstWhere('type','hero'); @endphp
  @if(!empty($hero['data']['image']))
    <div class="absolute inset-0 lg:left-[52%] overflow-hidden">
      <img loading="lazy" src="{{ $hero['data']['image'] }}" alt="" class="h-full w-full object-cover opacity-30 lg:opacity-60">
      <div class="absolute inset-0 bg-gradient-to-r from-[#0F4A6B] via-[#0F4A6B]/70 to-transparent lg:to-[#0F4A6B]/20"></div>
    </div>
  @endif
  <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
    <p class="text-[11px] tracking-[0.22em] text-white/70 font-semibold">OUR CORE SERVICES</p>
    <h1 class="mt-5 font-serif text-4xl lg:text-5xl font-bold">{{ $page->title }}</h1>
    <p class="mt-4 text-white/80 max-w-2xl">{{ $page->excerpt }}</p>
    <div class="mt-8">
      <a href="/contact" class="inline-flex h-11 px-6 items-center rounded-lg bg-white text-[#0F4A6B] text-[13px] font-semibold hover:bg-white/90 transition-colors">Talk to us</a>
    </div>
  </div>
</section>

<section class="mx-auto max-w-3xl px-6 lg:px-8 py-16">
  <div class="prose prose-slate max-w-none prose-headings:font-serif prose-headings:tracking-tight prose-p:leading-7 prose-a:text-[#0F4A6B] prose-li:leading-7">
    @foreach($page->blocks as $block)
      @if($block->type === 'rich_text')
        {!! $block->data['content'] !!}
      @endif
    @endforeach
  </div>
</section>

<section class="mx-auto max-w-7xl px-6 lg:px-8 pb-16">
  <div class="flex items-center justify-between gap-4">
    <a href="/services" class="text-[13px] font-semibold text-[#0F4A6B] hover:underline underline-offset-4">← All services</a>
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d3d59] via-[#0F4A6B] to-[#0a2e4a] px-8 lg:px-12 py-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 flex-1 ml-8">
      <div>
        <h2 class="font-serif text-2xl font-bold text-white">Ready to de-risk your next project?</h2>
        <p class="mt-2 text-white/80 text-[15px]">Talk to our Lilongwe team. Response within one business day.</p>
      </div>
      <a href="/contact" class="inline-flex h-12 px-8 items-center rounded-lg bg-white text-[#0F4A6B] text-[13px] font-bold hover:bg-white/90 transition-colors shadow-lg shrink-0">Get in touch →</a>
    </div>
  </div>
</section>
@endsection