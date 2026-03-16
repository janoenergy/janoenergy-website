'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Zap, Calendar, X, Wind, Sun, Battery, Filter } from 'lucide-react';
import { Lang } from '@/lib/translations';

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

// 省份位置配置
const provincePositions: Record<string, { x: number; y: number; name: string; nameEn: string }> = {
  '1': { x: 72, y: 32, name: '天津', nameEn: 'Tianjin' },
  '2': { x: 75, y: 35, name: '天津', nameEn: 'Tianjin' },
  '3': { x: 55, y: 45, name: '河北', nameEn: 'Hebei' },
  '4': { x: 65, y: 22, name: '内蒙古', nameEn: 'Inner Mongolia' },
  '5': { x: 70, y: 40, name: '山东', nameEn: 'Shandong' },
  '6': { x: 78, y: 48, name: '江苏', nameEn: 'Jiangsu' },
  '7': { x: 68, y: 28, name: '河北', nameEn: 'Hebei' },
  '8': { x: 62, y: 65, name: '湖南', nameEn: 'Hunan' },
  '9': { x: 80, y: 55, name: '浙江', nameEn: 'Zhejiang' },
  '10': { x: 45, y: 72, name: '云南', nameEn: 'Yunnan' },
  '11': { x: 58, y: 32, name: '山西', nameEn: 'Shanxi' },
  '12': { x: 35, y: 38, name: '甘肃', nameEn: 'Gansu' },
};

// 项目卡片组件
function ProjectCard({ project, lang, index, onClick }: { 
  project: Project; 
  lang: Lang; 
  index: number;
  onClick: () => void;
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onClick={onClick}
      className="group bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all overflow-hidden border border-gray-100 cursor-pointer"
    >
      {/* Image Area */}
      <div className="relative aspect-video overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="w-20 h-20 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: getCategoryColor(project.category) }}
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {getCategoryIcon(project.category)}
          </motion.div>
        </motion.div>
        
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
        <div className="flex items-center gap-2 mb-3">
          <motion.span 
            className="px-2.5 py-1 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: getCategoryColor(project.category) }}
            whileHover={{ scale: 1.1 }}
          >
            {categoryNames[lang][project.category as keyof typeof categoryNames.zh]}
          </motion.span>
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
            {status.label}
          </span>
        </div>
        
        <motion.h3 
          className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          {lang === 'zh' ? project.title : project.titleEn}
        </motion.h3>
        
        <div className="space-y-2 text-sm text-gray-600 mb-4">
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
          className="text-gray-600 text-sm line-clamp-2"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {lang === 'zh' ? project.description : project.descriptionEn}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function ProjectsContent({ lang }: { lang: Lang }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [provinceFilter, setProvinceFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  // 提取所有省份
  const provinces = [...new Set(projects.map(p => {
    const match = p.location.match(/^([^省市]+)[省市]/);
    return match ? match[1] : p.location.split('省')[0].split('市')[0];
  }))].filter(Boolean);

  // 筛选项目
  const filteredProjects = projects.filter(p => {
    const categoryMatch = filter === 'all' || p.category === filter;
    const provinceMatch = provinceFilter === 'all' || p.location.includes(provinceFilter);
    return categoryMatch && provinceMatch;
  });

  const categoryNames = {
    zh: { wind: '风电', solar: '光伏', storage: '储能', all: '全部' },
    en: { wind: 'Wind', solar: 'Solar', storage: 'Storage', all: 'All' },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-12 w-12 border-b-2 border-emerald-600"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {lang === 'zh' ? '项目案例' : 'Projects'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-emerald-100"
          >
            {lang === 'zh' ? '风电、光伏、储能全领域覆盖' : 'Full coverage of wind, solar, and energy storage'}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-emerald-600" />
            <span className="font-semibold text-gray-900">
              {lang === 'zh' ? '筛选项目' : 'Filter Projects'}
            </span>
          </div>
          
          {/* Category Filter */}
          <div className="mb-4">
            <span className="text-sm text-gray-500 mb-2 block">
              {lang === 'zh' ? '项目类型：' : 'Category:'}
            </span>
            <div className="flex flex-wrap gap-2">
              {['all', 'wind', 'solar', 'storage'].map((key, index) => (
                <motion.button
                  key={key}
                  onClick={() => setFilter(key)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === key 
                      ? 'bg-emerald-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {categoryNames[lang][key as keyof typeof categoryNames.zh]}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Province Filter */}
          <div>
            <span className="text-sm text-gray-500 mb-2 block">
              {lang === 'zh' ? '所在省份：' : 'Province:'}
            </span>
            <div className="flex flex-wrap gap-2">
              <motion.button
                onClick={() => setProvinceFilter('all')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  provinceFilter === 'all'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {lang === 'zh' ? '全部' : 'All'}
              </motion.button>
              {provinces.map((province, index) => (
                <motion.button
                  key={province}
                  onClick={() => setProvinceFilter(province)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    provinceFilter === province
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {province}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 pt-4 border-t border-gray-100"
          >
            <span className="text-sm text-gray-600">
              {lang === 'zh' ? `共 ${filteredProjects.length} 个项目` : `${filteredProjects.length} projects found`}
            </span>
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard 
                key={project.id}
                project={project}
                lang={lang}
                index={idx}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 text-lg">
              {lang === 'zh' ? '没有找到符合条件的项目' : 'No projects found matching your criteria'}
            </p>
          </motion.div>
        )}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                  <motion.div 
                    className="w-24 h-24 rounded-full flex items-center justify-center text-white"
                    style={{ 
                      backgroundColor: selectedProject.category === 'wind' ? '#3b82f6' : 
                                       selectedProject.category === 'solar' ? '#f59e0b' : '#10b981'
                    }}
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {selectedProject.category === 'wind' ? <Wind className="w-10 h-10" /> : 
                     selectedProject.category === 'solar' ? <Sun className="w-10 h-10" /> : 
                     <Battery className="w-10 h-10" />}
                  </motion.div>
                </div>
                <motion.button 
                  onClick={() => setSelectedProject(null)} 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ 
                      backgroundColor: selectedProject.category === 'wind' ? '#3b82f6' : 
                                       selectedProject.category === 'solar' ? '#f59e0b' : '#10b981'
                    }}
                  >
                    {categoryNames[lang][selectedProject.category as keyof typeof categoryNames.zh]}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedProject.status === 'operation' ? 'bg-green-100 text-green-700' :
                    selectedProject.status === 'construction' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {selectedProject.status === 'operation' ? (lang === 'zh' ? '运营中' : 'Operating') :
                     selectedProject.status === 'construction' ? (lang === 'zh' ? '建设中' : 'In Progress') :
                     (lang === 'zh' ? '规划中' : 'Planned')}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {lang === 'zh' ? selectedProject.title : selectedProject.titleEn}
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <motion.div 
                    className="flex items-center gap-2 text-gray-600"
                    whileHover={{ x: 5 }}
                  >
                    <MapPin className="w-5 h-5 text-emerald-500" />
                    <span>{lang === 'zh' ? selectedProject.location : selectedProject.locationEn}</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2 text-gray-600"
                    whileHover={{ x: 5 }}
                  >
                    <Zap className="w-5 h-5 text-emerald-500" />
                    <span className="font-semibold">{selectedProject.capacity}</span>
                  </motion.div>
                  {selectedProject.startDate && (
                    <motion.div 
                      className="flex items-center gap-2 text-gray-600"
                      whileHover={{ x: 5 }}
                    >
                      <Calendar className="w-5 h-5 text-emerald-500" />
                      <span>{selectedProject.startDate.split('T')[0]}</span>
                    </motion.div>
                  )}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {lang === 'zh' ? selectedProject.description : selectedProject.descriptionEn}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
