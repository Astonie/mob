import Link from "next/link";
import { getNavigation } from "@/lib/api";
import { MobLogo } from "@/components/ui/logo";

export async function Header() {
  let menu = null;
  try {
    const res = await getNavigation("main");
    menu = res.data;
  } catch {
    menu = null;
  }

  const fallback = [
    { title: "About", url: "/about" },
    { title: "Operations", url: "/projects" },
    { title: "Minerals", url: "/minerals" },
    { title: "Sustainability", url: "/sustainability" },
    { title: "News", url: "/news" },
    { title: "Careers", url: "/careers" },
  ];
  const items = menu?.items?.length ? menu.items : fallback;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-[78px] items-center justify-between gap-8">
          <Link href="/" className="flex items-center shrink-0">
            <MobLogo />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {items.map((item) => (
              <Link
                key={item.title}
                href={item.url || "#"}
                className="relative px-3.5 py-2 text-[13.5px] font-medium tracking-wide text-slate-700 hover:text-[#0F4A6B] transition-colors group"
              >
                {item.title}
                <span className="absolute inset-x-3 -bottom-1 h-px scale-x-0 bg-[#0F4A6B] transition-transform group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <Link href="/contact" className="hidden sm:inline-flex h-10 px-6 items-center justify-center bg-[#0F4A6B] text-white text-[13px] font-semibold tracking-wide hover:bg-[#0a334d] transition-colors shadow-sm">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:hidden border-t border-slate-100 bg-white">
        <nav className="mx-auto max-w-7xl px-6 py-3 flex gap-5 overflow-x-auto text-[13px]">
          {items.map((i) => (
            <Link key={i.title} href={i.url || "#"} className="whitespace-nowrap font-medium text-slate-600 hover:text-[#0F4A6B]">
              {i.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
