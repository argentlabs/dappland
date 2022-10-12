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
    domains: [
      "dv3jj1unlp2jl.cloudfront.net",
      "pbs.twimg.com",
      "www.frenslands.xyz",
      "static.cartridge.gg",
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = nextConfig
