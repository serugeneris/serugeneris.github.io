/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages specific configuration
  trailingSlash: true,
  distDir: 'out',
};

export default nextConfig;
