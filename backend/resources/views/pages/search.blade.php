@extends('layouts.app')
@section('title','Search | Mob Limited')
@section('content')
<section class="relative overflow-hidden bg-[#061a2a] text-white py-20">
  <div class="absolute inset-0 bg-gradient-to-br from-[#0a2e4a] via-[#0F4A6B] to-[#0a1f2e]"></div>
  <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
    <h1 class="font-serif text-4xl font-bold">Search</h1>
  </div>
</section>
<section class="mx-auto max-w-3xl px-6 lg:px-8 py-16">
  <form method="GET" action="/search" class="flex gap-2">
    <input name="q" value="{{ $q }}" placeholder="Search news and insights..." class="flex-1 border rounded-lg px-3 py-2">
    <button class="bg-[#0F4A6B] text-white px-4 py-2 rounded-lg">Search</button>
  </form>

  @if(strlen($q) >= 2)
    <div class="mt-8 space-y-4">
      @forelse($results as $r)
        <a href="/news/{{ $r->slug }}" class="block border rounded-xl p-6 hover:shadow-lg">
          <h3 class="font-serif text-lg font-bold">{{ $r->title }}</h3>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ $r->excerpt }}</p>
        </a>
      @empty
        <p class="text-slate-500 dark:text-slate-400">No results found for "{{ $q }}".</p>
      @endforelse
    </div>
  @endif
</section>
@endsection