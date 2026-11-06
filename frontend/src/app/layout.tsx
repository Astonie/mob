import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { getSiteSettingsSafe, settingString } from "@/lib/api";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettingsSafe();
  const siteName = settingString(settings, "site.name", "Mob Limited");
  const title = settingString(settings, "seo.default_title", "Mob Limited — Integrated Mining & Mineral Solutions | Malawi & SADC");
  const description = settingString(settings, "seo.default_description", "Malawi-based, SADC-wide mining solutions. Geological services, exploration, surveying, geophysics, mining consultancy, environmental compliance and project delivery.");
  const ogTitle = settingString(settings, "seo.og_title", "Mob Limited — Integrated Mining & Mineral Solutions");
  const ogDescription = settingString(settings, "seo.og_description", "Malawi-based, SADC-wide mining solutions. Exploration, resource evaluation, mine development and ESG across the Copperbelt and beyond.");

  return {
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    keywords: ["Mob Limited", "mining consultancy Malawi", "SADC mining", "JORC", "NI 43-101", "Copperbelt", "mineral exploration", "mine development", "Lilongwe"],
    openGraph: {
      type: "website",
      locale: "en_MW",
      siteName,
      title: ogTitle,
      description: ogDescription,
    },
    robots: { index: true, follow: true },
    icons: { icon: "/logo-mob.svg" },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#0f1f2e]">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[200] focus:m-4 focus:rounded-lg focus:bg-[#0F4A6B] focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <SiteChrome header={<Header />} footer={<Footer />}>{children}</SiteChrome>
      </body>
    </html>
  );
}
