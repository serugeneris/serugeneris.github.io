/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages configuration
  basePath: process.env.NODE_ENV === 'production' ? '/serugeneris.github.io' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/serugeneris.github.io/' : '',
  trailingSlash: true,
};

export default nextConfig;
