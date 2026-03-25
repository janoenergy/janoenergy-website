'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // easeOutExpo 缓动函数
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      setDisplayValue(Math.floor(easeOutExpo * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);
  
  // 格式化数字，添加千分位
  const formattedValue = displayValue.toLocaleString('zh-CN');
  
  return (
    <span ref={ref} className={className}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}

// 数据卡片
interface StatCardProps {
  value: number;
  suffix?: string;
  label: string;
  trend?: string;
  icon?: React.ReactNode;
  delay?: number;
}

export function StatCard({ value, suffix = '', label, trend, icon, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      className="glass-card p-6 text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {/* 图标 */}
      {icon && (
        <motion.div
          className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(16, 185, 129, 0.1)' }}
          whileHover={{ rotate: 5, scale: 1.1 }}
        >
          <span className="text-emerald-500 text-2xl">{icon}</span>
        </motion.div>
      )}
      
      {/* 数字 */}
      <div className="text-4xl font-bold text-gray-900 mb-2">
        <AnimatedCounter value={value} suffix={suffix} />
      </div>
      
      {/* 标签 */}
      <div className="text-gray-500 text-sm">{label}</div>
      
      {/* 趋势 */}
      {trend && (
        <motion.div
          className="mt-3 inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
          style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.5 }}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          {trend}
        </motion.div>
      )}
    </motion.div>
  );
}
