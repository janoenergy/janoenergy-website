'use client';

import { useState, useEffect } from 'react';
import { useThemeStyles } from '@/lib/theme';
import { Lang } from '@/lib/translations';
import { logError } from '@/lib/logger';
import { HeroSection } from './components/home/HeroSection';
import { BusinessSection } from './components/home/BusinessSection';
import { CTASection } from './components/home/CTASection';
import { 
  Stats, 
  RealTimeData, 
  ApiProject, 
  defaultStats, 
  parseCapacity, 
  extractProvince 
} from './components/home/types';

// 备用项目数据（当 API 失败时使用）
const fallbackProjects: ApiProject[] = [
  {
    id: 1,
    title: '内蒙古乌兰察布80MW风电项目',
    titleEn: 'Ulanqab 80MW Wind Power Project',
    category: 'wind',
    status: 'operation',
    capacity: '80MW',
    location: '内蒙古自治区乌兰察布市',
    locationEn: 'Ulanqab City, Inner Mongolia',
    description: '项目总投资约5.2亿元，安装32台2.5MW风力发电机组',
    descriptionEn: 'Total investment of about 520 million yuan, 32 sets of 2.5MW wind turbines',
    imageUrl: '/images/projects/wind-farm.jpg',
    startDate: '2021-09-01',
    endDate: '2022-06-30',
    createdAt: '2026-03-11T09:33:56.716Z',
    updatedAt: '2026-03-11T09:33:56.716Z',
  },
  {
    id: 2,
    title: '广东清远100MW光伏项目',
    titleEn: 'Qingyuan 100MW Solar Project',
    category: 'solar',
    status: 'operation',
    capacity: '100MW',
    location: '广东省清远市',
    locationEn: 'Qingyuan City, Guangdong',
    description: '项目总投资约3.8亿元，占地约2000亩',
    descriptionEn: 'Total investment of about 380 million yuan, covering about 2000 acres',
    imageUrl: '/images/projects/solar-farm.jpg',
    startDate: '2023-06-01',
    endDate: '2024-06-01',
    createdAt: '2026-03-11T09:34:01.226Z',
    updatedAt: '2026-03-11T09:34:01.226Z',
  },
  {
    id: 3,
    title: '江苏盐城100MWh储能电站',
    titleEn: 'Yancheng 100MWh Energy Storage Project',
    category: 'storage',
    status: 'construction',
    capacity: '100MWh',
    location: '江苏省盐城市',
    locationEn: 'Yancheng City, Jiangsu',
    description: '项目总投资约4.0亿元，建设100MWh电化学储能电站',
    descriptionEn: 'Total investment of about 400 million yuan, 100MWh electrochemical energy storage',
    imageUrl: '/images/projects/storage-battery.jpg',
    startDate: '2024-06-01',
    endDate: null,
    createdAt: '2026-03-12T14:09:48.319Z',
    updatedAt: '2026-03-12T14:09:48.319Z',
  },
];

export default function HomeContent({ lang }: { lang: Lang }) {
  const styles = useThemeStyles();
  const [stats, setStats] = useState<Stats>(defaultStats);
  const [realTimeData, setRealTimeData] = useState<RealTimeData>({
    todayGeneration: 1248,
    totalReduction: 908,
    activeProjects: 12,
    onlineRate: '99.9%',
    co2Saved: 908,
    homesPowered: 1702500,
  });

  // 获取项目数据
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.janoenergy.com/api/projects', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: ApiProject[] = await response.json();
        
        const capacity = data.reduce((sum, p) => sum + parseCapacity(p.capacity), 0);
        const provinces = new Set(data.map(p => extractProvince(p.location)).filter(Boolean));

        setStats({
          capacity,
          projects: data.length,
          provinces: provinces.size || defaultStats.provinces,
          year: defaultStats.year,
        });

        setRealTimeData(prev => ({
          ...prev,
          activeProjects: data.filter(p => p.status === 'operation').length,
        }));
      } catch (err) {
        logError('Failed to fetch projects:', err);
        // 使用备用数据
        setStats({
          capacity: fallbackProjects.reduce((sum, p) => sum + parseCapacity(p.capacity), 0),
          projects: fallbackProjects.length,
          provinces: new Set(fallbackProjects.map(p => extractProvince(p.location))).size,
          year: defaultStats.year,
        });
      }
    };

    fetchProjects();
  }, []);

  // 实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        todayGeneration: prev.todayGeneration + Math.floor(Math.random() * 5),
        totalReduction: prev.totalReduction + 0.01,
        co2Saved: prev.co2Saved + Math.floor(Math.random() * 2),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen ${styles.bg} transition-colors duration-300`}>
      <HeroSection lang={lang} stats={stats} realTimeData={realTimeData} />
      <BusinessSection lang={lang} />
      <CTASection lang={lang} />
    </div>
  );
}
