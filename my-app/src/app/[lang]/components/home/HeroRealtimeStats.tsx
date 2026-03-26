'use client';

import { motion } from 'framer-motion';
import { Zap, Leaf, Power, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import type { Lang } from '@/lib/translations';
import type { RealTimeData } from './types';

interface StatCardProps {
  icon: React.ElementType;
  value: number | string;
  label: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  delay?: number;
}

function StatCard({ icon: Icon, value, label, trend, trendValue, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="relative group"
    >
      {/* 发光效果 */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* 玻璃卡片 */}
      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-300/50">
        <div className="flex items-start justify-between mb-4">
          <motion.div 
            className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center"
            whileHover={{ rotate: 5, scale: 1.1 }}
          >
            <Icon className="w-6 h-6 text-emerald-400" />
          </motion.div>
          {trend && (
            <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${
              trend === 'up' ? 'bg-emerald-500/20 text-emerald-400' : 
              trend === 'down' ? 'bg-rose-500/20 text-rose-400' : 
              'bg-white/10 text-white/60'
            }`}>
              {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : 
               trend === 'down' ? <TrendingDown className="w-3 h-3" /> : 
               <Activity className="w-3 h-3" />}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        <div className="text-3xl md:text-4xl font-bold mb-1 text-white">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        <div className="text-sm text-white/60">{label}</div>
      </div>
    </motion.div>
  );
}

interface HeroRealtimeStatsProps {
  realTimeData: RealTimeData;
  lang: Lang;
}

export function HeroRealtimeStats({ realTimeData, lang }: HeroRealtimeStatsProps) {
  const cards = [
    { 
      icon: Zap, 
      value: realTimeData.todayGeneration, 
      label: lang === 'zh' ? '今日发电 (MWh)' : 'Today Generation', 
      trend: 'up' as const, 
      trendValue: '+12.5%' 
    },
    { 
      icon: Leaf, 
      value: realTimeData.co2Saved, 
      label: lang === 'zh' ? '累计减排 (吨)' : 'CO₂ Reduced', 
      trend: 'up' as const, 
      trendValue: '+8.3%' 
    },
    { 
      icon: Power, 
      value: realTimeData.homesPowered, 
      label: lang === 'zh' ? '供电家庭' : 'Homes Powered', 
      trend: 'neutral' as const, 
      trendValue: lang === 'zh' ? '稳定' : 'Stable' 
    },
    { 
      icon: Activity, 
      value: realTimeData.onlineRate, 
      label: lang === 'zh' ? '平台可用性' : 'Uptime', 
      trend: 'up' as const, 
      trendValue: '99.9%' 
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-2 gap-4"
    >
      {cards.map((card, index) => (
        <StatCard
          key={card.label}
          icon={card.icon}
          value={card.value}
          label={card.label}
          trend={card.trend}
          trendValue={card.trendValue}
          delay={0.4 + index * 0.1}
        />
      ))}
    </motion.div>
  );
}
