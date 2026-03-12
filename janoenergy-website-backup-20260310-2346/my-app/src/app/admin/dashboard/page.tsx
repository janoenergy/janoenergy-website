'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FolderKanban,
  FileText,
  Image,
  Users,
  TrendingUp,
  Plus,
  LogOut,
} from 'lucide-react';

const stats = [
  { label: '项目总数', value: '24', icon: FolderKanban, color: 'bg-blue-500' },
  { label: '文章数量', value: '56', icon: FileText, color: 'bg-emerald-500' },
  { label: '媒体文件', value: '128', icon: Image, color: 'bg-amber-500' },
  { label: '用户数量', value: '8', icon: Users, color: 'bg-purple-500' },
];

const recentProjects = [
  { id: '1', title: '西龙虎峪60MW风电项目', category: '风电', date: '2024-06-15', status: 'completed' },
  { id: '2', title: '广东茂名50MW光伏项目', category: '光伏', date: '2024-06-10', status: 'completed' },
  { id: '3', title: '四川甘孜100MW光伏储能项目', category: '储能', date: '2024-06-05', status: 'in-progress' },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 检查登录状态
    const userData = localStorage.getItem('admin_user');
    if (!userData) {
      router.push('/admin/login');
      return;
    }
    setUser(JSON.parse(userData));
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">控制台</h1>
          <p className="text-sm text-gray-500 mt-1">
            欢迎回来，{user?.username || '管理员'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{new Date().toLocaleDateString('zh-CN')}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            退出
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">快捷操作</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            新建项目
          </Link>
          <Link
            href="/admin/content/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            发布文章
          </Link>
          <Link
            href="/admin/media/upload"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            上传媒体
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">最近项目</h2>
            <Link href="/admin/projects" className="text-sm text-emerald-600 hover:text-emerald-700">
              查看全部
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentProjects.map((project) => (
              <div key={project.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">{project.title}</p>
                  <p className="text-sm text-gray-500">{project.category} · {project.date}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  project.status === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {project.status === 'completed' ? '已完工' : '建设中'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Stats Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">访问统计</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
              <div className="text-center text-gray-400">
                <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                <p>访问统计图表</p>
                <p className="text-sm">（接入 Cloudflare Analytics 后显示）</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">1,234</p>
                <p className="text-sm text-gray-500">今日访问</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">8,567</p>
                <p className="text-sm text-gray-500">本周访问</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">32,456</p>
                <p className="text-sm text-gray-500">本月访问</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
