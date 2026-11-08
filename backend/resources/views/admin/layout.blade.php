<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>@yield('title','CMS') — Mob Limited</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-slate-50">
  <div class="flex">
    <aside class="w-64 bg-[#0a1f2e] text-white min-h-screen p-6">
      <div class="font-black tracking-widest text-white">MOB CMS</div>
      <nav class="mt-8 space-y-2 text-sm">
        <a href="/admin" class="block px-3 py-2 rounded hover:bg-white/10">Dashboard</a>
        <a href="/admin/pages" class="block px-3 py-2 rounded hover:bg-white/10">Pages & Blocks</a>
        <form method="POST" action="/admin/logout" class="mt-8">
          @csrf
          <button class="text-xs text-white/60 hover:text-white">Logout</button>
        </form>
      </nav>
    </aside>
    <main class="flex-1 p-8">
      @if(session('ok'))<div class="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">{{ session('ok') }}</div>@endif
      @yield('content')
    </main>
  </div>
</body>
</html>