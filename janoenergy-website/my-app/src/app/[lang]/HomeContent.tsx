'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wind, Sun, Battery, Zap, MapPin, Leaf, 
  TrendingUp, TrendingDown, Activity, Power,
  ChevronRight, ArrowRight, Play, Pause
} from 'lucide-react';
import { translations, Lang } from '@/lib/translations';
import AnimatedCounter from '@/components/AnimatedCounter';

// API 项目数据类型
interface ApiProject {
  id: number;
  title: string;
  titleEn: string;
  category: string;
  location: string;
  locationEn: string;
  capacity: string;
  description: string;
  descriptionEn: string;
  imageUrl: string | null;
  status: string;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
}

// 统计数据类型
interface Stats {
  capacity: number;
  projects: number;
  provinces: number;
  year: number;
}

// 实时数据类型
interface RealTimeData {
  todayGeneration: number;
  totalReduction: number;
  activeProjects: number;
  onlineRate: string;
  co2Saved: number;
  homesPowered: number;
}

// 默认统计数据
const defaultStats: Stats = {
  capacity: 1135,
  projects: 12,
  provinces: 12,
  year: 2018,
};

// 从容量字符串提取 MW 数值
function parseCapacity(capacityStr: string): number {
  if (!capacityStr) return 0;
  const mwMatch = capacityStr.match(/(\d+)\s*MW/i);
  if (mwMatch) return parseInt(mwMatch[1], 10);
  const numMatch = capacityStr.match(/(\d+)/);
  return numMatch ? parseInt(numMatch[1], 10) : 0;
}

// 从地址提取省份
function extractProvince(location: string): string {
  if (!location) return '';
  const match = location.match(/^([^省市]+)[省市]/);
  return match ? match[1] : location.split('省')[0].split('市')[0];
}

// 项目类型配置
const projectTypes = [
  { 
    id: 'wind', 
    name: '风电项目', 
    nameEn: 'Wind Power',
    icon: Wind,
    color: 'from-blue-500 to-cyan-400',
    bgColor: 'bg-blue-500/10',
    desc: '陆上风电开发、建设、运营',
    descEn: 'Onshore wind development, construction, and operation'
  },
  { 
    id: 'solar', 
    name: '光伏项目', 
    nameEn: 'Solar Power',
    icon: Sun,
    color: 'from-amber-500 to-orange-400',
    bgColor: 'bg-amber-500/10',
    desc: '地面电站、分布式光伏',
    descEn: 'Ground-mounted and distributed solar power'
  },
  { 
    id: 'storage', 
    name: '储能项目', 
    nameEn: 'Energy Storage',
    icon: Battery,
    color: 'from-emerald-500 to-teal-400',
    bgColor: 'bg-emerald-500/10',
    desc: '电化学储能、光储一体化',
    descEn: 'Battery storage and solar-storage integration'
  },
];

// 实时数据卡片组件
function StatCard({ 
  icon: Icon, 
  value, 
  label, 
  unit,
  trend,
  trendValue,
  color = 'emerald',
  delay = 0 
}: { 
  icon: React.ElementType;
  value: number | string;
  label: string;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl bg-${color}-500/20 flex items-center justify-center`}>
            <Icon className={`w-6 h-6 text-${color}-400`} />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${
              trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-rose-400' : 'text-slate-400'
            }`}>
              {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : trend === 'down' ? <TrendingDown className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        <div className="text-3xl md:text-4xl font-bold text-white mb-1">
          {typeof value === 'number' ? value.toLocaleString() : value}
          {unit && <span className="text-lg text-slate-400 ml-1">{unit}</span>}
        </div>
        <div className="text-slate-400 text-sm">{label}</div>
      </div>
    </motion.div>
  );
}

// 项目卡片组件
function ProjectCard({ project, index, lang }: { project: ApiProject; index: number; lang: Lang }) {
  const typeConfig = projectTypes.find(t => t.id === project.category) || projectTypes[0];
  const Icon = typeConfig.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300">
        {/* 顶部渐变条 */}
        <div className={`h-1 bg-gradient-to-r ${typeConfig.color}`} />
        
        <div className="p-6">
          {/* 类型标签 */}
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-8 h-8 rounded-lg ${typeConfig.bgColor} flex items-center justify-center`}>
              <Icon className={`w-4 h-4 text-${typeConfig.color.split('-')[1]}-400`} />
            </div>
            <span className="text-sm text-slate-400">{lang === 'zh' ? typeConfig.name : typeConfig.nameEn}</span>
            <span className={`ml-auto px-2 py-1 rounded-full text-xs ${
              project.status === 'operation' ? 'bg-emerald-500/20 text-emerald-400' :
              project.status === 'construction' ? 'bg-amber-500/20 text-amber-400' :
              'bg-blue-500/20 text-blue-400'
            }`}>
              {project.status === 'operation' ? (lang === 'zh' ? '运营中' : 'Operating') :
               project.status === 'construction' ? (lang === 'zh' ? '建设中' : 'Construction') :
               (lang === 'zh' ? '规划中' : 'Planning')}
            </span>
          </div>
          
          {/* 项目名称 */}
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
            {lang === 'zh' ? project.title : project.titleEn}
          </h3>
          
          {/* 位置 */}
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
            <MapPin className="w-4 h-4" />
            <span>{lang === 'zh' ? project.location : project.locationEn}</span>
          </div>
          
          {/* 容量 */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
            <div>
              <div className="text-2xl font-bold text-emerald-400">{project.capacity}</div>
              <div className="text-xs text-slate-500">{lang === 'zh' ? '装机容量' : 'Capacity'}</div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function HomeContent({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const [stats, setStats] = useState<Stats>({ capacity: 0, projects: 0, provinces: 0, year: 2018 });
  const [realTimeData, setRealTimeData] = useState<RealTimeData>({
    todayGeneration: 0,
    totalReduction: 0,
    activeProjects: 12,
    onlineRate: '99.9%',
    co2Saved: 0,
    homesPowered: 0,
  });
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeType, setActiveType] = useState('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  // 获取项目数据
  useEffect(() => {
    if (!mounted) return;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.janoenergy.com/api/projects');
        
        if (!response.ok) throw new Error('Failed to fetch projects');

        const data: ApiProject[] = await response.json();
        setProjects(data);

        // 计算统计数据
        const capacity = data.reduce((sum, p) => sum + parseCapacity(p.capacity), 0);
        const provinces = new Set(data.map(p => extractProvince(p.location)).filter(Boolean));
        
        setStats({
          capacity,
          projects: data.length,
          provinces: provinces.size || defaultStats.provinces,
          year: defaultStats.year,
        });

        // 初始化实时数据
        setRealTimeData({
          todayGeneration: Math.floor(Math.random() * 500) + 1000,
          totalReduction: 500 + Math.floor(Math.random() * 50),
          activeProjects: data.filter(p => p.status === 'operation').length,
          onlineRate: '99.9%',
          co2Saved: Math.floor(capacity * 0.8),
          homesPowered: Math.floor(capacity * 1500),
        });

        setError(false);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setStats(defaultStats);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [mounted]);

  // 实时数据更新
  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        todayGeneration: prev.todayGeneration + Math.floor(Math.random() * 5),
        totalReduction: prev.totalReduction + 0.01,
        co2Saved: prev.co2Saved + Math.floor(Math.random() * 2),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [mounted]);

  const filteredProjects = activeType === 'all' 
    ? projects.slice(0, 6) 
    : projects.filter(p => p.category === activeType).slice(0, 6);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* 背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
        
        {/* 动态网格背景 */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 左侧内容 */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {lang === 'zh' ? '清洁能源，绿色未来' : 'Clean Energy, Green Future'}
              </motion.div>

              {/* 主标题 */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
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

              {/* 副标题 */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-400 mb-8 max-w-xl"
              >
                {lang === 'zh' 
                  ? '专注于风电、光伏、储能等新能源开发、投资、建设、运营的全产业链服务商'
                  : 'Full-chain service provider for wind, solar, and energy storage development, investment, construction, and operation'}
              </motion.p>

              {/* CTA 按钮 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href={`/${lang}/projects`}
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                >
                  {lang === 'zh' ? '查看项目' : 'View Projects'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href={`/${lang}/contact`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-slate-800/50 border border-slate-700 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all duration-300"
                >
                  {lang === 'zh' ? '联系我们' : 'Contact Us'}
                </a>
              </motion.div>

              {/* 核心数据展示 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 pt-8 border-t border-slate-800"
              >
                <div className="grid grid-cols-4 gap-8">
                  {[
                    { value: stats.capacity, suffix: '+', label: lang === 'zh' ? 'MW装机' : 'MW Capacity' },
                    { value: stats.projects, suffix: '+', label: lang === 'zh' ? '个项目' : 'Projects' },
                    { value: stats.provinces, suffix: '', label: lang === 'zh' ? '个省份' : 'Provinces' },
                    { value: stats.year, suffix: '', label: lang === 'zh' ? '年成立' : 'Founded' },
                  ].map((stat, index) => (
                    <div key={index}>
                      <div className="text-2xl md:text-3xl font-bold text-white">
                        <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* 右侧实时数据卡片 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              <StatCard
                icon={Zap}
                value={realTimeData.todayGeneration}
                label={lang === 'zh' ? '今日发电 (MWh)' : 'Today Generation'}
                trend="up"
                trendValue="+12.5%"
                color="yellow"
                delay={0.4}
              />
              <StatCard
                icon={Leaf}
                value={realTimeData.co2Saved}
                label={lang === 'zh' ? '累计减排 (吨)' : 'CO₂ Reduced'}
                trend="up"
                trendValue="+8.3%"
                color="emerald"
                delay={0.5}
              />
              <StatCard
                icon={Power}
                value={realTimeData.homesPowered}
                label={lang === 'zh' ? '供电家庭' : 'Homes Powered'}
                trend="neutral"
                trendValue="稳定"
                color="blue"
                delay={0.6}
              />
              <StatCard
                icon={Activity}
                value={realTimeData.onlineRate}
                label={lang === 'zh' ? '平台可用性' : 'Uptime'}
                trend="up"
                trendValue="99.9%"
                color="cyan"
                delay={0.7}
              />
            </motion.div>
          </div>
        </div>

        {/* 滚动提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-slate-500">
            <span className="text-sm">{lang === 'zh' ? '向下滚动' : 'Scroll Down'}</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-slate-700 flex justify-center pt-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 项目类型 Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-slate-400 text-sm mb-4"
            >
              <span>01</span>
              <span className="w-8 h-px bg-slate-700" />
              <span>{lang === 'zh' ? '业务板块' : 'Business'}</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              {lang === 'zh' ? '覆盖多种新能源形态' : 'Multiple Clean Energy Solutions'}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-slate-400 text-lg max-w-2xl mx-auto"
            >
              {lang === 'zh' 
                ? '风电、光伏、储能全产业链布局，助力能源转型'
                : 'Full-chain layout in wind, solar, and energy storage, powering the energy transition'}
            </motion.p>
          </div>

          {/* 项目类型卡片 */}
          <div className="grid md:grid-cols-3 gap-6">
            {projectTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative h-full bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:border-emerald-500/30 transition-all duration-300">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${type.color} flex items-center justify-center mb-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {lang === 'zh' ? type.name : type.nameEn}
                    </h3>
                    <p className="text-slate-400 mb-6">
                      {lang === 'zh' ? type.desc : type.descEn}
                    </p>
                    <a
                      href={`/${lang}/projects?type=${type.id}`}
                      className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      {lang === 'zh' ? '了解更多' : 'Learn More'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 项目展示 Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-slate-400 text-sm mb-4"
              >
                <span>02</span>
                <span className="w-8 h-px bg-slate-700" />
                <span>{lang === 'zh' ? '项目案例' : 'Projects'}</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-white"
              >
                {lang === 'zh' ? '精选项目展示' : 'Featured Projects'}
              </motion.h2>
            </div>

            {/* 筛选标签 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex gap-2 mt-6 md:mt-0"
            >
              {[
                { id: 'all', name: lang === 'zh' ? '全部' : 'All' },
                { id: 'wind', name: lang === 'zh' ? '风电' : 'Wind' },
                { id: 'solar', name: lang === 'zh' ? '光伏' : 'Solar' },
                { id: 'storage', name: lang === 'zh' ? '储能' : 'Storage' },
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveType(type.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeType === type.id
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {type.name}
                </button>
              ))}
            </motion.div>
          </div>

          {/* 项目卡片网格 */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} lang={lang} />
              ))}
            </div>
          )}

          {/* 查看更多 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href={`/${lang}/projects`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-800/50 border border-slate-700 text-white font-semibold rounded-xl hover:bg-slate-800 hover:border-emerald-500/30 transition-all duration-300"
            >
              {lang === 'zh' ? '查看全部项目' : 'View All Projects'}
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-slate-900 to-cyan-900/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {lang === 'zh' ? '携手共创绿色未来' : 'Partner for a Green Future'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-slate-400 mb-8"
          >
            {lang === 'zh' 
              ? '无论是项目开发、投资合作还是EPC总承包，我们期待与您合作'
              : 'Whether project development, investment cooperation, or EPC contracting, we look forward to working with you'}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
            >
              {lang === 'zh' ? '联系我们' : 'Contact Us'}
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
