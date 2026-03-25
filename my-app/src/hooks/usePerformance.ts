'use client';

import { useEffect, useState } from 'react';

/**
 * 性能监控 Hook
 * 用于监控 Web Vitals 和性能指标
 */
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<{
    lcp?: number;
    fid?: number;
    cls?: number;
    fcp?: number;
    ttfb?: number;
  }>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 检查 PerformanceObserver 支持
    if (!('PerformanceObserver' in window)) return;

    const observers: PerformanceObserver[] = [];

    try {
      // LCP - Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
        setMetrics((prev) => ({ ...prev, lcp: lastEntry.startTime }));
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      observers.push(lcpObserver);
    } catch (e) {
      // 浏览器不支持此类型
    }

    try {
      // FID - First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fidEntry = entry as PerformanceEntry & { 
            processingStart: number; 
            startTime: number;
          };
          const delay = fidEntry.processingStart - fidEntry.startTime;
          setMetrics((prev) => ({ ...prev, fid: delay }));
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      observers.push(fidObserver);
    } catch (e) {
      // 浏览器不支持此类型
    }

    try {
      // CLS - Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const clsEntry = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
          if (!clsEntry.hadRecentInput) {
            clsValue += clsEntry.value;
          }
        }
        setMetrics((prev) => ({ ...prev, cls: clsValue }));
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      observers.push(clsObserver);
    } catch (e) {
      // 浏览器不支持此类型
    }

    try {
      // FCP - First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fcpEntry = entry as PerformanceEntry & { startTime: number };
          if (entry.name === 'first-contentful-paint') {
            setMetrics((prev) => ({ ...prev, fcp: fcpEntry.startTime }));
          }
        }
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
      observers.push(fcpObserver);
    } catch (e) {
      // 浏览器不支持此类型
    }

    // TTFB - Time to First Byte
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        setMetrics((prev) => ({ ...prev, ttfb: navigation.responseStart }));
      }
    }

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return metrics;
}

/**
 * 网络状态 Hook
 */
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [connectionType, setConnectionType] = useState<string>('unknown');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // 获取网络连接类型
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (connection) {
      setConnectionType(connection.effectiveType || 'unknown');
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, connectionType };
}

/**
 * 资源预加载 Hook
 */
export function usePreloadResources(resources: string[]) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const links: HTMLLinkElement[] = [];

    resources.forEach((resource) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      
      // 根据文件扩展名判断类型
      if (resource.endsWith('.css')) {
        link.as = 'style';
      } else if (resource.endsWith('.js')) {
        link.as = 'script';
      } else if (resource.match(/\.(woff2?|ttf|otf)$/)) {
        link.as = 'font';
        link.crossOrigin = 'anonymous';
      } else if (resource.match(/\.(jpg|jpeg|png|gif|webp|avif)$/)) {
        link.as = 'image';
      }

      document.head.appendChild(link);
      links.push(link);
    });

    return () => {
      links.forEach((link) => link.remove());
    };
  }, [resources]);
}

export default usePerformanceMonitor;
