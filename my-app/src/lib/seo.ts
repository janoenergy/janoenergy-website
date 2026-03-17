import { Metadata } from 'next';

export const siteConfig = {
  name: '江能集团',
  nameEn: 'JanoEnergy',
  description: '江能新能源集团 - 专注于风电、光伏、储能等新能源开发、投资、建设、运营的全产业链服务商',
  descriptionEn: 'JanoEnergy Group - Full-chain new energy service provider specializing in wind, solar, and energy storage',
  url: 'https://janoenergy.com',
  ogImage: 'https://janoenergy.com/og-image.jpg',
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
      default: `${title} | ${siteConfig.name}`,
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

// 各页面 metadata 配置
export const pageMetadata = {
  home: {
    title: '首页',
    titleEn: 'Home',
    description: '江能新能源集团 - 专注于风电、光伏、储能等新能源开发、投资、建设、运营的全产业链服务商',
    descriptionEn: 'JanoEnergy Group - Full-chain new energy service provider specializing in wind, solar, and energy storage',
  },
  about: {
    title: '关于江能',
    titleEn: 'About Us',
    description: '了解江能集团的发展历程、企业文化和核心价值观',
    descriptionEn: 'Learn about JanoEnergy history, culture and core values',
  },
  business: {
    title: '业务板块',
    titleEn: 'Business',
    description: '新能源开发、投资、EPC总承包、运营管理全产业链服务',
    descriptionEn: 'Full-chain services: development, investment, EPC, operation',
  },
  projects: {
    title: '项目案例',
    titleEn: 'Projects',
    description: '风电、光伏、储能项目案例展示',
    descriptionEn: 'Wind, solar and energy storage project showcase',
  },
  news: {
    title: '新闻中心',
    titleEn: 'News',
    description: '江能集团最新动态与新能源行业资讯',
    descriptionEn: 'Latest news and industry updates from JanoEnergy',
  },
  contact: {
    title: '联系我们',
    titleEn: 'Contact',
    description: '期待与您的合作，联系江能集团',
    descriptionEn: 'Get in touch with JanoEnergy',
  },
};
