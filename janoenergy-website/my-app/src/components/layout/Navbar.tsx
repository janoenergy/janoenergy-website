'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { Lang } from '@/lib/translations';

// Logo SVG 组件
function LogoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="url(#logo-gradient)"/>
      <path d="M20 8L12 20H18L14 32L28 18H20L24 8H20Z" fill="white"/>
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981"/>
          <stop offset="1" stopColor="#0D9488"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  lang: Lang;
  t: {
    team: string;
    home: string;
    about: string;
    business: string;
    projects: string;
    news: string;
    contact: string;
  };
}

export function Navbar({ lang, t }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 从 localStorage 读取主题
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // 默认深色主题
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const navItems: NavItem[] = [
    { label: t.home, href: `/${lang}` },
    { label: t.about, href: `/${lang}/about` },
    { label: t.team, href: `/${lang}/team` },
    { label: t.business, href: `/${lang}/business` },
    { label: t.projects, href: `/${lang}/projects` },
    { label: t.news, href: `/${lang}/news` },
    { label: t.contact, href: `/${lang}/contact` },
  ];

  const languages = [
    { code: 'zh', label: '中文', flag: '🇨🇳' },
    { code: 'en', label: 'EN', flag: '🇺🇸' },
  ];

  const currentLang = languages.find(l => l.code === lang);

  const switchLang = (newLang: string) => {
    window.location.href = window.location.pathname.replace(`/${lang}`, `/${newLang}`);
    setLangMenuOpen(false);
  };

  // 始终渲染，不依赖 mounted

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-slate-900/80 backdrop-blur-xl shadow-lg border-b border-slate-700/50' 
          : 'bg-slate-900/50 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
          >
            <a href={`/${lang}`} className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <LogoIcon className="w-10 h-10" />
              </motion.div>
              <span className="text-xl font-bold text-white">JanoEnergy</span>
            </a>
          </motion.div>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.a 
                key={item.href} 
                href={item.href} 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -2 }}
                className="relative text-slate-300 hover:text-emerald-400 font-medium transition-colors py-2 group"
              >
                {item.label}
                <motion.span 
                  className="absolute bottom-0 left-0 h-0.5 bg-emerald-400"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
            
            {/* 主题切换按钮 */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white border border-slate-600 hover:border-slate-500 rounded-lg transition-all"
            >
              {theme === 'dark' ? (
                <>
                  <Moon className="w-4 h-4" />
                  <span>深色</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4" />
                  <span>浅色</span>
                </>
              )}
            </motion.button>
            
            {/* Language Dropdown */}
            <div className="relative">
              <motion.button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white border border-slate-600 hover:border-slate-500 rounded-lg transition-all"
              >
                <span className="text-base">{currentLang?.flag}</span>
                <span>{currentLang?.label}</span>
                <motion.div
                  animate={{ rotate: langMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </motion.button>
              
              {langMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-32 bg-slate-800/95 backdrop-blur-xl rounded-lg shadow-xl border border-slate-700 py-1 z-50"
                >
                  {languages.map((l, idx) => (
                    <motion.button
                      key={l.code}
                      onClick={() => switchLang(l.code)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ x: 5, backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
                      className={`w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                        l.code === lang ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-300'
                      }`}
                    >
                      <span className="text-base">{l.flag}</span>
                      <span>{l.label}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            {/* 移动端主题切换 */}
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-slate-300 hover:text-white"
            >
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </motion.button>

            <div className="relative">
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 px-2 py-1 text-sm font-medium text-slate-300 border border-slate-600 rounded-lg"
              >
                <span>{currentLang?.flag}</span>
                <motion.div
                  animate={{ rotate: langMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-3 h-3" />
                </motion.div>
              </button>
              
              {langMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-28 bg-slate-800 rounded-lg shadow-xl border border-slate-700 py-1 z-50"
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => switchLang(l.code)}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-700 ${
                        l.code === lang ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-300'
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
            
            <motion.button 
              onClick={() => setIsOpen(!isOpen)} 
              whileTap={{ scale: 0.9 }}
              className="text-slate-300 hover:text-white p-2"
            >
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-slate-800/95 backdrop-blur-xl border-t border-slate-700"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item, index) => (
              <motion.a 
                key={item.href} 
                href={item.href} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="block px-3 py-2 text-slate-300 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-md transition-colors" 
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
