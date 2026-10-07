import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
        '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
      '*.lottie': {
        type: 'asset', 
      },
    },
  },
};

export default nextConfig;
