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

export const news: NewsItem[] = [
  {
    id: '1',
    title: '江能集团西龙虎峪风电项目成功并网发电',
    titleEn: 'JanoEnergy Xilonghu Wind Farm Successfully Connected to Grid',
    summary: '2024年6月15日，江能集团投资的西龙虎峪60MW风电项目成功并网发电，标志着公司在天津地区的新能源布局迈出重要一步。',
    summaryEn: 'On June 15, 2024, JanoEnergy\'s Xilonghu 60MW wind farm was successfully connected to the grid.',
    content: '2024年6月15日，江能集团投资的西龙虎峪60MW风电项目成功并网发电，标志着公司在天津地区的新能源布局迈出重要一步。\n\n该项目位于天津市蓟州区西龙虎峪镇，装机容量60MW，采用20台3.0MW风力发电机组。项目年发电量约1.2亿千瓦时，每年可节约标准煤约3.6万吨，减少二氧化碳排放约9.5万吨，为京津冀地区清洁能源供应做出重要贡献。\n\n江能集团表示，该项目的成功并网是公司坚持绿色发展理念、积极响应国家"双碳"战略的具体实践。未来，公司将继续加大新能源投资力度，为构建清洁低碳、安全高效的能源体系贡献力量。',
    contentEn: 'On June 15, 2024, JanoEnergy\'s Xilonghu 60MW wind farm was successfully connected to the grid, marking an important step in the company\'s new energy layout in the Tianjin region.',
    image: '/images/news/news-1.jpg',
    date: '2024-06-15',
    category: 'company',
  },
  {
    id: '2',
    title: '国家发改委发布《2024年新能源发展指导意见》',
    titleEn: 'NDRC Releases 2024 New Energy Development Guidelines',
    summary: '国家发改委近日发布《2024年新能源发展指导意见》，明确提出到2024年底新能源装机规模达到12亿千瓦的目标。',
    summaryEn: 'The National Development and Reform Commission recently released guidelines for new energy development in 2024.',
    content: '国家发改委近日发布《2024年新能源发展指导意见》，明确提出到2024年底新能源装机规模达到12亿千瓦的目标。\n\n《意见》指出，要加快推进大型风电光伏基地建设，推动分布式能源开发利用，促进新能源消纳。同时，要加强储能设施建设，提高电力系统调节能力。\n\n业内专家表示，这一政策的出台将进一步推动新能源行业高质量发展，为相关企业带来新的发展机遇。',
    contentEn: 'The NDRC recently released guidelines targeting 1.2 billion kW of new energy capacity by the end of 2024.',
    image: '/images/news/news-2.jpg',
    date: '2024-06-10',
    category: 'policy',
  },
  {
    id: '3',
    title: '光伏组件价格持续下降，行业迎来发展新机遇',
    titleEn: 'Solar Module Prices Continue to Decline, Industry Sees New Opportunities',
    summary: '近期光伏组件价格持续下降，单晶硅组件价格已降至历史低位，为光伏电站投资带来更好的经济性。',
    summaryEn: 'Solar module prices have continued to decline recently, reaching historic lows.',
    content: '近期光伏组件价格持续下降，单晶硅组件价格已降至历史低位，为光伏电站投资带来更好的经济性。\n\n据行业数据显示，当前单晶硅组件价格较去年同期下降约30%，这使得光伏电站的投资回收期进一步缩短。业内专家预计，随着技术进步和规模效应的发挥，光伏成本仍有下降空间。\n\n江能集团表示，将抓住这一有利时机，加快光伏项目开发步伐，为更多地区提供清洁能源解决方案。',
    contentEn: 'Solar module prices have declined by about 30% year-over-year, shortening the payback period for solar projects.',
    image: '/images/news/news-3.jpg',
    date: '2024-06-05',
    category: 'industry',
  },
  {
    id: '4',
    title: '江能集团与某央企签署战略合作协议',
    titleEn: 'JanoEnergy Signs Strategic Cooperation Agreement with Central SOE',
    summary: '江能集团与某大型央企签署战略合作协议，双方将在新能源项目开发、投资、建设等领域开展深度合作。',
    summaryEn: 'JanoEnergy has signed a strategic cooperation agreement with a major central SOE.',
    content: '江能集团与某大型央企签署战略合作协议，双方将在新能源项目开发、投资、建设等领域开展深度合作。\n\n根据协议，双方将充分发挥各自优势，共同开发风电、光伏、储能等新能源项目，预计合作规模将超过500MW。\n\n江能集团表示，此次合作是公司实施"强强联合"战略的重要举措，将进一步提升公司的市场竞争力和项目开发能力。',
    contentEn: 'JanoEnergy has signed a strategic cooperation agreement with a major central SOE for joint development of new energy projects.',
    image: '/images/news/news-4.jpg',
    date: '2024-05-28',
    category: 'company',
  },
  {
    id: '5',
    title: '储能产业迎来政策红利，市场规模快速增长',
    titleEn: 'Energy Storage Industry Benefits from Policy Support, Market Expands Rapidly',
    summary: '随着新型电力系统建设的推进，储能产业迎来政策红利期，市场规模呈现快速增长态势。',
    summaryEn: 'The energy storage industry is benefiting from policy support as the market expands rapidly.',
    content: '随着新型电力系统建设的推进，储能产业迎来政策红利期，市场规模呈现快速增长态势。\n\n据行业统计，2024年上半年新型储能装机规模同比增长超过100%，其中电化学储能占据主导地位。政策层面，多地出台储能补贴政策，鼓励储能项目建设。\n\n江能集团紧跟行业发展趋势，已在多个省份布局储能项目，为客户提供光储一体化解决方案。',
    contentEn: 'New energy storage capacity grew over 100% year-over-year in the first half of 2024.',
    image: '/images/news/news-5.jpg',
    date: '2024-05-20',
    category: 'industry',
  },
  {
    id: '6',
    title: '江能集团荣获"2024年度新能源行业优秀企业"称号',
    titleEn: 'JanoEnergy Awarded "2024 Excellent New Energy Enterprise"',
    summary: '在近日举行的2024新能源行业年度评选中，江能集团荣获"年度新能源行业优秀企业"称号。',
    summaryEn: 'JanoEnergy was awarded "2024 Excellent New Energy Enterprise" at the annual industry selection.',
    content: '在近日举行的2024新能源行业年度评选中，江能集团荣获"年度新能源行业优秀企业"称号。\n\n该评选由行业协会主办，旨在表彰在新能源领域做出突出贡献的企业。评委会认为，江能集团在项目开发、技术创新、社会责任等方面表现突出，是行业发展的典范。\n\n江能集团表示，将以此次获奖为动力，继续坚持绿色发展理念，为推动能源转型和实现"双碳"目标做出更大贡献。',
    contentEn: 'JanoEnergy was recognized for outstanding contributions in project development, technology innovation, and social responsibility.',
    image: '/images/news/news-6.jpg',
    date: '2024-05-15',
    category: 'company',
  },
];

export const getNewsById = (id: string): NewsItem | undefined => {
  return news.find(n => n.id === id);
};

export const getNewsByCategory = (category: string): NewsItem[] => {
  if (category === 'all') return news;
  return news.filter(n => n.category === category);
};

export const getLatestNews = (count: number = 3): NewsItem[] => {
  return news.slice(0, count);
};
