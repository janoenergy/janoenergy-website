import { generateMetadata as generateSEOMetadata, pageMetadata } from '@/lib/seo';
import { translations, Lang } from '@/lib/translations';
import ProjectsContent from './ProjectsContent';
import { staticProjects } from '@/data/projects';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ThemeProvider } from '@/lib/theme';

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

// 获取项目数据 - 服务器端
async function getProjects() {
  try {
    // 尝试从 API 获取
    const response = await fetch('https://api.janoenergy.com/api/projects', {
      next: { revalidate: 60 }, // 60秒缓存
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('API fetch failed, using static data:', error);
  }
  // 如果 API 失败，使用静态数据
  return staticProjects;
}

export default async function ProjectsPage({ params }: { params: { lang: Lang } }) {
  const projects = await getProjects();
  const t = translations[params.lang];

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar lang={params.lang} t={t.nav} />
          <main className="flex-1">
            <ProjectsContent lang={params.lang} initialProjects={projects} />
          </main>
          <Footer lang={params.lang} t={t.footer} />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
