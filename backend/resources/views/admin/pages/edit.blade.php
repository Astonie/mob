@extends('admin.layout')
@section('title','Edit Page')
@section('content')
<div class="flex items-center justify-between">
  <div>
    <a href="/admin/pages" class="text-sm text-[#0F4A6B] hover:underline">← All pages</a>
    <h1 class="mt-1 font-serif text-xl font-bold">Edit: {{ $page->title }}</h1>
  </div>
  <form method="POST" action="/admin/pages/{{ $page->slug }}" onsubmit="return true;">
    @csrf @method('PUT')
    <input type="hidden" name="title" value="{{ $page->title }}">
    <input type="hidden" name="slug" value="{{ $page->slug }}">
    <input type="hidden" name="status" value="{{ $page->status }}">
    <button class="rounded-lg bg-[#0F4A6B] px-4 py-2 text-sm text-white hover:bg-[#0a334d]">Save</button>
  </form>
</div>
<p class="mt-4 text-sm text-slate-600 dark:text-slate-300">Use the form below to update page details and blocks (JSON).</p>

<form method="POST" action="/admin/pages/{{ $page->slug }}" class="mt-6 space-y-4">
  @csrf @method('PUT')
  <div class="grid gap-3 rounded-lg border bg-white dark:bg-[#112233] p-4 shadow-sm sm:grid-cols-4">
    <div class="sm:col-span-2">
      <label class="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Title</label>
      <input name="title" value="{{ old('title', $page->title) }}" class="w-full rounded-lg border px-3 py-2 text-sm">
    </div>
    <div>
      <label class="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Slug</label>
      <input name="slug" value="{{ old('slug', $page->slug) }}" class="w-full rounded-lg border px-3 py-2 font-mono text-sm">
    </div>
    <div>
      <label class="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Status</label>
      <select name="status" class="w-full rounded-lg border px-3 py-2 text-sm">
        @foreach(['draft','review','approved','published','archived'] as $s)
          <option value="{{ $s }}" @selected(old('status',$page->status)===$s)>{{ $s }}</option>
        @endforeach
      </select>
    </div>
    <div class="sm:col-span-4">
      <label class="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Excerpt</label>
      <input name="excerpt" value="{{ old('excerpt', $page->excerpt) }}" class="w-full rounded-lg border px-3 py-2 text-sm">
    </div>
  </div>

  <div class="mt-4">
    <label class="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Blocks (JSON array)</label>
    <textarea name="blocks_json" rows="16" class="w-full rounded-lg border bg-white dark:bg-[#112233] px-3 py-2 font-mono text-xs leading-5">{{ old('blocks_json', json_encode($page->blocks->map(fn($b)=>['type'=>$b->type,'data'=>$b->data,'sort_order'=>$b->sort_order])->values(), JSON_PRETTY_PRINT)) }}</textarea>
  </div>

  <div class="flex gap-2">
    <a href="/admin/pages" class="rounded-lg border px-5 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:bg-white/5">Cancel</a>
    <button class="rounded-lg bg-[#0F4A6B] px-6 py-2 text-sm font-medium text-white hover:bg-[#0a334d]">Save page</button>
  </div>
</form>

<form method="POST" action="/admin/pages/{{ $page->slug }}" class="mt-2" onsubmit="return confirm('Delete this page?');">
  @csrf @method('DELETE')
  <button class="rounded-lg border border-red-200 px-4 py-2 text-xs text-red-600 hover:bg-red-50">Delete page</button>
</form>
@endsection