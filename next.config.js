/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test(".svg"),
    )
    fileLoaderRule.exclude = /\.icon\.svg$/
    config.module.rules.push({
      test: /\.icon\.svg$/,
      loader: require.resolve("@svgr/webpack"),
    })
    return config
  },
  images: {
    domains: ["pbs.twimg.com"], // to load images from twitter
  },
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = nextConfig
