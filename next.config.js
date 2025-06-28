/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [],
    unoptimized: true, // Required for static export
    formats: ['image/webp', 'image/avif'],
  },
  output: 'export', // Enable static export for Netlify
  trailingSlash: true, // Add trailing slashes for better static hosting
  distDir: 'out', // Output directory for static export
  
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  
  // Turbopack configuration for development
  turbopack: {
    rules: {},
    resolveAlias: {
      '@components': './src/components',
      '@features': './src/features',
      '@services': './src/services',
      '@styles': './src/styles',
      '@utils': './src/utils',
      '@contexts': './src/contexts',
    },
  },
  
  // Bundle analysis - only when needed for production builds
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config, { dev, isServer }) => {
      // Only apply during production builds
      if (dev) return config
      
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        })
      )
      
      return config
    },
  }),
}

module.exports = nextConfig