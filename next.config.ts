import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/images/Alumni/:path*",
        destination: "/images/alumni/:path*",
      },
    ];
  },
};

export default nextConfig;

