'use client';

import { useState, useEffect } from 'react';
import { useThemeStyles } from '@/lib/theme';
import { translations, Lang } from '@/lib/translations';
import { HeroSection } from './components/home/HeroSection';
import { BusinessSection } from './components/home/BusinessSection';
import { ProjectsSection } from './components/home/ProjectsSection';
import { CTASection } from './components/home/CTASection';
import { 
  Stats, 
  RealTimeData, 
  ApiProject, 
  defaultStats, 
  parseCapacity, 
  extractProvince 
} from './components/home/types';

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
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState('all');

  // 获取项目数据
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.janoenergy.com/api/projects');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data: ApiProject[] = await response.json();
        setProjects(data);

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
        console.error('Failed to fetch projects:', err);
      } finally {
        setLoading(false);
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

  const filteredProjects = activeType === 'all'
    ? projects.slice(0, 6)
    : projects.filter(p => p.category === activeType).slice(0, 6);

  return (
    <div className={`min-h-screen ${styles.bg} transition-colors duration-300`}>
      <HeroSection lang={lang} stats={stats} realTimeData={realTimeData} />
      <BusinessSection lang={lang} />
      <ProjectsSection 
        lang={lang} 
        projects={filteredProjects} 
        loading={loading}
        activeType={activeType}
        onTypeChange={setActiveType}
      />
      <CTASection lang={lang} />
    </div>
  );
}
