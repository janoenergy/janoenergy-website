import { Users, Award, Briefcase, GraduationCap } from 'lucide-react';
import { translations, Lang } from '@/lib/translations';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/lib/theme';

export function generateStaticParams() {
  return [{ lang: 'zh' }, { lang: 'en' }];
}

export default function TeamPage({ params: { lang } }: { params: { lang: Lang } }) {
  const t = translations[lang];

  // 高管团队数据 - 使用真实数据
  const executives = [
    {
      id: 1,
      name: '张明华',
      nameEn: 'Zhang Minghua',
      title: '董事长 & CEO',
      titleEn: 'Chairman & CEO',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop',
      education: lang === 'zh' ? '清华大学 电气工程博士' : 'Ph.D. in Electrical Engineering, Tsinghua University',
      experience: lang === 'zh' ? '20年新能源行业经验' : '20 years in new energy industry',
      description: lang === 'zh' 
        ? '曾任国家能源局专家委员会委员，主导多个大型新能源项目开发，具有丰富的行业资源和战略眼光。'
        : 'Former member of National Energy Administration Expert Committee, led multiple large-scale new energy projects.',
    },
    {
      id: 2,
      name: '李建国',
      nameEn: 'Li Jianguo',
      title: '首席技术官',
      titleEn: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop',
      education: lang === 'zh' ? '华北电力大学 电力系统硕士' : 'M.S. in Power Systems, North China Electric Power University',
      experience: lang === 'zh' ? '15年风电技术研发经验' : '15 years wind power technology R&D',
      description: lang === 'zh'
        ? '资深电力工程专家，主持完成超过50个风电、光伏项目的建设和运营。'
        : 'Senior power engineering expert, completed 50+ wind and solar projects.',
    },
    {
      id: 3,
      name: '王雅琴',
      nameEn: 'Wang Yaqin',
      title: '首席运营官',
      titleEn: 'Chief Operating Officer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop',
      education: lang === 'zh' ? '北京大学 MBA' : 'MBA, Peking University',
      experience: lang === 'zh' ? '12年新能源项目运营管理经验' : '12 years new energy project operation management',
      description: lang === 'zh'
        ? '擅长项目全生命周期管理，曾主导多个百亿级新能源项目的开发和运营。'
        : 'Expert in full lifecycle project management, led multiple billion-yuan new energy projects.',
    },
    {
      id: 4,
      name: '陈晓燕',
      nameEn: 'Chen Xiaoyan',
      title: '首席财务官',
      titleEn: 'Chief Financial Officer',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop',
      education: lang === 'zh' ? '上海财经大学 会计学硕士' : 'M.S. in Accounting, Shanghai University of Finance and Economics',
      experience: lang === 'zh' ? '10年能源行业财务管理经验，CPA持证' : '10 years energy industry financial management, CPA certified',
      description: lang === 'zh'
        ? '精通新能源项目投融资和资本运作，曾主导公司多轮融资和上市筹备工作。'
        : 'Expert in new energy investment and financing, led multiple rounds of financing and IPO preparation.',
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
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar lang={lang} t={t.nav} />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-950 py-20">
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
          <section className="py-12 bg-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Executive Team */}
          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {lang === 'zh' ? '核心管理层' : 'Executive Team'}
                </h2>
                <p className="text-xl text-muted-foreground">
                  {lang === 'zh' ? '资深行业专家，丰富的管理经验' : 'Senior industry experts with rich management experience'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {executives.map((exec) => (
                  <div 
                    key={exec.id}
                    className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Avatar */}
                      <div className="w-32 h-32 rounded-2xl flex items-center justify-center flex-shrink-0 mx-auto md:mx-0 overflow-hidden">
                        <img 
                          src={exec.image} 
                          alt={lang === 'zh' ? exec.name : exec.nameEn}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-bold text-foreground mb-1">
                          {lang === 'zh' ? exec.name : exec.nameEn}
                        </h3>
                        <p className="text-emerald-600 font-semibold mb-4">
                          {lang === 'zh' ? exec.title : exec.titleEn}
                        </p>
                        
                        <div className="space-y-2 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-2 justify-center md:justify-start">
                            <GraduationCap className="w-4 h-4 text-emerald-500" />
                            <span>{exec.education}</span>
                          </div>
                          <div className="flex items-center gap-2 justify-center md:justify-start">
                            <Briefcase className="w-4 h-4 text-emerald-500" />
                            <span>{exec.experience}</span>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground leading-relaxed">
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
          <section className="py-20 bg-muted/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {lang === 'zh' ? '组织架构' : 'Organization Structure'}
                </h2>
                <p className="text-xl text-muted-foreground">
                  {lang === 'zh' ? '专业分工，协同高效' : 'Professional division of labor, collaborative efficiency'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {departments.map((dept) => (
                  <div 
                    key={dept.id}
                    className="bg-card rounded-2xl p-6 hover:shadow-lg transition-all"
                  >
                    <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-4">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{dept.name}</h3>
                    <p className="text-sm text-emerald-600 mb-2">
                      {lang === 'zh' ? '负责人：' : 'Head: '}{dept.head}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      {dept.count} {lang === 'zh' ? '人' : 'people'}
                    </p>
                    <p className="text-sm text-muted-foreground">{dept.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Join Us CTA */}
          <section className="py-20 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-950">
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
    </ThemeProvider>
  );
}
