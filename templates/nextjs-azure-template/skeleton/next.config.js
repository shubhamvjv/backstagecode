/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Azure deployment requires standalone output
  output: 'standalone',

  // We do NOT want a custom distDir here
  // Remove: distDir: 'dist',

  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
