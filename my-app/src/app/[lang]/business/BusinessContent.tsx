'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { translations, Lang } from '@/lib/translations';
import { Compass, TrendingUp, Building2, Settings } from 'lucide-react';
import { useThemeStyles } from '@/lib/theme';
import PageHero from '@/components/PageHero';

// 真实的新能源业务照片
const images = {
  development: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format&fit=crop', // 风电场选址
  investment: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop', // 投资分析
  epc: 'https://images.unsplash.com/photo-1548337138-e87d889cc369?w=800&auto=format&fit=crop', // EPC施工
  operation: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop', // 运维监控
};

const iconComponents = [Compass, TrendingUp, Building2, Settings];

// 业务数据
const businessStats = [
  { label: '累计开发容量', labelEn: 'Total Development', value: 800, suffix: 'MW' },
  { label: '投资规模', labelEn: 'Investment Scale', value: 50, suffix: '亿元' },
  { label: 'EPC项目', labelEn: 'EPC Projects', value: 30, suffix: '+' },
  { label: '运维容量', labelEn: 'O&M Capacity', value: 500, suffix: 'MW' },
];

// 客户评价
const testimonials = [
  { 
    content: '江能集团专业高效，项目从开发到并网仅用了18个月，远超预期。', 
    contentEn: 'JanoEnergy is professional and efficient, completing the project from development to grid connection in just 18 months.',
    author: '某能源集团', 
    authorEn: 'Energy Group' 
  },
  { 
    content: '合作多年，江能的运维服务非常到位，发电效率始终保持在较高水平。', 
    contentEn: 'After years of cooperation, JanoEnergy\'s O&M service is excellent, maintaining high power generation efficiency.',
    author: '某电力公司', 
    authorEn: 'Power Company' 
  },
];

// 数字动画组件
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
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
  }, [value]);

  return <span className="tabular-nums">{displayValue}{suffix}</span>;
}

export default function BusinessContent({ lang }: { lang: Lang }) {
  const t = translations[lang].business;
  const styles = useThemeStyles();
  const imageList = [images.development, images.investment, images.epc, images.operation];

  return (
    <div className={`min-h-screen ${styles.bg}`}>
      {/* Header */}
      <PageHero 
        title={t.title}
        subtitle={lang === 'zh' ? '专注于新能源开发、投资、建设、运营的全产业链服务商' : 'Full-chain service provider in new energy development, investment, construction, and operation'}
        lang={lang}
      />

      {/* 业务数据展示 */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-950 py-16 relative overflow-hidden">
        {/* 微光背景动画 */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {businessStats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group text-center"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-emerald-100 text-sm mb-3">{lang === 'zh' ? stat.label : stat.labelEn}</div>
                  {/* 进度条装饰 */}
                  <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${[80, 65, 70, 85][index]}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Business Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-20">
          {t.sections.map((section, idx) => {
            const IconComponent = iconComponents[idx];
            return (
              <section key={section.id} id={section.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className={`text-3xl font-bold ${styles.text}`}>{section.title}</h2>
                      <p className={styles.textMuted}>{section.subtitle}</p>
                    </div>
                  </div>
                  <p className={`text-lg ${styles.textSecondary} mb-6`}>{section.desc}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {section.features.map((feature, i) => (
                      <div key={i} className={`flex items-center gap-2 p-3 ${styles.bgCard} rounded-lg border ${styles.border} shadow-sm hover:shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <span className={styles.textSecondary}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group">
                    <img 
                      src={imageList[idx]} 
                      alt={section.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* 客户评价 */}
      <div className={`${styles.bgMuted} py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold ${styles.text} mb-10 text-center`}>
            {lang === 'zh' ? '客户评价' : 'Client Testimonials'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((item, idx) => (
              <div key={idx} className={`${styles.bgCard} rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:-translate-y-1 border ${styles.border}`}>
                <div className="text-4xl text-emerald-200 mb-4">&ldquo;</div>
                <p className={`${styles.textSecondary} mb-6 leading-relaxed`}>
                  {lang === 'zh' ? item.content : item.contentEn}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 font-bold">
                      {(lang === 'zh' ? item.author : item.authorEn).charAt(0)}
                    </span>
                  </div>
                  <span className={`font-medium ${styles.text}`}>
                    {lang === 'zh' ? item.author : item.authorEn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
