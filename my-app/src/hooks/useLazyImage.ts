'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseLazyImageOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface UseLazyImageReturn {
  ref: React.RefObject<HTMLDivElement>;
  isInView: boolean;
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
}

/**
 * 图片懒加载 Hook
 * 使用 Intersection Observer API 实现高性能懒加载
 */
export function useLazyImage(options: UseLazyImageOptions = {}): UseLazyImageReturn {
  const { threshold = 0.1, rootMargin = '50px', triggerOnce = true } = options;
  
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // 如果已经触发过且只需要触发一次，则不再观察
    if (triggerOnce && isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, isInView]);

  return { ref, isInView, isLoaded, setIsLoaded };
}

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * 优化的懒加载图片组件
 * 支持模糊占位符、加载动画、错误处理
 */
export function LazyImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  placeholder,
  onLoad,
  onError,
}: LazyImageProps) {
  const { ref, isInView, isLoaded, setIsLoaded } = useLazyImage({
    threshold: 0.1,
    rootMargin: '100px', // 提前 100px 开始加载
    triggerOnce: true,
  });

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad, setIsLoaded]);

  const handleError = useCallback(() => {
    onError?.();
  }, [onError]);

  // 优先加载的图片直接显示
  if (priority) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onLoad={handleLoad}
        onError={handleError}
        loading="eager"
        decoding="sync"
      />
    );
  }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* 骨架屏占位 */}
      {!isLoaded && (
        <div className="absolute inset-0 img-loading" />
      )}
      
      {/* 模糊占位图（如果有） */}
      {placeholder && !isLoaded && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-lg scale-110"
          aria-hidden="true"
        />
      )}
      
      {/* 实际图片 */}
      {(isInView || priority) && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
}

/**
 * 响应式图片组件
 * 支持 srcset 和 sizes 属性
 */
interface ResponsiveImageProps extends LazyImageProps {
  srcSet?: string;
  sizes?: string;
}

export function ResponsiveImage({
  src,
  srcSet,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  alt,
  className = '',
  width,
  height,
  priority = false,
}: ResponsiveImageProps) {
  const { ref, isInView, isLoaded, setIsLoaded } = useLazyImage({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true,
  });

  if (priority) {
    return (
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onLoad={() => setIsLoaded(true)}
        loading="eager"
        decoding="sync"
      />
    );
  }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {!isLoaded && <div className="absolute inset-0 img-loading" />}
      
      {isInView && (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
}

export default LazyImage;
