'use client';

import { motion } from 'framer-motion';
import { MagneticButton } from './components/MagneticButton';
import { StatCard } from './components/AnimatedCounter';
import { ProjectCard } from './components/TiltCard';
import { GlassNavbar } from './components/GlassNavbar';
import './styles.css';

// 统计数据
const stats = [
  { value: 1135, suffix: ' MW', label: '总装机容量', trend: '+23%', icon: '⚡' },
  { value: 12, suffix: '+', label: '覆盖省份', trend: '+2', icon: '📍' },
  { value: 50, suffix: '+', label: '清洁能源项目', trend: '+8', icon: '🏭' },
  { value: 285, suffix: ' 万吨', label: '年减碳量', trend: '+15%', icon: '🌱' },
];

// 项目数据
const projects = [
  {
    image: '/images/projects/wind-farm.jpg',
    title: '内蒙古风电场',
    subtitle: '草原上的清洁能源',
    capacity: '200MW',
  },
  {
    image: '/images/projects/solar-farm.jpg',
    title: '青海光伏园',
    subtitle: '高原上的蓝色海洋',
    capacity: '150MW',
  },
  {
    image: '/images/projects/storage-facility.jpg',
    title: '江苏储能站',
    subtitle: '智慧能源存储中心',
    capacity: '100MWh',
  },
];

export default function GlassHeroPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
      {/* 导航 */}
      <GlassNavbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* 主标题 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              专注新能源 · 服务绿色未来
            </motion.span>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              江能集团
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-500 mb-10 max-w-2xl mx-auto">
              清洁能源，绿色未来
            </p>
          </motion.div>
          
          {/* CTA 按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <MagneticButton
              className="px-8 py-4 rounded-2xl text-white font-semibold text-lg shadow-xl shadow-emerald-500/25"
              style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
            >
              探索项目
              <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </MagneticButton>
          </motion.div>
        </div>
      </section>
      
      {/* 数据展示 */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <StatCard
                key={stat.label}
                {...stat}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* 项目展示 */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* 标题 */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              精选项目
            </h2>
            <p className="text-gray-500">
              覆盖全国的新能源项目，助力碳中和目标
            </p>
          </motion.div>
          
          {/* 项目卡片 */}
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200/50">
        <div className="max-w-6xl mx-auto text-center text-gray-400 text-sm">
          <p>© 2024 江能集团 · 演示页面</p>
        </div>
      </footer>
    </main>
  );
}
