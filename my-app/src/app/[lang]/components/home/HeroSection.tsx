'use client';

import { motion } from 'framer-motion';
import { Zap, Leaf, Power, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';
import { useThemeStyles } from '@/lib/theme';
import type { Lang } from '@/lib/translations';
import type { Stats, RealTimeData } from '../types';

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
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative group"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${styles.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
      <div className={`relative ${styles.bgCard} backdrop-blur-xl border ${styles.border} ${styles.borderHover} rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
            <Icon className="w-6 h-6 text-emerald-500" />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${
              trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-rose-500' : styles.textMuted
            }`}>
              {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : trend === 'down' ? <TrendingDown className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        <div className={`text-3xl md:text-4xl font-bold mb-1 ${styles.text}`}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        <div className={`text-sm ${styles.textMuted}`}>{label}</div>
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
    <section className={`relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br ${styles.bgGradient}`}>
      {/* 动态网格背景 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${styles.grid} 1px, transparent 1px), linear-gradient(90deg, ${styles.grid} 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 左侧内容 */}
          <div>
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm mb-6 ${styles.bgCard} ${styles.border}`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className={styles.textSecondary}>{lang === 'zh' ? '清洁能源，绿色未来' : 'Clean Energy, Green Future'}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight ${styles.text}`}
            >
              {lang === 'zh' ? (
                <>
                  统一 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">新能源</span>
                  <br />
                  开发与运营平台
                </>
              ) : (
                <>
                  Unified <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Clean Energy</span>
                  <br />
                  Development Platform
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-xl mb-8 max-w-xl ${styles.textMuted}`}
            >
              {lang === 'zh'
                ? '专注于风电、光伏、储能等新能源开发、投资、建设、运营的全产业链服务商'
                : 'Full-chain service provider for wind, solar, and energy storage development, investment, construction, and operation'}
            </motion.p>

            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href={`/${lang}/projects`}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {lang === 'zh' ? '查看项目' : 'View Projects'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={`/${lang}/contact`}
                className={`inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${styles.btnSecondary} ${styles.text}`}
              >
                {lang === 'zh' ? '联系我们' : 'Contact Us'}
              </a>
            </motion.div>

            {/* 核心数据 */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`mt-12 pt-8 border-t ${styles.border}`}
            >
              <div className="grid grid-cols-4 gap-8">
                {[
                  { value: stats.capacity, suffix: '+', label: lang === 'zh' ? 'MW装机' : 'MW Capacity' },
                  { value: stats.projects, suffix: '+', label: lang === 'zh' ? '个项目' : 'Projects' },
                  { value: stats.provinces, suffix: '', label: lang === 'zh' ? '个省份' : 'Provinces' },
                  { value: stats.year, suffix: '', label: lang === 'zh' ? '年成立' : 'Founded' },
                ].map((stat, index) => (
                  <div key={index}>
                    <div className={`text-2xl md:text-3xl font-bold ${styles.text}`}>
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className={`text-sm mt-1 ${styles.textMuted}`}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* 右侧实时数据 */}
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
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

import { ArrowRight } from 'lucide-react';
