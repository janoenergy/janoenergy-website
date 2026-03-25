'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Zap, Wind, Sun, Battery } from 'lucide-react';
import { Lang } from '@/lib/translations';
import { useThemeStyles } from '@/lib/theme';
import PageHero from '@/components/PageHero';
import { staticProjects } from '@/data/projects';
import { projectImages, getProjectImage } from '@/lib/images';

interface Project {
  id: number;
  title: string;
  titleEn: string;
  category: string;
  location: string;
  locationEn: string;
  capacity: string;
  description: string;
  descriptionEn: string;
  imageUrl: string | null;
  status: string;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
}

// 为特定项目分配特定图片（使用本地路径）
const projectSpecificImages: Record<number, string> = {
  1: projectImages.byId[1],  // 西龙虎峪风电
  2: projectImages.byId[2],  // 广东清远光伏
  3: projectImages.byId[3],  // 四川凉山风电
  4: projectImages.byId[4],  // 内蒙古乌兰察布风电
  5: projectImages.byId[5],  // 山东德州分布式光伏
  6: projectImages.byId[6],  // 江苏盐城储能电站
  7: projectImages.byId[7],  // 河北张家口光伏
  8: projectImages.byId[8],  // 湖南郴州风电
  9: projectImages.byId[9],  // 浙江宁波光储一体化
  10: projectImages.byId[10], // 云南大理光伏
  11: projectImages.byId[11], // 山西大同风电
  12: projectImages.byId[12], // 甘肃酒泉储能
};

// 获取项目图片（优先使用特定配置，其次按类别）
function getProjectDisplayImage(project: Project, index: number): string {
  // 如果项目有特定图片配置，优先使用
  if (projectSpecificImages[project.id]) {
    return projectSpecificImages[project.id];
  }
  // 使用通用配置
  return getProjectImage(project.id);
}

// 项目卡片组件
function ProjectCard({
  project,
  lang,
  index,
  onClick,
  styles,
}: {
  project: Project;
  lang: Lang;
  index: number;
  onClick: () => void;
  styles: ReturnType<typeof useThemeStyles>;
}) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'wind':
        return '#3b82f6';
      case 'solar':
        return '#f59e0b';
      case 'storage':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'wind':
        return <Wind className="w-4 h-4" />;
      case 'solar':
        return <Sun className="w-4 h-4" />;
      case 'storage':
        return <Battery className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operation':
        return {
          bg: 'bg-green-100',
          text: 'text-green-700',
          label: lang === 'zh' ? '运营中' : 'Operating',
        };
      case 'construction':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-700',
          label: lang === 'zh' ? '建设中' : 'In Progress',
        };
      case 'planning':
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-700',
          label: lang === 'zh' ? '规划中' : 'Planned',
        };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', label: status };
    }
  };

  const categoryNames = {
    zh: { wind: '风电', solar: '光伏', storage: '储能' },
    en: { wind: 'Wind', solar: 'Solar', storage: 'Storage' },
  };

  const status = getStatusBadge(project.status);
  const imageUrl = getProjectDisplayImage(project, index);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onClick={onClick}
      className={`group ${styles.bgCard} rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border ${styles.border} cursor-pointer`}
    >
      {/* Image Area */}
      <div className="relative aspect-video overflow-hidden">
        <motion.img
          loading="lazy"
          src={imageUrl}
          alt={lang === 'zh' ? project.title : project.titleEn}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <motion.span
            className="px-3 py-1.5 rounded-full text-xs font-medium text-white flex items-center gap-1.5"
            style={{ backgroundColor: getCategoryColor(project.category) }}
            whileHover={{ scale: 1.1 }}
          >
            {getCategoryIcon(project.category)}
            {categoryNames[lang][project.category as keyof typeof categoryNames.zh]}
          </motion.span>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}
          >
            {status.label}
          </span>
        </div>

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-emerald-600/80 flex items-center justify-center"
        >
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            className="text-white font-semibold text-lg"
          >
            {lang === 'zh' ? '查看详情' : 'View Details'}
          </motion.span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <motion.h3
          className={`text-xl font-bold ${styles.text} mb-3 group-hover:text-emerald-600 transition-colors`}
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          {lang === 'zh' ? project.title : project.titleEn}
        </motion.h3>

        <div className={`space-y-2 text-sm ${styles.textMuted} mb-4`}>
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <MapPin className="w-4 h-4 text-emerald-500" />
            <span>{lang === 'zh' ? project.location : project.locationEn}</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Zap className="w-4 h-4 text-emerald-500" />
            <span className="font-semibold text-emerald-600">
              {project.capacity}
            </span>
          </motion.div>
        </div>

        <motion.p
          className={`${styles.textMuted} text-sm line-clamp-2`}
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {lang === 'zh' ? project.description : project.descriptionEn}
        </motion.p>
      </div>
    </motion.div>
  );
}

// 主组件
export default function ProjectsContent({
  lang,
  initialProjects = [],
}: {
  lang: Lang;
  initialProjects?: Project[];
}) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [loading, setLoading] = useState(initialProjects.length === 0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const styles = useThemeStyles();

  useEffect(() => {
    if (initialProjects.length > 0) {
      setLoading(false);
      return;
    }
    fetchProjects();
  }, [initialProjects]);

  const fetchProjects = async () => {
    try {
      const response = await fetch('https://api.janoenergy.com/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      setProjects(staticProjects);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const categories = [
    { id: 'all', label: lang === 'zh' ? '全部' : 'All', labelEn: 'All' },
    { id: 'wind', label: lang === 'zh' ? '风电' : 'Wind', labelEn: 'Wind' },
    { id: 'solar', label: lang === 'zh' ? '光伏' : 'Solar', labelEn: 'Solar' },
    {
      id: 'storage',
      label: lang === 'zh' ? '储能' : 'Storage',
      labelEn: 'Storage',
    },
  ];

  if (loading) {
    return (
      <div
        className={`min-h-screen ${styles.bg} flex items-center justify-center`}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${styles.bg}`}>
      <PageHero
        title={lang === 'zh' ? '项目案例' : 'Projects'}
        subtitle={
          lang === 'zh'
            ? '覆盖全国多个省份的新能源项目，总装机容量超过1GW'
            : 'New energy projects across multiple provinces, with total installed capacity exceeding 1GW'
        }
        lang={lang}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : `${styles.bgCard} ${styles.text} hover:opacity-80 border ${styles.border}`
              }`}
            >
              {lang === 'zh' ? category.label : category.labelEn}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                lang={lang}
                index={index}
                onClick={() => {}}
                styles={styles}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
