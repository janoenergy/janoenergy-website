'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { MagneticButton } from '@/components/MagneticButton';
import { HeroCarousel } from '@/components/HeroCarousel';
import { HeroStats } from './HeroStats';
import { HeroRealtimeStats } from './HeroRealtimeStats';
import type { Lang } from '@/lib/translations';
import type { Stats, RealTimeData } from './types';

// 轮播图数据
const carouselSlides = [
  {
    id: 1,
    image: '/images/projects/wind-farm-hd.jpg',
    title: '风力发电 · 驭风而行',
    subtitle: '重塑新能源投资价值',
  },
  {
    id: 2,
    image: '/images/projects/solar-farm-hd.jpg',
    title: '光伏发电 · 阳光赋能',
    subtitle: '重塑新能源投资价值',
  },
  {
    id: 3,
    image: '/images/projects/storage-facility-hd.jpg',
    title: '智慧储能 · 绿电无忧',
    subtitle: '重塑新能源投资价值',
  },
];

interface HeroSectionProps {
  lang: Lang;
  stats: Stats;
  realTimeData: RealTimeData;
}

export function HeroSection({ lang, stats, realTimeData }: HeroSectionProps) {
  return (
    <HeroCarousel slides={carouselSlides}>
      <div className="relative w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center h-full">
          {/* 左侧内容 */}
          <div className="pt-20">
            {/* 标签 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-sm mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-300">{lang === 'zh' ? '清洁能源，绿色未来' : 'Clean Energy, Green Future'}</span>
            </motion.div>

            {/* 主标题 */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white"
            >
              {lang === 'zh' ? (
                <>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">江能集团</span>
                  <br />
                  <span className="text-2xl md:text-3xl lg:text-4xl text-white/90 font-medium">重塑新能源投资价值</span>
                </>
              ) : (
                <>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">JanoEnergy</span>
                  <br />
                  <span className="text-2xl md:text-3xl lg:text-4xl text-white/90 font-medium">Reshaping New Energy Investment Value</span>
                </>
              )}
            </motion.h1>

            {/* CTA 按钮 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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

            {/* 核心数据 - 玻璃背景数字 */}
            <HeroStats stats={stats} lang={lang} />
          </div>

          {/* 右侧实时数据卡片 */}
          <HeroRealtimeStats realTimeData={realTimeData} lang={lang} />
        </div>
      </div>
    </HeroCarousel>
  );
}
