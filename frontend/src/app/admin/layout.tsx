import Link from "next/link";
import { MobLogo } from "@/components/ui/logo";

export const metadata = {
  title: "Admin — Mob Limited",
  robots: { index: false, follow: false, nocache: true } as const,
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
          <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-200">
            <MobLogo className="scale-[0.85] origin-left" />
          </div>
          <div className="px-6 py-3 bg-[#0F4A6B] border-b border-[#0F4A6B]/30">
            <div className="text-[11px] font-bold tracking-[0.14em] text-white flex items-center gap-1.5">🔒 PRIVATE CMS</div>
            <div className="text-xs text-white/70 mt-1">Staff only — not public</div>
          </div>
          <nav className="flex-1 p-4 space-y-1 text-sm">
            <div className="text-xs tracking-widest text-slate-400 px-2 py-2">CONTENT</div>
            <Link href="/admin" className="flex px-3 py-2 rounded-sm bg-slate-900 text-white">Dashboard</Link>
            <Link href="/admin/projects" className="flex px-3 py-2 rounded-sm hover:bg-slate-100">Projects</Link>
            <Link href="/admin/minerals" className="flex px-3 py-2 rounded-sm hover:bg-slate-100">Minerals</Link>
            <Link href="/admin/news" className="flex px-3 py-2 rounded-sm hover:bg-slate-100">News</Link>
            <Link href="/admin/pages" className="flex px-3 py-2 rounded-sm hover:bg-slate-100">Pages & Blocks</Link>
            <Link href="/admin/media" className="flex px-3 py-2 rounded-sm hover:bg-slate-100">Media</Link>
            <div className="text-xs tracking-widest text-slate-400 px-2 py-2 mt-4">SYSTEM</div>
            <Link href="/admin/login" className="flex px-3 py-2 rounded-sm hover:bg-slate-100">Login</Link>
            <a href="/" className="flex px-3 py-2 rounded-sm hover:bg-slate-100 text-slate-600">← Public Site</a>
          </nav>
          <div className="p-4 border-t border-slate-200 text-xs text-slate-600">info@moblimited.com • super-admin</div>
        </aside>
        <div className="flex-1 flex flex-col">
          <header className="h-16 flex items-center justify-between px-6 border-b border-slate-200 bg-white lg:hidden">
            <span className="font-bold">CMS</span>
            <Link href="/" className="text-sm">Public Site</Link>
          </header>
          <main className="flex-1 p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
