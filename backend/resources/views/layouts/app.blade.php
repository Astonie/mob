<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>@yield('title', 'Mob Limited')</title>
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" href="/logo-mob.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/logo-mob.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: { serif: ['"Playfair Display"', 'Georgia', 'serif'], sans: ['"DM Sans"', 'system-ui', 'sans-serif'] },
          colors: { brand: '#0F4A6B', dark: '#0a1f2e', accent: '#2A7FA3' }
        }
      }
    }
  </script>
  <style>
    body { font-family: 'DM Sans', system-ui, sans-serif; }
    .font-serif { font-family: 'Playfair Display', Georgia, serif; }
    .grain { background-image: radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 20px 20px; }
  </style>
</head>
<body class="min-h-screen bg-white text-[#0f1f2e] antialiased">
  <header class="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="flex h-[72px] items-center justify-between gap-8">
        <a href="/" class="flex items-center gap-3 shrink-0">
          <img src="/logo-mob.svg" alt="Mob Limited" class="h-12 w-auto shrink-0">
          <div class="leading-none">
            <div class="font-black tracking-[0.14em] text-[#22262B] text-[15px]">MOB LIMITED</div>
            <div class="text-[9px] tracking-[0.08em] text-[#0F4A6B] font-medium">Integrated Mining &amp; Mineral Solutions</div>
          </div>
        </a>
        <nav class="hidden lg:flex items-center gap-1">
          <a href="/" class="px-3.5 py-2 text-[13.5px] font-medium text-slate-700 hover:text-[#0F4A6B]">Home</a>
          <a href="/about" class="px-3.5 py-2 text-[13.5px] font-medium text-slate-700 hover:text-[#0F4A6B]">About</a>
          <a href="/services" class="px-3.5 py-2 text-[13.5px] font-medium text-slate-700 hover:text-[#0F4A6B]">Our Services</a>
          <a href="/team" class="px-3.5 py-2 text-[13.5px] font-medium text-slate-700 hover:text-[#0F4A6B]">Our Team</a>
          <a href="/news" class="px-3.5 py-2 text-[13.5px] font-medium text-slate-700 hover:text-[#0F4A6B]">News</a>
          <a href="/careers" class="px-3.5 py-2 text-[13.5px] font-medium text-slate-700 hover:text-[#0F4A6B]">Careers</a>
          <a href="/contact" class="px-3.5 py-2 text-[13.5px] font-medium text-slate-700 hover:text-[#0F4A6B]">Contact</a>
        </nav>
        <div class="flex items-center gap-2.5">
          <a href="/contact" class="hidden sm:inline-flex h-10 px-6 items-center justify-center bg-[#0F4A6B] text-white text-[13px] font-semibold rounded-lg hover:bg-[#0a334d]">Contact Us</a>
        </div>
      </div>
    </div>
  </header>
  <main id="main-content">
    @yield('content')
  </main>
  <footer class="border-t border-slate-200 bg-[#0a1f2e] text-slate-300 mt-16">
    <div class="mx-auto max-w-7xl px-6 lg:px-8 py-14">
      <div class="grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <div class="flex items-center gap-3">
            <img src="/logo-mob.svg" alt="Mob Limited" class="h-12 w-auto shrink-0">
            <div class="leading-none">
              <div class="font-black tracking-[0.12em] text-white text-[15px]">MOB LIMITED</div>
              <div class="text-[9px] tracking-[0.08em] text-white/70 font-medium">Integrated Mining &amp; Mineral Solutions</div>
            </div>
          </div>
          <p class="mt-4 font-serif text-[15px] italic text-[#7cc4e3]">Exploring Potential. Delivering Value.</p>
          <p class="mt-4 text-sm leading-7 text-slate-400 max-w-md">Malawi-based, SADC-wide. From greenfield exploration in Lilongwe to mine development across the Copperbelt — JORC-compliant technical excellence across 8 SADC countries.</p>
        </div>
        <div class="lg:col-span-2">
          <h4 class="text-[11px] font-semibold tracking-[0.18em] text-white">SERVICES</h4>
          <ul class="mt-4 space-y-2.5 text-sm text-slate-400">
            <li><a href="/services/geological-services" class="hover:text-white">Geological Services</a></li>
            <li><a href="/services/mineral-exploration" class="hover:text-white">Mineral Exploration</a></li>
            <li><a href="/services/surveying-gis-remote-sensing" class="hover:text-white">Surveying, GIS &amp; Remote Sensing</a></li>
            <li><a href="/services/geophysical-services" class="hover:text-white">Geophysical Services</a></li>
            <li><a href="/services/mining-consultancy" class="hover:text-white">Mining Consultancy</a></li>
            <li><a href="/services/environmental-regulatory-services" class="hover:text-white">Environmental &amp; Regulatory</a></li>
            <li><a href="/services/project-management-technical-support" class="hover:text-white">Project Management</a></li>
          </ul>
        </div>
        <div class="lg:col-span-2">
          <h4 class="text-[11px] font-semibold tracking-[0.18em] text-white">COMPANY</h4>
          <ul class="mt-4 space-y-2.5 text-sm text-slate-400">
            <li><a href="/about" class="hover:text-white">About Mob</a></li>
            <li><a href="/team" class="hover:text-white">Our Team</a></li>
            <li><a href="/services" class="hover:text-white">Our Services</a></li>
            <li><a href="/news" class="hover:text-white">Insights</a></li>
            <li><a href="/careers" class="hover:text-white">Careers</a></li>
            <li><a href="/contact" class="hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div class="lg:col-span-3">
          <h4 class="text-[11px] font-semibold tracking-[0.18em] text-white">LILONGWE HEAD OFFICE — SADC</h4>
          <p class="mt-4 text-sm text-slate-400 leading-6">
            Area 47 Sector 3<br>Lilongwe<br>Malawi<br>
            <a href="tel:+265881525611" class="text-white/90 hover:text-white">+265 881 525 611</a><br>
            <a href="mailto:info@moblimited.com" class="text-white/90 hover:text-white">info@moblimited.com</a>
          </p>
          <a href="/contact" class="mt-4 inline-flex h-10 px-5 items-center rounded-lg bg-[#0F4A6B] text-white text-[13px] font-semibold hover:bg-white hover:text-[#0a1f2e] transition-colors">Get in Touch →</a>
        </div>
      </div>
      <div class="mt-12 flex flex-col sm:flex-row justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500">
        <span>&copy; {{ date('Y') }} Mob Limited. All rights reserved.</span>
        <span class="flex gap-4">
          <a href="/privacy" class="hover:text-white">Privacy</a>
          <a href="/terms" class="hover:text-white">Terms</a>
          <a href="/sitemap.xml" class="hover:text-white">Sitemap</a>
        </span>
      </div>
    </div>
  </footer>
</body>
</html>