import Link from "next/link";
import { MobLogo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#0a1f2e] text-slate-300 mountain-pattern">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <MobLogo variant="dark" />
            <p className="mt-5 text-sm leading-7 text-slate-400 max-w-md">
              Malawi-based, SADC-wide. From greenfield exploration in Lilongwe to mine development in Kolwezi, Solwezi and beyond — we de-risk your resource with JORC-compliant technical excellence across 8 SADC countries.
            </p>
            <div className="mt-6 flex gap-2 text-[11px] tracking-widest">
              <span className="px-2.5 py-1.5 border border-white/15 text-white/80 rounded-sm">JORC</span>
              <span className="px-2.5 py-1.5 border border-white/15 text-white/80 rounded-sm">NI 43-101</span>
              <span className="px-2.5 py-1.5 border border-white/15 text-white/80 rounded-sm">SAMREC</span>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-semibold tracking-[0.18em] text-white">SERVICES</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li><Link href="/projects" className="hover:text-white transition-colors">Exploration</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Resource Estimation</Link></li>
              <li><Link href="/minerals" className="hover:text-white transition-colors">Mine Planning</Link></li>
              <li><Link href="/sustainability" className="hover:text-white transition-colors">ESG & Permitting</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-semibold tracking-[0.18em] text-white">COMPANY</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Mob</Link></li>
              <li><Link href="/news" className="hover:text-white transition-colors">Insights</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-semibold tracking-[0.18em] text-white">LILONGWE HEAD OFFICE — SADC</h4>
            <p className="mt-4 text-sm text-slate-400 leading-6">
              Area 47 Sector 3<br />Lilongwe, Malawi<br />
              <span className="text-white/90">+265 1 123 456</span><br />
              <span className="text-white/90">info@moblimited.com</span><br />
              <span className="text-white/60 text-xs">Blantyre • Karonga • Kolwezi • Solwezi • Balama</span>
            </p>
            <Link href="/contact" className="mt-4 inline-flex h-9 px-5 items-center bg-[#0F4A6B] text-white text-xs font-semibold tracking-wide hover:bg-white hover:text-[#0a1f2e] transition-colors">
              Get in Touch →
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Mob Limited. Integrated Mining and Mineral Consultancy. All rights reserved.</span>
          <span className="flex gap-4"><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link><Link href="/terms" className="hover:text-white transition-colors">Terms</Link><a href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</a></span>
        </div>
      </div>
    </footer>
  );
}
