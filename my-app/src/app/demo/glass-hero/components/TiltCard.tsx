'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function TiltCard({ children, className = '', glowColor = '#10b981' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), springConfig);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;
    
    x.set(xPos);
    y.set(yPos);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };
  
  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* 发光边框 */}
      <motion.div
        className="absolute -inset-[1px] rounded-3xl opacity-0 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${glowColor}40, transparent, ${glowColor}20)`,
          opacity: isHovered ? 1 : 0,
        }}
      />
      
      {/* 玻璃反光 */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden"
        style={{
          background: useTransform(
            [x, y],
            ([latestX, latestY]) => {
              const posX = (latestX as number) * 100;
              const posY = (latestY as number) * 100;
              return `radial-gradient(circle at ${posX}% ${posY}%, rgba(255,255,255,0.15) 0%, transparent 50%)`;
            }
          ),
        }}
      />
      
      {children}
    </motion.div>
  );
}

// 项目卡片
interface ProjectCardProps {
  image: string;
  title: string;
  subtitle: string;
  capacity: string;
}

export function ProjectCard({ image, title, subtitle, capacity }: ProjectCardProps) {
  return (
    <TiltCard className="group cursor-pointer">
      <div className="glass-card overflow-hidden h-full">
        {/* 图片 */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* 容量标签 */}
          <motion.div
            className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium"
            style={{
              background: 'rgba(16, 185, 129, 0.9)',
              color: 'white',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {capacity}
          </motion.div>
        </div>
        
        {/* 内容 */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-gray-500 text-sm">{subtitle}</p>
          
          {/* 悬停显示更多信息 */}
          <motion.div
            className="mt-4 pt-4 border-t border-gray-200/50"
            initial={{ opacity: 0, height: 0 }}
            whileInView={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">年发电量</span>
              <span className="font-medium text-emerald-600">2.4 亿度</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-gray-500">服务家庭</span>
              <span className="font-medium text-emerald-600">15 万户</span>
            </div>
          </motion.div>
        </div>
      </div>
    </TiltCard>
  );
}
