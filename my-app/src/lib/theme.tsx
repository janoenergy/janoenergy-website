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

// 主题样式配置 - 使用 Tailwind 类名
export const themeStyles = {
  dark: {
    // 背景
    bg: 'bg-slate-900',
    bgGradient: 'from-slate-900 via-slate-800 to-emerald-900/30',
    bgCard: 'bg-slate-800/50',
    bgHover: 'hover:bg-slate-800',
    bgMuted: 'bg-slate-800',
    
    // 文字
    text: 'text-white',
    textPrimary: 'text-slate-100',
    textSecondary: 'text-slate-300',
    textMuted: 'text-slate-400',
    
    // 边框
    border: 'border-slate-700/50',
    borderHover: 'hover:border-emerald-500/30',
    
    // 导航
    navBg: 'bg-slate-900/80',
    navBorder: 'border-slate-700/50',
    navText: 'text-slate-300',
    navTextHover: 'hover:text-emerald-400',
    
    // 按钮
    btnPrimary: 'bg-gradient-to-r from-emerald-500 to-cyan-500',
    btnSecondary: 'bg-slate-800/50 border-slate-700',
    
    // 特效
    glow: 'from-emerald-500/10 to-cyan-500/10',
    grid: 'rgba(16,185,129,0.03)',
  },
  light: {
    // 背景
    bg: 'bg-gray-50',
    bgGradient: 'from-white via-gray-50 to-emerald-50/30',
    bgCard: 'bg-white/80',
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
    navBg: 'bg-white/80',
    navBorder: 'border-gray-200',
    navText: 'text-gray-600',
    navTextHover: 'hover:text-emerald-600',
    
    // 按钮
    btnPrimary: 'bg-gradient-to-r from-emerald-500 to-cyan-500',
    btnSecondary: 'bg-white border-gray-300',
    
    // 特效
    glow: 'from-emerald-500/5 to-cyan-500/5',
    grid: 'rgba(16,185,129,0.05)',
  },
};

// 获取当前主题的样式类名
export function useThemeStyles() {
  const { theme } = useTheme();
  return themeStyles[theme];
}
