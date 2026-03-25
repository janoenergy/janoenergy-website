'use client';

import { motion } from 'framer-motion';
import { Zap, Leaf, Power, Activity, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';
import { useThemeStyles } from '@/lib/theme';
import { MagneticButton } from '@/components/MagneticButton';
import type { Lang } from '@/lib/translations';
import type { Stats, RealTimeData } from './types';

interface StatCardProps {
  icon: React.ElementType;
  value: number | string;
  label: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  delay?: number;
}

function StatCard({ icon: Icon, value, label, trend, trendValue, delay = 0 }: StatCardProps) {
  const styles = useThemeStyles();

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
      <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* 玻璃卡片 */}
      <div className={`relative backdrop-blur-xl bg-white/70 border border-white/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-300/50`}>
        <div className="flex items-start justify-between mb-4">
          <motion.div 
            className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center"
            whileHover={{ rotate: 5, scale: 1.1 }}
          >
            <Icon className="w-6 h-6 text-emerald-500" />
          </motion.div>
          {trend && (
            <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${
              trend === 'up' ? 'bg-emerald-100 text-emerald-600' : 
              trend === 'down' ? 'bg-rose-100 text-rose-600' : 
              'bg-gray-100 text-gray-600'
            }`}>
              {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : 
               trend === 'down' ? <TrendingDown className="w-3 h-3" /> : 
               <Activity className="w-3 h-3" />}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        <div className={`text-3xl md:text-4xl font-bold mb-1 text-gray-900`}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        <div className={`text-sm text-gray-500`}>{label}</div>
      </div>
    </motion.div>
  );
}

interface HeroSectionProps {
  lang: Lang;
  stats: Stats;
  realTimeData: RealTimeData;
}

export function HeroSection({ lang, stats, realTimeData }: HeroSectionProps) {
  const styles = useThemeStyles();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
      {/* 动态网格背景 */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 左侧内容 */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-emerald-200/50 text-sm mb-6 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-700">{lang === 'zh' ? '清洁能源，绿色未来' : 'Clean Energy, Green Future'}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-gray-900"
            >
              {lang === 'zh' ? (
                <>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">江能集团</span>
                  <br />
                  <span className="text-4xl md:text-5xl lg:text-6xl">清洁能源平台</span>
                </>
              ) : (
                <>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">JanoEnergy</span>
                  <br />
                  <span className="text-4xl md:text-5xl lg:text-6xl">Clean Energy Platform</span>
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl mb-8 max-w-xl text-gray-600"
            >
              {lang === 'zh'
                ? '专注于风电、光伏、储能等新能源开发、投资、建设、运营的全产业链服务商'
                : 'Full-chain service provider for wind, solar, and energy storage development, investment, construction, and operation'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton
                variant="primary"
                onClick={() => window.location.href = `/${lang}/projects`}
              >
                {lang === 'zh' ? '查看项目' : 'View Projects'}
                <ArrowRight className="w-5 h-5" />
              </MagneticButton>
              
              <MagneticButton
                variant="secondary"
                onClick={() => window.location.href = `/${lang}/contact`}
              >
                {lang === 'zh' ? '联系我们' : 'Contact Us'}
              </MagneticButton>
            </motion.div>

            {/* 核心数据 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 pt-8 border-t border-gray-200/50"
            >
              <div className="grid grid-cols-4 gap-8">
                {[
                  { value: stats.capacity, suffix: '+', label: lang === 'zh' ? 'MW装机' : 'MW Capacity' },
                  { value: stats.projects, suffix: '+', label: lang === 'zh' ? '个项目' : 'Projects' },
                  { value: stats.provinces, suffix: '', label: lang === 'zh' ? '个省份' : 'Provinces' },
                  { value: stats.year, suffix: '', label: lang === 'zh' ? '年成立' : 'Founded' },
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="text-2xl md:text-3xl font-bold text-gray-900">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm mt-1 text-gray-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* 右侧实时数据 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            <StatCard icon={Zap} value={realTimeData.todayGeneration} label={lang === 'zh' ? '今日发电 (MWh)' : 'Today Generation'} trend="up" trendValue="+12.5%" delay={0.4} />
            <StatCard icon={Leaf} value={realTimeData.co2Saved} label={lang === 'zh' ? '累计减排 (吨)' : 'CO₂ Reduced'} trend="up" trendValue="+8.3%" delay={0.5} />
            <StatCard icon={Power} value={realTimeData.homesPowered} label={lang === 'zh' ? '供电家庭' : 'Homes Powered'} trend="neutral" trendValue={lang === 'zh' ? '稳定' : 'Stable'} delay={0.6} />
            <StatCard icon={Activity} value={realTimeData.onlineRate} label={lang === 'zh' ? '平台可用性' : 'Uptime'} trend="up" trendValue="99.9%" delay={0.7} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
