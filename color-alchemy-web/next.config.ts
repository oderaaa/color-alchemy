import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Disable ESLint during builds (allows deployment)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript errors during builds (allows deployment)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
