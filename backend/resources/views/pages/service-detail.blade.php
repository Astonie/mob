@extends('layouts.app')
@section('title', $page->title . ' | Mob Limited')
@section('content')
<section class="relative overflow-hidden bg-[#061a2a] text-white py-20">
  <div class="absolute inset-0 bg-gradient-to-br from-[#0a2e4a] via-[#0F4A6B] to-[#0a1f2e]"></div>
  <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
    <p class="text-[11px] tracking-[0.22em] text-white/70 font-semibold">OUR CORE SERVICES</p>
    <h1 class="mt-5 font-serif text-4xl lg:text-5xl font-bold">{{ $page->title }}</h1>
    <p class="mt-4 text-white/80 max-w-2xl">{{ $page->excerpt }}</p>
  </div>
</section>
<section class="mx-auto max-w-3xl px-6 lg:px-8 py-16 prose prose-slate max-w-none">
  @foreach($page->blocks as $block)
    @if($block->type === 'rich_text')
      {!! $block->data['content'] !!}
    @endif
  @endforeach
</section>
<section class="mx-auto max-w-7xl px-6 lg:px-8 pb-16">
  <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d3d59] via-[#0F4A6B] to-[#0a2e4a] px-8 lg:px-12 py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
    <div>
      <h2 class="font-serif text-2xl lg:text-3xl font-bold text-white">Ready to de-risk your next project?</h2>
      <p class="mt-2 text-white/80 text-[15px]">Talk to our Lilongwe team. Response within one business day.</p>
    </div>
    <a href="/contact" class="inline-flex h-12 px-8 items-center rounded-lg bg-white text-[#0F4A6B] text-[13px] font-bold hover:bg-white/90 transition-colors shadow-lg shrink-0">Get in touch →</a>
  </div>
</section>
@endsection