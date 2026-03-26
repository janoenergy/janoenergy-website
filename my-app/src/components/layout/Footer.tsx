'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
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
    { icon: MapPin, label: t.address, value: lang === 'zh' ? '天津市滨海新区' : 'Binhai New Area, Tianjin' },
    { icon: Phone, label: t.phone, value: '+86 400-888-9999' },
    { icon: Mail, label: t.email, value: 'contact@janoenergy.com' },
  ];

  return (
    <footer className={`${styles.bg} ${styles.text} border-t ${styles.border} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <motion.h3 
              className="text-2xl font-bold mb-4"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              {lang === 'zh' ? '江能集团' : 'JanoEnergy'}
            </motion.h3>
            <p className={`${styles.textMuted} mb-6 max-w-md`}>{t.description}</p>
            <div className={`${styles.textMuted} text-sm`}>
              <p>关注我们即将开放</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t.quickLinks}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                >
                  {link.external ? (
                    <a 
                      href={link.href} 
                      className={`${styles.textMuted} hover:text-emerald-500 transition-all duration-300 inline-block`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link 
                      href={link.href} 
                      className={`${styles.textMuted} hover:text-emerald-500 transition-all duration-300 inline-block`}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t.contact}</h4>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.li 
                    key={item.label} 
                    className="flex items-start gap-3 group"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className="w-5 h-5 text-emerald-500 mt-0.5 group-hover:text-emerald-400 transition-colors" />
                    </motion.div>
                    <div>
                      <p className={`text-sm ${styles.textMuted}`}>{item.label}</p>
                      <p className={`${styles.textSecondary} group-hover:text-emerald-500 transition-colors`}>{item.value}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>

        <motion.div 
          className={`border-t ${styles.border} mt-12 pt-8 text-center ${styles.textMuted}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p>&copy; {currentYear} {lang === 'zh' ? '江能集团 - 清洁能源，绿色未来' : 'JanoEnergy Group'}. {t.rights}</p>
        </motion.div>
      </div>
    </footer>
  );
}
