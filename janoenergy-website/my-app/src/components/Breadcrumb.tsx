'use client';

import { ChevronRight, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Lang } from '@/lib/translations';

interface BreadcrumbProps {
  lang: Lang;
}

export function Breadcrumb({ lang }: BreadcrumbProps) {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);
  
  // 移除语言代码
  if (paths[0] === 'zh' || paths[0] === 'en') {
    paths.shift();
  }

  const breadcrumbMap: Record<string, { zh: string; en: string }> = {
    'about': { zh: '关于江能', en: 'About Us' },
    'business': { zh: '业务板块', en: 'Business' },
    'projects': { zh: '项目案例', en: 'Projects' },
    'news': { zh: '新闻中心', en: 'News' },
    'contact': { zh: '联系我们', en: 'Contact' },
  };

  if (paths.length === 0) return null;

  return (
    <nav className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <a href={`/${lang}`} className="flex items-center text-gray-500 hover:text-emerald-600 transition-colors">
              <Home className="w-4 h-4" />
            </a>
          </li>
          {paths.map((path, index) => (
            <li key={path} className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <span className={index === paths.length - 1 ? 'text-emerald-600 font-medium' : 'text-gray-500'}>
                {breadcrumbMap[path]?.[lang] || path}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
