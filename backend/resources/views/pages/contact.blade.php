@extends('layouts.app')
@section('title','Contact | Mob Limited')
@section('content')
<section class="relative overflow-hidden bg-[#061a2a] text-white py-20">
  <div class="absolute inset-0 bg-gradient-to-br from-[#0a2e4a] via-[#0F4A6B] to-[#0a1f2e]"></div>
  <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
    <p class="text-[11px] tracking-[0.22em] text-white/70 font-semibold">LILONGWE HEAD OFFICE — SADC</p>
    <h1 class="mt-5 font-serif text-4xl lg:text-5xl font-bold">Contact Us</h1>
    <p class="mt-4 text-white/80 max-w-2xl">Malawi-based, SADC-wide. Reach our Lilongwe, Blantyre, Karonga, Kolwezi, Solwezi teams.</p>
  </div>
</section>

<section class="mx-auto max-w-7xl px-6 lg:px-8 py-16">
  <div class="grid lg:grid-cols-2 gap-10">
    <div>
      <h2 class="font-serif text-2xl font-bold text-[#0a1f2e] dark:text-white">Get in touch</h2>
      <p class="mt-4 text-slate-700 dark:text-slate-200 leading-7">
        Email: <a href="mailto:info@moblimited.com" class="text-[#0F4A6B]">info@moblimited.com</a><br>
        Phone: <a href="tel:+265881525611" class="text-[#0F4A6B]">+265 881 525 611</a><br>
        Address: Area 47 Sector 3, Lilongwe, Malawi
      </p>
      <p class="mt-6 text-sm text-slate-500 dark:text-slate-400">Response within one business day.</p>
    </div>
    <div>
      <form id="contactForm" class="space-y-4">
        <input type="text" name="website" class="hidden" tabindex="-1" autocomplete="off">
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-200">Name</label>
          <input name="name" required class="mt-1 w-full rounded-lg border px-3 py-2">
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
          <input name="email" type="email" required class="mt-1 w-full rounded-lg border px-3 py-2">
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-200">Message</label>
          <textarea name="message" required rows="5" class="mt-1 w-full rounded-lg border px-3 py-2"></textarea>
        </div>
        <button type="submit" class="rounded-lg bg-[#0F4A6B] px-6 py-2 text-white font-semibold hover:bg-[#0a334d]">Send message</button>
        <div id="contactMsg" class="text-sm"></div>
      </form>
    </div>
  </div>
</section>

<script>
  (function () {
    const form = document.getElementById('contactForm');
    const msg = document.getElementById('contactMsg');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      msg.textContent = 'Sending...';
      msg.className = 'text-sm text-slate-500 dark:text-slate-400';
      const data = Object.fromEntries(new FormData(form));
      try {
        const res = await fetch('https://mobmining.com/api/v1/contact-submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data),
        });
        const json = await res.json().catch(() => ({}));
        if (res.ok) {
          msg.textContent = 'Thank you! We’ll respond within one business day.';
          msg.className = 'text-sm text-emerald-600';
          form.reset();
        } else {
          msg.textContent = json.message || 'Something went wrong. Please try again.';
          msg.className = 'text-sm text-red-600';
        }
      } catch {
        msg.textContent = 'Network error. Please try again.';
        msg.className = 'text-sm text-red-600';
      }
    });
  })();
</script>
@endsection