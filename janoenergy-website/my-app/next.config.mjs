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
  // 优化构建
  swcMinify: true,
  // 压缩
  compress: true,
  // 实验性功能
  experimental: {
    optimizeCss: true,
    // 优化包体积
    optimizePackageImports: ['lucide-react'],
  },
  // 性能优化：资源内联阈值
  inlineImageLimit: 8192,
  // 优化脚本加载
  reactStrictMode: true,
  // 编译器优化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // 头部配置
  async headers() {
    return [
      {
        source: '/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
