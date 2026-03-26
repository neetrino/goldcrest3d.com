import type { NextConfig } from "next";

/** Quote form / multiple images — allow up to 50MB body for Server Actions */
const BODY_SIZE_LIMIT_BYTES = 50 * 1024 * 1024;

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: BODY_SIZE_LIMIT_BYTES,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.figma.com",
        pathname: "/api/mcp/asset/**",
      },
    ],
  },
};

export default nextConfig;
