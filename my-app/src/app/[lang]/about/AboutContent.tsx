'use client';

import { useState, useEffect, useRef } from 'react';
import { translations } from '@/lib/translations';
import { API_BASE_URL } from '@/lib/config';
import { realImages, milestonesData, valuesData, teamData, certificatesData, honorsData } from '@/lib/real-data';

// API 端点
const API_ENDPOINTS = {
  companyInfo: `${API_BASE_URL}/api/company/info`,
  milestones: `${API_BASE_URL}/api/company/milestones`,
  values: `${API_BASE_URL}/api/company/values`,
  teamMembers: `${API_BASE_URL}/api/team/members`,
  certificates: `${API_BASE_URL}/api/certificates`,
  honors: `${API_BASE_URL}/api/honors`,
  projects: `${API_BASE_URL}/api/projects`,
};

// 数据类型定义
interface CompanyInfo {
  id: number;
  intro: string;
  introEn: string;
}

interface Milestone {
  id: number;
  year: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  sortOrder: number;
}

interface CompanyValue {
  id: number;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  sortOrder: number;
}

interface TeamMember {
  id: number;
  name: string;
  nameEn: string;
  title: string;
  titleEn: string;
  imageUrl: string;
  education: string;
  educationEn: string;
  experience: string;
  experienceEn: string;
  description: string;
  descriptionEn: string;
  sortOrder: number;
  isActive: boolean;
}

interface Certificate {
  id: number;
  title: string;
  titleEn: string;
  issuer: string;
  issuerEn: string;
  issueDate: string;
  imageUrl: string;
  sortOrder: number;
  isActive: boolean;
}

interface Project {
  id: number;
  capacity: string;
  location: string;
}

// 默认静态数据（立即显示）
const defaultMilestones: Milestone[] = milestonesData.map((m, i) => ({ 
  ...m, 
  id: i + 1, 
  sortOrder: i 
}));

const defaultValues: CompanyValue[] = valuesData.map((v, i) => ({ 
  ...v, 
  id: i + 1, 
  sortOrder: i 
}));

const defaultTeamMembers: TeamMember[] = teamData.map((t, i) => ({ 
  ...t, 
  id: i + 1, 
  sortOrder: i, 
  isActive: true, 
  description: '', 
  descriptionEn: '' 
}));

const defaultCertificates: Certificate[] = certificatesData.map((c, i) => ({ 
  ...c, 
  id: i + 1, 
  sortOrder: i, 
  isActive: true 
}));

// 数字动画组件
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setDisplayValue(value);
              clearInterval(timer);
            } else {
              setDisplayValue(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return <span ref={ref} className="tabular-nums">{displayValue}{suffix}</span>;
}

export default function AboutContent({ lang }: { lang: "zh" | "en" }) {
  const t = translations[lang].about;
  
  // 数据状态 - 使用静态数据作为初始值
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>(defaultMilestones);
  const [values, setValues] = useState<CompanyValue[]>(defaultValues);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(defaultTeamMembers);
  const [certificates, setCertificates] = useState<Certificate[]>(defaultCertificates);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false); // 初始为 false，因为有静态数据
  const [error, setError] = useState<string | null>(null);

  // 统计数据
  const [stats, setStats] = useState({
    capacity: 1135,
    projects: 12,
    provinces: 12,
    year: 2018,
  });

  // 从容量字符串提取 MW 数值
  const parseCapacity = (capacityStr: string): number => {
    if (!capacityStr) return 0;
    const mwMatch = capacityStr.match(/(\d+)\s*MW/i);
    if (mwMatch) return parseInt(mwMatch[1], 10);
    const numMatch = capacityStr.match(/(\d+)/);
    return numMatch ? parseInt(numMatch[1], 10) : 0;
  };

  // 从地址提取省份
  const extractProvince = (location: string): string => {
    if (!location) return '';
    const match = location.match(/^([^省市]+)[省市]/);
    return match ? match[1] : location.split('省')[0].split('市')[0];
  };

  // 获取所有数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 设置 5 秒超时
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 5000)
        );
        
        // 并行获取所有数据
        const fetchPromise = Promise.all([
          fetch(API_ENDPOINTS.companyInfo),
          fetch(API_ENDPOINTS.milestones),
          fetch(API_ENDPOINTS.values),
          fetch(API_ENDPOINTS.teamMembers),
          fetch(API_ENDPOINTS.certificates),
          fetch(API_ENDPOINTS.projects),
        ]);
        
        const [
          companyRes,
          milestonesRes,
          valuesRes,
          teamRes,
          certificatesRes,
          projectsRes,
        ] = await Promise.race([fetchPromise, timeoutPromise]) as any;

        // 处理公司简介
        if (companyRes.ok) {
          const info = await companyRes.json();
          setCompanyInfo(info);
        }

        // 处理发展历程 - 使用真实数据作为后备
        if (milestonesRes.ok) {
          const data = await milestonesRes.json();
          if (data.length > 0) setMilestones(data);
        }

        // 处理价值观 - 使用真实数据作为后备
        if (valuesRes.ok) {
          const data = await valuesRes.json();
          if (data.length > 0) setValues(data);
        }

        // 处理团队成员 - 使用真实数据作为后备
        if (teamRes.ok) {
          const data = await teamRes.json();
          if (data.length > 0) setTeamMembers(data);
        }

        // 处理证书 - 使用真实数据作为后备
        if (certificatesRes.ok) {
          const data = await certificatesRes.json();
          if (data.length > 0) setCertificates(data);
        }

        // 处理项目（用于计算统计数据）
        if (projectsRes.ok) {
          const data = await projectsRes.json();
          setProjects(data);
          
          // 计算统计数据
          const capacity = data.reduce((sum: number, p: Project) => sum + parseCapacity(p.capacity), 0);
          const provinces = new Set(data.map((p: Project) => extractProvince(p.location)).filter(Boolean));
          
          setStats({
            capacity,
            projects: data.length,
            provinces: provinces.size || 12,
            year: 2018,
          });
        }
      } catch (err) {
        console.error('Failed to fetch about data:', err);
        // 错误时保持静态数据，不显示错误
        // 静态数据已经在初始状态中设置
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-950 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-2xl">
            {lang === 'zh' ? '专注于新能源开发、投资、建设、运营的全产业链服务商' : 'Full-chain service provider in new energy development, investment, construction, and operation'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-24">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 md:mb-6">{t.intro.title}</h2>
            
            {/* 优先使用 API 返回的公司简介 */}
            {companyInfo ? (
              <>
                <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
                  {lang === 'zh' ? companyInfo.intro : companyInfo.introEn}
                </p>
              </>
            ) : (
              <>
                <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">{t.intro.p1}</p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{t.intro.p2}</p>
              </>
            )}
            
            {/* 核心数据 - 动态计算 */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 mt-8">
              <div className="text-center p-3 md:p-4 bg-card rounded-xl shadow-sm">
                <div className="text-2xl md:text-3xl font-bold text-emerald-600">
                  <AnimatedNumber value={stats.capacity} suffix="+" />
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">MW{lang === 'zh' ? '装机' : ' Capacity'}</div>
              </div>
              <div className="text-center p-3 md:p-4 bg-card rounded-xl shadow-sm">
                <div className="text-2xl md:text-3xl font-bold text-emerald-600">
                  <AnimatedNumber value={stats.projects} />
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{lang === 'zh' ? '个项目' : 'Projects'}</div>
              </div>
              <div className="text-center p-3 md:p-4 bg-card rounded-xl shadow-sm">
                <div className="text-2xl md:text-3xl font-bold text-emerald-600">
                  <AnimatedNumber value={stats.provinces} />
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{lang === 'zh' ? '个省份' : 'Provinces'}</div>
              </div>
            </div>
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <img src={realImages.company.office} alt="JanoEnergy Office" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* 资质证书 */}
        {certificates.length > 0 && (
          <div className="mb-16 md:mb-24">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 md:mb-8 text-center">
              {lang === 'zh' ? '资质证书' : 'Certificates'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {certificates.map((cert) => (
                <div key={cert.id} className="bg-card rounded-xl overflow-hidden shadow-sm">
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    {cert.imageUrl ? (
                      <img src={cert.imageUrl} alt={lang === 'zh' ? cert.title : cert.titleEn} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/20">
                        <span className="text-3xl font-bold text-emerald-600">
                          {lang === 'zh' ? cert.title.substring(0, 2) : cert.titleEn?.substring(0, 2)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-3 md:p-4 text-center">
                    <h3 className="font-bold text-foreground text-sm md:text-base mb-1">
                      {lang === 'zh' ? cert.title : cert.titleEn}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {lang === 'zh' ? cert.issuer : cert.issuerEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 管理团队 */}
        {teamMembers.length > 0 && (
          <div className="mb-16 md:mb-24">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 md:mb-8 text-center">
              {lang === 'zh' ? '管理团队' : 'Leadership Team'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-card rounded-xl overflow-hidden shadow-sm">
                  <div className="aspect-square overflow-hidden bg-muted">
                    {member.imageUrl ? (
                      <img src={member.imageUrl} alt={lang === 'zh' ? member.name : member.nameEn} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/20">
                        <span className="text-4xl font-bold text-emerald-600">
                          {(lang === 'zh' ? member.name : member.nameEn)?.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-3 md:p-4 text-center">
                    <h3 className="font-bold text-foreground text-sm md:text-base mb-1">
                      {lang === 'zh' ? member.name : member.nameEn}
                    </h3>
                    <p className="text-xs md:text-sm text-emerald-600">
                      {lang === 'zh' ? member.title : member.titleEn}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {lang === 'zh' ? member.education : member.educationEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline - 发展历程 */}
        {milestones.length > 0 && (
          <div className="mb-16 md:mb-24">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 md:mb-12 text-center">
              {lang === 'zh' ? '发展历程' : 'Our History'}
            </h2>
            <div className="relative max-w-4xl mx-auto">
              {/* 中线 */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 md:w-1 bg-emerald-200 dark:bg-emerald-800 transform -translate-x-1/2" />
              
              <div className="space-y-8 md:space-y-12">
                {milestones.map((item, idx) => {
                  const isLeft = idx % 2 === 0;
                  return (
                    <div key={item.id} className={`flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                      <div className={`w-5/12 ${isLeft ? 'text-right pr-4 md:pr-8' : 'text-left pl-4 md:pl-8'}`}>
                        <div className="bg-card rounded-xl p-4 md:p-6 shadow-sm">
                          <h3 className="text-2xl md:text-3xl font-bold text-emerald-600 mb-2">{item.year}</h3>
                          <h4 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                            {lang === 'zh' ? item.title : item.titleEn}
                          </h4>
                          <p className="text-sm md:text-base text-muted-foreground">
                            {lang === 'zh' ? item.description : item.descriptionEn}
                          </p>
                        </div>
                      </div>
                      <div className="w-2/12 flex justify-center">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full border-4 border-background shadow-lg z-10" />
                      </div>
                      <div className="w-5/12" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Values - 核心价值观 */}
        {values.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 md:mb-12 text-center">
              {lang === 'zh' ? '核心价值观' : 'Core Values'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {values.map((value) => (
                <div key={value.id} className="bg-card rounded-xl p-6 md:p-8 text-center shadow-sm h-full">
                  <h3 className="text-lg md:text-xl font-bold text-emerald-600 mb-3 md:mb-4">
                    {lang === 'zh' ? value.title : value.titleEn}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {lang === 'zh' ? value.description : value.descriptionEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
