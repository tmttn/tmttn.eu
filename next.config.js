/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [],
    unoptimized: true, // Required for static export
  },
  output: 'export', // Enable static export for Netlify
  trailingSlash: true, // Add trailing slashes for better static hosting
  distDir: 'out', // Output directory for static export
}

module.exports = nextConfig