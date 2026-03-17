import { generateMetadata as generateSEOMetadata, pageMetadata } from '@/lib/seo';
import { translations, Lang } from '@/lib/translations';
import { PageLayout } from '@/components/layout/PageLayout';
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
  return (
    <PageLayout lang={params.lang}>
      <ProjectsContent lang={params.lang} />
    </PageLayout>
  );
}
