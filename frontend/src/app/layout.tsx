import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Mob Limited — Integrated Mining and Mineral Consultancy | Malawi & SADC",
    template: "%s | Mob Limited",
  },
  description: "Mob Limited is Malawi's leading integrated mining and mineral consultancy — 120+ projects, JORC/NI 43-101, from exploration to mine development across 8 SADC countries.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  keywords: ["Mob Limited", "mining consultancy Malawi", "SADC mining", "JORC", "NI 43-101", "Copperbelt", "mineral exploration", "mine development", "Lilongwe"],
  openGraph: {
    type: "website",
    locale: "en_MW",
    siteName: "Mob Limited",
    title: "Mob Limited — Integrated Mining and Mineral Consultancy",
    description: "Malawi-based, SADC-wide mining consultancy. 120+ projects, JORC/NI 43-101, exploration to mine development.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/logo-mob.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#0f1f2e]">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[200] focus:m-4 focus:rounded-lg focus:bg-[#0F4A6B] focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
