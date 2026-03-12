import Link from 'next/link';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { sampleProjects } from '@/data';

const categoryLabels: Record<string, { name: string; color: string }> = {
  wind: { name: '风电', color: 'bg-blue-100 text-blue-700' },
  solar: { name: '光伏', color: 'bg-amber-100 text-amber-700' },
  storage: { name: '储能', color: 'bg-emerald-100 text-emerald-700' },
};

const statusLabels: Record<string, { name: string; color: string }> = {
  completed: { name: '已完工', color: 'bg-green-100 text-green-700' },
  'in-progress': { name: '建设中', color: 'bg-blue-100 text-blue-700' },
  planned: { name: '规划中', color: 'bg-gray-100 text-gray-700' },
};

export default function AdminProjectsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">项目管理</h1>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          新建项目
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索项目名称..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>
          <div className="flex gap-3">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white">
              <option value="">全部类型</option>
              <option value="wind">风电</option>
              <option value="solar">光伏</option>
              <option value="storage">储能</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white">
              <option value="">全部状态</option>
              <option value="completed">已完工</option>
              <option value="in-progress">建设中</option>
              <option value="planned">规划中</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">项目信息</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">类型</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">地点</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">容量</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">状态</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">完工日期</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sampleProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg">
                          {project.category === 'wind' ? '💨' : project.category === 'solar' ? '☀️' : '🔋'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{project.title}</p>
                        <p className="text-sm text-gray-500 line-clamp-1">{project.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryLabels[project.category].color}`}>
                      {categoryLabels[project.category].name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{project.location}</td>
                  <td className="px-6 py-4 text-gray-600">{project.capacity}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusLabels[project.status].color}`}>
                      {statusLabels[project.status].name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{project.completionDate || '-'}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-emerald-600 transition-colors" title="查看">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-blue-600 transition-colors" title="编辑">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-red-600 transition-colors" title="删除">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">共 {sampleProjects.length} 个项目</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>
              上一页
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
