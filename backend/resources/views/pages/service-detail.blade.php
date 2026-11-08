@extends('layouts.app')
@section('title', $page->title . ' | Mob Limited')
@section('content')
<section class="bg-[#0a1f2e] text-white py-20">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <h1 class="font-serif text-4xl font-bold">{{ $page->title }}</h1>
    <p class="mt-4 text-white/80 max-w-2xl">{{ $page->excerpt }}</p>
  </div>
</section>
<section class="mx-auto max-w-3xl px-6 lg:px-8 py-16 prose">
  @foreach($page->blocks as $block)
    @if($block->type === 'rich_text')
      {!! $block->data['content'] !!}
    @endif
  @endforeach
</section>
<section class="mx-auto max-w-7xl px-6 lg:px-8 pb-16">
  <a href="/contact" class="inline-block bg-[#0F4A6B] text-white px-6 py-3 rounded-lg font-semibold">Get in touch →</a>
</section>
@endsection