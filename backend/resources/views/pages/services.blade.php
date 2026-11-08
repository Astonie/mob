@extends('layouts.app')
@section('title','Our Services | Mob Limited')
@section('content')
<section class="bg-[#0a1f2e] text-white py-20">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <h1 class="font-serif text-4xl font-bold">Our Core Services</h1>
    <p class="mt-4 text-white/80 max-w-2xl">Seven disciplines. One integrated team.</p>
  </div>
</section>
<section class="mx-auto max-w-7xl px-6 lg:px-8 py-16">
  <div class="grid md:grid-cols-3 gap-6">
    @foreach($servicePages as $svc)
      <a href="/services/{{ $svc->slug }}" class="block border rounded-xl p-6 hover:shadow-lg">
        <h3 class="font-serif text-lg font-bold">{{ $svc->title }}</h3>
        <p class="mt-2 text-sm text-slate-600">{{ $svc->excerpt }}</p>
      </a>
    @endforeach
  </div>
</section>
@endsection