import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: '江能集团 - 清洁能源，绿色未来 | JanoEnergy - Clean Energy, Green Future',
  description: '江能新能源集团 - 专注于风电、光伏、储能等新能源开发、投资、建设、运营的全产业链服务商',
};

export default function RootPage() {
  redirect('/zh');
}
