'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { Lang } from '@/lib/translations';
import { useThemeStyles, useTheme } from '@/lib/theme';

function LogoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
  const { theme, toggleTheme } = useTheme();
  const styles = useThemeStyles();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { code: 'zh', label: '中文' },
    { code: 'en', label: 'EN' },
  ];

  const currentLang = languages.find(l => l.code === lang);

  const switchLang = (newLang: string) => {
    window.location.href = window.location.pathname.replace(`/${lang}`, `/${newLang}`);
    setLangMenuOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? `${styles.navBg} backdrop-blur-xl shadow-lg border-b ${styles.navBorder}` 
          : `${styles.navBg} backdrop-blur-sm border-b border-transparent`
      }`}
      role="navigation"
      aria-label={lang === 'zh' ? '主导航' : 'Main navigation'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
          >
            <a 
              href={`/${lang}`} 
              className="flex items-center space-x-3 group"
              aria-label={lang === 'zh' ? '江能集团首页' : 'JanoEnergy Home'}
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <LogoIcon className="w-10 h-10" />
              </motion.div>
              <span className={`text-xl font-bold ${styles.text}`}>JanoEnergy</span>
            </a>
          </motion.div>

          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <motion.a 
                key={item.href} 
                href={item.href} 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -2 }}
                className={`relative ${styles.navText} ${styles.navTextHover} font-medium transition-colors px-4 py-2.5 min-h-[44px] flex items-center group`}
                aria-current={typeof window !== 'undefined' && window.location.pathname === item.href ? 'page' : undefined}
              >
                {item.label}
                <motion.span 
                  className="absolute bottom-1 left-4 right-4 h-0.5 bg-emerald-500"
                  initial={{ width: 0 }}
                  whileHover={{ width: 'calc(100% - 32px)' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
            
            {/* 主题切换按钮 */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2.5 min-h-[44px] text-sm font-medium border rounded-lg transition-all ${styles.navText} ${styles.border} hover:border-emerald-400`}
              aria-label={theme === 'dark' ? (lang === 'zh' ? '切换到浅色模式' : 'Switch to light mode') : (lang === 'zh' ? '切换到深色模式' : 'Switch to dark mode')}
            >
              {theme === 'dark' ? (
                <>
                  <Moon className="w-4 h-4" aria-hidden="true" />
                  <span>{lang === 'zh' ? '深色' : 'Dark'}</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4" aria-hidden="true" />
                  <span>{lang === 'zh' ? '浅色' : 'Light'}</span>
                </>
              )}
            </motion.button>
            
            {/* Language Dropdown */}
            <div className="relative">
              <motion.button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2.5 min-h-[44px] text-sm font-medium border rounded-lg transition-all ${styles.navText} ${styles.border} hover:border-emerald-400`}
                aria-label={lang === 'zh' ? '选择语言' : 'Select language'}
                aria-expanded={langMenuOpen}
                aria-haspopup="listbox"
              >
                <span>{currentLang?.label}</span>
                <motion.div
                  animate={{ rotate: langMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                </motion.div>
              </motion.button>
              
              {langMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className={`absolute right-0 mt-2 w-32 ${styles.bgCard} backdrop-blur-xl rounded-lg shadow-xl border ${styles.border} py-1 z-50`}
                  role="listbox"
                  aria-label={lang === 'zh' ? '语言选项' : 'Language options'}
                >
                  {languages.map((l, idx) => (
                    <motion.button
                      key={l.code}
                      onClick={() => switchLang(l.code)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ x: 5, backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
                      className={`w-full flex items-center gap-2 px-4 py-3 min-h-[44px] text-sm transition-colors ${
                        l.code === lang ? 'text-emerald-500 bg-emerald-500/10' : styles.navText
                      }`}
                      role="option"
                      aria-selected={l.code === lang}
                    >
                      <span>{l.label}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center gap-1">
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.9 }}
              className={`p-3 min-h-[44px] min-w-[44px] flex items-center justify-center ${styles.navText}`}
              aria-label={theme === 'dark' ? (lang === 'zh' ? '切换到浅色模式' : 'Switch to light mode') : (lang === 'zh' ? '切换到深色模式' : 'Switch to dark mode')}
            >
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </motion.button>

            <div className="relative">
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className={`flex items-center gap-1 px-3 py-2 min-h-[44px] text-sm font-medium border rounded-lg ${styles.navText} ${styles.border}`}
                aria-label={lang === 'zh' ? '选择语言' : 'Select language'}
                aria-expanded={langMenuOpen}
              >
                <span>{currentLang?.label}</span>
                <motion.div
                  animate={{ rotate: langMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-3 h-3" aria-hidden="true" />
                </motion.div>
              </button>
              
              {langMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`absolute right-0 mt-2 w-28 ${styles.bgCard} rounded-lg shadow-xl border ${styles.border} py-1 z-50`}
                  role="listbox"
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => switchLang(l.code)}
                      className={`w-full flex items-center gap-2 px-3 py-3 min-h-[44px] text-sm hover:bg-emerald-500/10 ${
                        l.code === lang ? 'text-emerald-500 bg-emerald-500/10' : styles.navText
                      }`}
                      role="option"
                      aria-selected={l.code === lang}
                    >
                      <span>{l.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
            
            <motion.button 
              onClick={() => setIsOpen(!isOpen)} 
              whileTap={{ scale: 0.9 }}
              className={`${styles.navText} p-3 min-h-[44px] min-w-[44px] flex items-center justify-center`}
              aria-label={isOpen ? (lang === 'zh' ? '关闭菜单' : 'Close menu') : (lang === 'zh' ? '打开菜单' : 'Open menu')}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
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
          id="mobile-menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className={`md:hidden ${styles.bgCard} backdrop-blur-xl border-t ${styles.border}`}
          role="menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item, index) => (
              <motion.a 
                key={item.href} 
                href={item.href} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`block px-3 py-3 min-h-[44px] ${styles.navText} ${styles.navTextHover} hover:bg-emerald-500/10 rounded-md transition-colors flex items-center`} 
                onClick={() => setIsOpen(false)}
                role="menuitem"
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
