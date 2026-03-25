export interface NewsItem {
  id: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  content: string;
  contentEn: string;
  image: string;
  date: string;
  category: 'company' | 'industry' | 'policy';
}

// 新闻图片 - 使用本地路径
const newsImages = {
  wind: '/images/projects/wind-farm.jpg',
  solar: '/images/projects/solar-farm.jpg',
  storage: '/images/projects/storage-battery.jpg',
  policy: '/images/business/investment.jpg',
  award: '/images/certificates/award.jpg',
  meeting: '/images/news/meeting.jpg',
};

export const news: NewsItem[] = [
  {
    id: '1',
    title: '江能集团西龙虎峪风电项目成功并网发电',
    titleEn: 'JanoEnergy Xilonghu Wind Farm Successfully Connected to Grid',
    summary: '2024年6月15日，江能集团投资的西龙虎峪60MW风电项目成功并网发电，标志着公司在天津地区的新能源布局迈出重要一步。',
    summaryEn: 'On June 15, 2024, JanoEnergy\'s Xilonghu 60MW wind farm was successfully connected to the grid.',
    content: '详细内容...',
    contentEn: 'Detailed content...',
    image: newsImages.wind,
    date: '2024-06-15',
    category: 'company',
  },
  {
    id: '2',
    title: '广东清远120MW光伏项目开工建设',
    titleEn: 'Guangdong Qingyuan 120MW Solar Project Starts Construction',
    summary: '江能集团在广东省清远市的120MW光伏项目正式开工建设，预计2025年3月建成投产。',
    summaryEn: 'JanoEnergy\'s 120MW solar project in Qingyuan, Guangdong has officially started construction.',
    content: '详细内容...',
    contentEn: 'Detailed content...',
    image: newsImages.solar,
    date: '2024-05-20',
    category: 'company',
  },
  {
    id: '3',
    title: '国家能源局发布《关于促进储能技术与产业发展的指导意见》',
    titleEn: 'National Energy Administration Issues Guidelines on Energy Storage Development',
    summary: '国家能源局发布新政策，明确储能产业发展目标和支持措施，为储能行业带来重大利好。',
    summaryEn: 'The National Energy Administration issued new policies clarifying energy storage development goals.',
    content: '详细内容...',
    contentEn: 'Detailed content...',
    image: newsImages.policy,
    date: '2024-04-10',
    category: 'policy',
  },
  {
    id: '4',
    title: '江能集团荣获"2023年度新能源行业领军企业"称号',
    titleEn: 'JanoEnergy Wins "2023 New Energy Industry Leading Enterprise" Award',
    summary: '在2023年度新能源行业评选中，江能集团凭借出色的项目开发能力和运营业绩荣获领军企业称号。',
    summaryEn: 'JanoEnergy won the Leading Enterprise award for outstanding project development and operations.',
    content: '详细内容...',
    contentEn: 'Detailed content...',
    image: newsImages.award,
    date: '2024-01-15',
    category: 'company',
  },
  {
    id: '5',
    title: '江苏盐城100MW储能电站投入商业运营',
    titleEn: 'Jiangsu Yancheng 100MW Energy Storage Station Begins Commercial Operation',
    summary: '江能集团投资建设的江苏盐城100MW/200MWh储能电站正式投入商业运营，为电网提供调峰调频服务。',
    summaryEn: 'JanoEnergy\'s Jiangsu Yancheng 100MW/200MWh energy storage station has begun commercial operation.',
    content: '详细内容...',
    contentEn: 'Detailed content...',
    image: newsImages.storage,
    date: '2023-12-28',
    category: 'company',
  },
  {
    id: '6',
    title: '2023全球新能源发展论坛在北京召开',
    titleEn: '2023 Global New Energy Development Forum Held in Beijing',
    summary: '来自全球的新能源行业专家齐聚北京，共同探讨碳中和背景下的新能源发展机遇与挑战。',
    summaryEn: 'New energy experts from around the world gathered in Beijing to discuss opportunities and challenges.',
    content: '详细内容...',
    contentEn: 'Detailed content...',
    image: newsImages.meeting,
    date: '2023-11-08',
    category: 'industry',
  },
];
