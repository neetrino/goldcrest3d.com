import type { NextConfig } from "next";

/** Quote form / multiple images — allow up to 50MB body for Server Actions */
const BODY_SIZE_LIMIT_BYTES = 50 * 1024 * 1024;

function r2RemotePattern():
  | { protocol: "https"; hostname: string; pathname: string }
  | undefined {
  const raw = process.env.R2_PUBLIC_URL;
  if (!raw) return undefined;
  try {
    const u = new URL(raw);
    if (u.protocol !== "https:") return undefined;
    return {
      protocol: "https",
      hostname: u.hostname,
      pathname: "/**",
    };
  } catch {
    return undefined;
  }
}

const r2Pattern = r2RemotePattern();

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
      ...(r2Pattern ? [r2Pattern] : []),
    ],
  },
};

export default nextConfig;
