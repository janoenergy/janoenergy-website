import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 创建管理员用户
  const adminPassword = await hash('jano', 10);
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@janoenergy.com',
      passwordHash: adminPassword,
      name: '管理员',
      role: 'admin',
      department: '管理层',
    },
  });

  // 创建员工用户
  const employeePassword = await hash('123456', 10);
  const employee = await prisma.user.upsert({
    where: { username: 'employee001' },
    update: {},
    create: {
      username: 'employee001',
      email: 'employee001@janoenergy.com',
      passwordHash: employeePassword,
      name: '张三',
      role: 'employee',
      department: '业务部',
    },
  });

  // 创建经理用户
  const managerPassword = await hash('123456', 10);
  const manager = await prisma.user.upsert({
    where: { username: 'manager001' },
    update: {},
    create: {
      username: 'manager001',
      email: 'manager001@janoenergy.com',
      passwordHash: managerPassword,
      name: '李四',
      role: 'manager',
      department: '业务部',
    },
  });

  // 创建示例项目
  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: '西龙虎峪60MW风电项目',
        titleEn: 'Xilonghu 60MW Wind Farm',
        category: 'wind',
        location: '天津市蓟州区',
        locationEn: 'Jizhou District, Tianjin',
        capacity: '60MW',
        description: '项目位于天津市蓟州区西龙虎峪镇，总装机容量60MW，年发电量约1.2亿千瓦时。',
        imageUrl: '/images/projects/wind.jpg',
        status: 'completed',
      },
      {
        title: '滨海新区100MW光伏项目',
        titleEn: 'Binhai New Area 100MW Solar Project',
        category: 'solar',
        location: '天津市滨海新区',
        locationEn: 'Binhai New Area, Tianjin',
        capacity: '100MW',
        description: '项目位于天津市滨海新区，总装机容量100MW，采用高效单晶硅组件。',
        imageUrl: '/images/projects/solar.jpg',
        status: 'in-progress',
      },
      {
        title: '储能电站示范项目',
        titleEn: 'Energy Storage Demonstration Project',
        category: 'storage',
        location: '河北省唐山市',
        locationEn: 'Tangshan, Hebei',
        capacity: '50MWh',
        description: '项目配置50MWh储能系统，用于电网调峰调频。',
        imageUrl: '/images/projects/storage.jpg',
        status: 'planning',
      },
    ],
  });

  // 创建示例新闻
  await prisma.news.createMany({
    skipDuplicates: true,
    data: [
      {
        title: '江能集团2024年度工作会议召开',
        titleEn: 'JanoEnergy Group 2024 Annual Work Conference Held',
        summary: '会议总结了2023年工作成果，部署了2024年重点任务。',
        content: '江能集团2024年度工作会议于3月1日在天津召开。会议总结了2023年工作成果，部署了2024年重点任务。集团董事长出席会议并作重要讲话。',
        category: 'company',
        isPublished: true,
        publishedAt: new Date(),
      },
      {
        title: '新能源行业政策解读：2024年发展趋势',
        titleEn: 'New Energy Industry Policy Interpretation: 2024 Development Trends',
        summary: '国家出台多项支持新能源发展的政策，行业迎来新机遇。',
        content: '近期，国家出台多项支持新能源发展的政策，包括风电、光伏、储能等领域的补贴和税收优惠政策。行业专家解读认为，2024年新能源行业将迎来新的发展机遇。',
        category: 'policy',
        isPublished: true,
        publishedAt: new Date(),
      },
    ],
  });

  console.log('Seed data created successfully');
  console.log({ admin, employee, manager });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
