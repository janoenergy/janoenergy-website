'use client';

import { useState, useEffect, useRef } from 'react';
import { translations } from '@/lib/translations';
import { FadeInUp, SlideInLeft, SlideInRight, TiltCard } from '@/components/AnimationsV2';

const images = {
  company: '/images/about/company.jpg',
};

// 团队成员数据 - 使用真实照片
const teamMembers = [
  { name: '张总', nameEn: 'CEO', title: '首席执行官', titleEn: 'Chief Executive Officer', image: '/images/team/ceo.jpg' },
  { name: '李总', nameEn: 'CTO', title: '技术总监', titleEn: 'Chief Technology Officer', image: '/images/team/cto.jpg' },
  { name: '王总', nameEn: 'COO', title: '运营总监', titleEn: 'Chief Operating Officer', image: '/images/team/coo.jpg' },
  { name: '赵总', nameEn: 'CFO', title: '财务总监', titleEn: 'Chief Financial Officer', image: '/images/team/cfo.jpg' },
];

// 资质证书 - 使用真实图片
const certificates = [
  { name: 'ISO 9001', desc: '质量管理体系认证', image: '/images/certificates/iso9001.jpg' },
  { name: 'ISO 14001', desc: '环境管理体系认证', image: '/images/certificates/iso14001.jpg' },
  { name: 'ISO 45001', desc: '职业健康安全管理体系', image: '/images/certificates/iso45001.jpg' },
  { name: '电力工程施工总承包', desc: '一级资质', image: '/images/certificates/epc.jpg' },
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

// 时间轴项目组件
function TimelineItem({ item, idx }: { item: { year: string; title: string; desc: string }; idx: number }) {
  const { ref, isVisible } = useScrollAnimation();
  const isLeft = idx % 2 === 0;

  return (
    <div ref={ref} className={`flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`w-5/12 ${isLeft ? 'text-right pr-8' : 'text-left pl-8'} transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isLeft ? '-translate-x-10' : 'translate-x-10'}`}`} style={{ transitionDelay: `${idx * 150}ms` }}>
        <h3 className="text-xl font-bold text-emerald-600 mb-2">{item.year}</h3>
        <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
        <p className="text-gray-600">{item.desc}</p>
      </div>
      <div className="w-2/12 flex justify-center">
        <div className={`w-4 h-4 bg-emerald-500 rounded-full border-4 border-white shadow-lg transition-all duration-500 ${isVisible ? 'scale-100' : 'scale-0'}`} style={{ transitionDelay: `${idx * 150 + 200}ms` }} />
      </div>
      <div className="w-5/12" />
    </div>
  );
}

// 滚动动画 Hook
function useScrollAnimation(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

export default function AboutContent({ lang }: { lang: "zh" | "en" }) {
  const t = translations[lang].about;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <SlideInLeft>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.intro.title}</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">{t.intro.p1}</p>
              <p className="text-lg text-gray-600 leading-relaxed">{t.intro.p2}</p>
              
              {/* 核心数据 */}
              <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="text-3xl font-bold text-emerald-600">
                    <AnimatedNumber value={500} suffix="+" />
                  </div>
                  <div className="text-sm text-gray-500">MW{lang === 'zh' ? '装机' : ' Capacity'}</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="text-3xl font-bold text-emerald-600">
                    <AnimatedNumber value={8} />
                  </div>
                  <div className="text-sm text-gray-500">{lang === 'zh' ? '省份覆盖' : 'Provinces'}</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="text-3xl font-bold text-emerald-600">2018</div>
                  <div className="text-sm text-gray-500">{lang === 'zh' ? '年成立' : 'Founded'}</div>
                </div>
              </div>
            </div>
          </SlideInLeft>
          <SlideInRight>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group">
              <img src={images.company} alt="JanoEnergy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </SlideInRight>
        </div>

        {/* 资质证书 - 使用真实图片 */}
        <div className="mb-20">
          <FadeInUp>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {lang === 'zh' ? '资质证书' : 'Certificates'}
            </h2>
          </FadeInUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certificates.map((cert, idx) => (
              <FadeInUp key={cert.name} delay={idx * 100}>
                <TiltCard className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group">
                  {/* 证书图片 */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={cert.image} 
                      alt={cert.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-gray-900 mb-1">{cert.name}</h3>
                    <p className="text-sm text-gray-500">{cert.desc}</p>
                  </div>
                </TiltCard>
              </FadeInUp>
            ))}
          </div>
        </div>

        {/* 管理团队 - 使用真实照片 */}
        <div className="mb-20">
          <FadeInUp>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {lang === 'zh' ? '管理团队' : 'Leadership Team'}
            </h2>
          </FadeInUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <FadeInUp key={member.name} delay={idx * 100}>
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group cursor-pointer">
                  {/* 头像照片 */}
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={lang === 'zh' ? member.name : member.nameEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-gray-900 mb-1">{lang === 'zh' ? member.name : member.nameEn}</h3>
                    <p className="text-sm text-emerald-600">{lang === 'zh' ? member.title : member.titleEn}</p>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <FadeInUp>
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">{t.timeline.title}</h2>
          </FadeInUp>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-emerald-200" />
            <div className="space-y-12">
              {t.timeline.items.map((item, idx) => (
                <TimelineItem key={item.year} item={item} idx={idx} />
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <FadeInUp>
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">{t.values.title}</h2>
          </FadeInUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.values.items.map((value, idx) => (
              <FadeInUp key={value.title} delay={idx * 100}>
                <TiltCard className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-all cursor-pointer">
                  <h3 className="text-xl font-bold text-emerald-600 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </TiltCard>
              </FadeInUp>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
