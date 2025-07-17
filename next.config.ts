import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      new URL("https://avatars.slack-edge.com/**"),
      new URL("https://cdn-icons-png.flaticon.com/**"),
      new URL("https://me.micahrl.com/**"),
    ],
  },
};

export default nextConfig;
