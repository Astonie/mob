import type { ReactElement } from "react";
import Link from "next/link";
import { MobLogo } from "@/components/ui/logo";
import { brand } from "@/lib/brand";
import { getNavigation, getSiteSettingsSafe, settingString, type SiteSettings } from "@/lib/api";

const iconClass = "flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/70 hover:bg-white/10 hover:text-white transition-colors";

const socialIcons: Record<string, ReactElement> = {
  linkedin: (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  x: (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  facebook: (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  instagram: (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  youtube: (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

async function getFooterNav() {
  try {
    const res = await getNavigation("footer");
    return res.data.items.filter((i) => i.type !== "header");
  } catch {
    return null;
  }
}

export async function Footer() {
  let settings: SiteSettings | null = null;
  let footerItems: { title: string; url: string | null }[] | null = null;
  try {
    [settings, footerItems] = await Promise.all([getSiteSettingsSafe(), getFooterNav()]);
  } catch {
    /* defaults below */
  }

  const blurb = settingString(settings, "content.site_footer_blurb", "Malawi-based, SADC-wide. From greenfield exploration in Lilongwe to mine development in Kolwezi, Solwezi and beyond — we de-risk your resource with JORC-compliant technical excellence across 8 SADC countries.");
  const officeLabel = settingString(settings, "content.footer_office_label", "LILONGWE HEAD OFFICE — SADC");
  const address = settingString(settings, "site.address", "Area 47 Sector 3, Lilongwe, Malawi").split(/,\s*/);
  const phone = settingString(settings, "site.phone", brand.phone);
  const email = settingString(settings, "site.email", brand.email);
  const hubsLine = settingString(settings, "content.footer_hubs_line", "Blantyre • Karonga • Kolwezi • Solwezi • Balama");
  const ctaLabel = settingString(settings, "content.footer_cta_label", "Get in Touch →");
  const copyright = settingString(settings, "site.copyright", "Mob Limited. Integrated Mining and Mineral Consultancy. All rights reserved.");
  const logoLight = settingString(settings, "site.logo_light", "/logo-mob.svg");
  const logoDark = settingString(settings, "site.logo_dark", logoLight || "/logo-mob.svg");
  const logoIcon = settingString(settings, "site.logo_icon", logoLight || "/logo-mob.svg");
  const logos = { logoLight, logoDark, logoIcon };

  const socials = [
    { key: "linkedin", label: "LinkedIn", url: settingString(settings, "social.linkedin", "") },
    { key: "x", label: "X", url: settingString(settings, "social.x", "") },
    { key: "facebook", label: "Facebook", url: settingString(settings, "social.facebook", "") },
    { key: "instagram", label: "Instagram", url: settingString(settings, "social.instagram", "") },
    { key: "youtube", label: "YouTube", url: settingString(settings, "social.youtube", "") },
  ].filter((s) => s.url);

  const legalItems = (footerItems ?? [
    { title: "Privacy", url: "/privacy" },
    { title: "Terms", url: "/terms" },
  ]);

  return (
    <footer className="border-t border-slate-200 bg-[#0a1f2e] text-slate-300 mountain-pattern">
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-3">
          <span className="font-serif text-2xl font-bold tracking-tight text-white">{brand.signature}</span>
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-white/50">{brand.signatureLine}</span>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <MobLogo variant="dark" {...logos} />
            <p className="mt-4 font-serif text-[15px] italic text-[#7cc4e3]">{brand.tagline}</p>
            <p className="mt-4 text-sm leading-7 text-slate-400 max-w-md">{blurb}</p>
            <div className="mt-6 flex gap-2 text-[11px] tracking-widest">
              <span className="px-2.5 py-1.5 border border-white/15 text-white/80 rounded-md">JORC</span>
              <span className="px-2.5 py-1.5 border border-white/15 text-white/80 rounded-md">NI 43-101</span>
              <span className="px-2.5 py-1.5 border border-white/15 text-white/80 rounded-md">SAMREC</span>
            </div>
            {socials.length > 0 && (
              <div className="mt-6 flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.key}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={iconClass}
                  >
                    {socialIcons[social.key]}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-semibold tracking-[0.18em] text-white">SERVICES</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li><Link href="/services#core-services" className="hover:text-white transition-colors">Geological Services</Link></li>
              <li><Link href="/services#core-services" className="hover:text-white transition-colors">Mineral Exploration</Link></li>
              <li><Link href="/services#core-services" className="hover:text-white transition-colors">Surveying, GIS &amp; Remote Sensing</Link></li>
              <li><Link href="/services#core-services" className="hover:text-white transition-colors">Geophysical Services</Link></li>
              <li><Link href="/services#core-services" className="hover:text-white transition-colors">Mining Consultancy</Link></li>
              <li><Link href="/services#core-services" className="hover:text-white transition-colors">Environmental &amp; Regulatory</Link></li>
              <li><Link href="/services#core-services" className="hover:text-white transition-colors">Project Management</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-semibold tracking-[0.18em] text-white">COMPANY</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Mob</Link></li>
              <li><Link href="/team" className="hover:text-white transition-colors">Our Team</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Our Services</Link></li>
              <li><Link href="/news" className="hover:text-white transition-colors">Insights</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[11px] font-semibold tracking-[0.18em] text-white">{officeLabel}</h4>
            <p className="mt-4 text-sm text-slate-400 leading-6">
              {address.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
              <br />
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-white/90 hover:text-white transition-colors">{phone}</a><br />
              <a href={`mailto:${email}`} className="text-white/90 hover:text-white transition-colors">{email}</a><br />
              <a href={`https://${brand.website}`} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">{brand.website}</a><br />
              <span className="text-white/60 text-xs">{hubsLine}</span>
            </p>
            <Link href="/contact" className="mt-4 inline-flex h-10 px-5 items-center rounded-lg bg-[#0F4A6B] text-white text-[13px] font-semibold tracking-wide hover:bg-white hover:text-[#0a1f2e] transition-colors">
              {ctaLabel}
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} {copyright}</span>
          <span className="flex gap-4">
            {legalItems.map((item) => (
              item.url?.startsWith("/") ? (
                <Link key={item.title} href={item.url} className="hover:text-white transition-colors">{item.title}</Link>
              ) : (
                <a key={item.title} href={item.url || "#"} className="hover:text-white transition-colors">{item.title}</a>
              )
            ))}
            <a href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</a>
            <Link href="/admin" className="hover:text-white transition-colors">Staff CMS</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
