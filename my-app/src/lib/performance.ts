/**
 * 性能优化配置
 * 包含图片优化、代码分割、缓存策略等
 */

// 图片优化配置
export const imageConfig = {
  // 支持的图片格式（按优先级排序）
  formats: ['image/avif', 'image/webp', 'image/jpeg', 'image/png'],
  
  // 默认图片质量
  quality: 80,
  
  // 懒加载阈值
  lazyThreshold: 0.1,
  
  // 根边距（提前加载距离）
  rootMargin: '50px',
  
  // 占位图颜色
  placeholderColor: '#f3f4f6',
  
  // 响应式断点
  breakpoints: [640, 768, 1024, 1280, 1536],
  
  // 图片尺寸限制
  maxWidth: 1920,
  maxHeight: 1080,
};

// 代码分割配置
export const codeSplittingConfig = {
  // 需要动态导入的大型组件
  dynamicImports: [
    '@/components/ChatWidget',
    '@/components/Analytics',
    'recharts',
    'xlsx',
  ],
  
  // 预加载的关键组件
  preloadComponents: [
    '@/components/PageLoader',
    '@/components/BackToTop',
  ],
};

// 缓存策略配置
export const cacheConfig = {
  // 静态资源缓存时间（秒）
  staticMaxAge: 31536000, // 1年
  
  // 图片缓存时间
  imageMaxAge: 2592000, // 30天
  
  // API 缓存时间
  apiMaxAge: 60, // 1分钟
  
  // 页面缓存时间
  pageMaxAge: 300, // 5分钟
};

// 关键 CSS 配置
export const criticalCSSConfig = {
  // 关键 CSS 选择器
  criticalSelectors: [
    'body',
    '#__next',
    '.page-loader',
    'nav',
    'header',
  ],
  
  // 预加载的关键资源
  preloadResources: [
    '/fonts/main.woff2',
    '/logo.svg',
  ],
};

// 性能监控配置
export const performanceConfig = {
  // 启用 Web Vitals 监控
  enableWebVitals: true,
  
  // 性能指标阈值
  thresholds: {
    LCP: 2500, // Largest Contentful Paint (ms)
    FID: 100,  // First Input Delay (ms)
    CLS: 0.1,  // Cumulative Layout Shift
    FCP: 1800, // First Contentful Paint (ms)
    TTFB: 600, // Time to First Byte (ms)
  },
  
  // 慢请求阈值
  slowRequestThreshold: 1000, // ms
};

// 资源提示配置
export const resourceHints = {
  // DNS 预解析
  dnsPrefetch: [
    'https://api.janoenergy.com',
    ,
  ],
  
  // 预连接
  preconnect: [
    'https://api.janoenergy.com',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ],
  
  // 预加载关键资源
  preload: [
    { href: '/fonts/main.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
  ],
  
  // 预获取下一页
  prefetch: [
    '/about',
    '/business',
    '/projects',
    '/contact',
  ],
};

// 图片懒加载 Hook
export function useLazyImage() {
  return {
    threshold: imageConfig.lazyThreshold,
    rootMargin: imageConfig.rootMargin,
    triggerOnce: true,
  };
}

// 生成响应式图片 srcset
export function generateSrcSet(src: string, widths: number[] = imageConfig.breakpoints): string {
  if (src.startsWith('http')) {
    // 对于外部图片，使用原始 URL
    return src;
  }
  
  // 对于本地图片，生成不同尺寸的 srcset
  return widths
    .map((width) => `${src}?w=${width} ${width}w`)
    .join(', ');
}

// 生成图片 sizes 属性
export function generateSizes(): string {
  return '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw';
}

// 性能监控脚本
export const performanceMonitoringScript = `
  // Web Vitals 监控
  if ('web-vitals' in window) {
    // 监听 LCP
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
      // 发送到分析服务
      if (window.gtag) {
        window.gtag('event', 'web_vitals', {
          event_category: 'Web Vitals',
          event_label: 'LCP',
          value: Math.round(lastEntry.startTime),
          non_interaction: true,
        });
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });
    
    // 监听 CLS
    let clsValue = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      console.log('CLS:', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
    
    // 监听 FID
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const delay = entry.processingStart - entry.startTime;
        console.log('FID:', delay);
      }
    }).observe({ entryTypes: ['first-input'] });
  }
  
  // 资源加载监控
  if ('PerformanceObserver' in window) {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.responseEnd - entry.startTime > 1000) {
          console.warn('Slow resource:', entry.name, entry.responseEnd - entry.startTime);
        }
      }
    }).observe({ entryTypes: ['resource'] });
  }
`;
