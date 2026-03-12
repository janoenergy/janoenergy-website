/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // 排除 API 路由，只构建前端
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig;
