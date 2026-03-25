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
  swcMinify: true,
  compress: true,
  poweredByHeader: false, // 隐藏 X-Powered-By 头
  generateEtags: true, // 启用 ETag
  
  // 实验性功能
  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts'],
    scrollRestoration: true, // 启用滚动恢复
  },
  
  // React 严格模式
  reactStrictMode: true,
  
  // 编译器配置
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // webpack 配置
  webpack: (config, { dev, isServer }) => {
    // 生产环境优化
    if (!dev && !isServer) {
      // 分割大模块
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          // React 核心库
          react: {
            name: 'react',
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            priority: 40,
            enforce: true,
          },
          // 动画库
          animation: {
            name: 'animation',
            test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
            priority: 30,
            enforce: true,
          },
          // 图表库
          charts: {
            name: 'charts',
            test: /[\\/]node_modules[\\/](recharts)[\\/]/,
            priority: 20,
            enforce: true,
          },
          // 工具库
          vendors: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/](?!react|react-dom|framer-motion|recharts)[\\/]/,
            priority: 10,
            enforce: true,
          },
          // 公共代码
          common: {
            name: 'common',
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      };
    }
    
    return config;
  },
};

export default nextConfig;
