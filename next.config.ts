import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  //instead of nextjs default, we use industry standart for saas apps
  cacheLife: {
    default: {
      stale: 60,
      revalidate: 300,
      expire: 3600,
    },
  },
  //reason is mentioned in app/global-not-found.tsx
  experimental: {
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      '*.lottie': {
        type: 'asset',
      },
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};
const withNextIntl = createNextIntlPlugin('./i18n/requests.ts');
export default withNextIntl(nextConfig);
