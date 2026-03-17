'use client';

import { useEffect, useState } from 'react';

export default function CursorFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (typeof window === 'undefined') return null;

  return (
    <>
      {/* 主光标 */}
      <div
        className="fixed pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          left: position.x - 8,
          top: position.y - 8,
          width: 16,
          height: 16,
          borderRadius: '50%',
          backgroundColor: 'white',
          opacity: isVisible ? 1 : 0,
          transform: `scale(${isVisible ? 1 : 0})`,
        }}
      />
      {/* 尾随光标 */}
      <div
        className="fixed pointer-events-none z-50 transition-all duration-300 ease-out"
        style={{
          left: position.x - 20,
          top: position.y - 20,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid rgba(16, 185, 129, 0.5)',
          opacity: isVisible ? 0.5 : 0,
          transform: `scale(${isVisible ? 1 : 0})`,
        }}
      />
    </>
  );
}
