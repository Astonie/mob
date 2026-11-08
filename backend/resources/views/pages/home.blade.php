@extends('layouts.app')

@section('title', 'Mob Limited — Integrated Mining & Mineral Consultancy')

@section('content')
<section class="bg-[#0a1f2e] text-white py-24">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <h1 class="font-serif text-5xl font-bold">Integrated Mining and Mineral Consultancy</h1>
    <p class="mt-6 text-lg text-white/80 max-w-2xl">Malawi-based, SADC-wide — from greenfield exploration to mine development. JORC, NI 43-101 & SAMREC compliant.</p>
    <div class="mt-8 flex gap-3">
      <a href="/services" class="bg-white text-[#0F4A6B] px-6 py-3 rounded-lg font-semibold">Explore Services</a>
      <a href="/contact" class="border border-white/30 px-6 py-3 rounded-lg font-semibold">Contact Us</a>
    </div>
  </div>
</section>

<section class="mx-auto max-w-7xl px-6 lg:px-8 py-16">
  <h2 class="font-serif text-3xl font-bold">Our Core Services</h2>
  <div class="mt-8 grid md:grid-cols-3 gap-6">
    @foreach(\App\Models\Page::where('status','published')->whereNotIn('slug',['home','about','services','news','careers','contact','privacy','terms'])->get() as $svc)
      <a href="/services/{{ $svc->slug }}" class="block border rounded-xl p-6 hover:shadow-lg">
        <h3 class="font-serif text-lg font-bold">{{ $svc->title }}</h3>
        <p class="mt-2 text-sm text-slate-600">{{ $svc->excerpt }}</p>
      </a>
    @endforeach
  </div>
</section>
@endsection