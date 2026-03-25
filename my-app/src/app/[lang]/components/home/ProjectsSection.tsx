'use client';

import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { useThemeStyles } from '@/lib/theme';
import { TiltCard } from '@/components/TiltCard';
import type { Lang } from '@/lib/translations';
import type { ApiProject } from './types';
import { projectImages } from '@/lib/images';

const projectTypes = [
  { id: 'wind', name: '风电项目', nameEn: 'Wind Power', icon: '⚡' },
  { id: 'solar', name: '光伏项目', nameEn: 'Solar Power', icon: '☀️' },
  { id: 'storage', name: '储能项目', nameEn: 'Energy Storage', icon: '🔋' },
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard className="group cursor-pointer h-full" glowColor="#10b981">
        <div className="relative backdrop-blur-xl bg-white/70 border border-white/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-300/50 h-full flex flex-col">
          {/* 项目图片 */}
          {imageUrl && (
            <div className="relative aspect-video overflow-hidden">
              <motion.img
                src={imageUrl}
                alt={lang === 'zh' ? project.title : project.titleEn}
                className="w-full h-full object-cover"
                loading="lazy"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* 状态标签 */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium text-white shadow-lg ${
                  project.status === 'operation' ? 'bg-emerald-500' :
                  project.status === 'construction' ? 'bg-amber-500' :
                  'bg-blue-500'
                }`}>
                  {project.status === 'operation' ? (lang === 'zh' ? '运营中' : 'Operating') :
                   project.status === 'construction' ? (lang === 'zh' ? '建设中' : 'Construction') :
                   (lang === 'zh' ? '规划中' : 'Planning')}
                </span>
              </div>

              {/* 类型图标 */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xl flex items-center justify-center text-xl">
                {typeConfig.icon}
              </div>
            </div>
          )}

          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-bold mb-2 line-clamp-2 text-gray-900 group-hover:text-emerald-600 transition-colors">
              {lang === 'zh' ? project.title : project.titleEn}
            </h3>
            
            <div className="flex items-center gap-2 text-sm mb-4 text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>{lang === 'zh' ? project.location : project.locationEn}</span>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 mt-auto">
              <div>
                <div className="text-2xl font-bold text-emerald-500">{project.capacity}</div>
                <div className="text-xs text-gray-500">{lang === 'zh' ? '装机容量' : 'Capacity'}</div>
              </div>
              <motion.div
                className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center"
                whileHover={{ scale: 1.1, x: 3 }}
              >
                <ArrowRight className="w-5 h-5 text-emerald-600" />
              </motion.div>
            </div>
          </div>
        </div>
      </TiltCard>
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
    <section className="py-24 relative bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm mb-4"
            >
              <span className="font-medium">02</span>
              <span className="w-8 h-px bg-emerald-300" />
              <span>{lang === 'zh' ? '项目案例' : 'Projects'}</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-900"
            >
              {lang === 'zh' ? '精选项目展示' : 'Featured Projects'}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-2 mt-6 md:mt-0"
          >
            {filterTypes.map((type) => (
              <motion.button
                key={type.id}
                onClick={() => onTypeChange(type.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeType === type.id
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : 'bg-white/80 backdrop-blur-xl text-gray-600 border border-gray-200 hover:border-emerald-300 hover:text-emerald-600'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {type.name}
              </motion.button>
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href={`/${lang}/projects`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-xl text-gray-900 font-semibold rounded-xl border border-gray-200 transition-all duration-300 hover:border-emerald-300 hover:text-emerald-600"
            whileHover={{ y: -3, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
          >
            {lang === 'zh' ? '查看全部项目' : 'View All Projects'}
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
