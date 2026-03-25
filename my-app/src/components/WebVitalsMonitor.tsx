'use client';

import { useEffect, useState } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// 性能指标阈值
const THRESHOLDS = {
  LCP: 2500, // Largest Contentful Paint (ms)
  FID: 100,  // First Input Delay (ms)
  CLS: 0.1,  // Cumulative Layout Shift
  FCP: 1800, // First Contentful Paint (ms)
  TTFB: 600, // Time to First Byte (ms)
};

// 安全的性能监控组件
function WebVitalsContent() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 确保在浏览器环境
    if (typeof window === 'undefined') return;

    // 等待页面完全加载后再初始化
    const init = () => {
      // 使用 requestIdleCallback 或 setTimeout 延迟执行
      const scheduleTask = (window as any).requestIdleCallback || setTimeout;
      
      scheduleTask(() => {
        loadWebVitals();
      }, { timeout: 2000 });
    };

    // 如果页面已加载，直接初始化；否则等待 load 事件
    if (document.readyState === 'complete') {
      init();
    } else {
      window.addEventListener('load', init, { once: true });
    }

    return () => {
      window.removeEventListener('load', init);
    };
  }, []);

  const loadWebVitals = async () => {
    try {
      // 检查必要的浏览器 API 支持
      if (!('PerformanceObserver' in window)) {
        console.warn('[Web Vitals] PerformanceObserver not supported');
        return;
      }

      // 动态导入 web-vitals
      const webVitals = await import('web-vitals');
      
      // 检查导入是否成功
      if (!webVitals || typeof webVitals.getCLS !== 'function') {
        console.warn('[Web Vitals] Library not loaded correctly');
        return;
      }

      const { getCLS, getFCP, getFID, getLCP, getTTFB } = webVitals;

      const reportMetric = (metric: any) => {
        // 开发环境打印到控制台
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Web Vitals] ${metric.name}:`, metric.value);
        }

        // 生产环境发送到分析服务
        if (process.env.NODE_ENV === 'production') {
          reportToAnalytics(metric);
        }
      };

      // 获取所有 Web Vitals 指标
      getCLS(reportMetric);
      getFCP(reportMetric);
      getFID(reportMetric);
      getLCP(reportMetric);
      getTTFB(reportMetric);

    } catch (error) {
      // 静默失败，不影响用户体验
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Web Vitals] Initialization failed:', error);
      }
    }
  };

  const reportToAnalytics = (metric: any) => {
    try {
      const body = JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
        navigationType: metric.navigationType,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      });

      // 使用 sendBeacon 或 fetch 发送
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/analytics/vitals', body);
      } else {
        fetch('/api/analytics/vitals', {
          body,
          method: 'POST',
          keepalive: true,
        }).catch(() => {
          // 忽略上报失败
        });
      }
    } catch (error) {
      // 上报失败也不影响页面
    }
  };

  return null;
}

// 带错误边界的包装组件
export function WebVitalsMonitor() {
  return (
    <ErrorBoundary fallback={null}>
      <WebVitalsContent />
    </ErrorBoundary>
  );
}
