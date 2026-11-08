@extends('layouts.app')
@section('title', $article->title . ' | Mob Limited')
@section('content')
<section class="bg-[#0a1f2e] text-white py-20">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <h1 class="font-serif text-4xl font-bold">{{ $article->title }}</h1>
    <p class="mt-4 text-white/80">{{ $article->excerpt }}</p>
  </div>
</section>
<section class="mx-auto max-w-3xl px-6 lg:px-8 py-16 prose">
  {!! $article->content !!}
</section>
@endsection