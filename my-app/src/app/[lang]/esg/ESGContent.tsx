'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, TrendingDown, Sun, Wind, Droplets, 
  Target, Globe, Users, TreePine, FileText 
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { translations, Lang } from '@/lib/translations';
import { ProgressBar, DataCard } from './components/ESGCards';
import { ChinaMap } from './components/ChinaMap';
import { DownloadCenter } from './components/DownloadCenter';
import { esgData, provinces } from './components/data';

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
          <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-left max-w-3xl mx-auto"
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
        <section className="py-20 bg-muted">
          <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-left mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {lang === 'zh' ? '双碳目标' : 'Dual Carbon Goals'}
              </h2>
              <p className="text-muted-foreground">
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
        <section className="py-20 bg-card">
          <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-left mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {lang === 'zh' ? '环境效益' : 'Environmental Impact'}
              </h2>
              <p className="text-muted-foreground">
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
        <section className="py-20 bg-muted">
          <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-left mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {lang === 'zh' ? '社会责任' : 'Social Responsibility'}
              </h2>
              <p className="text-muted-foreground">
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
        <section className="py-20 bg-card">
          <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-left mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {lang === 'zh' ? '公司治理' : 'Corporate Governance'}
              </h2>
              <p className="text-muted-foreground">
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
        <DownloadCenter lang={lang} />
      </main>

      <Footer lang={lang} t={t.footer} />
    </div>
  );
}
