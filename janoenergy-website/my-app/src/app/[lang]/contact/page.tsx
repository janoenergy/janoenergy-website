import { generateMetadata as generateSEOMetadata, pageMetadata } from '@/lib/seo';
import { translations, Lang } from '@/lib/translations';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import ContactContent from './ContactContent';

export function generateStaticParams() {
  return [{ lang: 'zh' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: { params: { lang: Lang } }) {
  const meta = pageMetadata.contact;
  return generateSEOMetadata({
    title: params.lang === 'zh' ? meta.title : meta.titleEn,
    description: params.lang === 'zh' ? meta.description : meta.descriptionEn,
    path: '/contact',
  });
}

export default function ContactPage({ params }: { params: { lang: Lang } }) {
  const t = translations[params.lang];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar lang={params.lang} t={t.nav} />
      <main className="flex-1">
        <ContactContent lang={params.lang} />
      </main>
      <Footer lang={params.lang} t={t.footer} />
    </div>
  );
}
