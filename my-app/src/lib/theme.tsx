'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 在 HTML 中执行的脚本，用于防止闪烁
const themeScript = `
  (function() {
    function getTheme() {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    const theme = getTheme();
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.add('theme-loaded');
  })();
`;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 从 localStorage 或系统偏好读取主题
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setThemeState(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setThemeState('dark');
    }
    setMounted(true);
    // 确保 theme-loaded 类被添加
    document.documentElement.classList.add("theme-loaded");

    // 监听系统主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setThemeState(newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {/* 注入防止闪烁的脚本 */}
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // 返回默认值，避免在静态生成时出错
    return { theme: 'light' as Theme, toggleTheme: () => {}, setTheme: () => {} };
  }
  return context;
}

// 主题样式配置 - 优化后的配色方案
export const themeStyles = {
  dark: {
    // 背景 - 使用更舒适的深蓝灰色
    bg: 'bg-slate-900',
    bgGradient: 'from-slate-900 via-slate-800 to-slate-900',
    bgCard: 'bg-slate-800',
    bgHover: 'hover:bg-slate-700',
    bgMuted: 'bg-slate-800/50',
    
    // 文字 - 提高对比度，使用更亮的白色
    text: 'text-slate-100',
    textPrimary: 'text-slate-100',
    textSecondary: 'text-slate-300',
    textMuted: 'text-slate-400',
    
    // 边框 - 使用更明显的边框颜色
    border: 'border-slate-700',
    borderHover: 'hover:border-emerald-500/50',
    
    // 导航
    navBg: 'bg-slate-900/90',
    navBorder: 'border-slate-700',
    navText: 'text-slate-300',
    navTextHover: 'hover:text-emerald-400',
    
    // 按钮
    btnPrimary: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    btnSecondary: 'bg-slate-700 border-slate-600 hover:bg-slate-600',
    
    // 特效
    glow: 'from-emerald-500/20 to-teal-500/20',
    grid: 'rgba(16,185,129,0.05)',
  },
  light: {
    // 背景
    bg: 'bg-gray-50',
    bgGradient: 'from-white via-gray-50 to-white',
    bgCard: 'bg-white',
    bgHover: 'hover:bg-gray-100',
    bgMuted: 'bg-gray-100',
    
    // 文字
    text: 'text-gray-900',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-600',
    textMuted: 'text-gray-500',
    
    // 边框
    border: 'border-gray-200',
    borderHover: 'hover:border-emerald-400',
    
    // 导航
    navBg: 'bg-white/90',
    navBorder: 'border-gray-200',
    navText: 'text-gray-600',
    navTextHover: 'hover:text-emerald-600',
    
    // 按钮
    btnPrimary: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    btnSecondary: 'bg-white border-gray-300 hover:bg-gray-50',
    
    // 特效
    glow: 'from-emerald-500/10 to-teal-500/10',
    grid: 'rgba(16,185,129,0.05)',
  },
};

// 获取当前主题的样式类名
export function useThemeStyles() {
  const { theme } = useTheme();
  return themeStyles[theme];
}
