<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>@yield('title', 'Mob Limited — Integrated Mining & Mineral Consultancy')</title>
  <meta name="description" content="@yield('description', 'Malawi-based, SADC-wide mining consultancy. JORC, NI 43-101 & SAMREC compliant. 120+ projects across 8 SADC countries.')">
  <meta property="og:title" content="@yield('title', 'Mob Limited — Integrated Mining & Mineral Consultancy')">
  <meta property="og:description" content="@yield('description', 'Malawi-based, SADC-wide mining consultancy. JORC, NI 43-101 & SAMREC compliant. 120+ projects across 8 SADC countries.')">
  <meta property="og:type" content="website">
  <meta property="og:url" content="{{ url()->current() }}">
  <meta property="og:site_name" content="Mob Limited">
  <meta name="twitter:card" content="summary_large_image">
  @php
    $logoLight = \App\Models\SiteSetting::where('key','site.logo_light')->value('value') ?: '/logo-mob.svg';
    if (!str_starts_with($logoLight, '/') && !str_starts_with($logoLight, 'http')) {
        $logoLight = '/storage/' . ltrim($logoLight, '/');
    }
    $isCustomLogo = ($logoLight !== '/logo-mob.svg');
    $favicon = $logoLight;
  @endphp
  <link rel="icon" href="{{ $favicon }}" sizes="any">
  <link rel="icon" href="{{ $favicon }}" type="image/svg+xml">
  <link rel="apple-touch-icon" href="{{ $favicon }}">
  <link rel="canonical" href="{{ url()->current() }}">
  @stack('head')
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
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
    .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .reveal.in { opacity: 1; transform: translateY(0); }
    .nav-active { color: #0F4A6B !important; font-weight: 700; }
    .nav-active::after { content: ''; position: absolute; left: 0.75rem; right: 0.75rem; bottom: -1px; height: 2px; background: #0F4A6B; border-radius: 2px; }
    .card-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
    .card-lift:hover { transform: translateY(-6px); box-shadow: 0 20px 40px -12px rgba(15,74,107,0.25); }
    .hero-gradient { background: linear-gradient(135deg, #0a2e4a 0%, #0F4A6B 50%, #0a1f2e 100%); background-size: 200% 200%; animation: gradientShift 8s ease infinite; }
    @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    .marquee-track { display: flex; animation: marquee 30s linear infinite; }
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  </style>
  <script>
    (function () {
      try {
        const t = localStorage.getItem('theme');
        if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
        }
      } catch (e) {}
    })();
  </script>
</head>
<body class="min-h-screen bg-white dark:bg-[#112233] text-[#0f1f2e] antialiased dark:bg-[#0a1f2e] dark:text-slate-100">
  @php
    $publishedSlugs = \App\Models\Page::where('status','published')->pluck('slug')->toArray();
    $navItems = [
      ['/', 'Home'],
      ['/about', 'About'],
      ['/services', 'Our Services'],
      ['/team', 'Our Team'],
      ['/news', 'News'],
      ['/careers', 'Careers'],
      ['/contact', 'Contact'],
    ];
    $visibleNav = [];
    foreach ($navItems as [$url, $label]) {
        $slug = trim($url, '/');
        if ($url === '/' || ! \App\Models\Page::where('slug', $slug)->exists() || in_array($slug, $publishedSlugs)) {
            $visibleNav[] = [$url, $label];
        }
    }
  @endphp
  <header class="sticky top-0 z-50 border-b border-slate-200 dark:border-white/10/70 bg-white dark:bg-[#112233]/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#0a1f2e]/90">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="flex h-[72px] items-center justify-between gap-8">
        <a href="/" class="flex items-center gap-3 shrink-0">
          <img loading="lazy" src="{{ $logoLight }}" alt="Mob Limited" class="h-14 w-auto shrink-0 object-contain">
          @if(!$isCustomLogo)
            <div class="leading-none">
              <div class="font-black tracking-[0.14em] text-[#22262B] text-[15px]">MOB LIMITED</div>
              <div class="text-[9px] tracking-[0.08em] text-[#0F4A6B] font-medium">Integrated Mining &amp; Mineral Solutions</div>
            </div>
          @endif
        </a>
        <nav class="hidden lg:flex items-center gap-1" id="main-nav">
          @foreach($visibleNav as [$url, $label])
            <a href="{{ $url }}" class="relative px-3.5 py-2 text-[13.5px] font-medium text-slate-700 dark:text-slate-200 hover:text-[#0F4A6B]">{{ $label }}</a>
          @endforeach
        </nav>
        <div class="flex items-center gap-2.5">
          <button id="themeToggle" class="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-white dark:bg-[#112233]/10" aria-label="Toggle theme">
            <svg class="h-5 w-5 hidden dark:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
            <svg class="h-5 w-5 block dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
          </button>
          <a href="/contact" class="hidden sm:inline-flex h-10 px-6 items-center justify-center bg-[#0F4A6B] text-white text-[13px] font-semibold rounded-lg hover:bg-[#0a334d]">Contact Us</a>
          <button id="mobileMenuBtn" class="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-100" aria-label="Open menu">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </div>
    </div>
    <div id="mobileMenu" class="hidden lg:hidden border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#112233]">
      <nav class="px-6 py-4 space-y-1">
        @foreach($visibleNav as [$url, $label])
          <a href="{{ $url }}" class="block px-3 py-2.5 rounded-lg text-[15px] font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:bg-white/5 hover:text-[#0F4A6B]">{{ $label }}</a>
        @endforeach
      </nav>
    </div>
      </div>
    </div>
  </header>
  <main id="main-content">
    @yield('content')
  </main>
  <footer class="border-t border-slate-200 dark:border-white/10 bg-[#0a1f2e] text-slate-300 mt-16 dark:border-white/10">
    <div class="mx-auto max-w-7xl px-6 lg:px-8 py-14">
      <div class="grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <div class="flex items-center gap-3">
            <img loading="lazy" src="{{ $logoLight }}" alt="Mob Limited" class="h-12 w-auto shrink-0 object-contain">
            @if(!$isCustomLogo)
              <div class="leading-none">
                <div class="font-black tracking-[0.12em] text-white text-[15px]">MOB LIMITED</div>
                <div class="text-[9px] tracking-[0.08em] text-white/70 font-medium">Integrated Mining &amp; Mineral Solutions</div>
              </div>
            @endif
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
            @foreach($visibleNav as [$url, $label])
              @if($label !== 'Home')
                <li><a href="{{ $url }}" class="hover:text-white">{{ $label }}</a></li>
              @endif
            @endforeach
          </ul>
        </div>
        <div class="lg:col-span-3">
          <h4 class="text-[11px] font-semibold tracking-[0.18em] text-white">LILONGWE HEAD OFFICE — SADC</h4>
          <p class="mt-4 text-sm text-slate-400 leading-6">
            Area 47 Sector 3<br>Lilongwe<br>Malawi<br>
            <a href="tel:+265881525611" class="text-white/90 hover:text-white">+265 881 525 611</a><br>
            <a href="mailto:info@moblimited.com" class="text-white/90 hover:text-white">info@moblimited.com</a>
          </p>
          <a href="/contact" class="mt-4 inline-flex h-10 px-5 items-center rounded-lg bg-[#0F4A6B] text-white text-[13px] font-semibold hover:bg-white dark:bg-[#112233] hover:text-[#0a1f2e] dark:text-white transition-colors">Get in Touch →</a>
        </div>
      </div>
      <div class="mt-12 flex flex-col sm:flex-row justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 dark:text-slate-400">
        <span>&copy; {{ date('Y') }} Mob Limited. All rights reserved.</span>
        <span class="flex gap-4">
          <a href="/privacy" class="hover:text-white">Privacy</a>
          <a href="/terms" class="hover:text-white">Terms</a>
          <a href="/sitemap.xml" class="hover:text-white">Sitemap</a>
        </span>
      </div>
    </div>
  </footer>
  <button id="backToTop" aria-label="Back to top" class="fixed bottom-6 right-6 z-50 hidden h-11 w-11 items-center justify-center rounded-full bg-[#0F4A6B] text-white shadow-lg transition hover:bg-[#0a334d]">
    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>
  </button>

  <div id="cookieBanner" class="fixed bottom-4 left-4 right-4 z-50 hidden max-w-xl rounded-xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-white/10 dark:bg-[#112233]">
    <p class="text-sm text-slate-700 dark:text-slate-200">We use cookies to improve your experience. By continuing, you agree to our <a href="/privacy" class="text-[#0F4A6B] underline">Privacy Policy</a>.</p>
    <div class="mt-3 flex gap-2">
      <button id="cookieAccept" class="rounded-lg bg-[#0F4A6B] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0a334d]">Accept</button>
      <button id="cookieDecline" class="rounded-lg border px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:border-white/20">Decline</button>
    </div>
  </div>

  <script>
    (function () {
      // Theme toggle
      const themeBtn = document.getElementById('themeToggle');
      if (themeBtn) {
        themeBtn.addEventListener('click', () => {
          const isDark = document.documentElement.classList.toggle('dark');
          localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
      }

      // Mobile menu toggle
      const mobileBtn = document.getElementById('mobileMenuBtn');
      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
      }

      // Active nav indicator
      const path = window.location.pathname.replace(/\/$/, '') || '/';
      document.querySelectorAll('#main-nav a').forEach((a) => {
        const href = (a.getAttribute('href') || '').replace(/\/$/, '') || '/';
        if (href === path || (href !== '/' && path.startsWith(href))) {
          a.classList.add('nav-active');
        }
      });

      // Cookie consent
      const cookieBanner = document.getElementById('cookieBanner');
      const cookieAccept = document.getElementById('cookieAccept');
      const cookieDecline = document.getElementById('cookieDecline');
      if (cookieBanner && !localStorage.getItem('cookieConsent')) {
        cookieBanner.classList.remove('hidden');
      }
      if (cookieAccept) {
        cookieAccept.addEventListener('click', () => {
          localStorage.setItem('cookieConsent', 'accepted');
          cookieBanner.classList.add('hidden');
        });
      }
      if (cookieDecline) {
        cookieDecline.addEventListener('click', () => {
          localStorage.setItem('cookieConsent', 'declined');
          cookieBanner.classList.add('hidden');
        });
      }

      // Back to top
      const btn = document.getElementById('backToTop');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 400) { btn.classList.remove('hidden'); btn.classList.add('flex'); }
        else { btn.classList.add('hidden'); btn.classList.remove('flex'); }
      }, { passive: true });
      btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

      // Scroll reveal
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
      }, { threshold: 0.12 });
      document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));

      // CountUp animation
      document.querySelectorAll('[data-countup]').forEach((el) => {
        const target = el.getAttribute('data-countup');
        const match = target.match(/^([\d.]+)(.*)$/);
        if (!match) return;
        const num = parseFloat(match[1]);
        const suffix = match[2];
        let start = 0;
        const duration = 1500;
        const startTime = performance.now();
        function step(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = num * eased;
          el.textContent = (Number.isInteger(num) ? Math.round(current) : current.toFixed(1)) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        const counterObs = new IntersectionObserver((entries) => {
          entries.forEach((e) => { if (e.isIntersecting) { requestAnimationFrame(step); counterObs.unobserve(e.target); } });
        }, { threshold: 0.5 });
        counterObs.observe(el);
      });
    })();
  </script>
</body>
</html>