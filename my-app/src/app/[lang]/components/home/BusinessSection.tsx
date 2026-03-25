'use client';

import { motion } from 'framer-motion';
import { Wind, Sun, Battery, ArrowRight } from 'lucide-react';
import { useThemeStyles } from '@/lib/theme';
import type { Lang } from '@/lib/translations';

const projectTypes = [
  {
    id: 'wind',
    name: '风电项目',
    nameEn: 'Wind Power',
    icon: Wind,
    color: 'from-blue-500 to-cyan-400',
    desc: '陆上风电开发、建设、运营',
    descEn: 'Onshore wind development, construction, and operation'
  },
  {
    id: 'solar',
    name: '光伏项目',
    nameEn: 'Solar Power',
    icon: Sun,
    color: 'from-amber-500 to-orange-400',
    desc: '地面电站、分布式光伏',
    descEn: 'Ground-mounted and distributed solar power'
  },
  {
    id: 'storage',
    name: '储能项目',
    nameEn: 'Energy Storage',
    icon: Battery,
    color: 'from-emerald-500 to-teal-400',
    desc: '电化学储能、光储一体化',
    descEn: 'Battery storage and solar-storage integration'
  },
];

interface BusinessSectionProps {
  lang: Lang;
}

export function BusinessSection({ lang }: BusinessSectionProps) {
  const styles = useThemeStyles();

  return (
    <section className={`py-24 relative ${styles.bg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm mb-4 ${styles.bgCard} ${styles.border}`}
          >
            <span>01</span>
            <span className={`w-8 h-px ${styles.border.replace('border-', 'bg-')}`} />
            <span className={styles.textMuted}>{lang === 'zh' ? '业务板块' : 'Business'}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-4xl md:text-5xl font-bold mb-4 ${styles.text}`}
          >
            {lang === 'zh' ? '覆盖多种新能源形态' : 'Multiple Clean Energy Solutions'}
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projectTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${styles.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className={`relative h-full ${styles.bgCard} backdrop-blur-xl border ${styles.border} ${styles.borderHover} rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${type.color} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold mb-3 ${styles.text}`}>
                    {lang === 'zh' ? type.name : type.nameEn}
                  </h3>
                  <p className={`mb-6 ${styles.textMuted}`}>
                    {lang === 'zh' ? type.desc : type.descEn}
                  </p>
                  <a href={`/${lang}/projects?type=${type.id}`} className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-400">
                    {lang === 'zh' ? '了解更多' : 'Learn More'}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
