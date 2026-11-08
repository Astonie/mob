<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CMS Login — Mob Limited</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-slate-50 dark:bg-white/5 flex items-center justify-center">
  <div class="w-full max-w-md rounded-xl border bg-white dark:bg-[#112233] p-8 shadow-sm">
    <h1 class="font-serif text-2xl font-bold text-[#0a1f2e] dark:text-white">CMS Login</h1>
    <form method="POST" action="/admin/login" class="mt-6 space-y-4">
      @csrf
      <div>
        <label class="block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
        <input name="email" type="email" class="mt-1 w-full rounded-lg border px-3 py-2" required>
      </div>
      <div>
        <label class="block text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
        <input name="password" type="password" class="mt-1 w-full rounded-lg border px-3 py-2" required>
      </div>
      @if($errors->any())
        <div class="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{{ $errors->first() }}</div>
      @endif
      <button class="w-full rounded-lg bg-[#0F4A6B] py-2 text-white font-semibold hover:bg-[#0a334d]">Sign in</button>
    </form>
  </div>
</body>
</html>