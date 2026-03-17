'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Zap, Calendar, X, Wind, Sun, Battery, Filter, CheckCircle2, Circle, Clock, TreePine, Home, Car } from 'lucide-react';
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
  const imageUrl = getProjectImage(project, index);

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
        <motion.img 
          src={imageUrl}
          alt={lang === 'zh' ? project.title : project.titleEn}
          className="w-full h-full object-cover"
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

// 项目详情弹窗组件
function ProjectModal({ project, lang, onClose }: { 
  project: Project; 
  lang: Lang; 
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'impact'>('overview');
  
  const timeline = projectTimelines[project.id] || projectTimelines[2];
  
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
      case 'wind': return <Wind className="w-6 h-6" />;
      case 'solar': return <Sun className="w-6 h-6" />;
      case 'storage': return <Battery className="w-6 h-6" />;
      default: return null;
    }
  };

  const categoryNames = {
    zh: { wind: '风电项目', solar: '光伏项目', storage: '储能项目' },
    en: { wind: 'Wind Power', solar: 'Solar Power', storage: 'Energy Storage' },
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operation': return { bg: 'bg-green-100', text: 'text-green-700', label: lang === 'zh' ? '运营中' : 'Operating' };
      case 'construction': return { bg: 'bg-blue-100', text: 'text-blue-700', label: lang === 'zh' ? '建设中' : 'In Progress' };
      case 'planning': return { bg: 'bg-gray-100', text: 'text-gray-700', label: lang === 'zh' ? '规划中' : 'Planned' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', label: status };
    }
  };

  const status = getStatusBadge(project.status);
  const imageUrl = getProjectImage(project, project.id);

  // 计算环保效益
  const capacity = parseFloat(project.capacity.match(/[\d.]+/)?.[0] || '0');
  const annualGeneration = capacity * 2200; // 年发电量 (MWh)
  const co2Reduction = annualGeneration * 0.85; // 年减排CO2 (吨)
  const homesPowered = Math.floor(annualGeneration * 1000 / 4500); // 供电家庭数

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-64 overflow-hidden">
          <motion.img 
            src={imageUrl}
            alt={lang === 'zh' ? project.title : project.titleEn}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </motion.button>
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-2"
            >
              <span 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: getCategoryColor(project.category) }}
              >
                {getCategoryIcon(project.category)}
              </span>
              <div>
                <span className="text-sm opacity-80">{categoryNames[lang][project.category as keyof typeof categoryNames.zh]}</span>
                <h2 className="text-2xl font-bold">{lang === 'zh' ? project.title : project.titleEn}</h2>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            {[
              { id: 'overview', label: lang === 'zh' ? '项目概况' : 'Overview' },
              { id: 'timeline', label: lang === 'zh' ? '项目进度' : 'Timeline' },
              { id: 'impact', label: lang === 'zh' ? '环保效益' : 'Impact' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-1 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-320px)]">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {/* Key Info */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-emerald-50 rounded-xl p-4 text-center">
                    <Zap className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-emerald-600">{project.capacity}</div>
                    <div className="text-sm text-gray-600">{lang === 'zh' ? '装机容量' : 'Capacity'}</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-lg font-bold text-blue-600">{lang === 'zh' ? project.location : project.locationEn}</div>
                    <div className="text-sm text-gray-600">{lang === 'zh' ? '项目地点' : 'Location'}</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <Calendar className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                    <div className={`text-lg font-bold ${status.text}`}>{status.label}</div>
                    <div className="text-sm text-gray-600">{lang === 'zh' ? '项目状态' : 'Status'}</div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">{lang === 'zh' ? '项目介绍' : 'Description'}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {lang === 'zh' ? project.description : project.descriptionEn}
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'timeline' && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                {timeline.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        event.completed ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-400'
                      }`}>
                        {event.completed ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                      </div>
                      {index < timeline.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 my-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="text-sm text-gray-500 mb-1">{event.date}</div>
                      <h4 className="font-semibold text-gray-900">{lang === 'zh' ? event.title : event.titleEn}</h4>
                      <p className="text-sm text-gray-600 mt-1">{lang === 'zh' ? event.description : event.descriptionEn}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'impact' && (
              <motion.div
                key="impact"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <TreePine className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">{Math.floor(co2Reduction).toLocaleString()}</div>
                    <div className="text-sm text-gray-600">{lang === 'zh' ? '年减排CO₂ (吨)' : 'CO₂ Reduction (t/year)'}</div>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-4 text-center">
                    <Home className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-yellow-600">{homesPowered.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">{lang === 'zh' ? '年供电家庭' : 'Homes Powered'}</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <Car className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">{Math.floor(co2Reduction / 4.6).toLocaleString()}</div>
                    <div className="text-sm text-gray-600">{lang === 'zh' ? '相当于减少汽车' : 'Cars Equivalent'}</div>
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-emerald-800 mb-3">{lang === 'zh' ? '环保贡献' : 'Environmental Contribution'}</h3>
                  <p className="text-emerald-700 leading-relaxed">
                    {lang === 'zh' 
                      ? `该项目每年可发电约 ${Math.floor(annualGeneration).toLocaleString()} MWh，相当于减少标准煤消耗约 ${Math.floor(annualGeneration * 0.3).toLocaleString()} 吨，减排二氧化碳约 ${Math.floor(co2Reduction).toLocaleString()} 吨，为改善当地生态环境、实现碳中和目标做出重要贡献。`
                      : `This project generates approximately ${Math.floor(annualGeneration).toLocaleString()} MWh of electricity annually, equivalent to reducing coal consumption by about ${Math.floor(annualGeneration * 0.3).toLocaleString()} tons and CO₂ emissions by about ${Math.floor(co2Reduction).toLocaleString()} tons, making significant contributions to improving the local ecological environment and achieving carbon neutrality goals.`
                    }
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

// 主组件
export default function ProjectsContent({ lang }: { lang: Lang }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {lang === 'zh' ? '项目案例' : 'Projects'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {lang === 'zh' 
              ? '覆盖全国多个省份的新能源项目，总装机容量超过1GW'
              : 'New energy projects across multiple provinces, with total installed capacity exceeding 1GW'
            }
          </p>
        </motion.div>

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
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
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
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            lang={lang}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
