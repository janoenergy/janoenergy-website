'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export function MagneticButton({ 
  children, 
  className = '', 
  onClick,
  variant = 'primary'
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // 磁吸范围限制
    const strength = 0.3;
    
    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };
  
  const baseStyles = variant === 'primary'
    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25'
    : 'bg-white/10 backdrop-blur-xl border border-white/20 text-gray-900 hover:bg-white/20';
  
  return (
    <motion.button
      ref={ref}
      className={`relative overflow-hidden px-8 py-4 rounded-2xl font-semibold transition-shadow duration-300 ${baseStyles} ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      whileHover={{ 
        boxShadow: variant === 'primary' 
          ? '0 20px 40px rgba(16, 185, 129, 0.3)' 
          : '0 20px 40px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* 光泽效果 */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 55%, transparent 60%)',
        }}
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '100%' : '-100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      
      {/* 内容 */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
