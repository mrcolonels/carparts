/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'img.alicdn.com',
      }
    ],
    domains: ['localhost']
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  reactStrictMode: true,
}

module.exports = nextConfig