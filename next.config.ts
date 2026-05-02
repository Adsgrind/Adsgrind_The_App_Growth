import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    // turbo configuration removed as it is unrecognized in this version
  },
};

export default nextConfig;
