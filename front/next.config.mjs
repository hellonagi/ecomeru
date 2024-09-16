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
    RAILS_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  },
})
