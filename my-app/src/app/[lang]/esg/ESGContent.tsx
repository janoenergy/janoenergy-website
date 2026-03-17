'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, TrendingDown, Sun, Wind, Droplets, FileText, Download, Target, Globe, Users, TreePine } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { translations, Lang } from '@/lib/translations';

// 省份数据
const provinces = [
  { name: '天津', nameEn: 'Tianjin', x: 75, y: 35, projects: 1 },
  { name: '河北', nameEn: 'Hebei', x: 68, y: 28, projects: 2 },
  { name: '山西', nameEn: 'Shanxi', x: 58, y: 32, projects: 1 },
  { name: '内蒙古', nameEn: 'Inner Mongolia', x: 65, y: 22, projects: 1 },
  { name: '山东', nameEn: 'Shandong', x: 70, y: 40, projects: 1 },
  { name: '江苏', nameEn: 'Jiangsu', x: 78, y: 48, projects: 1 },
  { name: '浙江', nameEn: 'Zhejiang', x: 80, y: 55, projects: 1 },
  { name: '湖南', nameEn: 'Hunan', x: 62, y: 65, projects: 1 },
  { name: '云南', nameEn: 'Yunnan', x: 45, y: 72, projects: 1 },
  { name: '甘肃', nameEn: 'Gansu', x: 35, y: 38, projects: 1 },
  { name: '四川', nameEn: 'Sichuan', x: 42, y: 58, projects: 1 },
  { name: '广东', nameEn: 'Guangdong', x: 65, y: 78, projects: 1 },
];

// ESG 数据
const esgData = {
  carbonTarget: {
    peak: { year: 2030, progress: 65 },
    neutral: { year: 2060, progress: 25 }
  },
  environment: {
    totalReduction: 500, // 万吨
    coalSaved: 320, // 万吨
    co2Reduced: 480, // 万吨
    treesEquivalent: 2600 // 万棵
  },
  social: {
    jobsCreated: 1200,
    ruralInvestment: 8500, // 万元
    communityEvents: 45,
    scholarships: 120 // 万元
  },
  governance: {
    esgCommittee: true,
    transparency: 'A级',
    compliance: '100%'
  }
};

// 进度条组件
function ProgressBar({ label, target, progress, color = 'emerald' }: { 
  label: string; 
  target: string; 
  progress: number;
  color?: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{label}</h3>
          <p className="text-sm text-gray-500">目标: {target}</p>
        </div>
        <div className={`text-3xl font-bold text-${color}-600`}>{progress}%</div>
      </div>
      <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`h-full bg-${color}-500 rounded-full`}
        />
      </div>
    </div>
  );
}

// 数据卡片组件
function DataCard({ 
  icon: Icon, 
  value, 
  unit, 
  label, 
  color = 'emerald',
  delay = 0 
}: { 
  icon: React.ElementType;
  value: number | string;
  unit?: string;
  label: string;
  color?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
    >
      <div className={`w-14 h-14 rounded-xl bg-${color}-100 flex items-center justify-center mb-4`}>
        <Icon className={`w-7 h-7 text-${color}-600`} />
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">
        {typeof value === 'number' ? value.toLocaleString() : value}
        {unit && <span className="text-lg text-gray-500 ml-1">{unit}</span>}
      </div>
      <div className="text-gray-600">{label}</div>
    </motion.div>
  );
}

// 中国地图组件
function ChinaMap({ lang }: { lang: Lang }) {
  return (
    <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl overflow-hidden">
      {/* 简化的中国地图轮廓 */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        {/* 地图背景 */}
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
        
        {/* 中国轮廓示意 */}
        <path
          d="M20,30 Q30,20 50,25 Q70,20 85,35 Q90,50 80,70 Q70,85 50,80 Q30,85 20,70 Q10,50 20,30"
          fill="#d1fae5"
          stroke="#10b981"
          strokeWidth="0.5"
          opacity="0.3"
        />
        
        {/* 省份标记点 */}
        {provinces.map((province, index) => (
          <motion.g
            key={province.name}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            {/* 脉冲效果 */}
            <motion.circle
              cx={province.x}
              cy={province.y}
              r="3"
              fill="#10b981"
              opacity="0.3"
              animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* 主标记 */}
            <circle
              cx={province.x}
              cy={province.y}
              r="2"
              fill="#10b981"
              stroke="white"
              strokeWidth="0.5"
            />
            {/* 标签 */}
            <text
              x={province.x}
              y={province.y - 3}
              textAnchor="middle"
              className="text-[2px] fill-gray-700 font-medium"
            >
              {lang === 'zh' ? province.name : province.nameEn}
            </text>
          </motion.g>
        ))}
      </svg>
      
      {/* 图例 */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <span>{lang === 'zh' ? '运营中项目' : 'Operating Projects'}</span>
        </div>
        <div className="mt-1 text-xs text-gray-500">
          {lang === 'zh' ? `共 ${provinces.length} 个省份` : `${provinces.length} Provinces`}
        </div>
      </div>
    </div>
  );
}

export default function ESGContent({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar lang={lang} t={t.nav} />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600" />
        </main>
        <Footer lang={lang} t={t.footer} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar lang={lang} t={t.nav} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {lang === 'zh' ? '可持续发展' : 'Sustainability'}
              </h1>
              <p className="text-xl text-emerald-100">
                {lang === 'zh' 
                  ? '践行ESG理念，推动绿色低碳转型，共创美好未来' 
                  : 'Practicing ESG principles, driving green and low-carbon transformation'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* 双碳目标 */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {lang === 'zh' ? '双碳目标' : 'Dual Carbon Goals'}
              </h2>
              <p className="text-gray-600">
                {lang === 'zh' 
                  ? '积极响应国家"3060"双碳目标，制定科学的减排路线图' 
                  : 'Responding to national "3060" dual carbon goals'}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <ProgressBar
                label={lang === 'zh' ? '2030年碳达峰' : 'Carbon Peak by 2030'}
                target="2030"
                progress={esgData.carbonTarget.peak.progress}
                color="blue"
              />
              <ProgressBar
                label={lang === 'zh' ? '2060年碳中和' : 'Carbon Neutral by 2060'}
                target="2060"
                progress={esgData.carbonTarget.neutral.progress}
                color="emerald"
              />
            </div>
          </div>
        </section>

        {/* 环境数据 */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {lang === 'zh' ? '环境效益' : 'Environmental Impact'}
              </h2>
              <p className="text-gray-600">
                {lang === 'zh' 
                  ? '以清洁能源助力生态文明建设，实现经济效益与环境效益双赢' 
                  : 'Promoting ecological civilization with clean energy'}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <DataCard
                icon={Leaf}
                value={esgData.environment.totalReduction}
                unit="万吨"
                label={lang === 'zh' ? '累计减排CO2' : 'CO2 Reduction'}
                color="emerald"
                delay={0}
              />
              <DataCard
                icon={TrendingDown}
                value={esgData.environment.coalSaved}
                unit="万吨"
                label={lang === 'zh' ? '节约标煤' : 'Coal Saved'}
                color="amber"
                delay={0.1}
              />
              <DataCard
                icon={TreePine}
                value={esgData.environment.treesEquivalent}
                unit="万棵"
                label={lang === 'zh' ? '等效植树' : 'Trees Equivalent'}
                color="green"
                delay={0.2}
              />
              <DataCard
                icon={Globe}
                value={provinces.length}
                unit="个"
                label={lang === 'zh' ? '覆盖省份' : 'Provinces'}
                color="blue"
                delay={0.3}
              />
            </div>

            {/* 项目分布地图 */}
            <ChinaMap lang={lang} />
          </div>
        </section>

        {/* 社会责任 */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {lang === 'zh' ? '社会责任' : 'Social Responsibility'}
              </h2>
              <p className="text-gray-600">
                {lang === 'zh' 
                  ? '积极履行企业社会责任，助力乡村振兴，促进共同富裕' 
                  : 'Fulfilling corporate social responsibility'}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <DataCard
                icon={Users}
                value={esgData.social.jobsCreated}
                unit="人"
                label={lang === 'zh' ? '创造就业' : 'Jobs Created'}
                color="blue"
                delay={0}
              />
              <DataCard
                icon={Sun}
                value={esgData.social.ruralInvestment}
                unit="万元"
                label={lang === 'zh' ? '乡村振兴投资' : 'Rural Investment'}
                color="amber"
                delay={0.1}
              />
              <DataCard
                icon={Target}
                value={esgData.social.communityEvents}
                unit="次"
                label={lang === 'zh' ? '社区活动' : 'Community Events'}
                color="emerald"
                delay={0.2}
              />
              <DataCard
                icon={Droplets}
                value={esgData.social.scholarships}
                unit="万元"
                label={lang === 'zh' ? '教育资助' : 'Education Support'}
                color="cyan"
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* 公司治理 */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {lang === 'zh' ? '公司治理' : 'Corporate Governance'}
              </h2>
              <p className="text-gray-600">
                {lang === 'zh' 
                  ? '建立健全ESG治理体系，实现企业可持续发展' 
                  : 'Establishing sound ESG governance system'}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  title: lang === 'zh' ? 'ESG委员会' : 'ESG Committee',
                  desc: lang === 'zh' ? '设立专门的ESG委员会，统筹可持续发展战略' : 'Dedicated ESG committee for sustainability strategy',
                  icon: Target,
                  status: esgData.governance.esgCommittee ? (lang === 'zh' ? '已设立' : 'Established') : ''
                },
                { 
                  title: lang === 'zh' ? '信息披露' : 'Information Disclosure',
                  desc: lang === 'zh' ? '定期发布ESG报告，保持高度透明度' : 'Regular ESG reporting with high transparency',
                  icon: FileText,
                  status: esgData.governance.transparency
                },
                { 
                  title: lang === 'zh' ? '合规经营' : 'Compliance',
                  desc: lang === 'zh' ? '严格遵守法律法规，合规经营' : 'Strict compliance with laws and regulations',
                  icon: TrendingDown,
                  status: esgData.governance.compliance
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-8 hover:bg-emerald-50 transition-colors"
                >
                  <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                    <item.icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.desc}</p>
                  <div className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                    {item.status}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 下载中心 */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {lang === 'zh' ? '下载中心' : 'Download Center'}
              </h2>
              <p className="text-gray-600">
                {lang === 'zh' ? '获取江能集团ESG相关报告与资料' : 'Download ESG reports and materials'}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  title: lang === 'zh' ? '2024年度ESG报告' : '2024 ESG Report',
                  size: 'PDF · 8.5MB',
                  year: '2024'
                },
                { 
                  title: lang === 'zh' ? '碳足迹报告' : 'Carbon Footprint Report',
                  size: 'PDF · 3.2MB',
                  year: '2024'
                },
                { 
                  title: lang === 'zh' ? '可持续发展白皮书' : 'Sustainability Whitepaper',
                  size: 'PDF · 5.1MB',
                  year: '2024'
                },
              ].map((doc, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-red-600" />
                    </div>
                    <span className="text-sm text-gray-500">{doc.year}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{doc.size}</p>
                  <button className="flex items-center text-emerald-600 font-medium group-hover:text-emerald-700">
                    <Download className="w-4 h-4 mr-2" />
                    {lang === 'zh' ? '下载' : 'Download'}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} t={t.footer} />
    </div>
  );
}
