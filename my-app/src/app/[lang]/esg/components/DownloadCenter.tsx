'use client';

import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';
import { Lang } from '@/lib/translations';

interface DownloadItem {
  title: string;
  titleEn: string;
  size: string;
  year: string;
}

interface DownloadCenterProps {
  lang: Lang;
}

const downloadItems: DownloadItem[] = [
  {
    title: '2024年度ESG报告',
    titleEn: '2024 ESG Report',
    size: 'PDF · 8.5MB',
    year: '2024',
  },
  {
    title: '碳足迹报告',
    titleEn: 'Carbon Footprint Report',
    size: 'PDF · 3.2MB',
    year: '2024',
  },
  {
    title: '可持续发展白皮书',
    titleEn: 'Sustainability Whitepaper',
    size: 'PDF · 5.1MB',
    year: '2024',
  },
];

export function DownloadCenter({ lang }: DownloadCenterProps) {
  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {lang === 'zh' ? '下载中心' : 'Download Center'}
          </h2>
          <p className="text-muted-foreground">
            {lang === 'zh' ? '获取江能集团ESG相关报告与资料' : 'Download ESG reports and materials'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {downloadItems.map((doc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-card rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-lg cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-red-600" />
                </div>
                <span className="text-sm text-muted-foreground">{doc.year}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                {lang === 'zh' ? doc.title : doc.titleEn}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{doc.size}</p>
              <button className="flex items-center text-emerald-600 font-medium group-hover:text-emerald-700">
                <Download className="w-4 h-4 mr-2" />
                {lang === 'zh' ? '下载' : 'Download'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
