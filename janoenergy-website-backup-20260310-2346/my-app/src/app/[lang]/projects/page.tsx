import { translations, Lang } from '@/lib/translations';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import ProjectsContent from './ProjectsContent';

export function generateStaticParams() {
  return [{ lang: 'zh' }, { lang: 'en' }];
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
