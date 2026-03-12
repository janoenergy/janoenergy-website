'use client';

import { Wind, Sun, Battery } from 'lucide-react';
import { translations, Lang } from '@/lib/translations';

// 本地图片路径
const images = {
  hero: '/images/hero.jpg',
  wind: '/images/projects/wind.jpg',
  solar: '/images/projects/solar.jpg',
  storage: '/images/projects/storage.jpg',
};

export default function HomeContent({ lang }: { lang: Lang }) {
  const t = translations[lang].home;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 text-white py-24 lg:py-32">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${images.hero})` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 mb-8">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={`/${lang}/business`} className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg">
                {t.hero.cta1}
              </a>
              <a href={`/${lang}/projects`} className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg">
                {t.hero.cta2}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><div className="text-3xl md:text-4xl font-bold text-emerald-600">500+</div><div className="text-gray-600">{t.stats.capacity}</div></div>
            <div><div className="text-3xl md:text-4xl font-bold text-emerald-600">20+</div><div className="text-gray-600">{t.stats.projects}</div></div>
            <div><div className="text-3xl md:text-4xl font-bold text-emerald-600">8</div><div className="text-gray-600">{t.stats.provinces}</div></div>
            <div><div className="text-3xl md:text-4xl font-bold text-emerald-600">2018</div><div className="text-gray-600">{t.stats.founded}</div></div>
          </div>
        </div>
      </section>

      {/* Project Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.projects.title}</h2>
            <p className="text-xl text-gray-600">{t.projects.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Wind */}
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] group">
              <img src={images.wind} alt={t.projects.wind} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-cyan-700/80" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <Wind className="w-16 h-16 mb-4" />
                <h3 className="text-2xl font-bold mb-2">{t.projects.wind}</h3>
                <p className="text-center text-white/80">{t.projects.windDesc}</p>
              </div>
            </div>
            {/* Solar */}
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] group">
              <img src={images.solar} alt={t.projects.solar} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/80 to-orange-700/80" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <Sun className="w-16 h-16 mb-4" />
                <h3 className="text-2xl font-bold mb-2">{t.projects.solar}</h3>
                <p className="text-center text-white/80">{t.projects.solarDesc}</p>
              </div>
            </div>
            {/* Storage */}
            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] group">
              <img src={images.storage} alt={t.projects.storage} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/80 to-teal-700/80" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <Battery className="w-16 h-16 mb-4" />
                <h3 className="text-2xl font-bold mb-2">{t.projects.storage}</h3>
                <p className="text-center text-white/80">{t.projects.storageDesc}</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <a href={`/${lang}/projects`} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg">
              {t.projects.viewAll}
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.cta.title}</h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">{t.cta.subtitle}</p>
            <a href={`/${lang}/contact`} className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-100">
              {t.cta.button}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
