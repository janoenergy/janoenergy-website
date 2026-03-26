'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Minus } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';
import type { Lang } from '@/lib/translations';
import type { Stats } from './types';

interface HeroStatsProps {
  stats: Stats;
  lang: Lang;
}

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  trend: 'up' | 'stable' | 'none';
  trendValue: string;
}

// 纯文字数字组件
function StatItem({ item, delay = 0 }: { 
  item: StatItem;
  delay?: number;
}) {
  const { value, suffix, label, trend, trendValue } = item;
  
  return (
    <motion.div 
      className="text-center group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -4 }}
    >
      {/* 数字和趋势 */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
          <AnimatedCounter target={value} suffix={suffix} />
        </span>
        
        {/* 趋势标识 */}
        {trend !== 'none' && (
          <motion.span 
            className={`flex items-center gap-0.5 text-xs font-medium px-2 py-1 rounded-full ${
              trend === 'up' 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : 'bg-white/10 text-white/60'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.3 }}
          >
            {trend === 'up' ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <Minus className="w-3 h-3" />
            )}
            {trendValue}
          </motion.span>
        )}
      </div>
      
      {/* 标签 */}
      <div className="text-sm md:text-base text-white/70 font-medium group-hover:text-white transition-colors">
        {label}
      </div>
    </motion.div>
  );
}

export function HeroStats({ stats, lang }: HeroStatsProps) {
  const statsData: StatItem[] = [
    { 
      value: stats.capacity, 
      suffix: '+', 
      label: lang === 'zh' ? 'MW装机' : 'MW Capacity',
      trend: 'up',
      trendValue: '+23%'
    },
    { 
      value: stats.projects, 
      suffix: '+', 
      label: lang === 'zh' ? '个项目' : 'Projects',
      trend: 'up',
      trendValue: '+2'
    },
    { 
      value: stats.provinces, 
      suffix: '', 
      label: lang === 'zh' ? '个省份' : 'Provinces',
      trend: 'stable',
      trendValue: lang === 'zh' ? '稳定' : 'Stable'
    },
    { 
      value: stats.year, 
      suffix: '', 
      label: lang === 'zh' ? '年成立' : 'Founded',
      trend: 'none',
      trendValue: ''
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mt-12"
    >
      <div className="grid grid-cols-4 gap-4 md:gap-8">
        {statsData.map((item, index) => (
          <StatItem
            key={index}
            item={item}
            delay={0.4 + index * 0.1}
          />
        ))}
      </div>
    </motion.div>
  );
}
