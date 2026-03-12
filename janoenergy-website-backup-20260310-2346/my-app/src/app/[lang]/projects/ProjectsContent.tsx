'use client';

import { useState } from 'react';
import { MapPin, Zap, Calendar } from 'lucide-react';
import { translations, Lang } from '@/lib/translations';

const images = {
  wind: '/images/projects/wind.jpg',
  solar: '/images/projects/solar.jpg',
  storage: '/images/projects/storage.jpg',
};

const sampleProjects = [
  { id: '1', title: '西龙虎峪60MW风电项目', titleEn: 'Xilonghu Valley 60MW Wind Project', category: 'wind', categoryName: '风电', categoryNameEn: 'Wind', location: '天津市蓟州区', locationEn: 'Jizhou District, Tianjin', capacity: '60MW', status: 'completed', statusName: '已完工', statusNameEn: 'Completed', description: '安装24台2.5MW风力发电机组，年发电量约1.4亿千瓦时', descriptionEn: '24 units of 2.5MW wind turbines, annual generation of about 140 million kWh', completionDate: '2024-06' },
  { id: '2', title: '广东茂名50MW光伏项目', titleEn: 'Guangdong Maoming 50MW Solar Project', category: 'solar', categoryName: '光伏', categoryNameEn: 'Solar', location: '广东省茂名市', locationEn: 'Maoming City, Guangdong', capacity: '50MW', status: 'completed', statusName: '已完工', statusNameEn: 'Completed', description: '渔光互补光伏发电项目，年发电量约5500万千瓦时', descriptionEn: 'Fishery-solar hybrid project, annual generation of about 55 million kWh', completionDate: '2023-12' },
  { id: '3', title: '四川甘孜100MW光伏储能项目', titleEn: 'Sichuan Ganzi 100MW Solar+Storage Project', category: 'storage', categoryName: '储能', categoryNameEn: 'Storage', location: '四川省甘孜州', locationEn: 'Ganzi Prefecture, Sichuan', capacity: '100MW+20MW/40MWh', status: 'in-progress', statusName: '建设中', statusNameEn: 'In Progress', description: '光伏+储能一体化项目，配置磷酸铁锂电池储能系统', descriptionEn: 'Solar+storage integrated project with lithium iron phosphate battery system', completionDate: '2025-12' },
];

export default function ProjectsContent({ lang }: { lang: Lang }) {
  const t = translations[lang].projects;
  const [filter, setFilter] = useState('all');

  const filteredProjects = filter === 'all' 
    ? sampleProjects 
    : sampleProjects.filter(p => p.category === filter);

  const getProjectImage = (category: string) => {
    return images[category as keyof typeof images] || images.wind;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl text-emerald-100">{t.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter */}
        <div className="flex flex-wrap gap-3 mb-10">
          {[
            { key: 'all', label: t.filter.all },
            { key: 'wind', label: t.filter.wind },
            { key: 'solar', label: t.filter.solar },
            { key: 'storage', label: t.filter.storage },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === item.key 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden border border-gray-100">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={getProjectImage(project.category)} 
                  alt={lang === 'zh' ? project.title : project.titleEn}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    project.category === 'wind' ? 'bg-blue-100 text-blue-700' :
                    project.category === 'solar' ? 'bg-amber-100 text-amber-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>
                    {lang === 'zh' ? project.categoryName : project.categoryNameEn}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    project.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {lang === 'zh' ? project.statusName : project.statusNameEn}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{lang === 'zh' ? project.title : project.titleEn}</h3>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{lang === 'zh' ? project.location : project.locationEn}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-gray-400" />
                    <span>{project.capacity}</span>
                  </div>
                  {project.completionDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{project.completionDate}</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">{lang === 'zh' ? project.description : project.descriptionEn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
