import { Metadata } from 'next';

export const siteConfig = {
  name: '江能集团',
  nameEn: 'JanoEnergy',
  description: '江能新能源集团 - 专注于风电、光伏、储能等新能源开发、投资、建设、运营的全产业链服务商，覆盖12个省份，总装机容量1135MW+',
  descriptionEn: 'JanoEnergy Group - Full-chain new energy service provider specializing in wind, solar, and energy storage, covering 12 provinces with 1135MW+ capacity',
  url: 'https://janoenergy.com',
  ogImage: "https://janoenergy.com/og-image.svg",
};

export function generateMetadata({
  title,
  description,
  path = '',
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  
  return {
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords: ['新能源', '风电', '光伏', '储能', 'EPC', '江能集团', 'New Energy', 'Wind Power', 'Solar', 'Energy Storage'],
    authors: [{ name: '江能集团' }],
    creator: '江能集团',
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages: {
        'zh-CN': `/zh${path}`,
        'en-US': `/en${path}`,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'zh_CN',
      url,
      title: `${title} | ${siteConfig.name}`,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// 各页面 metadata 配置 - 优化后的标题（50-60字符）
export const pageMetadata = {
  home: {
    title: '江能集团 - 清洁能源，绿色未来 | 新能源开发投资运营平台',
    titleEn: 'JanoEnergy - Clean Energy, Green Future | New Energy Platform',
    description: '江能新能源集团 - 专注于风电、光伏、储能等新能源开发、投资、建设、运营的全产业链服务商，覆盖12个省份，总装机容量1135MW+',
    descriptionEn: 'JanoEnergy Group - Full-chain new energy service provider specializing in wind, solar, and energy storage, covering 12 provinces with 1135MW+ capacity',
  },
  about: {
    title: '关于江能集团 - 新能源行业领军企业 | 发展历程与企业文化',
    titleEn: 'About JanoEnergy - Leading New Energy Enterprise | History & Culture',
    description: '了解江能集团的发展历程、企业文化、核心价值观和管理团队。成立于2018年，专注新能源开发与运营。',
    descriptionEn: 'Learn about JanoEnergy history, corporate culture, core values and management team. Established in 2018, focusing on new energy development.',
  },
  business: {
    title: '业务板块 - 风电光伏储能全产业链服务 | EPC总承包',
    titleEn: 'Business - Wind Solar Storage Full-Chain Services | EPC Contracting',
    description: '新能源开发、投资、EPC总承包、运营管理全产业链服务。覆盖风电、光伏、储能等多种新能源形态。',
    descriptionEn: 'Full-chain services: development, investment, EPC contracting, operation. Covering wind, solar, energy storage and more.',
  },
  projects: {
    title: '项目案例 - 风电光伏储能项目展示 | 覆盖全国12个省份',
    titleEn: 'Projects - Wind Solar Energy Storage Showcase | 12 Provinces Coverage',
    description: '江能集团风电、光伏、储能项目案例展示。已成功开发和运营多个大型新能源项目，总装机容量1135MW+。',
    descriptionEn: 'JanoEnergy wind, solar and energy storage project showcase. Successfully developed and operated multiple large-scale projects.',
  },
  news: {
    title: '新闻中心 - 江能集团最新动态 | 新能源行业资讯',
    titleEn: 'News - JanoEnergy Latest Updates | New Energy Industry Insights',
    description: '江能集团最新动态、项目进展、企业新闻与新能源行业资讯。了解新能源政策、技术发展和市场趋势。',
    descriptionEn: 'JanoEnergy latest updates, project progress, corporate news and new energy industry insights.',
  },
  contact: {
    title: '联系我们 - 新能源项目合作咨询 | 江能集团联系方式',
    titleEn: 'Contact - New Energy Project Cooperation | JanoEnergy Contact',
    description: '期待与您的合作！联系江能集团进行新能源项目开发、投资合作、EPC总承包等业务咨询。',
    descriptionEn: 'Looking forward to cooperating with you! Contact JanoEnergy for project development, investment, and EPC services.',
  },
};
