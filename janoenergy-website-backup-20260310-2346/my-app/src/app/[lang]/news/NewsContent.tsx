'use client';

import { Calendar, ArrowRight } from 'lucide-react';
import { translations, Lang } from '@/lib/translations';

const images = {
  company: '/images/about/company.jpg',
  industry: '/images/business/development.jpg',
};

const sampleNews = [
  { id: '1', title: '江能集团中标河北200MW风电项目', titleEn: 'JanoEnergy Wins Bid for Hebei 200MW Wind Project', summary: '成功中标河北省张家口市200MW风电开发项目', summaryEn: 'Successfully won the bid for 200MW wind project in Zhangjiakou, Hebei', category: 'company', categoryName: '公司动态', categoryNameEn: 'Company News', publishedAt: '2025-03-01' },
  { id: '2', title: '国家能源局发布2025年新能源发展政策', titleEn: 'National Energy Administration Releases 2025 New Energy Policy', summary: '明确2025年风电光伏新增装机目标', summaryEn: 'Clarified 2025 wind and solar installation targets', category: 'industry', categoryName: '行业资讯', categoryNameEn: 'Industry News', publishedAt: '2025-02-28' },
];

export default function NewsContent({ lang }: { lang: Lang }) {
  const t = translations[lang].news;

  const getNewsImage = (category: string) => {
    return category === 'company' ? images.company : images.industry;
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
        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sampleNews.map((news) => (
            <article key={news.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden border border-gray-100">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={getNewsImage(news.category)} 
                  alt={lang === 'zh' ? news.title : news.titleEn}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    news.category === 'company' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {lang === 'zh' ? news.categoryName : news.categoryNameEn}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {news.publishedAt}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-emerald-600 transition-colors">
                  {lang === 'zh' ? news.title : news.titleEn}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{lang === 'zh' ? news.summary : news.summaryEn}</p>
                <a href="#" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium">
                  {t.readMore}
                  <ArrowRight className="ml-1 w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
