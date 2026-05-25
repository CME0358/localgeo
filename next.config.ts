import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/pdf": [
      "./lib/pdf/templates/**/*",
      "./node_modules/@fontsource/noto-sans-jp/files/**/*",
    ],
  },
};

export default nextConfig;
