'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Zap, Calendar, X, Wind, Sun, Battery, Filter, CheckCircle2, Circle, Clock, TreePine, Home, Car } from 'lucide-react';
import { Lang } from '@/lib/translations';
import { useThemeStyles } from '@/lib/theme';
import PageHero from '@/components/PageHero';

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

// 真实的新能源项目照片 - 经过验证的URL
const projectImages = {
  wind: [
    'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&auto=format&fit=crop', // 风电场
    'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format&fit=crop', // 风力发电机
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop', // 海上风电
    'https://images.unsplash.com/photo-1548337138-e87d889cc369?w=800&auto=format&fit=crop', // 风电安装
  ],
  solar: [
    'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop', // 光伏电站
    'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800&auto=format&fit=crop', // 屋顶光伏
    'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800&auto=format&fit=crop', // 沙漠光伏
    'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&auto=format&fit=crop', // 太阳能板特写
  ],
  storage: [
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop', // 电力设施/变电站
    'https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=800&auto=format&fit=crop', // 电池储能
    'https://images.unsplash.com/photo-1565514020176-dbf2277e4955?w=800&auto=format&fit=crop', // 储能设施
  ],
};

// 为特定项目分配特定图片（覆盖默认分配）
const projectSpecificImages: Record<number, string> = {
  // 甘肃酒泉储能项目 - 使用储能设施照片
  1: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop',
  // 浙江宁波光储一体化项目 - 使用光伏电站照片
  9: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop',
  // 云南大理光伏项目 - 使用沙漠光伏照片
  3: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800&auto=format&fit=crop',
  // 广东清远光伏项目 - 使用屋顶光伏照片
  10: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800&auto=format&fit=crop',
  // 河北张家口光伏项目 - 使用光伏电站照片
  8: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop',
  // 山东德州分布式光伏 - 使用屋顶光伏照片
  6: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800&auto=format&fit=crop',
  // 江苏盐城储能电站 - 使用储能设施照片
  7: 'https://images.unsplash.com/photo-1565514020176-dbf2277e4955?w=800&auto=format&fit=crop',
};

// 获取项目图片
function getProjectImage(project: Project, index: number): string {
  // 如果项目有特定图片配置，优先使用
  if (projectSpecificImages[project.id]) {
    return projectSpecificImages[project.id];
  }
  
  // 否则根据类别获取
  const images = projectImages[project.category as keyof typeof projectImages] || projectImages.wind;
  return images[index % images.length];
}

// 项目时间线数据
interface TimelineEvent {
  date: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  completed: boolean;
}

// 模拟项目时间线数据
const projectTimelines: Record<number, TimelineEvent[]> = {
  1: [ // 西龙虎峪风电
    { date: '2019-03', title: '项目签约', titleEn: 'Project Signed', description: '与当地政府签署投资协议', descriptionEn: 'Signed investment agreement with local government', completed: true },
    { date: '2020-06', title: '获得核准', titleEn: 'Approved', description: '获得天津市发改委核准批复', descriptionEn: 'Approved by Tianjin Development and Reform Commission', completed: true },
    { date: '2021-03', title: '开工建设', titleEn: 'Construction Started', description: '项目正式开工建设', descriptionEn: 'Official construction started', completed: true },
    { date: '2022-06', title: '并网发电', titleEn: 'Grid Connected', description: '成功并网发电，投入商业运营', descriptionEn: 'Successfully connected to grid and operational', completed: true },
    { date: '2024-12', title: '扩建规划', titleEn: 'Expansion Planning', description: '规划二期扩建工程', descriptionEn: 'Planning phase II expansion', completed: false },
  ],
  2: [ // 其他项目使用默认时间线
    { date: '2020-01', title: '项目签约', titleEn: 'Project Signed', description: '签署投资协议', descriptionEn: 'Signed investment agreement', completed: true },
    { date: '2021-06', title: '开工建设', titleEn: 'Construction Started', description: '项目正式开工', descriptionEn: 'Construction started', completed: true },
    { date: '2023-12', title: '并网发电', titleEn: 'Grid Connected', description: '成功并网发电', descriptionEn: 'Grid connected', completed: true },
  ],
};

// 项目卡片组件
function ProjectCard({ project, lang, index, onClick, styles }: { 
  project: Project; 
  lang: Lang; 
  index: number;
  onClick: () => void;
  styles: ReturnType<typeof useThemeStyles>;
}) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'wind': return '#3b82f6';
      case 'solar': return '#f59e0b';
      case 'storage': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'wind': return <Wind className="w-4 h-4" />;
      case 'solar': return <Sun className="w-4 h-4" />;
      case 'storage': return <Battery className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operation': return { bg: 'bg-green-100', text: 'text-green-700', label: lang === 'zh' ? '运营中' : 'Operating' };
      case 'construction': return { bg: 'bg-blue-100', text: 'text-blue-700', label: lang === 'zh' ? '建设中' : 'In Progress' };
      case 'planning': return { bg: 'bg-gray-100', text: 'text-gray-700', label: lang === 'zh' ? '规划中' : 'Planned' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', label: status };
    }
  };

  const categoryNames = {
    zh: { wind: '风电', solar: '光伏', storage: '储能' },
    en: { wind: 'Wind', solar: 'Solar', storage: 'Storage' },
  };

  const status = getStatusBadge(project.status);
  const imageUrl = getProjectImage(project, index);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onClick={onClick}
      className={`group ${styles.bgCard} rounded-xl shadow-sm hover:shadow-xl hover:shadow-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden border ${styles.border} cursor-pointer`}
    >
      {/* Image Area */}
      <div className="relative aspect-video overflow-hidden">
        <motion.img loading="lazy" 
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
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
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
            <span className="font-semibold text-emerald-600">{project.capacity}</span>
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
export default function ProjectsContent({ lang }: { lang: Lang }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const styles = useThemeStyles();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('https://api.janoenergy.com/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const categories = [
    { id: 'all', label: lang === 'zh' ? '全部' : 'All', labelEn: 'All' },
    { id: 'wind', label: lang === 'zh' ? '风电' : 'Wind', labelEn: 'Wind' },
    { id: 'solar', label: lang === 'zh' ? '光伏' : 'Solar', labelEn: 'Solar' },
    { id: 'storage', label: lang === 'zh' ? '储能' : 'Storage', labelEn: 'Storage' },
  ];

  if (loading) {
    return (
      <div className={`min-h-screen ${styles.bg} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${styles.bg}`}>
      {/* Header */}
      <PageHero 
        title={lang === 'zh' ? '项目案例' : 'Projects'}
        subtitle={lang === 'zh' 
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
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
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
                onClick={() => setSelectedProject(project)}
                styles={styles}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
