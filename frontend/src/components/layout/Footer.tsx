import Link from "next/link";
import { MobLogo } from "@/components/ui/logo";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/mob-limited",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/moblimited",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

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
              <span className="px-2.5 py-1.5 border border-white/15 text-white/80 rounded-md">JORC</span>
              <span className="px-2.5 py-1.5 border border-white/15 text-white/80 rounded-md">NI 43-101</span>
              <span className="px-2.5 py-1.5 border border-white/15 text-white/80 rounded-md">SAMREC</span>
            </div>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {social.icon}
                </a>
              ))}
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
            <Link href="/contact" className="mt-4 inline-flex h-10 px-5 items-center rounded-lg bg-[#0F4A6B] text-white text-[13px] font-semibold tracking-wide hover:bg-white hover:text-[#0a1f2e] transition-colors">
              Get in Touch →
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Mob Limited. Integrated Mining and Mineral Consultancy. All rights reserved.</span>
          <span className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <a href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
