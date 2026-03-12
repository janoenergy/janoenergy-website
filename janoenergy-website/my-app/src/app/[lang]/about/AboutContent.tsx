'use client';

import { useState, useEffect, useRef } from 'react';
import { translations } from '@/lib/translations';

const images = {
  company: '/images/about/company.jpg',
};

// 团队成员数据
const teamMembers = [
  { name: '张总', nameEn: 'CEO', title: '首席执行官', titleEn: 'Chief Executive Officer', image: '/images/team/ceo.jpg' },
  { name: '李总', nameEn: 'CTO', title: '技术总监', titleEn: 'Chief Technology Officer', image: '/images/team/cto.jpg' },
  { name: '王总', nameEn: 'COO', title: '运营总监', titleEn: 'Chief Operating Officer', image: '/images/team/coo.jpg' },
  { name: '赵总', nameEn: 'CFO', title: '财务总监', titleEn: 'Chief Financial Officer', image: '/images/team/cfo.jpg' },
];

// 资质证书
const certificates = [
  { name: 'ISO 9001', desc: '质量管理体系认证', image: '/images/certificates/iso9001.jpg' },
  { name: 'ISO 14001', desc: '环境管理体系认证', image: '/images/certificates/iso14001.jpg' },
  { name: 'ISO 45001', desc: '职业健康安全管理体系', image: '/images/certificates/iso45001.jpg' },
  { name: '电力工程施工总承包', desc: '一级资质', image: '/images/certificates/epc.jpg' },
];

// 发展历程数据
const timelineData = [
  { year: '2018', title: '公司成立', titleEn: 'Founded', desc: '江能集团正式成立，开启新能源征程', descEn: 'JanoEnergy Group was established' },
  { year: '2019', title: '首个项目落地', titleEn: 'First Project', desc: '首个50MW风电项目签约落地', descEn: 'First 50MW wind project signed' },
  { year: '2020', title: '首个项目并网', titleEn: 'Grid Connected', desc: '首个风电项目成功并网发电', descEn: 'First wind project connected to grid' },
  { year: '2021', title: '突破100MW', titleEn: '100MW Milestone', desc: '累计装机容量突破100MW', descEn: 'Cumulative capacity exceeded 100MW' },
  { year: '2022', title: '业务拓展', titleEn: 'Expansion', desc: '进军光伏和储能领域，实现多元化发展', descEn: 'Entered solar and energy storage sectors' },
  { year: '2023', title: '区域布局', titleEn: 'Regional Layout', desc: '项目覆盖8个省份，形成全国布局', descEn: 'Projects covering 8 provinces' },
  { year: '2024', title: '规模突破', titleEn: 'Scale Breakthrough', desc: '累计装机容量突破500MW', descEn: 'Cumulative capacity exceeded 500MW' },
  { year: '2025', title: '战略升级', titleEn: 'Strategic Upgrade', desc: '启动储能+战略，布局新型电力系统', descEn: 'Launched energy storage+ strategy' },
];

// 核心价值观数据
const valuesData = [
  { 
    title: '绿色发展', titleEn: 'Green Development',
    desc: '坚持可持续发展理念，推动清洁能源普及，为碳中和目标贡献力量', 
    descEn: 'Adhering to sustainable development and promoting clean energy' 
  },
  { 
    title: '创新驱动', titleEn: 'Innovation Driven',
    desc: '持续技术创新，提升项目效率和收益，引领行业技术进步', 
    descEn: 'Continuous technological innovation to improve efficiency' 
  },
  { 
    title: '合作共赢', titleEn: 'Win-Win Cooperation',
    desc: '与合作伙伴共同成长，创造长期价值，构建产业生态圈', 
    descEn: 'Growing together with partners to create long-term value' 
  },
];

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 text-white py-16 md:py-20">
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">{t.intro.title}</h2>
            <p className="text-base md:text-lg text-gray-600 mb-4 leading-relaxed">{t.intro.p1}</p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">{t.intro.p2}</p>
            
            {/* 核心数据 */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 mt-8">
              <div className="text-center p-3 md:p-4 bg-white rounded-xl shadow-sm">
                <div className="text-2xl md:text-3xl font-bold text-emerald-600">
                  <AnimatedNumber value={500} suffix="+" />
                </div>
                <div className="text-xs md:text-sm text-gray-500 mt-1">MW{lang === 'zh' ? '装机' : ' Capacity'}</div>
              </div>
              <div className="text-center p-3 md:p-4 bg-white rounded-xl shadow-sm">
                <div className="text-2xl md:text-3xl font-bold text-emerald-600">
                  <AnimatedNumber value={8} />
                </div>
                <div className="text-xs md:text-sm text-gray-500 mt-1">{lang === 'zh' ? '省份覆盖' : 'Provinces'}</div>
              </div>
              <div className="text-center p-3 md:p-4 bg-white rounded-xl shadow-sm">
                <div className="text-2xl md:text-3xl font-bold text-emerald-600">2018</div>
                <div className="text-xs md:text-sm text-gray-500 mt-1">{lang === 'zh' ? '年成立' : 'Founded'}</div>
              </div>
            </div>
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <img src={images.company} alt="JanoEnergy" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* 资质证书 */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
            {lang === 'zh' ? '资质证书' : 'Certificates'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {certificates.map((cert) => (
              <div key={cert.name} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  <img src={cert.image} alt={cert.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 md:p-4 text-center">
                  <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1">{cert.name}</h3>
                  <p className="text-xs md:text-sm text-gray-500">{cert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 管理团队 */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
            {lang === 'zh' ? '管理团队' : 'Leadership Team'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img src={member.image} alt={lang === 'zh' ? member.name : member.nameEn} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 md:p-4 text-center">
                  <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1">{lang === 'zh' ? member.name : member.nameEn}</h3>
                  <p className="text-xs md:text-sm text-emerald-600">{lang === 'zh' ? member.title : member.titleEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline - 发展历程 */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 md:mb-12 text-center">
            {lang === 'zh' ? '发展历程' : 'Our History'}
          </h2>
          <div className="relative max-w-4xl mx-auto">
            {/* 中线 */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 md:w-1 bg-emerald-200 transform -translate-x-1/2" />
            
            <div className="space-y-8 md:space-y-12">
              {timelineData.map((item, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <div key={item.year} className={`flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-5/12 ${isLeft ? 'text-right pr-4 md:pr-8' : 'text-left pl-4 md:pl-8'}`}>
                      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
                        <h3 className="text-2xl md:text-3xl font-bold text-emerald-600 mb-2">{item.year}</h3>
                        <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                          {lang === 'zh' ? item.title : item.titleEn}
                        </h4>
                        <p className="text-sm md:text-base text-gray-600">
                          {lang === 'zh' ? item.desc : item.descEn}
                        </p>
                      </div>
                    </div>
                    <div className="w-2/12 flex justify-center">
                      <div className="w-4 h-4 bg-emerald-500 rounded-full border-4 border-white shadow-lg z-10" />
                    </div>
                    <div className="w-5/12" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Values - 核心价值观 */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 md:mb-12 text-center">
            {lang === 'zh' ? '核心价值观' : 'Core Values'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {valuesData.map((value) => (
              <div key={value.title} className="bg-white rounded-xl p-6 md:p-8 text-center shadow-sm h-full">
                <h3 className="text-lg md:text-xl font-bold text-emerald-600 mb-3 md:mb-4">
                  {lang === 'zh' ? value.title : value.titleEn}
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  {lang === 'zh' ? value.desc : value.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
