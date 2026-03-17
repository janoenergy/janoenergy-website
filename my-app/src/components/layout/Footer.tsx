'use client';

import Link from 'next/link';
import { translations, Lang } from '@/lib/translations';
import { useThemeStyles } from '@/lib/theme';

export function Footer({ lang, t }: { lang: Lang; t: typeof translations.zh.footer }) {
  const currentYear = new Date().getFullYear();
  const styles = useThemeStyles();
  
  const quickLinks = [
    { href: `/${lang}/about`, label: lang === 'zh' ? '关于我们' : 'About Us' },
    { href: `/${lang}/business`, label: lang === 'zh' ? '业务板块' : 'Business' },
    { href: `/${lang}/projects`, label: lang === 'zh' ? '项目案例' : 'Projects' },
    { href: `/${lang}/news`, label: lang === 'zh' ? '新闻中心' : 'News' },
    { href: '/oa/login/', label: lang === 'zh' ? '综合管理平台' : 'OA Platform', external: true },
  ];

  const contactInfo = [
    { icon: '📍', label: t.address, value: lang === 'zh' ? '天津市滨海新区' : 'Binhai New Area, Tianjin' },
    { icon: '📞', label: t.phone, value: '+86 400-888-9999' },
    { icon: '✉️', label: t.email, value: 'contact@janoenergy.com' },
  ];

  return (
    <footer className={`${styles.bg} ${styles.text} border-t ${styles.border} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">{lang === 'zh' ? '江能集团' : 'JanoEnergy'}</h3>
            <p className={`${styles.textMuted} mb-6 max-w-md`}>{t.description}</p>
            <div className={`${styles.textMuted} text-sm`}>
              <p>关注我们即将开放</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t.quickLinks}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a 
                      href={link.href} 
                      className={`${styles.textMuted} hover:text-emerald-500 transition-colors`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className={`${styles.textMuted} hover:text-emerald-500 transition-colors`}>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t.contact}</h4>
            <ul className="space-y-3">
              {contactInfo.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span>{item.icon}</span>
                  <div>
                    <p className={`text-sm ${styles.textMuted}`}>{item.label}</p>
                    <p className={styles.textSecondary}>{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`border-t ${styles.border} mt-12 pt-8 text-center ${styles.textMuted}`}>
          <p>&copy; {currentYear} {lang === 'zh' ? '江能新能源集团' : 'JanoEnergy Group'}. {t.rights}</p>
        </div>
      </div>
    </footer>
  );
}
