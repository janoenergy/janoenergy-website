'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // 返回默认值，避免在静态生成时出错
    return { theme: 'dark' as Theme, toggleTheme: () => {} };
  }
  return context;
}

// 主题样式配置
export const themeStyles = {
  dark: {
    bg: 'bg-slate-900',
    bgGradient: 'from-slate-900 via-slate-800 to-emerald-900/30',
    bgCard: 'bg-slate-800/50',
    bgHover: 'hover:bg-slate-800',
    text: 'text-white',
    textPrimary: 'text-slate-100',
    textSecondary: 'text-slate-300',
    textMuted: 'text-slate-400',
    border: 'border-slate-700/50',
    borderHover: 'hover:border-emerald-500/30',
    navBg: 'bg-slate-900/80',
    navBorder: 'border-slate-700/50',
    navText: 'text-slate-300',
    navTextHover: 'hover:text-emerald-400',
    btnPrimary: 'bg-gradient-to-r from-emerald-500 to-cyan-500',
    btnSecondary: 'bg-slate-800/50 border-slate-700',
    glow: 'from-emerald-500/10 to-cyan-500/10',
    grid: 'rgba(16,185,129,0.03)',
  },
  light: {
    bg: 'bg-gray-50',
    bgGradient: 'from-white via-gray-50 to-emerald-50/30',
    bgCard: 'bg-white/80',
    bgHover: 'hover:bg-gray-100',
    text: 'text-gray-900',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-600',
    textMuted: 'text-gray-500',
    border: 'border-gray-200',
    borderHover: 'hover:border-emerald-400',
    navBg: 'bg-white/80',
    navBorder: 'border-gray-200',
    navText: 'text-gray-600',
    navTextHover: 'hover:text-emerald-600',
    btnPrimary: 'bg-gradient-to-r from-emerald-500 to-cyan-500',
    btnSecondary: 'bg-white border-gray-300',
    glow: 'from-emerald-500/5 to-cyan-500/5',
    grid: 'rgba(16,185,129,0.05)',
  },
};

// 获取当前主题的样式类名
export function useThemeStyles() {
  const { theme } = useTheme();
  return themeStyles[theme];
}
