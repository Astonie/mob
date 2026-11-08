@extends('admin.layout')
@section('title','Create Page')
@section('content')
<h1 class="font-serif text-2xl font-bold text-[#0a1f2e]">Create Page</h1>
<form method="POST" action="/admin/pages" class="mt-6 max-w-xl space-y-4">
  @csrf
  <div>
    <label class="block text-sm font-medium text-slate-700">Title</label>
    <input name="title" class="mt-1 w-full rounded-lg border px-3 py-2" required>
  </div>
  <div>
    <label class="block text-sm font-medium text-slate-700">Slug (optional)</label>
    <input name="slug" class="mt-1 w-full rounded-lg border px-3 py-2 font-mono text-sm">
  </div>
  <div class="flex gap-2">
    <a href="/admin/pages" class="rounded-lg border px-5 py-2 text-sm text-slate-600 hover:bg-slate-50">Cancel</a>
    <button class="rounded-lg bg-[#0F4A6B] px-6 py-2 text-sm font-medium text-white hover:bg-[#0a334d]">Create</button>
  </div>
</form>
@endsection