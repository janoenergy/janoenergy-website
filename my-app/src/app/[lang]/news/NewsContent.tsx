'use client';

import { useState } from 'react';
import { Calendar, ArrowRight, X } from 'lucide-react';
import { translations, Lang } from '@/lib/translations';
import { FadeIn } from '@/components/Animations';
import { news, NewsItem } from '@/data/news';

// 新闻详情弹窗
function NewsModal({ newsItem, lang, onClose }: { newsItem: NewsItem, lang: Lang, onClose: () => void }) {
  const categoryNames = {
    zh: { company: '公司动态', industry: '行业资讯', policy: '政策法规' },
    en: { company: 'Company', industry: 'Industry', policy: 'Policy' },
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="relative">
          <img 
            src={newsItem.image}
            alt={lang === 'zh' ? newsItem.title : newsItem.titleEn}
            className="w-full h-64 object-cover"
          />
          <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
              newsItem.category === 'company' ? 'bg-emerald-500' : 
              newsItem.category === 'policy' ? 'bg-amber-500' : 'bg-blue-500'
            }`}>
              {categoryNames[lang][newsItem.category]}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{lang === 'zh' ? newsItem.title : newsItem.titleEn}</h2>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {newsItem.date}
            </span>
          </div>
          <div className="prose prose-emerald max-w-none">
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{lang === 'zh' ? newsItem.content : newsItem.contentEn}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewsContent({ lang }: { lang: Lang }) {
  const t = translations[lang].news;
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [filter, setFilter] = useState('all');

  const filteredNews = filter === 'all' 
    ? news 
    : news.filter(n => n.category === filter);

  const categoryNames = {
    zh: { all: '全部', company: '公司动态', industry: '行业资讯', policy: '政策法规' },
    en: { all: 'All', company: 'Company', industry: 'Industry', policy: 'Policy' },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl text-emerald-100">{t.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 分类筛选 */}
        <div className="flex flex-wrap gap-3 mb-10">
          {[
            { key: 'all', label: categoryNames[lang].all },
            { key: 'company', label: categoryNames[lang].company },
            { key: 'industry', label: categoryNames[lang].industry },
            { key: 'policy', label: categoryNames[lang].policy },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === item.key 
                  ? 'bg-emerald-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border hover:shadow-md'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* 热门文章 */}
        <FadeIn>
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{lang === 'zh' ? '热门文章' : 'Popular Articles'}</h2>
            <div className="bg-white rounded-xl shadow-sm p-6">
              {news.slice(0, 3).map((newsItem, idx) => (
                <div key={newsItem.id} className={`flex items-center gap-4 py-3 ${idx !== 2 ? 'border-b border-gray-100' : ''}`}>
                  <span className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 hover:text-emerald-600 cursor-pointer transition-colors" onClick={() => setSelectedNews(newsItem)}>
                      {lang === 'zh' ? newsItem.title : newsItem.titleEn}
                    </h4>
                    <span className="text-xs text-gray-400">{newsItem.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredNews.map((newsItem, idx) => (
            <FadeIn key={newsItem.id} delay={idx * 100}>
              <article className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-gray-100 cursor-pointer group" onClick={() => setSelectedNews(newsItem)}>
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={newsItem.image}
                    alt={lang === 'zh' ? newsItem.title : newsItem.titleEn}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      newsItem.category === 'company' ? 'bg-emerald-100 text-emerald-700' : 
                      newsItem.category === 'policy' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {categoryNames[lang][newsItem.category]}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {newsItem.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {lang === 'zh' ? newsItem.title : newsItem.titleEn}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{lang === 'zh' ? newsItem.summary : newsItem.summaryEn}</p>
                  <div className="flex items-center justify-end">
                    <span className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                      {t.readMore}
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </span>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* 新闻详情弹窗 */}
      {selectedNews && (
        <NewsModal 
          newsItem={selectedNews} 
          lang={lang} 
          onClose={() => setSelectedNews(null)} 
        />
      )}
    </div>
  );
}
