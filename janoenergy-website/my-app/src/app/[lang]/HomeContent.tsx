'use client';

import { useState, useEffect, useRef } from 'react';
import { Wind, Sun, Battery, ChevronLeft, ChevronRight } from 'lucide-react';
import { translations, Lang } from '@/lib/translations';

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

// 默认统计数据（硬编码，避免API调用）
const defaultStats = {
  capacity: 210, // 50+100+60
  projects: 3,
  provinces: 3,
  year: 2018,
};

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setDisplayValue(value);
              clearInterval(timer);
            } else {
              setDisplayValue(Math.floor(current));
            }
          }, duration / steps);
          
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return <span ref={ref} className="tabular-nums">{displayValue}{suffix}</span>;
}

export default function HomeContent({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

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

      {/* Stats - 使用硬编码的真实数据 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-all hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">
                <AnimatedNumber value={defaultStats.capacity} />+
              </div>
              <div className="text-gray-600">{t.home.stats.capacity}</div>
            </div>
            <div className="p-6 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-all hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">
                <AnimatedNumber value={defaultStats.projects} />+
              </div>
              <div className="text-gray-600">{t.home.stats.projects}</div>
            </div>
            <div className="p-6 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-all hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">
                <AnimatedNumber value={defaultStats.provinces} />
              </div>
              <div className="text-gray-600">{t.home.stats.provinces}</div>
            </div>
            <div className="p-6 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-all hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">
                {defaultStats.year}
              </div>
              <div className="text-gray-600">{t.home.stats.founded}</div>
            </div>
          </div>
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
