@extends('layouts.app')
@section('title','Careers | Mob Limited')
@section('content')
<section class="bg-[#0a1f2e] text-white py-20">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <h1 class="font-serif text-4xl font-bold">Careers</h1>
    <p class="mt-4 text-white/80 max-w-2xl">Join our team across the SADC region.</p>
  </div>
</section>
<section class="mx-auto max-w-7xl px-6 lg:px-8 py-16">
  <div class="space-y-4">
    @foreach($careers as $c)
      <a href="/careers/{{ $c->slug }}" class="block border rounded-xl p-6 hover:shadow-lg">
        <h3 class="font-serif text-lg font-bold">{{ $c->title }}</h3>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ $c->location }} · {{ $c->employment_type }}</p>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ $c->summary }}</p>
      </a>
    @endforeach
  </div>
  <div class="mt-8">{{ $careers->links() }}</div>
</section>
@endsection