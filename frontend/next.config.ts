import type { NextConfig } from "next";

function hostOf(url: string): { protocol: "http" | "https"; hostname: string } | null {
  try {
    const u = new URL(url);
    return { protocol: u.protocol.replace(":", "") as "http" | "https", hostname: u.hostname };
  } catch {
    return null;
  }
}

const apiHost = hostOf(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000");
const siteHost = hostOf(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [];
if (apiHost) remotePatterns.push({ protocol: apiHost.protocol, hostname: apiHost.hostname });
if (siteHost && siteHost.hostname !== apiHost?.hostname) remotePatterns.push({ protocol: siteHost.protocol, hostname: siteHost.hostname });
remotePatterns.push({ protocol: "https", hostname: "images.unsplash.com" });
remotePatterns.push({ protocol: "http", hostname: "localhost" });
remotePatterns.push({ protocol: "https", hostname: "localhost" });

const nextConfig: NextConfig = {
  output: "standalone",
  images: { remotePatterns },
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    return [
      {
        source: "/api/v1/:path*",
        destination: `${apiUrl}/api/v1/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        ],
      },
    ];
  },
};

export default nextConfig;
