'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Wind, Sun, Battery, Zap, MapPin, Leaf,
  TrendingUp, TrendingDown, Activity, Power,
  ArrowRight
} from 'lucide-react';
import { translations, Lang } from '@/lib/translations';
import AnimatedCounter from '@/components/AnimatedCounter';
import { useThemeStyles } from '@/lib/theme';

// 项目图片配置
const projectImages: Record<number, string> = {
  1: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop', // 甘肃酒泉储能
  2: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop', // 浙江宁波光储
  3: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800&auto=format&fit=crop', // 云南大理光伏
  4: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&auto=format&fit=crop', // 山西大同风电
  5: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format&fit=crop', // 内蒙古乌兰察布风电
  6: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800&auto=format&fit=crop', // 山东德州光伏
  7: 'https://images.unsplash.com/photo-1565514020176-dbf2277e4955?w=800&auto=format&fit=crop', // 江苏盐城储能
  8: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop', // 河北张家口光伏
  9: 'https://images.unsplash.com/photo-1548337138-e87d889cc369?w=800&auto=format&fit=crop', // 湖南郴州风电
  10: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800&auto=format&fit=crop', // 广东清远光伏
  11: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&auto=format&fit=crop', // 四川凉山风电
  12: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop', // 西龙虎峪风电
};

interface ApiProject {
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

// 统计数据类型
interface Stats {
  capacity: number;
  projects: number;
  provinces: number;
  year: number;
}

// 实时数据类型
interface RealTimeData {
  todayGeneration: number;
  totalReduction: number;
  activeProjects: number;
  onlineRate: string;
  co2Saved: number;
  homesPowered: number;
}

// 默认统计数据 - 使用真实数据作为默认值，避免SSR显示0
const defaultStats: Stats = {
  capacity: 1135,
  projects: 12,
  provinces: 12,
  year: 2018,
};

// 从容量字符串提取 MW 数值
function parseCapacity(capacityStr: string): number {
  if (!capacityStr) return 0;
  const mwMatch = capacityStr.match(/(\d+)\s*MW/i);
  if (mwMatch) return parseInt(mwMatch[1], 10);
  const numMatch = capacityStr.match(/(\d+)/);
  return numMatch ? parseInt(numMatch[1], 10) : 0;
}

// 从地址提取省份
function extractProvince(location: string): string {
  if (!location) return '';
  const match = location.match(/^([^省市]+)[省市]/);
  return match ? match[1] : location.split('省')[0].split('市')[0];
}

// 项目类型配置
const projectTypes = [
  { 
    id: 'wind', 
    name: '风电项目', 
    nameEn: 'Wind Power',
    icon: Wind,
    color: 'from-blue-500 to-cyan-400',
    lightColor: 'from-blue-600 to-cyan-500',
    desc: '陆上风电开发、建设、运营',
    descEn: 'Onshore wind development, construction, and operation'
  },
  { 
    id: 'solar', 
    name: '光伏项目', 
    nameEn: 'Solar Power',
    icon: Sun,
    color: 'from-amber-500 to-orange-400',
    lightColor: 'from-amber-600 to-orange-500',
    desc: '地面电站、分布式光伏',
    descEn: 'Ground-mounted and distributed solar power'
  },
  { 
    id: 'storage', 
    name: '储能项目', 
    nameEn: 'Energy Storage',
    icon: Battery,
    color: 'from-emerald-500 to-teal-400',
    lightColor: 'from-emerald-600 to-teal-500',
    desc: '电化学储能、光储一体化',
    descEn: 'Battery storage and solar-storage integration'
  },
];

export default function HomeContent({ lang }: { lang: Lang }) {
  const t = translations[lang];
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
        // 使用默认数据，不显示错误
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
      {/* Hero Section */}
      <section className={`relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br ${styles.bgGradient}`}>
        {/* 动态网格背景 */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${styles.grid} 1px, transparent 1px), linear-gradient(90deg, ${styles.grid} 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
        />
        
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 左侧内容 */}
            <div>
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm mb-6 ${styles.bgCard} ${styles.border}`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className={styles.textSecondary}>{lang === 'zh' ? '清洁能源，绿色未来' : 'Clean Energy, Green Future'}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight ${styles.text}`}
              >
                {lang === 'zh' ? (
                  <>
                    统一 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">新能源</span>
                    <br />
                    开发与运营平台
                  </>
                ) : (
                  <>
                    Unified <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Clean Energy</span>
                    <br />
                    Development Platform
                  </>
                )}
              </motion.h1>

              <motion.p
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`text-xl mb-8 max-w-xl ${styles.textMuted}`}
              >
                {lang === 'zh' 
                  ? '专注于风电、光伏、储能等新能源开发、投资、建设、运营的全产业链服务商'
                  : 'Full-chain service provider for wind, solar, and energy storage development, investment, construction, and operation'}
              </motion.p>

              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href={`/${lang}/projects`}
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  {lang === 'zh' ? '查看项目' : 'View Projects'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href={`/${lang}/contact`}
                  className={`inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${styles.btnSecondary} ${styles.text}`}
                >
                  {lang === 'zh' ? '联系我们' : 'Contact Us'}
                </a>
              </motion.div>

              {/* 核心数据 */}
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`mt-12 pt-8 border-t ${styles.border}`}
              >
                <div className="grid grid-cols-4 gap-8">
                  {[
                    { value: stats.capacity, suffix: '+', label: lang === 'zh' ? 'MW装机' : 'MW Capacity' },
                    { value: stats.projects, suffix: '+', label: lang === 'zh' ? '个项目' : 'Projects' },
                    { value: stats.provinces, suffix: '', label: lang === 'zh' ? '个省份' : 'Provinces' },
                    { value: stats.year, suffix: '', label: lang === 'zh' ? '年成立' : 'Founded' },
                  ].map((stat, index) => (
                    <div key={index}>
                      <div className={`text-2xl md:text-3xl font-bold ${styles.text}`}>
                        <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className={`text-sm mt-1 ${styles.textMuted}`}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* 右侧实时数据 */}
            <motion.div
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              <StatCard icon={Zap} value={realTimeData.todayGeneration} label={lang === 'zh' ? '今日发电 (MWh)' : 'Today Generation'} trend="up" trendValue="+12.5%" delay={0.4} />
              <StatCard icon={Leaf} value={realTimeData.co2Saved} label={lang === 'zh' ? '累计减排 (吨)' : 'CO₂ Reduced'} trend="up" trendValue="+8.3%" delay={0.5} />
              <StatCard icon={Power} value={realTimeData.homesPowered} label={lang === 'zh' ? '供电家庭' : 'Homes Powered'} trend="neutral" trendValue={lang === 'zh' ? '稳定' : 'Stable'} delay={0.6} />
              <StatCard icon={Activity} value={realTimeData.onlineRate} label={lang === 'zh' ? '平台可用性' : 'Uptime'} trend="up" trendValue="99.9%" delay={0.7} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 项目类型 */}
      <section className={`py-24 relative ${styles.bg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm mb-4 ${styles.bgCard} ${styles.border}`}
            >
              <span>01</span>
              <span className={`w-8 h-px ${styles.border.replace('border-', 'bg-')}`} />
              <span className={styles.textMuted}>{lang === 'zh' ? '业务板块' : 'Business'}</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-4xl md:text-5xl font-bold mb-4 ${styles.text}`}
            >
              {lang === 'zh' ? '覆盖多种新能源形态' : 'Multiple Clean Energy Solutions'}
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {projectTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${styles.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className={`relative h-full ${styles.bgCard} backdrop-blur-xl border ${styles.border} ${styles.borderHover} rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${type.color} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className={`text-2xl font-bold mb-3 ${styles.text}`}>
                      {lang === 'zh' ? type.name : type.nameEn}
                    </h3>
                    <p className={`mb-6 ${styles.textMuted}`}>
                      {lang === 'zh' ? type.desc : type.descEn}
                    </p>
                    <a href={`/${lang}/projects?type=${type.id}`} className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-400">
                      {lang === 'zh' ? '了解更多' : 'Learn More'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 项目展示 */}
      <section className={`py-24 relative ${styles.bg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm mb-4 ${styles.bgCard} ${styles.border}`}
              >
                <span>02</span>
                <span className={`w-8 h-px ${styles.border.replace('border-', 'bg-')}`} />
                <span className={styles.textMuted}>{lang === 'zh' ? '项目案例' : 'Projects'}</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`text-4xl md:text-5xl font-bold ${styles.text}`}
              >
                {lang === 'zh' ? '精选项目展示' : 'Featured Projects'}
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex gap-2 mt-6 md:mt-0"
            >
              {[
                { id: 'all', name: lang === 'zh' ? '全部' : 'All' },
                { id: 'wind', name: lang === 'zh' ? '风电' : 'Wind' },
                { id: 'solar', name: lang === 'zh' ? '光伏' : 'Solar' },
                { id: 'storage', name: lang === 'zh' ? '储能' : 'Storage' },
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveType(type.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    activeType === type.id
                      ? 'bg-emerald-500 text-white'
                      : `${styles.bgCard} ${styles.textSecondary} ${styles.border} hover:border-emerald-400`
                  }`}
                >
                  {type.name}
                </button>
              ))}
            </motion.div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} lang={lang} />
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href={`/${lang}/projects`}
              className={`inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${styles.btnSecondary} ${styles.text}`}
            >
              {lang === 'zh' ? '查看全部项目' : 'View All Projects'}
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-24 relative overflow-hidden bg-gradient-to-br ${styles.bgGradient}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-4xl md:text-5xl font-bold mb-6 ${styles.text}`}
          >
            {lang === 'zh' ? '携手共创绿色未来' : 'Partner for a Green Future'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-xl mb-8 ${styles.textMuted}`}
          >
            {lang === 'zh' 
              ? '无论是项目开发、投资合作还是EPC总承包，我们期待与您合作'
              : 'Whether project development, investment cooperation, or EPC contracting, we look forward to working with you'}
          </motion.p>
          <motion.a
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            href={`/${lang}/contact`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            {lang === 'zh' ? '联系我们' : 'Contact Us'}
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>
      </section>
    </div>
  );
}

// 实时数据卡片
function StatCard({ icon: Icon, value, label, trend, trendValue, delay = 0 }: any) {
  const styles = useThemeStyles();
  
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative group"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${styles.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
      <div className={`relative ${styles.bgCard} backdrop-blur-xl border ${styles.border} ${styles.borderHover} rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
            <Icon className="w-6 h-6 text-emerald-500" />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${
              trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-rose-500' : styles.textMuted
            }`}>
              {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : trend === 'down' ? <TrendingDown className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        <div className={`text-3xl md:text-4xl font-bold mb-1 ${styles.text}`}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        <div className={`text-sm ${styles.textMuted}`}>{label}</div>
      </div>
    </motion.div>
  );
}

// 项目卡片 - 带图片
function ProjectCard({ project, index, lang }: { project: ApiProject; index: number; lang: Lang }) {
  const styles = useThemeStyles();
  const typeConfig = projectTypes.find(t => t.id === project.category) || projectTypes[0];
  const Icon = typeConfig.icon;
  const imageUrl = projectImages[project.id] || project.imageUrl || '';
  
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${styles.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
      <div className={`relative ${styles.bgCard} backdrop-blur-xl border ${styles.border} ${styles.borderHover} rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
        {/* 项目图片 */}
        {imageUrl && (
          <div className="relative aspect-video overflow-hidden">
            <img 
              src={imageUrl}
              alt={lang === 'zh' ? project.title : project.titleEn}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute top-4 left-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                project.status === 'operation' ? 'bg-emerald-500' :
                project.status === 'construction' ? 'bg-amber-500' :
                'bg-blue-500'
              }`}>
                {project.status === 'operation' ? (lang === 'zh' ? '运营中' : 'Operating') :
                 project.status === 'construction' ? (lang === 'zh' ? '建设中' : 'Construction') :
                 (lang === 'zh' ? '规划中' : 'Planning')}
              </span>
            </div>
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Icon className="w-4 h-4 text-emerald-500" />
            </div>
            <span className={`text-sm ${styles.textMuted}`}>{lang === 'zh' ? typeConfig.name : typeConfig.nameEn}</span>
          </div>
          <h3 className={`text-xl font-bold mb-2 line-clamp-2 ${styles.text}`}>
            {lang === 'zh' ? project.title : project.titleEn}
          </h3>
          <div className={`flex items-center gap-2 text-sm mb-4 ${styles.textMuted}`}>
            <MapPin className="w-4 h-4" />
            <span>{lang === 'zh' ? project.location : project.locationEn}</span>
          </div>
          <div className={`flex items-center justify-between pt-4 border-t ${styles.border}`}>
            <div>
              <div className="text-2xl font-bold text-emerald-500">{project.capacity}</div>
              <div className={`text-xs ${styles.textMuted}`}>{lang === 'zh' ? '装机容量' : 'Capacity'}</div>
            </div>
            <ArrowRight className={`w-5 h-5 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${styles.textMuted}`} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
