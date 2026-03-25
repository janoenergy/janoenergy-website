'use client';

import { useEffect, useState } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// 安全的组件加载器 - 用于隔离可能出错的组件
interface SafeComponentLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error) => void;
}

export function SafeComponentLoader({ 
  children, 
  fallback = null,
  onError 
}: SafeComponentLoaderProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // 全局错误监听
    const handleError = (event: ErrorEvent) => {
      console.warn('[SafeComponent] Caught error:', event.error);
      setHasError(true);
      onError?.(event.error);
      // 阻止错误冒泡
      event.preventDefault();
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [onError]);

  if (hasError) {
    return <>{fallback}</>;
  }

  return (
    <ErrorBoundary fallback={fallback}>
      {children}
    </ErrorBoundary>
  );
}

// 延迟加载器 - 确保主内容先渲染
interface DeferredLoaderProps {
  children: React.ReactNode;
  delay?: number;
  fallback?: React.ReactNode;
}

export function DeferredLoader({ 
  children, 
  delay = 1000,
  fallback = null 
}: DeferredLoaderProps) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // 使用 requestIdleCallback 或 setTimeout
    const scheduleTask = (window as any).requestIdleCallback || setTimeout;
    
    const timer = scheduleTask(() => {
      setShouldRender(true);
    }, { timeout: delay });

    return () => {
      if (typeof timer === 'number') {
        clearTimeout(timer);
      }
    };
  }, [delay]);

  if (!shouldRender) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// 浏览器特性检测
export function checkBrowserSupport(): { 
  isSupported: boolean; 
  missingFeatures: string[] 
} {
  const features = {
    'Promise': typeof Promise !== 'undefined',
    'Fetch': typeof fetch !== 'undefined',
    'Custom Elements': typeof customElements !== 'undefined',
    'Intersection Observer': typeof IntersectionObserver !== 'undefined',
    'Resize Observer': typeof ResizeObserver !== 'undefined',
    'Performance Observer': typeof PerformanceObserver !== 'undefined',
    'Local Storage': (() => {
      try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
      } catch {
        return false;
      }
    })(),
  };

  const missingFeatures = Object.entries(features)
    .filter(([, supported]) => !supported)
    .map(([name]) => name);

  return {
    isSupported: missingFeatures.length === 0,
    missingFeatures,
  };
}

// 全局错误恢复
export function useGlobalErrorHandler() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('[Global Error]', event.error);
      // 可以在这里添加错误上报逻辑
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      console.error('[Unhandled Rejection]', event.reason);
      // 可以在这里添加上报逻辑
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);
}
