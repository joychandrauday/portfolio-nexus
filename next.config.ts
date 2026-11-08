import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        // Archived portfolio: keep it crawlable so `noindex` is honoured, but
        // never let the pages enter an index. Canonical points at the main site.
        source: "/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, follow" },
          { key: "Link", value: '<https://joychandrauday.vercel.app>; rel="canonical"' },
        ],
      },
    ];
  },
};

export default nextConfig;
