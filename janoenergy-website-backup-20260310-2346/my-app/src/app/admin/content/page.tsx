import Link from 'next/link';
import { Plus, Search, Edit, Trash2, Eye, Calendar } from 'lucide-react';
import { sampleNews } from '@/data';

export default function AdminContentPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">内容管理</h1>
        <Link
          href="/admin/content/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          发布文章
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索文章标题..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white">
            <option value="">全部分类</option>
            <option value="company">公司动态</option>
            <option value="industry">行业资讯</option>
          </select>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleNews.map((news) => (
          <div key={news.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
            {/* Cover Image */}
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
              <div className="text-4xl opacity-30">
                {news.category === 'company' ? '📢' : '📰'}
              </div>
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  news.category === 'company'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {news.category === 'company' ? '公司动态' : '行业资讯'}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                {news.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{news.summary}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  {news.publishedAt}
                </div>
                <div className="flex items-center gap-1">
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
              </div>
            </div>
          </div>
        ))}

        {/* Add New Card */}
        <Link
          href="/admin/content/new"
          className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-8 hover:border-emerald-300 hover:bg-emerald-50 transition-colors min-h-[280px]"
        >
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <Plus className="w-8 h-8 text-emerald-600" />
          </div>
          <p className="text-gray-600 font-medium">发布新文章</p>
        </Link>
      </div>
    </div>
  );
}
