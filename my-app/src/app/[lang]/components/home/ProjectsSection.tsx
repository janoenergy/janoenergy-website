'use client';

import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { useThemeStyles } from '@/lib/theme';
import type { Lang } from '@/lib/translations';
import type { ApiProject } from '../types';
import { projectImages } from '@/lib/images';

const projectTypes = [
  { id: 'wind', name: '风电项目', nameEn: 'Wind Power', icon: 'Wind' },
  { id: 'solar', name: '光伏项目', nameEn: 'Solar Power', icon: 'Sun' },
  { id: 'storage', name: '储能项目', nameEn: 'Energy Storage', icon: 'Battery' },
];

interface ProjectCardProps {
  project: ApiProject;
  index: number;
  lang: Lang;
}

function ProjectCard({ project, index, lang }: ProjectCardProps) {
  const styles = useThemeStyles();
  const typeConfig = projectTypes.find(t => t.id === project.category) || projectTypes[0];
  const imageUrl = projectImages.byId[project.id] || project.imageUrl || '';

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${styles.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
      <div className={`relative ${styles.bgCard} backdrop-blur-xl border ${styles.border} ${styles.borderHover} rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
        {/* 项目图片 */}
        {imageUrl && (
          <div className="relative aspect-video overflow-hidden">
            <img
              src={imageUrl}
              alt={lang === 'zh' ? project.title : project.titleEn}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute top-4 left-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                project.status === 'operation' ? 'bg-emerald-500' :
                project.status === 'construction' ? 'bg-amber-500' :
                'bg-blue-500'
              }`}>
                {project.status === 'operation' ? (lang === 'zh' ? '运营中' : 'Operating') :
                 project.status === 'construction' ? (lang === 'zh' ? '建设中' : 'Construction') :
                 (lang === 'zh' ? '规划中' : 'Planning')}
              </span>
            </div>
          </div>
        )}

        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <span className="text-emerald-500 text-xs">{typeConfig.icon[0]}</span>
            </div>
            <span className={`text-sm ${styles.textMuted}`}>{lang === 'zh' ? typeConfig.name : typeConfig.nameEn}</span>
          </div>
          <h3 className={`text-xl font-bold mb-2 line-clamp-2 ${styles.text}`}>
            {lang === 'zh' ? project.title : project.titleEn}
          </h3>
          <div className={`flex items-center gap-2 text-sm mb-4 ${styles.textMuted}`}>
            <MapPin className="w-4 h-4" />
            <span>{lang === 'zh' ? project.location : project.locationEn}</span>
          </div>
          <div className={`flex items-center justify-between pt-4 border-t ${styles.border}`}>
            <div>
              <div className="text-2xl font-bold text-emerald-500">{project.capacity}</div>
              <div className={`text-xs ${styles.textMuted}`}>{lang === 'zh' ? '装机容量' : 'Capacity'}</div>
            </div>
            <ArrowRight className={`w-5 h-5 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${styles.textMuted}`} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface ProjectsSectionProps {
  lang: Lang;
  projects: ApiProject[];
  loading: boolean;
  activeType: string;
  onTypeChange: (type: string) => void;
}

export function ProjectsSection({ lang, projects, loading, activeType, onTypeChange }: ProjectsSectionProps) {
  const styles = useThemeStyles();

  const filterTypes = [
    { id: 'all', name: lang === 'zh' ? '全部' : 'All' },
    { id: 'wind', name: lang === 'zh' ? '风电' : 'Wind' },
    { id: 'solar', name: lang === 'zh' ? '光伏' : 'Solar' },
    { id: 'storage', name: lang === 'zh' ? '储能' : 'Storage' },
  ];

  return (
    <section className={`py-24 relative ${styles.bg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm mb-4 ${styles.bgCard} ${styles.border}`}
            >
              <span>02</span>
              <span className={`w-8 h-px ${styles.border.replace('border-', 'bg-')}`} />
              <span className={styles.textMuted}>{lang === 'zh' ? '项目案例' : 'Projects'}</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-4xl md:text-5xl font-bold ${styles.text}`}
            >
              {lang === 'zh' ? '精选项目展示' : 'Featured Projects'}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex gap-2 mt-6 md:mt-0"
          >
            {filterTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => onTypeChange(type.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  activeType === type.id
                    ? 'bg-emerald-500 text-white'
                    : `${styles.bgCard} ${styles.textSecondary} ${styles.border} hover:border-emerald-400`
                }`}
              >
                {type.name}
              </button>
            ))}
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} lang={lang} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href={`/${lang}/projects`}
            className={`inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${styles.btnSecondary} ${styles.text}`}
          >
            {lang === 'zh' ? '查看全部项目' : 'View All Projects'}
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
