'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useThemeStyles } from '@/lib/theme';
import type { Lang } from '@/lib/translations';

interface CTASectionProps {
  lang: Lang;
}

export function CTASection({ lang }: CTASectionProps) {
  const styles = useThemeStyles();

  return (
    <section className={`py-24 relative overflow-hidden bg-gradient-to-br ${styles.bgGradient}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-4xl md:text-5xl font-bold mb-6 ${styles.text}`}
        >
          {lang === 'zh' ? '携手共创绿色未来' : 'Partner for a Green Future'}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={`text-xl mb-8 font-medium ${styles.text}`}
        >
          {lang === 'zh'
            ? '无论是项目开发、投资合作还是EPC总承包，我们期待与您合作'
            : 'Whether project development, investment cooperation, or EPC contracting, we look forward to working with you'}
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          href={`/${lang}/contact`}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          {lang === 'zh' ? '联系我们' : 'Contact Us'}
          <ArrowRight className="w-5 h-5" />
        </motion.a>
      </div>
    </section>
  );
}
