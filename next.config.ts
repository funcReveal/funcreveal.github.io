import type { NextConfig } from "next";

const basePath = process.env.PAGES_BASE_PATH || "";
const assetPrefix = basePath ? `${basePath}/` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
