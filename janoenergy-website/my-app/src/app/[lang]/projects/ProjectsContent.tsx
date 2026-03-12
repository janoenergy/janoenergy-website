'use client';

import { useState } from 'react';
import { MapPin, Zap, Calendar, X, Wind, Sun, Battery } from 'lucide-react';
import { Lang } from '@/lib/translations';
import { projects, Project } from '@/data/projects';

// 中国地图 SVG 组件 - 使用真实中国地图轮廓
function ChinaMap({ projects, onSelectProject, lang }: { projects: Project[], onSelectProject: (project: Project) => void, lang: Lang }) {
  // 省份位置配置（基于真实中国地图的相对坐标）
  const provincePositions: Record<string, { x: number; y: number; name: string; nameEn: string }> = {
    '1': { x: 72, y: 32, name: '天津', nameEn: 'Tianjin' },      // 西龙虎峪风电
    '2': { x: 62, y: 72, name: '广东', nameEn: 'Guangdong' },    // 茂名光伏
    '3': { x: 32, y: 52, name: '四川', nameEn: 'Sichuan' },      // 甘孜储能
    '4': { x: 68, y: 28, name: '河北', nameEn: 'Hebei' },        // 张家口风电
    '5': { x: 74, y: 38, name: '山东', nameEn: 'Shandong' },     // 青岛光伏
    '6': { x: 52, y: 22, name: '内蒙古', nameEn: 'Inner Mongolia' }, // 内蒙古储能
  };

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
      case 'completed': return { bg: 'bg-green-100', text: 'text-green-700', label: lang === 'zh' ? '已完工' : 'Completed' };
      case 'in-progress': return { bg: 'bg-blue-100', text: 'text-blue-700', label: lang === 'zh' ? '建设中' : 'In Progress' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', label: lang === 'zh' ? '规划中' : 'Planned' };
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">{lang === 'zh' ? '项目分布' : 'Project Distribution'}</h3>
      
      {/* 中国地图容器 */}
      <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-slate-50 to-slate-100 rounded-xl overflow-hidden">
        {/* 中国地图 SVG - 使用真实轮廓 */}
        <svg viewBox="0 0 100 70" className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="chinaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* 中国地图轮廓 - 基于真实地理形状简化 */}
          <path
            d="M12,48 
               Q15,42 22,44 L28,40 
               Q35,35 42,38 L48,32 
               Q55,28 62,30 L68,25 
               Q75,20 82,22 L88,18 
               Q92,15 88,12 L82,8 
               Q75,5 68,8 L60,12 
               Q52,15 45,12 L38,16 
               Q30,20 25,25 L20,30 
               Q15,35 18,40 L12,48 
               Z"
            fill="url(#chinaGradient)"
            stroke="#94a3b8"
            strokeWidth="0.8"
          />
          
          {/* 主要河流示意 */}
          <path d="M25,35 Q40,40 55,38 Q70,36 85,32" stroke="#bfdbfe" strokeWidth="1" fill="none" opacity="0.6" />
          <path d="M35,25 Q45,30 50,45 Q55,55 60,60" stroke="#bfdbfe" strokeWidth="1" fill="none" opacity="0.6" />
          
          {/* 省界线示意 */}
          <path d="M35,15 L35,55" stroke="#cbd5e1" strokeWidth="0.3" strokeDasharray="3,3" opacity="0.5" />
          <path d="M55,10 L55,65" stroke="#cbd5e1" strokeWidth="0.3" strokeDasharray="3,3" opacity="0.5" />
          <path d="M75,8 L75,50" stroke="#cbd5e1" strokeWidth="0.3" strokeDasharray="3,3" opacity="0.5" />
          <path d="M15,30 L90,30" stroke="#cbd5e1" strokeWidth="0.3" strokeDasharray="3,3" opacity="0.5" />
          <path d="M20,45 L85,45" stroke="#cbd5e1" strokeWidth="0.3" strokeDasharray="3,3" opacity="0.5" />
        </svg>

        {/* 项目标记点 */}
        {projects.map((project) => {
          const pos = provincePositions[project.id];
          if (!pos) return null;
          
          const color = getCategoryColor(project.category);
          const status = getStatusBadge(project.status);
          
          return (
            <div
              key={project.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              onClick={() => onSelectProject(project)}
            >
              {/* 脉冲动画背景 */}
              <div 
                className="absolute inset-0 rounded-full animate-ping opacity-40"
                style={{ 
                  backgroundColor: color, 
                  width: '28px', 
                  height: '28px', 
                  margin: '-6px',
                  animationDuration: '2s'
                }}
              />
              
              {/* 外圈光环 */}
              <div 
                className="absolute inset-0 rounded-full opacity-30"
                style={{ 
                  backgroundColor: color, 
                  width: '20px', 
                  height: '20px', 
                  margin: '-2px'
                }}
              />
              
              {/* 主标记点 */}
              <div 
                className="relative w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all duration-300 group-hover:scale-150"
                style={{ backgroundColor: color }}
              />
              
              {/* 省份名称标签 */}
              <div className="absolute top-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap opacity-80 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-semibold text-gray-800 bg-white/90 px-2 py-0.5 rounded-full shadow-sm">
                  {lang === 'zh' ? pos.name : pos.nameEn}
                </span>
              </div>
              
              {/* 悬停卡片 - 显示项目详情 */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20 w-56">
                <div className="bg-white rounded-xl shadow-2xl p-4 border border-gray-100">
                  {/* 小图 */}
                  <div className="w-full h-24 rounded-lg overflow-hidden mb-3">
                    <img 
                      src={project.image} 
                      alt={lang === 'zh' ? project.title : project.titleEn}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span 
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                      style={{ backgroundColor: color }}
                    >
                      {getCategoryIcon(project.category)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {project.category === 'wind' ? (lang === 'zh' ? '风电' : 'Wind') :
                       project.category === 'solar' ? (lang === 'zh' ? '光伏' : 'Solar') :
                       (lang === 'zh' ? '储能' : 'Storage')}
                    </span>
                  </div>
                  
                  <h4 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2">
                    {lang === 'zh' ? project.title : project.titleEn}
                  </h4>
                  
                  <p className="text-xs text-gray-500 mb-2">{project.capacity}</p>
                  
                  <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${status.bg} ${status.text}`}>
                    {status.label}
                  </span>
                </div>
                {/* 箭头 */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
                </div>
              </div>
            </div>
          );
        })}

        {/* 图例 */}
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="text-sm font-semibold text-gray-800 mb-3">{lang === 'zh' ? '项目类型' : 'Project Type'}</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-blue-500 shadow-sm"></span>
              <span className="text-sm text-gray-600">{lang === 'zh' ? '风电' : 'Wind'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-amber-500 shadow-sm"></span>
              <span className="text-sm text-gray-600">{lang === 'zh' ? '光伏' : 'Solar'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-500 shadow-sm"></span>
              <span className="text-sm text-gray-600">{lang === 'zh' ? '储能' : 'Storage'}</span>
            </div>
          </div>
        </div>

        {/* 统计信息 */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="text-sm font-semibold text-gray-800 mb-2">{lang === 'zh' ? '项目统计' : 'Statistics'}</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <span className="text-gray-500">{lang === 'zh' ? '总项目' : 'Total'}:</span>
            <span className="font-semibold text-gray-800">{projects.length}</span>
            <span className="text-gray-500">{lang === 'zh' ? '已完工' : 'Completed'}:</span>
            <span className="font-semibold text-green-600">{projects.filter(p => p.status === 'completed').length}</span>
            <span className="text-gray-500">{lang === 'zh' ? '建设中' : 'In Progress'}:</span>
            <span className="font-semibold text-blue-600">{projects.filter(p => p.status === 'in-progress').length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 项目详情弹窗
function ProjectModal({ project, lang, onClose }: { project: Project, lang: Lang, onClose: () => void }) {
  const categoryNames = {
    zh: { wind: '风电', solar: '光伏', storage: '储能' },
    en: { wind: 'Wind', solar: 'Solar', storage: 'Storage' },
  };
  
  const statusNames = {
    zh: { completed: '已完工', 'in-progress': '建设中', planning: '规划中' },
    en: { completed: 'Completed', 'in-progress': 'In Progress', planning: 'Planned' },
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="relative">
          <img 
            src={project.image}
            alt={lang === 'zh' ? project.title : project.titleEn}
            className="w-full h-64 object-cover"
          />
          <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
              project.category === 'wind' ? 'bg-blue-500' :
              project.category === 'solar' ? 'bg-amber-500' : 'bg-emerald-500'
            }`}>
              {categoryNames[lang][project.category]}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{lang === 'zh' ? project.title : project.titleEn}</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5 text-emerald-500" />
              <span>{lang === 'zh' ? project.location : project.locationEn}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Zap className="w-5 h-5 text-emerald-500" />
              <span>{project.capacity}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5 text-emerald-500" />
              <span>{project.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                project.status === 'completed' ? 'bg-green-100 text-green-700' : 
                project.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {statusNames[lang][project.status]}
              </span>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed">{lang === 'zh' ? project.description : project.descriptionEn}</p>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsContent({ lang }: { lang: Lang }) {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const categoryNames = {
    zh: { wind: '风电', solar: '光伏', storage: '储能' },
    en: { wind: 'Wind', solar: 'Solar', storage: 'Storage' },
  };
  
  const statusNames = {
    zh: { completed: '已完工', 'in-progress': '建设中', planning: '规划中' },
    en: { completed: 'Completed', 'in-progress': 'In Progress', planning: 'Planned' },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {lang === 'zh' ? '项目案例' : 'Projects'}
          </h1>
          <p className="text-xl text-emerald-100">
            {lang === 'zh' ? '风电、光伏、储能全领域覆盖' : 'Full coverage of wind, solar, and energy storage'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 项目分布地图 - 真实中国地图 */}
        <ChinaMap projects={projects} onSelectProject={setSelectedProject} lang={lang} />

        {/* Filter */}
        <div className="flex flex-wrap gap-3 mb-10">
          {[
            { key: 'all', label: lang === 'zh' ? '全部' : 'All' },
            { key: 'wind', label: categoryNames[lang].wind },
            { key: 'solar', label: categoryNames[lang].solar },
            { key: 'storage', label: categoryNames[lang].storage },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === item.key 
                  ? 'bg-emerald-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border hover:shadow-md'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <div 
              key={project.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-gray-100 cursor-pointer group"
              style={{ animationDelay: `${idx * 100}ms` }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image}
                  alt={lang === 'zh' ? project.title : project.titleEn}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    project.category === 'wind' ? 'bg-blue-100 text-blue-700' :
                    project.category === 'solar' ? 'bg-amber-100 text-amber-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>
                    {categoryNames[lang][project.category]}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    project.status === 'completed' ? 'bg-green-100 text-green-700' : 
                    project.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {statusNames[lang][project.status]}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">{lang === 'zh' ? project.title : project.titleEn}</h3>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{lang === 'zh' ? project.location : project.locationEn}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-gray-400" />
                    <span>{project.capacity}</span>
                  </div>
                  {project.date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{project.date}</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">{lang === 'zh' ? project.description : project.descriptionEn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 项目详情弹窗 */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          lang={lang} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
}
