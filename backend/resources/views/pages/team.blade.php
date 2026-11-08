@extends('layouts.app')
@section('title','Our Team | Mob Limited')
@section('content')
<section class="bg-[#0a1f2e] text-white py-20">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <h1 class="font-serif text-4xl font-bold">Our Team</h1>
    <p class="mt-4 text-white/80 max-w-2xl">Malawi-led, SADC-wide senior specialists.</p>
  </div>
</section>
<section class="mx-auto max-w-7xl px-6 lg:px-8 py-16">
  <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
    @foreach($leaders as $l)
      <div class="border rounded-xl p-6">
        <h3 class="font-serif text-lg font-bold">{{ $l->name }}</h3>
        <p class="text-xs uppercase text-[#0F4A6B] mt-1">{{ $l->position }}</p>
        <p class="mt-3 text-sm text-slate-600">{{ $l->bio }}</p>
      </div>
    @endforeach
  </div>
</section>
@endsection