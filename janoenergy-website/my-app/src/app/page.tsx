import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import HomeContent from './[lang]/HomeContent';
import { translations } from '@/lib/translations';

export const metadata: Metadata = {
  title: '江能集团 - 清洁能源，绿色未来 | JanoEnergy - Clean Energy, Green Future',
  description: '江能新能源集团 - 专注于风电、光伏、储能等新能源开发、投资、建设、运营的全产业链服务商',
};

export default function HomePage() {
  const t = translations['zh'];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar lang="zh" t={t.nav} />
      <main className="flex-1">
        <HomeContent lang="zh" />
      </main>
      <Footer lang="zh" t={t.footer} />
    </div>
  );
}
