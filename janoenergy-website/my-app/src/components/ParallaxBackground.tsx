'use client';

import { useEffect, useState } from 'react';

export default function ParallaxBackground({ children }: { children: React.ReactNode }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* 视差背景层 */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl translate-x-1/2" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl translate-y-1/2" />
      </div>
      
      {/* 内容层 */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
