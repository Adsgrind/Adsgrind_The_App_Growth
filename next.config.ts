import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    allowedDevOrigins: ['172.21.181.125'],
  },
};

export default nextConfig;
