'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Sun, Battery, ChevronLeft, ChevronRight, Loader2, Zap, MapPin, Leaf } from 'lucide-react';
import { translations, Lang } from '@/lib/translations';
import AnimatedCounter from '@/components/AnimatedCounter';

// 本地图片路径
const heroSlides = [
  {
    image: '/images/hero/wind.jpg',
    title: '清洁能源，绿色未来',
    titleEn: 'Clean Energy, Green Future',
  },
  {
    image: '/images/hero/solar.jpg',
    title: '光伏引领新能源革命',
    titleEn: 'Solar Leading the Revolution',
  },
  {
    image: '/images/hero/storage.jpg',
    title: '风能驱动可持续发展',
    titleEn: 'Wind Power Driving Sustainability',
  },
];

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
}

// 默认统计数据
const defaultStats: Stats = {
  capacity: 1135,
  projects: 12,
  provinces: 12,
  year: 2018,
};

// 从容量字符串提取数字
function parseCapacity(capacityStr: string): number {
  if (!capacityStr) return 0;
  const match = capacityStr.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

// 从地址提取省份
function extractProvince(location: string): string {
  if (!location) return '';
  const match = location.match(/^([^省市]+)[省市]/);
  return match ? match[1] : location.split('省')[0].split('市')[0];
}

// 打字机效果组件
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [started, text]);

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-1 h-[1em] bg-white ml-1 align-middle"
      />
    </span>
  );
}

// 实时数据卡片组件
function RealTimeCard({ 
  icon: Icon, 
  value, 
  label, 
  unit, 
  color = 'emerald',
  delay = 0 
}: { 
  icon: React.ElementType;
  value: number | string;
  label: string;
  unit?: string;
  color?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all"
    >
      <div className={`w-12 h-12 rounded-xl bg-${color}-500/20 flex items-center justify-center mb-4`}>
        <Icon className={`w-6 h-6 text-${color}-400`} />
      </div>
      <div className="text-3xl md:text-4xl font-bold text-white mb-1">
        {typeof value === 'number' ? value.toLocaleString() : value}
        {unit && <span className="text-lg ml-1">{unit}</span>}
      </div>
      <div className="text-white/70 text-sm">{label}</div>
      <motion.div
        className="mt-2 flex items-center gap-1 text-xs text-emerald-400"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        实时更新
      </motion.div>
    </motion.div>
  );
}

export default function HomeContent({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stats, setStats] = useState<Stats>({ capacity: 0, projects: 0, provinces: 0, year: 2018 });
  const [realTimeData, setRealTimeData] = useState<RealTimeData>({
    todayGeneration: 0,
    totalReduction: 0,
    activeProjects: 12,
    onlineRate: '99.9%'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 确保只在客户端执行
  useEffect(() => {
    setMounted(true);
  }, []);

  // 获取项目数据并计算统计
  useEffect(() => {
    if (!mounted) return;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.janoenergy.com/api/projects');
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }

        const projects: ApiProject[] = await response.json();

        // 计算统计数据
        const capacity = projects.reduce((sum, p) => sum + parseCapacity(p.capacity), 0);
        const projectCount = projects.length;
        const provinces = new Set(projects.map(p => extractProvince(p.location)).filter(Boolean));
        const uniqueProvinces = provinces.size;

        setStats({
          capacity,
          projects: projectCount,
          provinces: uniqueProvinces || defaultStats.provinces,
          year: defaultStats.year,
        });

        // 初始化实时数据
        setRealTimeData(prev => ({
          ...prev,
          todayGeneration: Math.floor(Math.random() * 500) + 1000,
          totalReduction: 500 + Math.floor(Math.random() * 50),
        }));

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
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [mounted]);

  // 轮播图自动切换
  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [mounted]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  // 服务端渲染时显示加载状态
  if (!mounted) {
    return (
      <div>
        {/* Hero */}
        <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroSlides[0].image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-teal-800/80 to-cyan-900/70" />
          </div>
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {lang === 'zh' ? heroSlides[0].title : heroSlides[0].titleEn}
              </h1>
              <p className="text-xl md:text-2xl text-emerald-100 mb-8">
                {t.home.hero.subtitle}
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[700px] lg:h-[800px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <motion.div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
              animate={{ scale: index === currentSlide ? 1.05 : 1 }}
              transition={{ duration: 5, ease: "linear" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-teal-800/80 to-cyan-900/70" />
          </motion.div>
        ))}

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="max-w-3xl mb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  <TypewriterText 
                    text={lang === 'zh' ? heroSlides[currentSlide].title : heroSlides[currentSlide].titleEn} 
                    delay={300}
                  />
                </h1>
              </motion.div>
            </AnimatePresence>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-xl md:text-2xl text-emerald-100 mb-8"
            >
              {t.home.hero.subtitle}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a 
                href={`/${lang}/business`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors"
              >
                {t.home.hero.cta1}
              </motion.a>
              <motion.a 
                href={`/${lang}/projects`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm transition-colors border border-white/30"
              >
                {t.home.hero.cta2}
              </motion.a>
            </motion.div>
          </div>

          {/* 实时数据仪表板 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
            <RealTimeCard
              icon={Zap}
              value={realTimeData.todayGeneration}
              label={lang === 'zh' ? '今日发电' : 'Today Generation'}
              unit="MWh"
              color="yellow"
              delay={1.2}
            />
            <RealTimeCard
              icon={Leaf}
              value={realTimeData.totalReduction.toFixed(2)}
              label={lang === 'zh' ? '累计减排' : 'CO2 Reduction'}
              unit="万吨"
              color="emerald"
              delay={1.4}
            />
            <RealTimeCard
              icon={MapPin}
              value={realTimeData.activeProjects}
              label={lang === 'zh' ? '运营项目' : 'Active Projects'}
              color="blue"
              delay={1.6}
            />
            <RealTimeCard
              icon={Sun}
              value={realTimeData.onlineRate}
              label={lang === 'zh' ? '平台可用性' : 'Uptime'}
              color="orange"
              delay={1.8}
            />
          </div>
        </div>

        {/* Slide Controls */}
        <motion.button 
          onClick={prevSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        <motion.button 
          onClick={nextSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              animate={{ width: index === currentSlide ? 32 : 12 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </section>

      {/* Stats - 使用动画计数器 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: stats.capacity, suffix: '+', label: t.home.stats.capacity },
                { value: stats.projects, suffix: '+', label: t.home.stats.projects },
                { value: stats.provinces, suffix: '', label: t.home.stats.provinces },
                { value: stats.year, suffix: '', label: t.home.stats.founded },
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-colors shadow-sm hover:shadow-lg"
                >
                  <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          )}
          {error && (
            <p className="text-center text-sm text-gray-400 mt-4">
              {lang === 'zh' ? '使用本地缓存数据' : 'Using cached data'}
            </p>
          )}
        </div>
      </section>

      {/* Project Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.home.projects.title}
            </h2>
            <p className="text-xl text-gray-600">
              {t.home.projects.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Wind */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              whileHover={{ scale: 1.03, y: -10 }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer shadow-lg"
            >
              <motion.img 
                src="/images/projects/wind.jpg" 
                alt="风电项目"
                className="absolute inset-0 w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-cyan-700/80" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Wind className="w-16 h-16 mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">{t.home.projects.wind}</h3>
                <p className="text-center text-white/80">{t.home.projects.windDesc}</p>
              </div>
            </motion.div>

            {/* Solar */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.03, y: -10 }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer shadow-lg"
            >
              <motion.img 
                src="/images/projects/solar.jpg" 
                alt="光伏项目"
                className="absolute inset-0 w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/80 to-orange-700/80" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Sun className="w-16 h-16 mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">{t.home.projects.solar}</h3>
                <p className="text-center text-white/80">{t.home.projects.solarDesc}</p>
              </div>
            </motion.div>

            {/* Storage */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.03, y: -10 }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer shadow-lg"
            >
              <motion.img 
                src="/images/projects/storage.jpg" 
                alt="储能项目"
                className="absolute inset-0 w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/80 to-teal-700/80" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Battery className="w-16 h-16 mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">{t.home.projects.storage}</h3>
                <p className="text-center text-white/80">{t.home.projects.storageDesc}</p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <motion.a 
              href={`/${lang}/projects`}
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
            >
              {t.home.projects.viewAll}
              <ChevronRight className="w-5 h-5 ml-2" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {lang === 'zh' ? '合作伙伴' : 'Partners'}
            </h2>
            <p className="text-xl text-gray-600">
              {lang === 'zh' ? '携手行业领先企业，共创绿色未来' : 'Partnering with industry leaders for a green future'}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {[
              '国家电网', '南方电网', '华能集团', '大唐集团',
              '国家能源', '中广核', '三峡集团', '国家电投',
              '华为数字能源', '阳光电源', '宁德时代', '比亚迪'
            ].map((partner, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex items-center justify-center p-6 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors shadow-sm hover:shadow-md"
              >
                <span className="text-lg font-semibold text-gray-600">{partner}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            {t.home.cta.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-emerald-100 mb-8"
          >
            {t.home.cta.subtitle}
          </motion.p>
          <motion.a 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            href={`/${lang}/contact`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-white text-emerald-700 font-semibold rounded-lg transition-colors"
          >
            {t.home.cta.button}
            <ChevronRight className="w-5 h-5 ml-2" />
          </motion.a>
        </div>
      </section>
    </div>
  );
}
