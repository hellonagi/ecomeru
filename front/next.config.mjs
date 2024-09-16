import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  images: {
    domains: ['thumbnail.image.rakuten.co.jp'],
  },
  env: {
    RAILS_API_URL: 'http://back:3000',
    BASE_URL_PRO: 'https://ecomeru.com',
    BASE_URL_DEV: 'https://localhost:80',
  },
})
