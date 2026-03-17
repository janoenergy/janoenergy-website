const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('开始添加测试数据...');

  // 1. 添加普通用户
  const passwordHash = await bcrypt.hash('123456', 10);
  
  const user1 = await prisma.user.upsert({
    where: { username: 'zhangsan' },
    update: {},
    create: {
      username: 'zhangsan',
      email: 'zhangsan@janoenergy.cn',
      passwordHash: passwordHash,
      name: '张三',
      role: 'employee',
      department: '开发部',
      isActive: true,
    },
  });
  console.log('用户创建:', user1.name);

  const user2 = await prisma.user.upsert({
    where: { username: 'lisi' },
    update: {},
    create: {
      username: 'lisi',
      email: 'lisi@janoenergy.cn',
      passwordHash: passwordHash,
      name: '李四',
      role: 'manager',
      department: '投资部',
      isActive: true,
    },
  });
  console.log('用户创建:', user2.name);

  const user3 = await prisma.user.upsert({
    where: { username: 'wangwu' },
    update: {},
    create: {
      username: 'wangwu',
      email: 'wangwu@janoenergy.cn',
      passwordHash: passwordHash,
      name: '王五',
      role: 'employee',
      department: '运营部',
      isActive: true,
    },
  });
  console.log('用户创建:', user3.name);

  // 2. 添加项目
  const project1 = await prisma.project.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: '西龙虎峪60MW风电项目',
      titleEn: 'Xilonghu Valley 60MW Wind Power Project',
      category: 'wind',
      location: '天津市蓟州区',
      locationEn: 'Jizhou District, Tianjin',
      capacity: '60MW',
      description: '项目总投资约4.5亿元，安装24台2.5MW风力发电机组，年发电量约1.2亿千瓦时。',
      descriptionEn: 'Total investment of about 450 million yuan, 24 sets of 2.5MW wind turbines, annual power generation of about 120 million kWh.',
      status: 'construction',
      startDate: new Date('2024-03-01'),
    },
  });
  console.log('项目创建:', project1.title);

  const project2 = await prisma.project.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: '广东清远100MW光伏项目',
      titleEn: 'Qingyuan 100MW Solar Project',
      category: 'solar',
      location: '广东省清远市',
      locationEn: 'Qingyuan City, Guangdong',
      capacity: '100MW',
      description: '项目总投资约3.8亿元，占地约2000亩，年发电量约1.1亿千瓦时。',
      descriptionEn: 'Total investment of about 380 million yuan, covering about 2000 acres, annual power generation of about 110 million kWh.',
      status: 'operation',
      startDate: new Date('2023-06-01'),
      endDate: new Date('2024-06-01'),
    },
  });
  console.log('项目创建:', project2.title);

  const project3 = await prisma.project.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: '四川凉山50MW风电项目',
      titleEn: 'Liangshan 50MW Wind Power Project',
      category: 'wind',
      location: '四川省凉山州',
      locationEn: 'Liangshan Prefecture, Sichuan',
      capacity: '50MW',
      description: '项目总投资约3.5亿元，安装20台2.5MW风力发电机组，年发电量约1.0亿千瓦时。',
      descriptionEn: 'Total investment of about 350 million yuan, 20 sets of 2.5MW wind turbines, annual power generation of about 100 million kWh.',
      status: 'planning',
    },
  });
  console.log('项目创建:', project3.title);

  // 3. 添加新闻
  const news1 = await prisma.news.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: '江能集团荣获2024年度新能源投资优秀企业',
      titleEn: 'Jano Energy Group Won 2024 Outstanding New Energy Investment Enterprise',
      summary: '在近日举行的中国新能源产业峰会上，江能集团凭借在新能源领域的卓越表现，荣获"2024年度新能源投资优秀企业"称号。',
      summaryEn: 'At the China New Energy Industry Summit, Jano Energy Group was awarded "2024 Outstanding New Energy Investment Enterprise".',
      content: '在近日举行的中国新能源产业峰会上，江能集团凭借在新能源领域的卓越表现，荣获"2024年度新能源投资优秀企业"称号。该奖项是对江能集团在风电、光伏等新能源领域投资成果的充分肯定。\n\n截至目前，江能集团已在全国多个省市投资建设新能源项目，总装机容量超过500MW，年发电量超过10亿千瓦时，为地方经济发展和能源结构转型做出了积极贡献。',
      contentEn: 'At the China New Energy Industry Summit, Jano Energy Group was awarded "2024 Outstanding New Energy Investment Enterprise". This award fully recognizes Jano Energy Group\'s investment achievements in wind power, solar and other new energy fields.\n\nTo date, Jano Energy Group has invested in new energy projects in multiple provinces and cities across the country, with a total installed capacity of over 500MW and annual power generation of over 1 billion kWh.',
      category: 'company',
      isPublished: true,
      publishedAt: new Date('2024-12-15'),
    },
  });
  console.log('新闻创建:', news1.title);

  const news2 = await prisma.news.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: '西龙虎峪风电项目顺利并网发电',
      titleEn: 'Xilonghu Valley Wind Power Project Successfully Connected to Grid',
      summary: '经过一年多的建设，西龙虎峪60MW风电项目于近日顺利并网发电，标志着项目建设取得重大进展。',
      summaryEn: 'After more than a year of construction, the Xilonghu Valley 60MW wind power project was successfully connected to the grid.',
      content: '经过一年多的建设，西龙虎峪60MW风电项目于近日顺利并网发电，标志着项目建设取得重大进展。\n\n该项目是江能集团在天津地区投资建设的重点项目，总投资约4.5亿元，安装24台2.5MW风力发电机组。项目并网后，预计年发电量可达1.2亿千瓦时，每年可节约标准煤约3.6万吨，减少二氧化碳排放约9万吨。',
      contentEn: 'After more than a year of construction, the Xilonghu Valley 60MW wind power project was successfully connected to the grid.\n\nThis project is a key project invested and constructed by Jano Energy Group in Tianjin, with a total investment of about 450 million yuan. After grid connection, the annual power generation is expected to reach 120 million kWh.',
      category: 'project',
      isPublished: true,
      publishedAt: new Date('2024-11-20'),
    },
  });
  console.log('新闻创建:', news2.title);

  const news3 = await prisma.news.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: '国家能源局发布2025年新能源发展指导意见',
      titleEn: 'National Energy Administration Releases 2025 New Energy Development Guidance',
      summary: '国家能源局近日发布《2025年新能源发展指导意见》，明确提出到2025年底，全国风电、光伏发电装机容量达到12亿千瓦以上。',
      summaryEn: 'The National Energy Administration recently released guidance proposing that national wind and solar power installed capacity reach over 1.2 billion kW by the end of 2025.',
      content: '国家能源局近日发布《2025年新能源发展指导意见》，明确提出到2025年底，全国风电、光伏发电装机容量达到12亿千瓦以上。\n\n意见指出，要坚持集中式与分布式并举，加快建设大型风电光伏基地，推动分布式能源开发利用。同时，要完善新能源消纳机制，提高新能源利用率。',
      contentEn: 'The National Energy Administration recently released guidance proposing that national wind and solar power installed capacity reach over 1.2 billion kW by the end of 2025.\n\nThe guidance points out that we should adhere to both centralized and distributed development.',
      category: 'industry',
      isPublished: true,
      publishedAt: new Date('2025-01-10'),
    },
  });
  console.log('新闻创建:', news3.title);

  console.log('测试数据添加完成！');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
