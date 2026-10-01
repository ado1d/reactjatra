import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `standalone` output is for the sandbox/docker deployments;
  // Vercel manages its own output format, so skip it there.
  ...(process.env.VERCEL ? {} : { output: "standalone" as const }),
  // z-ai-web-dev-sdk is an optional runtime fallback for the AI tutor
  // (used when Groq is unreachable); keep it external so it is only
  // loaded if the fallback actually runs.
  serverExternalPackages: ["z-ai-web-dev-sdk"],
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
