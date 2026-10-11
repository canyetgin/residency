import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    dangerouslyAllowSVG: true,
  },
  //instead of nextjs default, we use industry standart for saas apps
  cacheLife: {
    default: {
      stale: 60,
      revalidate: 300,
      expire: 3600,
    },
  },
  turbopack: {
    rules: {
      "*.lottie": {
        type: "asset",
      },
    },
  },
};
const withNextIntl = createNextIntlPlugin("./i18n/requests.ts");
export default withNextIntl(nextConfig);
