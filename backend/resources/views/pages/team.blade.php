@extends('layouts.app')
@section('title','Our Team | Mob Limited')
@section('content')
<section class="relative overflow-hidden bg-[#061a2a] text-white py-20">
  <div class="absolute inset-0 bg-gradient-to-br from-[#0a2e4a] via-[#0F4A6B] to-[#0a1f2e]"></div>
  <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
    <p class="text-[11px] tracking-[0.22em] text-white/70 font-semibold">THE TEAM</p>
    <h1 class="mt-5 font-serif text-4xl lg:text-5xl font-bold">Our Team</h1>
    <p class="mt-4 text-white/80 max-w-2xl">Malawi-led, SADC-wide. Senior specialists across geology, mining, processing, ESG, finance and community.</p>
  </div>
</section>
<section class="mx-auto max-w-7xl px-6 lg:px-8 py-16">
  <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
    @foreach($leaders as $l)
      <div class="overflow-hidden rounded-xl border border-slate-200 bg-white">
        @if($l->photo)
          <div class="relative h-56 w-full overflow-hidden bg-slate-100">
            <img src="/storage/{{ $l->photo }}" alt="{{ $l->name }}" class="h-full w-full object-cover object-top">
          </div>
        @else
          <div class="flex h-56 w-full items-center justify-center bg-gradient-to-br from-[#0F4A6B] to-[#0a2e4a]">
            <span class="font-serif text-4xl font-bold text-white/90">{{ collect(explode(' ', $l->name))->map(fn($n)=>substr($n,0,1))->take(2)->implode('') }}</span>
          </div>
        @endif
        <div class="p-6">
          <h3 class="font-serif text-[16px] font-bold text-[#0a1f2e]">{{ $l->name }}</h3>
          <p class="mt-1 text-[11px] font-semibold tracking-[0.1em] text-[#0F4A6B] uppercase">{{ $l->position }}</p>
          @if($l->bio)<p class="mt-3 text-sm leading-6 text-slate-600">{{ $l->bio }}</p>@endif
        </div>
      </div>
    @endforeach
  </div>
</section>
@endsection