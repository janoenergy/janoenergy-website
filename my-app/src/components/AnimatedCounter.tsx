'use client';

import { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 2000,
  className = '',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const targetRef = useRef(target);

  useEffect(() => {
    // 如果已经动画过，且目标值相同，不再重复动画
    if (hasAnimated && target === targetRef.current) {
      setCount(target);
      return;
    }

    // 如果目标值变化，更新 ref
    if (target !== targetRef.current) {
      targetRef.current = target;
    }

    // 目标为 0 时，直接显示 0
    if (target === 0) {
      setCount(0);
      return;
    }

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // 使用 easeOutQuart 缓动函数
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * target);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
        setHasAnimated(true);
      }
    };

    // 延迟一点开始动画，确保组件已挂载
    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [target, duration, hasAnimated]);

  return (
    <span className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}
