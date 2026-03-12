'use client';

import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Lang } from '@/lib/translations';

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  lang: Lang;
  t: {
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

  const navItems: NavItem[] = [
    { label: t.home, href: `/${lang}` },
    { label: t.about, href: `/${lang}/about` },
    { label: t.business, href: `/${lang}/business` },
    { label: t.projects, href: `/${lang}/projects` },
    { label: t.news, href: `/${lang}/news` },
    { label: t.contact, href: `/${lang}/contact` },
  ];

  const languages = [
    { code: 'zh', label: '中文', flag: '🇨🇳' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
  ];

  const currentLang = languages.find(l => l.code === lang);

  const switchLang = (newLang: string) => {
    window.location.href = window.location.pathname.replace(`/${lang}`, `/${newLang}`);
    setLangMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href={`/${lang}`} className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">江能</span>
              </div>
              <span className="text-xl font-bold text-gray-900">JanoEnergy</span>
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-gray-600 hover:text-emerald-600 font-medium transition-colors">
                {item.label}
              </a>
            ))}
            
            {/* Language Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-emerald-600 border border-gray-300 rounded-lg hover:border-emerald-300 transition-colors"
              >
                <span className="text-base">{currentLang?.flag}</span>
                <span>{currentLang?.label}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => switchLang(l.code)}
                      className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        l.code === lang ? 'text-emerald-600 bg-emerald-50' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-base">{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Language Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 px-2 py-1 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg"
              >
                <span>{currentLang?.flag}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => switchLang(l.code)}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 ${
                        l.code === lang ? 'text-emerald-600 bg-emerald-50' : 'text-gray-700'
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-900 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="block px-3 py-2 text-gray-600 hover:text-emerald-600 hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
