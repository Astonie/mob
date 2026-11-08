@extends('admin.layout')
@section('title','Dashboard')
@section('content')
<h1 class="font-serif text-2xl font-bold text-[#0a1f2e]">Dashboard</h1>
<div class="mt-6 grid sm:grid-cols-3 gap-4">
  <div class="rounded-xl border bg-white p-6"><div class="text-3xl font-bold text-[#0F4A6B]">{{ $pages }}</div><div class="text-sm text-slate-600 mt-1">Pages</div></div>
  <div class="rounded-xl border bg-white p-6"><div class="text-3xl font-bold text-[#0F4A6B]">{{ $news }}</div><div class="text-sm text-slate-600 mt-1">News</div></div>
  <div class="rounded-xl border bg-white p-6"><div class="text-3xl font-bold text-[#0F4A6B]">{{ $projects }}</div><div class="text-sm text-slate-600 mt-1">Projects</div></div>
</div>
@endsection