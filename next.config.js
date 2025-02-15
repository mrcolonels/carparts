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
      }
    ],
    domains: ['localhost']
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  reactStrictMode: true,
  // 如果还有问题，可以尝试禁用 SSR
  // experimental: {
  //   runtime: 'nodejs',
  //   serverComponents: false,
  // }
}

module.exports = nextConfig 