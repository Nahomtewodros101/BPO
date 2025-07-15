// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Enable type checking during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Enable linting during build
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;
