import { Lang } from '@/lib/translations';

interface FooterProps {
  lang: Lang;
  t: {
    quickLinks: string;
    contact: string;
    copyright: string;
  };
}

export function Footer({ lang, t }: FooterProps) {
  const quickLinks = [
    { label: lang === 'zh' ? '关于我们' : 'About Us', href: `/${lang}/about` },
    { label: lang === 'zh' ? '业务板块' : 'Business', href: `/${lang}/business` },
    { label: lang === 'zh' ? '项目案例' : 'Projects', href: `/${lang}/projects` },
    { label: lang === 'zh' ? '新闻中心' : 'News', href: `/${lang}/news` },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">江能</span>
              </div>
              <span className="text-xl font-bold">JanoEnergy</span>
            </div>
            <p className="text-gray-400 text-sm">
              {lang === 'zh' 
                ? '专注于新能源开发、投资、建设、运营的全产业链服务商'
                : 'Full-chain service provider specializing in new energy development, investment, construction, and operation'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.quickLinks}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.contact}</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Tianjin, China</li>
              <li>contact@janoenergy.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} JanoEnergy Group. {t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
