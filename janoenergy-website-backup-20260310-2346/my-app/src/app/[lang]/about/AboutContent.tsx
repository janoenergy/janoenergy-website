'use client';

import { translations, Lang } from '@/lib/translations';

const images = {
  company: '/images/about/company.jpg',
};

const icons = ['🌱', '💡', '🤝'];

export default function AboutContent({ lang }: { lang: Lang }) {
  const t = translations[lang].about;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.intro.title}</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">{t.intro.p1}</p>
            <p className="text-lg text-gray-600 leading-relaxed">{t.intro.p2}</p>
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden">
            <img src={images.company} alt="JanoEnergy" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">{t.timeline.title}</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-emerald-200" />
            <div className="space-y-12">
              {t.timeline.items.map((item, index) => (
                <div key={item.year} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2 pr-8 text-right">
                    {index % 2 === 0 && (
                      <>
                        <div className="text-2xl font-bold text-emerald-600 mb-1">{item.year}</div>
                        <div className="text-lg font-semibold text-gray-900">{item.title}</div>
                        <div className="text-gray-600">{item.desc}</div>
                      </>
                    )}
                  </div>
                  <div className="w-4 h-4 bg-emerald-500 rounded-full border-4 border-white shadow z-10" />
                  <div className="w-1/2 pl-8">
                    {index % 2 === 1 && (
                      <>
                        <div className="text-2xl font-bold text-emerald-600 mb-1">{item.year}</div>
                        <div className="text-lg font-semibold text-gray-900">{item.title}</div>
                        <div className="text-gray-600">{item.desc}</div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">{t.values.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.values.items.map((value, index) => (
              <div key={value.title} className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="text-5xl mb-4">{icons[index]}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
