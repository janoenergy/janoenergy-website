'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Search, Eye, EyeOff } from 'lucide-react';
import { API_ENDPOINTS } from '@/lib/api';
import { toast } from 'sonner';

interface NewsItem {
  id: number;
  title: string;
  titleEn?: string;
  summary?: string;
  content?: string;
  category: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
}

// 优化后的按钮组件
function Button({ children, onClick, variant = 'primary', size = 'md', disabled = false, className = '' }: any) {
  const base = 'inline-flex items-center justify-center rounded-lg font-medium transition-all active:scale-95';
  const variants = {
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    ghost: 'hover:bg-gray-100 text-gray-600',
  };
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-sm', lg: 'px-6 py-2.5' };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant as keyof typeof variants]} ${sizes[size as keyof typeof sizes]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
}

// 优化后的弹窗组件
function Modal({ isOpen, onClose, title, children }: any) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {children}
        </div>
      </div>
    </div>
  );
}

// 优化后的输入组件
function Input({ label, value, onChange, type = 'text', placeholder = '', required = false }: any) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm"
      />
    </div>
  );
}

// 优化后的选择组件
function Select({ label, value, onChange, options, required = false }: any) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm bg-white"
      >
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

// 优化后的文本域组件
function TextArea({ label, value, onChange, rows = 4, placeholder = '' }: any) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm resize-none"
      />
    </div>
  );
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    summary: '',
    content: '',
    category: 'company',
    isPublished: false,
  });

  useEffect(() => { fetchNews(); }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch(API_ENDPOINTS.news);
      if (res.ok) setNews(await res.json());
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      titleEn: '',
      summary: '',
      content: '',
      category: 'company',
      isPublished: false,
    });
    setEditingNews(null);
  };

  const handleSubmit = async () => {
    try {
      const url = editingNews
        ? `${API_ENDPOINTS.news}/${editingNews.id}`
        : API_ENDPOINTS.news;
      const res = await fetch(url, {
        method: editingNews ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsModalOpen(false);
        resetForm();
        fetchNews();
        toast.success(editingNews ? '保存成功' : '发布成功');
      }
    } catch (error) {
      console.error(error);
      toast.error('操作失败');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定删除此新闻？')) return;
    try {
      const res = await fetch(`${API_ENDPOINTS.news}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchNews();
        toast.success('删除成功');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item: NewsItem) => {
    setEditingNews(item);
    setFormData({
      title: item.title,
      titleEn: item.titleEn || '',
      summary: item.summary || '',
      content: item.content || '',
      category: item.category,
      isPublished: item.isPublished,
    });
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (item: NewsItem) => {
    try {
      const res = await fetch(`${API_ENDPOINTS.news}/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, isPublished: !item.isPublished }),
      });
      if (res.ok) fetchNews();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredNews = news.filter((n) => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || n.category === filterCategory;
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'published' ? n.isPublished : !n.isPublished);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getCategoryLabel = (cat: string) =>
    ({ company: '公司', industry: '行业', policy: '政策' }[cat] || cat);

  const getCategoryColor = (cat: string) =>
    ({
      company: 'bg-blue-100 text-blue-700',
      industry: 'bg-green-100 text-green-700',
      policy: 'bg-amber-100 text-amber-700',
    }[cat] || 'bg-gray-100');

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">新闻管理</h1>
        <Button onClick={() => { resetForm(); setIsModalOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" />
          发布新闻
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索新闻标题..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="all">全部分类</option>
            <option value="company">公司动态</option>
            <option value="industry">行业资讯</option>
            <option value="policy">政策法规</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="all">全部状态</option>
            <option value="published">已发布</option>
            <option value="draft">草稿</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[40%]">
                  标题
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">
                  分类
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">
                  状态
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[15%]">
                  发布时间
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[15%]">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredNews.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div
                      className="font-medium text-gray-900 line-clamp-1"
                      title={item.title}
                    >
                      {item.title}
                    </div>
                    <div
                      className="text-sm text-gray-500 line-clamp-1"
                      title={item.summary || ''}
                    >
                      {item.summary || '-'}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full whitespace-nowrap ${getCategoryColor(
                        item.category
                      )}`}
                    >
                      {getCategoryLabel(item.category)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                        item.isPublished
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {item.isPublished ? '已发布' : '草稿'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {item.publishedAt
                      ? new Date(item.publishedAt).toLocaleDateString('zh-CN')
                      : '-'}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleTogglePublish(item)}
                        className={`p-2 rounded-lg transition-colors ${
                          item.isPublished
                            ? 'text-amber-600 hover:bg-amber-50'
                            : 'text-green-600 hover:bg-green-50'
                        }`}
                        title={item.isPublished ? '取消发布' : '发布'}
                      >
                        {item.isPublished ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredNews.length === 0 && (
          <div className="text-center py-12 text-gray-500">暂无新闻数据</div>
        )}
      </div>

      {/* Modal - 优化后的表单布局 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={editingNews ? '编辑新闻' : '发布新闻'}
      >
        <div className="space-y-1">
          {/* 标题 */}
          <Input
            label="新闻标题"
            value={formData.title}
            onChange={(v: string) => setFormData({ ...formData, title: v })}
            placeholder="请输入新闻标题"
            required
          />

          {/* 英文标题 */}
          <Input
            label="英文标题"
            value={formData.titleEn}
            onChange={(v: string) => setFormData({ ...formData, titleEn: v })}
            placeholder="请输入英文标题（可选）"
          />

          {/* 分类 */}
          <Select
            label="新闻分类"
            value={formData.category}
            onChange={(v: string) => setFormData({ ...formData, category: v })}
            options={[
              { value: 'company', label: '公司动态' },
              { value: 'industry', label: '行业资讯' },
              { value: 'policy', label: '政策法规' },
            ]}
            required
          />

          {/* 摘要 */}
          <TextArea
            label="摘要"
            value={formData.summary}
            onChange={(v: string) => setFormData({ ...formData, summary: v })}
            placeholder="请输入新闻摘要"
            rows={3}
          />

          {/* 正文 */}
          <TextArea
            label="正文内容"
            value={formData.content}
            onChange={(v: string) => setFormData({ ...formData, content: v })}
            placeholder="请输入新闻正文内容"
            rows={6}
          />

          {/* 发布选项 */}
          <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg mb-4">
            <input
              type="checkbox"
              id="isPublished"
              checked={formData.isPublished}
              onChange={(e) =>
                setFormData({ ...formData, isPublished: e.target.checked })
              }
              className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
            />
            <label htmlFor="isPublished" className="text-sm text-gray-700">
              立即发布
            </label>
          </div>

          {/* 按钮组 */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              variant="secondary"
              onClick={() => {
                setIsModalOpen(false);
                resetForm();
              }}
            >
              取消
            </Button>
            <Button onClick={handleSubmit}>
              {editingNews ? '保存' : '发布'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
