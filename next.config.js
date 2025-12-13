const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },

  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
    unoptimized: true, // Vercel handles optimization; this ensures local/CI builds work
  },

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

module.exports = withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  org: 'tom-metten',
  project: 'tmttn-eu',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Webpack plugin options
  webpack: {
    // Automatically tree-shake Sentry logger statements to reduce bundle size
    treeshake: {
      removeDebugLogging: true,
    },
    // Enables automatic instrumentation of Vercel Cron Monitors
    automaticVercelMonitors: true,
  },
})