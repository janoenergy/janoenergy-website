import { generateMetadata as generateSEOMetadata, pageMetadata } from '@/lib/seo';
import { translations, Lang } from '@/lib/translations';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import HomeContent from './HomeContent';
import ParticleBackground from '@/components/ParticleBackground';
import StructuredData from '@/components/StructuredData';

export function generateStaticParams() {
  return [{ lang: 'zh' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: { params: { lang: Lang } }) {
  const meta = pageMetadata.home;
  return generateSEOMetadata({
    title: params.lang === 'zh' ? meta.title : meta.titleEn,
    description: params.lang === 'zh' ? meta.description : meta.descriptionEn,
    path: '/',
  });
}

export default function HomePage({ params }: { params: { lang: Lang } }) {
  const t = translations[params.lang];

  return (
    <div className="min-h-screen flex flex-col">
      {/* SEO结构化数据 */}
      <StructuredData type="Organization" lang={params.lang} />
      <StructuredData type="WebSite" lang={params.lang} />
      <StructuredData type="LocalBusiness" lang={params.lang} />
      <StructuredData 
        type="Service" 
        lang={params.lang}
        data={{
          name: params.lang === 'zh' ? '新能源解决方案' : 'New Energy Solutions',
          description: params.lang === 'zh' 
            ? '风电、光伏、储能全链条服务'
            : 'Wind, solar, and energy storage services',
          services: [
            { name: params.lang === 'zh' ? '风电开发' : 'Wind Power' },
            { name: params.lang === 'zh' ? '光伏开发' : 'Solar Power' },
            { name: params.lang === 'zh' ? '储能系统' : 'Energy Storage' },
            { name: params.lang === 'zh' ? 'EPC总承包' : 'EPC Contracting' },
          ],
        }}
      />
      
      <Navbar lang={params.lang} t={t.nav} />
      <main className="flex-1 relative">
        <ParticleBackground />
        <HomeContent lang={params.lang} />
      </main>
      <Footer lang={params.lang} t={t.footer} />
    </div>
  );
}
