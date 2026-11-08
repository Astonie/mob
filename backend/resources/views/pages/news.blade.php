@extends('layouts.app')
@section('title','News & Media | Mob Limited')
@section('content')
<section class="bg-[#0a1f2e] text-white py-20">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <h1 class="font-serif text-4xl font-bold">News & Media</h1>
  </div>
</section>
<section class="mx-auto max-w-7xl px-6 lg:px-8 py-16">
  <div class="grid md:grid-cols-3 gap-6">
    @foreach($news as $n)
      <a href="/news/{{ $n->slug }}" class="block border rounded-xl p-6 hover:shadow-lg">
        <h3 class="font-serif text-lg font-bold">{{ $n->title }}</h3>
        <p class="mt-2 text-sm text-slate-600">{{ $n->excerpt }}</p>
      </a>
    @endforeach
  </div>
  <div class="mt-8">{{ $news->links() }}</div>
</section>
@endsection