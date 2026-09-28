import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Mob Limited — Integrated Mining and Mineral Consultancy | Zambia & DRC",
    template: "%s | Mob Limited",
  },
  description: "Mob Limited is Zambia’s leading integrated mining and mineral consultancy — 120+ projects, JORC/NI 43-101, from exploration to mine development across the Copperbelt.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  keywords: ["Mob Limited", "mining consultancy Zambia", "JORC", "NI 43-101", "Copperbelt", "mineral exploration", "mine development"],
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "Mob Limited",
    title: "Mob Limited — Integrated Mining and Mineral Consultancy",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/logo-mob.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#0f1f2e]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
