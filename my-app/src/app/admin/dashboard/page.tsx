'use client';

import { useState, useEffect, useCallback } from 'react';
import { FileText, Users, Newspaper, TrendingUp, ArrowRight, Calendar, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { API_ENDPOINTS } from '@/lib/api';
import LoadingSpinner, { CardSkeleton } from '@/components/Loading';
import { toast } from 'sonner';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';

interface Stats {
  projects: number;
  news: number;
  users: number;
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ projects: 0, news: 0, users: 0 });
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentNews, setRecentNews] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchData = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);
    else setRefreshing(true);
    
    try {
      const [projectsRes, newsRes, usersRes] = await Promise.all([
        fetch(API_ENDPOINTS.projects),
        fetch(API_ENDPOINTS.news),
        fetch(API_ENDPOINTS.users),
      ]);

      if (projectsRes.ok) {
        const projects = await projectsRes.json();
        setStats(prev => ({ ...prev, projects: projects.length }));
        setRecentProjects(projects.slice(0, 5));
        
        // 项目状态分布数据
        const statusCount = { planning: 0, construction: 0, operation: 0 };
        projects.forEach((p: any) => {
          if (statusCount[p.status] !== undefined) statusCount[p.status]++;
        });
        setProjectData([
          { name: '规划中', value: statusCount.planning, color: '#9ca3af' },
          { name: '建设中', value: statusCount.construction, color: '#f59e0b' },
          { name: '运营中', value: statusCount.operation, color: '#10b981' },
        ]);
        
        // 项目类型分布
        const categoryCount = { wind: 0, solar: 0, storage: 0 };
        projects.forEach((p: any) => {
          if (categoryCount[p.category] !== undefined) categoryCount[p.category]++;
        });
        setCategoryData([
          { name: '风电', value: categoryCount.wind },
          { name: '光伏', value: categoryCount.solar },
          { name: '储能', value: categoryCount.storage },
        ]);
      }
      if (newsRes.ok) {
        const news = await newsRes.json();
        setStats(prev => ({ ...prev, news: news.length }));
        setRecentNews(news.slice(0, 5));
      }
      if (usersRes.ok) {
        const users = await usersRes.json();
        setStats(prev => ({ ...prev, users: users.length }));
      }
      setLastUpdated(new Date());
    } catch (error) {
      console.error(error);
      toast.error('数据加载失败');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // 初始加载
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 自动刷新（每30秒）
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      fetchData(false);
    }, 30000);
    
    return () => clearInterval(interval);
  }, [autoRefresh, fetchData]);

  // 手动刷新
  const handleRefresh = () => {
    fetchData(false);
    toast.success('数据已刷新');
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <CardSkeleton />
      </div>
    );
  }

  const statCards = [
    { label: '项目总数', value: stats.projects, icon: FileText, color: 'bg-blue-500', href: '/admin/projects', trend: '+12%' },
    { label: '新闻动态', value: stats.news, icon: Newspaper, color: 'bg-green-500', href: '/admin/news', trend: '+5%' },
    { label: '系统用户', value: stats.users, icon: Users, color: 'bg-purple-500', href: '/admin/users', trend: '+8%' },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">仪表盘</h1>
          <p className="text-gray-500 mt-1">
            今天是 {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500"
            />
            自动刷新
          </label>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            刷新
          </button>
        </div>
      </div>

      {/* Last Updated */}
      <div className="text-sm text-gray-500 mb-4">
        最后更新: {lastUpdated.toLocaleTimeString('zh-CN')}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-500">{stat.trend}</span>
                    <span className="text-xs text-gray-400">较上月</span>
                  </div>
                </div>
                <div className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Project Status Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">项目状态分布</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {projectData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">项目类型分布</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-gray-900">最近项目</h3>
            </div>
            <Link href="/admin/projects" className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center">
              查看全部 <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {recentProjects.map((project: any) => (
              <div key={project.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-medium text-gray-900">{project.title}</p>
                  <p className="text-sm text-gray-500">{project.location} · {project.capacity}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  project.status === 'operation' ? 'bg-green-100 text-green-700' :
                  project.status === 'construction' ? 'bg-amber-100 text-amber-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {project.status === 'operation' ? '运营中' :
                   project.status === 'construction' ? '建设中' : '规划中'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent News */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-gray-900">最新新闻</h3>
            </div>
            <Link href="/admin/news" className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center">
              查看全部 <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {recentNews.map((item: any) => (
              <div key={item.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <p className="font-medium text-gray-900 line-clamp-1">{item.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    item.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {item.isPublished ? '已发布' : '草稿'}
                  </span>
                  <span className="text-xs text-gray-400">
                    {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('zh-CN') : '-'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
