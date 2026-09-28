import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const title = "Mob Limited — Integrated Mining and Mineral Consultancy";
  const staticPages = ["", "/about", "/projects", "/minerals", "/news", "/careers", "/sustainability", "/contact", "/search"];
  let dynamic: MetadataRoute.Sitemap = [];
  try {
    const [projects, minerals, news] = await Promise.all([
      fetch(`${api}/api/v1/projects?per_page=100`).then((r) => r.json()).catch(() => ({ data: [] })),
      fetch(`${api}/api/v1/minerals?per_page=100`).then((r) => r.json()).catch(() => ({ data: [] })),
      fetch(`${api}/api/v1/news?per_page=100`).then((r) => r.json()).catch(() => ({ data: [] })),
    ]);
    const pData = projects.data?.data ?? projects.data ?? [];
    const mData = minerals.data?.data ?? minerals.data ?? [];
    const nData = news.data?.data ?? news.data ?? [];
    dynamic = [
      ...pData.map((p: { slug: string; updated_at?: string }) => ({ url: `${base}/projects/${p.slug}`, lastModified: p.updated_at ? new Date(p.updated_at) : new Date(), changeFrequency: "weekly" as const, priority: 0.8 })),
      ...mData.map((m: { slug: string }) => ({ url: `${base}/minerals/${m.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 })),
      ...nData.map((n: { slug: string; updated_at?: string }) => ({ url: `${base}/news/${n.slug}`, lastModified: n.updated_at ? new Date(n.updated_at) : new Date(), changeFrequency: "daily" as const, priority: 0.7 })),
    ];
  } catch {}
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    ...staticPages.map((p) => ({ url: `${base}${p || "/"}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.5 })),
    ...dynamic,
  ];
}
