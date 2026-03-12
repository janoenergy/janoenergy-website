import { Users, Award, Briefcase, GraduationCap } from 'lucide-react';
import { translations, Lang } from '@/lib/translations';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export function generateStaticParams() {
  return [{ lang: 'zh' }, { lang: 'en' }];
}

export default function TeamPage({ params: { lang } }: { params: { lang: Lang } }) {
  const t = translations[lang];

  // 高管团队数据
  const executives = [
    {
      id: 1,
      name: '张建华',
      nameEn: 'Zhang Jianhua',
      title: '董事长兼总经理',
      titleEn: 'Chairman & CEO',
      image: '/images/team/ceo.jpg',
      education: lang === 'zh' ? '清华大学 工商管理硕士' : 'Tsinghua University MBA',
      experience: lang === 'zh' ? '20年新能源行业经验' : '20 years in new energy',
      description: lang === 'zh' 
        ? '曾任国家能源集团高管，主导多个大型新能源项目开发，具有丰富的行业资源和战略眼光。'
        : 'Former executive at National Energy Group, led multiple large-scale new energy projects.',
    },
    {
      id: 2,
      name: '李明远',
      nameEn: 'Li Mingyuan',
      title: '副总经理',
      titleEn: 'VP of Operations',
      image: '/images/team/coo.jpg',
      education: lang === 'zh' ? '华北电力大学 电力工程博士' : 'North China Electric Power University PhD',
      experience: lang === 'zh' ? '15年电力工程管理经验' : '15 years in power engineering',
      description: lang === 'zh'
        ? '资深电力工程专家，主持完成超过50个风电、光伏项目的建设和运营。'
        : 'Senior power engineering expert, completed 50+ wind and solar projects.',
    },
    {
      id: 3,
      name: '王雪梅',
      nameEn: 'Wang Xuemei',
      title: '首席财务官',
      titleEn: 'CFO',
      image: '/images/team/cfo.jpg',
      education: lang === 'zh' ? '北京大学 金融学硕士' : 'Peking University Finance MBA',
      experience: lang === 'zh' ? '18年财务管理经验' : '18 years in financial management',
      description: lang === 'zh'
        ? '曾任四大会计师事务所高级经理，精通新能源项目投融资和资本运作。'
        : 'Former senior manager at Big Four accounting firm, expert in new energy investment.',
    },
    {
      id: 4,
      name: '陈志强',
      nameEn: 'Chen Zhiqiang',
      title: '技术总监',
      titleEn: 'CTO',
      image: '/images/team/cto.jpg',
      education: lang === 'zh' ? '浙江大学 电气工程博士' : 'Zhejiang University PhD in Electrical Engineering',
      experience: lang === 'zh' ? '16年新能源技术研发经验' : '16 years in R&D',
      description: lang === 'zh'
        ? '新能源技术领域专家，拥有多项发明专利，主导公司技术创新和数字化转型。'
        : 'New energy technology expert with multiple patents, leads innovation and digital transformation.',
    },
  ];

  // 部门负责人数据
  const departments = [
    {
      id: 1,
      name: lang === 'zh' ? '项目开发部' : 'Project Development',
      head: lang === 'zh' ? '刘洋' : 'Liu Yang',
      count: 25,
      description: lang === 'zh' 
        ? '负责新能源项目选址、可行性研究和前期开发'
        : 'Site selection, feasibility studies and early-stage development',
    },
    {
      id: 2,
      name: lang === 'zh' ? '工程建设部' : 'Engineering & Construction',
      head: lang === 'zh' ? '赵伟' : 'Zhao Wei',
      count: 45,
      description: lang === 'zh'
        ? '负责项目EPC总承包、施工管理和质量控制'
        : 'EPC contracting, construction management and quality control',
    },
    {
      id: 3,
      name: lang === 'zh' ? '运营管理部' : 'Operations',
      head: lang === 'zh' ? '孙丽' : 'Sun Li',
      count: 30,
      description: lang === 'zh'
        ? '负责电站运维、设备检修和性能优化'
        : 'Power station O&M, equipment maintenance and performance optimization',
    },
    {
      id: 4,
      name: lang === 'zh' ? '投资融资部' : 'Investment & Finance',
      head: lang === 'zh' ? '周涛' : 'Zhou Tao',
      count: 15,
      description: lang === 'zh'
        ? '负责项目投资分析、融资安排和资本运作'
        : 'Investment analysis, financing and capital operations',
    },
  ];

  // 公司数据
  const stats = [
    { label: lang === 'zh' ? '员工总数' : 'Total Employees', value: '200+' },
    { label: lang === 'zh' ? '技术人员' : 'Technical Staff', value: '120+' },
    { label: lang === 'zh' ? '硕士及以上' : 'Master+ Degree', value: '35%' },
    { label: lang === 'zh' ? '平均从业年限' : 'Avg. Experience', value: '10年' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar lang={lang} t={t.nav} />
      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {lang === 'zh' ? '管理团队' : 'Leadership Team'}
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              {lang === 'zh' 
                ? '专业、敬业、创新的精英团队，引领新能源行业发展'
                : 'Professional, dedicated and innovative team leading the new energy industry'}
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Executive Team */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {lang === 'zh' ? '核心管理层' : 'Executive Team'}
              </h2>
              <p className="text-xl text-gray-600">
                {lang === 'zh' ? '资深行业专家，丰富的管理经验' : 'Senior industry experts with rich management experience'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {executives.map((exec) => (
                <div 
                  key={exec.id}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Avatar Placeholder */}
                    <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                      <Users className="w-16 h-16 text-emerald-400" />
                    </div>
                    
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {lang === 'zh' ? exec.name : exec.nameEn}
                      </h3>
                      <p className="text-emerald-600 font-semibold mb-4">
                        {lang === 'zh' ? exec.title : exec.titleEn}
                      </p>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2 justify-center md:justify-start">
                          <GraduationCap className="w-4 h-4 text-emerald-500" />
                          <span>{exec.education}</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center md:justify-start">
                          <Briefcase className="w-4 h-4 text-emerald-500" />
                          <span>{exec.experience}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed">
                        {exec.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Departments */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {lang === 'zh' ? '组织架构' : 'Organization Structure'}
              </h2>
              <p className="text-xl text-gray-600">
                {lang === 'zh' ? '专业分工，协同高效' : 'Professional division of labor, collaborative efficiency'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {departments.map((dept) => (
                <div 
                  key={dept.id}
                  className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{dept.name}</h3>
                  <p className="text-sm text-emerald-600 mb-2">
                    {lang === 'zh' ? '负责人：' : 'Head: '}{dept.head}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    {dept.count} {lang === 'zh' ? '人' : 'people'}
                  </p>
                  <p className="text-sm text-gray-600">{dept.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="py-20 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {lang === 'zh' ? '加入我们' : 'Join Us'}
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              {lang === 'zh' 
                ? '与优秀的人一起，创造清洁能源的未来'
                : 'Work with excellent people to create a clean energy future'}
            </p>
            <a 
              href={`/${lang}/contact`}
              className="inline-flex items-center px-8 py-4 bg-white text-emerald-700 font-semibold rounded-lg hover:scale-105 transition-transform"
            >
              {lang === 'zh' ? '联系我们' : 'Contact Us'}
            </a>
          </div>
        </section>
      </main>
      <Footer lang={lang} t={t.footer} />
    </div>
  );
}
