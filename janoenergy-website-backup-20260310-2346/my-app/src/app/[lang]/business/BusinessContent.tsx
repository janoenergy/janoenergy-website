'use client';

import { translations, Lang } from '@/lib/translations';

const images = {
  development: '/images/business/development.jpg',
  investment: '/images/business/investment.jpg',
  epc: '/images/business/epc.jpg',
  operation: '/images/business/operation.jpg',
};

const icons = ['🧭', '📈', '🏗️', '⚙️'];

export default function BusinessContent({ lang }: { lang: Lang }) {
  const t = translations[lang].business;
  const imageList = [images.development, images.investment, images.epc, images.operation];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl text-emerald-100">{t.subtitle}</p>
        </div>
      </div>

      {/* Business Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-20">
          {t.sections.map((section, index) => (
            <section key={section.id} id={section.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-2xl">
                    {icons[index]}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{section.title}</h2>
                    <p className="text-gray-500">{section.subtitle}</p>
                  </div>
                </div>
                <p className="text-lg text-gray-600 mb-6">{section.desc}</p>
                <div className="grid grid-cols-2 gap-4">
                  {section.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-100">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img src={imageList[index]} alt={section.title} className="w-full h-full object-cover" />
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
