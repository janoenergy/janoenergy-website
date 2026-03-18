// 静态项目数据 - 用于静态导出
export interface Project {
  id: number;
  title: string;
  titleEn: string;
  category: 'wind' | 'solar' | 'storage';
  location: string;
  locationEn: string;
  capacity: string;
  description: string;
  descriptionEn: string;
  imageUrl: string;
  status: 'operation' | 'construction' | 'planning';
  startDate: string | null;
  endDate: string | null;
}

// 项目图片
const projectImages = {
  wind: [
    'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1548337138-e87d889cc369?w=800&auto=format&fit=crop',
  ],
  solar: [
    'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&auto=format&fit=crop',
  ],
  storage: [
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1565514020176-dbf2277e4955?w=800&auto=format&fit=crop',
  ],
};

// 静态项目数据
export const staticProjects: Project[] = [
  {
    id: 1,
    title: '西龙虎峪60MW风电项目',
    titleEn: 'Xilonghu Valley 60MW Wind Power Project',
    category: 'wind',
    location: '天津市蓟州区',
    locationEn: 'Jizhou District, Tianjin',
    capacity: '60MW',
    description: '项目总投资约4.5亿元，安装24台2.5MW风力发电机组，年发电量约1.2亿千瓦时。',
    descriptionEn: 'Total investment of about 450 million yuan, 24 sets of 2.5MW wind turbines, annual power generation of about 120 million kWh.',
    imageUrl: projectImages.wind[0],
    status: 'construction',
    startDate: '2024-03-01T00:00:00.000Z',
    endDate: null,
  },
  {
    id: 2,
    title: '广东清远100MW光伏项目',
    titleEn: 'Qingyuan 100MW Solar Project',
    category: 'solar',
    location: '广东省清远市',
    locationEn: 'Qingyuan City, Guangdong',
    capacity: '100MW',
    description: '项目总投资约3.8亿元，占地约2000亩，年发电量约1.1亿千瓦时。',
    descriptionEn: 'Total investment of about 380 million yuan, covering about 2000 acres, annual power generation of about 110 million kWh.',
    imageUrl: projectImages.solar[0],
    status: 'operation',
    startDate: '2023-06-01T00:00:00.000Z',
    endDate: '2024-06-01T00:00:00.000Z',
  },
  {
    id: 3,
    title: '四川凉山50MW风电项目',
    titleEn: 'Liangshan 50MW Wind Power Project',
    category: 'wind',
    location: '四川省凉山州',
    locationEn: 'Liangshan Prefecture, Sichuan',
    capacity: '50MW',
    description: '项目总投资约3.5亿元，安装20台2.5MW风力发电机组，年发电量约1.0亿千瓦时。',
    descriptionEn: 'Total investment of about 350 million yuan, 20 sets of 2.5MW wind turbines, annual power generation of about 100 million kWh.',
    imageUrl: projectImages.wind[1],
    status: 'planning',
    startDate: null,
    endDate: null,
  },
  {
    id: 4,
    title: '内蒙古乌兰察布80MW风电项目',
    titleEn: 'Ulanqab 80MW Wind Power Project',
    category: 'wind',
    location: '内蒙古自治区乌兰察布市',
    locationEn: 'Ulanqab City, Inner Mongolia',
    capacity: '80MW',
    description: '项目总投资约5.2亿元，安装32台2.5MW风力发电机组，年发电量约1.6亿千瓦时。项目于2022年6月并网发电，目前已稳定运行超过2年。',
    descriptionEn: 'Total investment of about 520 million yuan, 32 sets of 2.5MW wind turbines, annual power generation of about 160 million kWh. Grid-connected in June 2022, stable operation for over 2 years.',
    imageUrl: projectImages.wind[2],
    status: 'operation',
    startDate: '2021-09-01T00:00:00.000Z',
    endDate: '2022-06-30T00:00:00.000Z',
  },
  {
    id: 5,
    title: '山东德州30MW分布式光伏项目',
    titleEn: 'Dezhou 30MW Distributed Solar Project',
    category: 'solar',
    location: '山东省德州市',
    locationEn: 'Dezhou City, Shandong',
    capacity: '30MW',
    description: '项目总投资约1.2亿元，利用工商业屋顶建设分布式光伏电站，年发电量约3500万千瓦时。项目采用自发自用、余电上网模式，为企业降低用电成本。',
    descriptionEn: 'Total investment of about 120 million yuan, utilizing commercial and industrial rooftops for distributed solar power, annual generation of about 35 million kWh. Self-consumption with surplus power fed to grid.',
    imageUrl: projectImages.solar[1],
    status: 'operation',
    startDate: '2023-03-01T00:00:00.000Z',
    endDate: '2023-12-31T00:00:00.000Z',
  },
  {
    id: 6,
    title: '江苏盐城100MWh储能电站项目',
    titleEn: 'Yancheng 100MWh Energy Storage Project',
    category: 'storage',
    location: '江苏省盐城市',
    locationEn: 'Yancheng City, Jiangsu',
    capacity: '100MWh',
    description: '项目总投资约4.0亿元，建设100MWh电化学储能电站，配套50MW/100MWh磷酸铁锂电池系统。项目参与电网调峰调频，提供辅助服务。',
    descriptionEn: 'Total investment of about 400 million yuan, constructing 100MWh electrochemical energy storage station with 50MW/100MWh lithium iron phosphate battery system. Provides grid peak shaving and frequency regulation services.',
    imageUrl: projectImages.storage[0],
    status: 'construction',
    startDate: '2024-06-01T00:00:00.000Z',
    endDate: null,
  },
  {
    id: 7,
    title: '河北张家口200MW光伏基地项目',
    titleEn: 'Zhangjiakou 200MW Solar Base Project',
    category: 'solar',
    location: '河北省张家口市',
    locationEn: 'Zhangjiakou City, Hebei',
    capacity: '200MW',
    description: '项目总投资约7.5亿元，建设大型地面光伏电站，配套储能设施。项目充分利用张家口地区丰富的太阳能资源，年发电量约2.4亿千瓦时。',
    descriptionEn: 'Total investment of about 750 million yuan, large-scale ground-mounted solar power plant with energy storage facilities. Utilizes abundant solar resources in Zhangjiakou, annual generation of about 240 million kWh.',
    imageUrl: projectImages.solar[2],
    status: 'planning',
    startDate: null,
    endDate: null,
  },
  {
    id: 8,
    title: '湖南郴州45MW风电项目',
    titleEn: 'Chenzhou 45MW Wind Power Project',
    category: 'wind',
    location: '湖南省郴州市',
    locationEn: 'Chenzhou City, Hunan',
    capacity: '45MW',
    description: '项目总投资约3.0亿元，安装18台2.5MW风力发电机组，年发电量约9000万千瓦时。项目采用低风速风机技术，充分利用当地风资源。',
    descriptionEn: 'Total investment of about 300 million yuan, 18 sets of 2.5MW wind turbines, annual generation of about 90 million kWh. Utilizes low wind speed turbine technology.',
    imageUrl: projectImages.wind[3],
    status: 'operation',
    startDate: '2022-01-01T00:00:00.000Z',
    endDate: '2022-12-31T00:00:00.000Z',
  },
  {
    id: 9,
    title: '浙江宁波50MW光储一体化项目',
    titleEn: 'Ningbo 50MW Solar-Storage Integration Project',
    category: 'storage',
    location: '浙江省宁波市',
    locationEn: 'Ningbo City, Zhejiang',
    capacity: '50MW+25MWh',
    description: '项目总投资约2.8亿元，建设50MW光伏电站配套25MWh储能系统。项目实现光储协同运行，提高新能源消纳能力，参与电力市场交易。',
    descriptionEn: 'Total investment of about 280 million yuan, 50MW solar plant with 25MWh energy storage system. Achieves solar-storage coordinated operation, improving renewable energy consumption.',
    imageUrl: projectImages.storage[1],
    status: 'construction',
    startDate: '2024-01-01T00:00:00.000Z',
    endDate: null,
  },
  {
    id: 10,
    title: '云南大理150MW光伏项目',
    titleEn: 'Dali 150MW Solar Project',
    category: 'solar',
    location: '云南省大理州',
    locationEn: 'Dali Prefecture, Yunnan',
    capacity: '150MW',
    description: '项目总投资约5.8亿元，建设山地光伏电站，充分利用云南高原太阳能资源。项目年发电量约1.9亿千瓦时，助力西南地区清洁能源发展。',
    descriptionEn: 'Total investment of about 580 million yuan, mountain solar power plant utilizing highland solar resources. Annual generation of about 190 million kWh, supporting clean energy development in southwest China.',
    imageUrl: projectImages.solar[3],
    status: 'planning',
    startDate: null,
    endDate: null,
  },
  {
    id: 11,
    title: '山西大同70MW风电项目',
    titleEn: 'Datong 70MW Wind Power Project',
    category: 'wind',
    location: '山西省大同市',
    locationEn: 'Datong City, Shanxi',
    capacity: '70MW',
    description: '项目总投资约4.6亿元，安装28台2.5MW风力发电机组，年发电量约1.4亿千瓦时。项目充分利用山西北部优质风资源，助力能源转型。',
    descriptionEn: 'Total investment of about 460 million yuan, 28 sets of 2.5MW wind turbines, annual generation of about 140 million kWh. Utilizes high-quality wind resources in northern Shanxi.',
    imageUrl: projectImages.wind[0],
    status: 'operation',
    startDate: '2021-06-01T00:00:00.000Z',
    endDate: '2022-03-31T00:00:00.000Z',
  },
  {
    id: 12,
    title: '甘肃酒泉200MWh储能项目',
    titleEn: 'Jiuquan 200MWh Energy Storage Project',
    category: 'storage',
    location: '甘肃省酒泉市',
    locationEn: 'Jiuquan City, Gansu',
    capacity: '200MWh',
    description: '项目总投资约8.0亿元，建设200MWh大型储能电站，配套新能源基地。项目提供电网侧储能服务，参与调峰调频和备用容量市场。',
    descriptionEn: 'Total investment of about 800 million yuan, 200MWh large-scale energy storage station supporting renewable energy base. Provides grid-side storage services for peak shaving and frequency regulation.',
    imageUrl: projectImages.storage[2],
    status: 'planning',
    startDate: null,
    endDate: null,
  },
];

// 统计数据
export const staticStats = {
  capacity: 1135,
  projects: 12,
  provinces: 12,
  year: 2018,
};

// 从容量字符串提取 MW 数值
export function parseCapacity(capacityStr: string): number {
  if (!capacityStr) return 0;
  const mwMatch = capacityStr.match(/(\d+)\s*MW/i);
  if (mwMatch) return parseInt(mwMatch[1], 10);
  const numMatch = capacityStr.match(/(\d+)/);
  return numMatch ? parseInt(numMatch[1], 10) : 0;
}

// 从地址提取省份
export function extractProvince(location: string): string {
  if (!location) return '';
  const match = location.match(/^([^省市]+)[省市]/);
  return match ? match[1] : location.split('省')[0].split('市')[0];
}
