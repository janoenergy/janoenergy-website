'use client';

import { useState, useEffect } from 'react';
import { Wind, Sun, Battery, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
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

// 默认统计数据
const defaultStats: Stats = {
  capacity: 370,
  projects: 6,
  provinces: 6,
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

export default function HomeContent({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stats, setStats] = useState<Stats>({ capacity: 0, projects: 0, provinces: 0, year: 2018 });
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
              <div className="flex flex-wrap gap-4">
                <a 
                  href={`/${lang}/business`}
                  className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all hover:scale-105"
                >
                  {t.home.hero.cta1}
                </a>
                <a 
                  href={`/${lang}/projects`}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm transition-all hover:scale-105 border border-white/30"
                >
                  {t.home.hero.cta2}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats - 加载状态 */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-teal-800/80 to-cyan-900/70" />
          </div>
        ))}

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {lang === 'zh' ? heroSlides[currentSlide].title : heroSlides[currentSlide].titleEn}
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 mb-8">
              {t.home.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href={`/${lang}/business`}
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all hover:scale-105"
              >
                {t.home.hero.cta1}
              </a>
              <a 
                href={`/${lang}/projects`}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm transition-all hover:scale-105 border border-white/30"
              >
                {t.home.hero.cta2}
              </a>
            </div>
          </div>
        </div>

        {/* Slide Controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-3'
              }`}
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
              <div className="p-6 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-all hover:scale-105">
                <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">
                  <AnimatedCounter target={stats.capacity} suffix="+" />
                </div>
                <div className="text-gray-600">{t.home.stats.capacity}</div>
              </div>
              <div className="p-6 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-all hover:scale-105">
                <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">
                  <AnimatedCounter target={stats.projects} suffix="+" />
                </div>
                <div className="text-gray-600">{t.home.stats.projects}</div>
              </div>
              <div className="p-6 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-all hover:scale-105">
                <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">
                  <AnimatedCounter target={stats.provinces} />
                </div>
                <div className="text-gray-600">{t.home.stats.provinces}</div>
              </div>
              <div className="p-6 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-all hover:scale-105">
                <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">
                  <AnimatedCounter target={stats.year} />
                </div>
                <div className="text-gray-600">{t.home.stats.founded}</div>
              </div>
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
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.home.projects.title}
            </h2>
            <p className="text-xl text-gray-600">
              {t.home.projects.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Wind */}
            <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer shadow-lg hover:shadow-2xl transition-all hover:scale-105">
              <img 
                src="/images/projects/wind.jpg" 
                alt="风电项目"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-cyan-700/80" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <Wind className="w-16 h-16 mb-4 transition-transform group-hover:scale-125" />
                <h3 className="text-2xl font-bold mb-2">{t.home.projects.wind}</h3>
                <p className="text-center text-white/80">{t.home.projects.windDesc}</p>
              </div>
            </div>

            {/* Solar */}
            <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer shadow-lg hover:shadow-2xl transition-all hover:scale-105">
              <img 
                src="/images/projects/solar.jpg" 
                alt="光伏项目"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/80 to-orange-700/80" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <Sun className="w-16 h-16 mb-4 transition-transform group-hover:scale-125" />
                <h3 className="text-2xl font-bold mb-2">{t.home.projects.solar}</h3>
                <p className="text-center text-white/80">{t.home.projects.solarDesc}</p>
              </div>
            </div>

            {/* Storage */}
            <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer shadow-lg hover:shadow-2xl transition-all hover:scale-105">
              <img 
                src="/images/projects/storage.jpg" 
                alt="储能项目"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/80 to-teal-700/80" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <Battery className="w-16 h-16 mb-4 transition-transform group-hover:scale-125" />
                <h3 className="text-2xl font-bold mb-2">{t.home.projects.storage}</h3>
                <p className="text-center text-white/80">{t.home.projects.storageDesc}</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <a 
              href={`/${lang}/projects`}
              className="inline-flex items-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all hover:scale-105"
            >
              {t.home.projects.viewAll}
              <ChevronRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.home.cta.title}
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            {t.home.cta.subtitle}
          </p>
          <a 
            href={`/${lang}/contact`}
            className="inline-flex items-center px-8 py-4 bg-white text-emerald-700 font-semibold rounded-lg hover:scale-105 transition-transform"
          >
            {t.home.cta.button}
            <ChevronRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </section>
    </div>
  );
}
