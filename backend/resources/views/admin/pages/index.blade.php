@extends('admin.layout')
@section('title','Pages')
@section('content')
<div class="flex items-center justify-between">
  <h1 class="font-serif text-2xl font-bold text-[#0a1f2e] dark:text-white">Pages & Blocks</h1>
  <a href="/admin/pages/create" class="rounded-lg bg-[#0F4A6B] px-4 py-2 text-sm text-white hover:bg-[#0a334d]">+ New page</a>
</div>
<div class="mt-6 overflow-x-auto rounded-lg border bg-white dark:bg-[#112233]">
  <table class="w-full text-sm">
    <thead class="border-b bg-slate-50 dark:bg-white/5 text-xs text-slate-500 dark:text-slate-400">
      <tr><th class="px-4 py-2 text-left">Title</th><th class="px-4 py-2 text-left">Slug</th><th class="px-4 py-2 text-left">Status</th><th class="px-4 py-2 text-left">Blocks</th><th class="px-4 py-2 text-left">Actions</th></tr>
    </thead>
    <tbody class="divide-y">
      @foreach($pages as $p)
        <tr>
          <td class="px-4 py-2">{{ $p->title }}</td>
          <td class="px-4 py-2 font-mono text-xs">/{{ $p->slug }}</td>
          <td class="px-4 py-2">{{ $p->status }}</td>
          <td class="px-4 py-2 text-xs">{{ $p->blocks->count() }}</td>
          <td class="px-4 py-2">
            <a href="/admin/pages/{{ $p->slug }}/edit" class="rounded-lg bg-[#0F4A6B] px-3 py-1 text-xs text-white hover:bg-[#0a334d]">Edit</a>
          </td>
        </tr>
      @endforeach
    </tbody>
  </table>
</div>
<div class="mt-4">{{ $pages->links() }}</div>
@endsection