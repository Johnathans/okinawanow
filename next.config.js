/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'lh3.googleusercontent.com', // For Google profile images
      'firebasestorage.googleapis.com', // For Firebase Storage images
      'images.unsplash.com', 
      'maps.googleapis.com', 
      'www.acefamilyhousing.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'www.acefamilyhousing.com',
      },
    ],
  },
  sassOptions: {
    includePaths: ['./node_modules'],
    prependData: `@import "~bootstrap/scss/functions";`
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

module.exports = nextConfig;
