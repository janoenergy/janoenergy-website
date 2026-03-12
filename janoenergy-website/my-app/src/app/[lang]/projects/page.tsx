import { generateMetadata as generateSEOMetadata, pageMetadata } from '@/lib/seo';
import { translations, Lang } from '@/lib/translations';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import ProjectsContent from './ProjectsContent';

export function generateStaticParams() {
  return [{ lang: 'zh' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: { params: { lang: Lang } }) {
  const meta = pageMetadata.projects;
  return generateSEOMetadata({
    title: params.lang === 'zh' ? meta.title : meta.titleEn,
    description: params.lang === 'zh' ? meta.description : meta.descriptionEn,
    path: '/projects',
  });
}

export default function ProjectsPage({ params }: { params: { lang: Lang } }) {
  const t = translations[params.lang];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar lang={params.lang} t={t.nav} />
      <main className="flex-1">
        <ProjectsContent lang={params.lang} />
      </main>
      <Footer lang={params.lang} t={t.footer} />
    </div>
  );
}
