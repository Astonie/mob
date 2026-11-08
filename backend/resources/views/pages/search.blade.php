@extends('layouts.app')
@section('title','Search | Mob Limited')
@section('content')
<section class="bg-[#0a1f2e] text-white py-20">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <h1 class="font-serif text-4xl font-bold">Search</h1>
  </div>
</section>
<section class="mx-auto max-w-3xl px-6 lg:px-8 py-16">
  <form method="GET" action="/search" class="flex gap-2">
    <input name="q" value="{{ $q }}" placeholder="Search..." class="flex-1 border rounded-lg px-3 py-2">
    <button class="bg-[#0F4A6B] text-white px-4 py-2 rounded-lg">Search</button>
  </form>
</section>
@endsection