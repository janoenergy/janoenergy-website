'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { translations, Lang } from '@/lib/translations';
import { Compass, TrendingUp, Building2, Settings } from 'lucide-react';
import { useThemeStyles } from '@/lib/theme';
import PageHero from '@/components/PageHero';
import { businessImages } from '@/lib/images';

const iconComponents = [Compass, TrendingUp, Building2, Settings];

// 业务数据
const businessStats = [
  { label: '累计开发容量', labelEn: 'Total Development', value: 800, suffix: 'MW' },
  { label: '投资规模', labelEn: 'Investment Scale', value: 50, suffix: '亿元' },
  { label: 'EPC项目', labelEn: 'EPC Projects', value: 30, suffix: '+' },
  { label: '运维容量', labelEn: 'O&M Capacity', value: 500, suffix: 'MW' },
];

// 主组件
export default function BusinessContent({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const styles = useThemeStyles();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`min-h-screen ${styles.bg}`}>
      <PageHero
        title={lang === 'zh' ? '业务板块' : 'Business'}
        subtitle={
          lang === 'zh'
            ? '覆盖新能源全产业链，提供一站式解决方案'
            : 'Covering the entire new energy industry chain, providing one-stop solutions'
        }
        lang={lang}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Business Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {t.business.sections.map((section, index) => {
            const Icon = iconComponents[index];
            const imageKeys: (keyof typeof businessImages)[] = ['development', 'investment', 'epc', 'operation'];
            const imageUrl = businessImages[imageKeys[index]];

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${styles.bgCard} rounded-xl shadow-sm overflow-hidden border ${styles.border}`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={lang === 'zh' ? section.title : section.titleEn}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <Icon className="w-8 h-8 mb-2" />
                    <h3 className="text-xl font-bold">
                      {lang === 'zh' ? section.title : section.titleEn}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className={`${styles.textMuted} mb-4`}>
                    {lang === 'zh' ? section.description : section.descriptionEn}
                  </p>
                  <ul className="space-y-2">
                    {section.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`${styles.bgCard} rounded-xl shadow-sm p-8 border ${styles.border}`}
        >
          <h2 className={`text-2xl font-bold ${styles.text} mb-8 text-center`}>
            {lang === 'zh' ? '业务数据' : 'Business Statistics'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {businessStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
                  {stat.value}
                  <span className="text-lg">{stat.suffix}</span>
                </div>
                <div className={`text-sm ${styles.textMuted}`}>
                  {lang === 'zh' ? stat.label : stat.labelEn}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
