/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ["@nextui-org/react", "@nextui-org/theme"],
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "opencollective-production.s3.us-west-1.amazonaws.com",
      "avatars.githubusercontent.com",
      "logo.clearbit.com",
      "i.pravatar.cc",
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'nextjs-strapi.test',
        port: '2337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      }
    ],
  },
}

module.exports = nextConfig
