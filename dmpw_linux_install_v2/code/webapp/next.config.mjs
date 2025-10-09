// next.config.js
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const baseConfig = {
  transpilePackages: ['@refinedev/antd'],
  output: 'standalone',
  productionBrowserSourceMaps: false,
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['@refinedev/antd', 'antd', '@ant-design/icons', '@ant-design/charts'],
  },
  compress: true,
  optimizeFonts: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
  },
};

export default withNextIntl(baseConfig);
