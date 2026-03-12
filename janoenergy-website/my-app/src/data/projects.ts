export interface Project {
  id: string;
  title: string;
  titleEn: string;
  category: 'wind' | 'solar' | 'storage';
  location: string;
  locationEn: string;
  capacity: string;
  description: string;
  descriptionEn: string;
  image: string;
  date: string;
  status: 'completed' | 'in-progress' | 'planning';
}

export const projects: Project[] = [
  {
    id: '1',
    title: '西龙虎峪60MW风电项目',
    titleEn: 'Xilonghu Valley 60MW Wind Farm',
    category: 'wind',
    location: '天津市蓟州区',
    locationEn: 'Jizhou District, Tianjin',
    capacity: '60MW',
    description: '项目位于天津市蓟州区西龙虎峪镇，装机容量60MW，采用20台3.0MW风力发电机组。项目年发电量约1.2亿千瓦时，每年可节约标准煤约3.6万吨，减少二氧化碳排放约9.5万吨。',
    descriptionEn: 'Located in Xilonghu Town, Jizhou District, Tianjin. 60MW capacity with 20 units of 3.0MW wind turbines. Annual generation of 120 million kWh.',
    image: '/images/projects/wind.jpg',
    date: '2024-06-15',
    status: 'completed',
  },
  {
    id: '2',
    title: '广东茂名50MW光伏项目',
    titleEn: 'Maoming Guangdong 50MW Solar Project',
    category: 'solar',
    location: '广东省茂名市',
    locationEn: 'Maoming City, Guangdong Province',
    capacity: '50MW',
    description: '项目位于广东省茂名市，占地面积约1200亩，装机容量50MW。项目采用高效单晶硅组件，年发电量约5500万千瓦时。',
    descriptionEn: 'Located in Maoming City, Guangdong Province. 50MW capacity covering 1200 acres with high-efficiency monocrystalline modules.',
    image: '/images/projects/solar.jpg',
    date: '2024-05-20',
    status: 'completed',
  },
  {
    id: '3',
    title: '四川甘孜100MW光伏储能项目',
    titleEn: 'Ganzi Sichuan 100MW Solar-Storage Project',
    category: 'storage',
    location: '四川省甘孜州',
    locationEn: 'Ganzi Prefecture, Sichuan Province',
    capacity: '100MW + 20MWh',
    description: '项目位于四川省甘孜州，装机容量100MW光伏+20MWh储能。光储一体化设计，有效提升新能源消纳能力。',
    descriptionEn: 'Located in Ganzi Prefecture, Sichuan Province. 100MW solar + 20MWh storage integrated design.',
    image: '/images/projects/storage.jpg',
    date: '2024-08-01',
    status: 'in-progress',
  },
  {
    id: '4',
    title: '河北张家口80MW风电项目',
    titleEn: 'Zhangjiakou Hebei 80MW Wind Farm',
    category: 'wind',
    location: '河北省张家口市',
    locationEn: 'Zhangjiakou City, Hebei Province',
    capacity: '80MW',
    description: '项目位于河北省张家口市，装机容量80MW，是京津冀地区重要的清洁能源项目。',
    descriptionEn: 'Located in Zhangjiakou City, Hebei Province. 80MW capacity, an important clean energy project for the Beijing-Tianjin-Hebei region.',
    image: '/images/projects/wind-2.jpg',
    date: '2024-09-15',
    status: 'planning',
  },
  {
    id: '5',
    title: '山东青岛30MW分布式光伏项目',
    titleEn: 'Qingdao Shandong 30MW Distributed Solar',
    category: 'solar',
    location: '山东省青岛市',
    locationEn: 'Qingdao City, Shandong Province',
    capacity: '30MW',
    description: '项目位于山东省青岛市，利用工业园区屋顶建设分布式光伏电站，装机容量30MW。',
    descriptionEn: 'Located in Qingdao City, Shandong Province. 30MW distributed solar on industrial park rooftops.',
    image: '/images/projects/solar-2.jpg',
    date: '2024-07-10',
    status: 'completed',
  },
  {
    id: '6',
    title: '内蒙古50MW储能电站项目',
    titleEn: 'Inner Mongolia 50MW Energy Storage Station',
    category: 'storage',
    location: '内蒙古自治区',
    locationEn: 'Inner Mongolia Autonomous Region',
    capacity: '50MW/100MWh',
    description: '项目位于内蒙古自治区，建设50MW/100MWh电化学储能电站，为电网提供调峰调频服务。',
    descriptionEn: 'Located in Inner Mongolia. 50MW/100MWh battery energy storage station providing grid peak shaving and frequency regulation.',
    image: '/images/projects/storage-2.jpg',
    date: '2024-10-01',
    status: 'in-progress',
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(p => p.id === id);
};

export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') return projects;
  return projects.filter(p => p.category === category);
};
