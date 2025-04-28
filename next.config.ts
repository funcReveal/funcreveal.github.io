import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  trailingSlash: true,
  basePath: isProd ? "/funcreveal.github.io" : "", // 例如 /funcReveal
  assetPrefix: isProd ? "/funcreveal.github.io/" : "", // 讓 static 資源也吃正確路徑
};

export default nextConfig;
