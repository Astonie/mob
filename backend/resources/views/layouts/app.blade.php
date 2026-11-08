<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>@yield('title', 'Mob Limited')</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: { serif: ['Georgia', 'serif'] },
          colors: { brand: '#0F4A6B', dark: '#0a1f2e' }
        }
      }
    }
  </script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; }
    .font-serif { font-family: Georgia, serif; }
  </style>
</head>
<body class="min-h-screen bg-white text-[#0f1f2e]">
  <header class="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
    <div class="mx-auto max-w-7xl px-6 lg:px-8 h-16 flex items-center justify-between">
      <a href="/" class="font-black tracking-widest text-[#22262B]">MOB LIMITED</a>
      <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
        <a href="/" class="hover:text-[#0F4A6B]">Home</a>
        <a href="/about" class="hover:text-[#0F4A6B]">About</a>
        <a href="/services" class="hover:text-[#0F4A6B]">Our Services</a>
        <a href="/team" class="hover:text-[#0F4A6B]">Our Team</a>
        <a href="/news" class="hover:text-[#0F4A6B]">News</a>
        <a href="/careers" class="hover:text-[#0F4A6B]">Careers</a>
        <a href="/contact" class="hover:text-[#0F4A6B]">Contact</a>
      </nav>
    </div>
  </header>
  <main>
    @yield('content')
  </main>
  <footer class="bg-[#0a1f2e] text-slate-300 mt-16">
    <div class="mx-auto max-w-7xl px-6 lg:px-8 py-10 text-sm">
      &copy; {{ date('Y') }} Mob Limited. All rights reserved.
    </div>
  </footer>
</body>
</html>