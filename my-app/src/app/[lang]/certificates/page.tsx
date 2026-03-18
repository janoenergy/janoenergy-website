import { Award, Shield } from 'lucide-react';
import { translations, Lang } from '@/lib/translations';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import PageHero from '@/components/PageHero';

export function generateStaticParams() {
  return [{ lang: 'zh' }, { lang: 'en' }];
}

export default function CertificatesPage({ params: { lang } }: { params: { lang: Lang } }) {
  const t = translations[lang];

  const certificates = [
    { id: 1, title: lang === 'zh' ? '电力工程施工总承包一级' : 'First-Class Power Engineering', issuer: lang === 'zh' ? '住房和城乡建设部' : 'MOHURD', date: '2023-06' },
    { id: 2, title: lang === 'zh' ? '承装（修、试）电力设施许可证' : 'Power Facility License', issuer: lang === 'zh' ? '国家能源局' : 'NEA', date: '2023-03' },
    { id: 3, title: 'ISO 9001', issuer: lang === 'zh' ? '中国质量认证中心' : 'CQC', date: '2024-01' },
    { id: 4, title: 'ISO 14001', issuer: lang === 'zh' ? '中国质量认证中心' : 'CQC', date: '2024-01' },
    { id: 5, title: lang === 'zh' ? '高新技术企业' : 'High-Tech Enterprise', issuer: lang === 'zh' ? '科技部' : 'MOST', date: '2023-12' },
    { id: 6, title: lang === 'zh' ? '安全生产许可证' : 'Safety License', issuer: lang === 'zh' ? '应急管理部' : 'MEM', date: '2023-09' },
  ];

  const honors = [
    { id: 1, title: lang === 'zh' ? '2023年度新能源行业领军企业' : 'Leading Enterprise 2023', issuer: lang === 'zh' ? '中国新能源行业协会' : 'CNEIA', year: '2023' },
    { id: 2, title: lang === 'zh' ? '优秀EPC总承包商' : 'Excellent EPC Contractor', issuer: lang === 'zh' ? '中国电力企业联合会' : 'CEC', year: '2023' },
    { id: 3, title: lang === 'zh' ? '绿色能源创新奖' : 'Green Energy Innovation', issuer: lang === 'zh' ? '国际能源署' : 'IEA', year: '2024' },
    { id: 4, title: lang === 'zh' ? '最佳风电项目开发商' : 'Best Wind Developer', issuer: lang === 'zh' ? '全球风能理事会' : 'GWEC', year: '2023' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar lang={lang} t={t.nav} />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 text-white py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {lang === 'zh' ? '资质荣誉' : 'Certificates & Honors'}
            </h1>
            <p className="text-lg md:text-xl text-emerald-100 max-w-2xl">
              {lang === 'zh' ? '专注于新能源开发、投资、建设、运营的全产业链服务商' : 'Full-chain service provider in new energy development, investment, construction, and operation'}
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground text-left mb-12">{lang === 'zh' ? '资质证书' : 'Certificates'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certificates.map((cert) => (
                <div key={cert.id} className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-border">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{cert.title}</h3>
                  <p className="text-muted-foreground">{cert.issuer}</p>
                  <p className="text-sm text-muted-foreground">{cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground text-left mb-12">{lang === 'zh' ? '荣誉奖项' : 'Honors'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {honors.map((honor) => (
                <div key={honor.id} className="flex items-center gap-4 p-6 bg-card rounded-2xl border border-border">
                  <div className="w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <span className="text-sm text-emerald-600 font-semibold">{honor.year}</span>
                    <h3 className="font-bold text-foreground">{honor.title}</h3>
                    <p className="text-muted-foreground">{honor.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} t={t.footer} />
    </div>
  );
}
