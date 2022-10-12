/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["pbs.twimg.com"], // to load images from twitter
  },
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = nextConfig
