'use client';

import { useEffect } from 'react';
import { getCLS, getFCP, getFID, getLCP, getTTFB, Metric } from 'web-vitals';

// 性能指标阈值
const THRESHOLDS = {
  LCP: 2500, // Largest Contentful Paint (ms)
  FID: 100,  // First Input Delay (ms)
  CLS: 0.1,  // Cumulative Layout Shift
  FCP: 1800, // First Contentful Paint (ms)
  TTFB: 600, // Time to First Byte (ms)
};

// 上报性能指标
function reportMetric(metric: Metric) {
  // 开发环境打印到控制台
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, metric.value);
  }

  // 生产环境发送到分析服务
  if (process.env.NODE_ENV === 'production') {
    // 可以发送到 Google Analytics、Sentry 或其他分析服务
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
  }
}

// 检查性能是否达标
function checkPerformance(metric: Metric): 'good' | 'needs-improvement' | 'poor' {
  const thresholds: Record<string, { good: number; poor: number }> = {
    LCP: { good: 2500, poor: 4000 },
    FID: { good: 100, poor: 300 },
    CLS: { good: 0.1, poor: 0.25 },
    FCP: { good: 1800, poor: 3000 },
    TTFB: { good: 800, poor: 1800 },
  };

  const threshold = thresholds[metric.name];
  if (!threshold) return 'good';

  if (metric.value <= threshold.good) return 'good';
  if (metric.value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

export function WebVitalsMonitor() {
  useEffect(() => {
    // 只在客户端执行
    if (typeof window === 'undefined') return;

    // 获取所有 Web Vitals 指标
    getCLS(reportMetric);
    getFCP(reportMetric);
    getFID(reportMetric);
    getLCP(reportMetric);
    getTTFB(reportMetric);
  }, []);

  return null;
}
