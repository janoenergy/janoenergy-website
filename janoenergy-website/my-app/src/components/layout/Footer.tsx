import Link from 'next/link';
import { translations, Lang } from '@/lib/translations';

export function Footer({ lang, t }: { lang: Lang; t: typeof translations.zh.footer }) {
  const currentYear = new Date().getFullYear();
  
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
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">{lang === 'zh' ? '江能集团' : 'JanoEnergy'}</h3>
            <p className="text-slate-400 mb-6 max-w-md">{t.description}</p>
            {/* 社交媒体链接暂时注释，待配置后启用
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors" title="微信公众号">
                <span className="text-lg">📱</span>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors" title="微博">
                <span className="text-lg">💬</span>
              </a>
              <a href="mailto:contact@janoenergy.com" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors" title="发送邮件">
                <span className="text-lg">📧</span>
              </a>
            </div>
            */}
            <div className="text-slate-500 text-sm">
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
                      className="text-slate-400 hover:text-emerald-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-slate-400 hover:text-emerald-400 transition-colors">
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
                    <p className="text-sm text-slate-500">{item.label}</p>
                    <p className="text-slate-300">{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500">
          <p>&copy; {currentYear} {lang === 'zh' ? '江能新能源集团' : 'JanoEnergy Group'}. {t.rights}</p>
        </div>
      </div>
    </footer>
  );
}
