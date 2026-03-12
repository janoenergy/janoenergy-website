'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Search } from 'lucide-react';
import { API_ENDPOINTS } from '@/lib/api';
import { toast } from 'sonner';
import { FormInput, FormSelect, FormTextArea, FormButton, FormModal, formStyles } from '@/lib/form-components';

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

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const [formData, setFormData] = useState({
    title: '', titleEn: '', summary: '', content: '', category: 'company', isPublished: false,
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
    setFormData({ title: '', titleEn: '', summary: '', content: '', category: 'company', isPublished: false });
    setEditingNews(null);
  };

  const handleSubmit = async () => {
    try {
      const url = editingNews ? `${API_ENDPOINTS.news}/${editingNews.id}` : API_ENDPOINTS.news;
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
    const matchesStatus = filterStatus === 'all' || (filterStatus === 'published' ? n.isPublished : !n.isPublished);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getCategoryLabel = (cat: string) => ({ company: '公司', industry: '行业', policy: '政策' }[cat] || cat);
  const getCategoryColor = (cat: string) => ({ company: 'bg-blue-100 text-blue-700', industry: 'bg-green-100 text-green-700', policy: 'bg-amber-100 text-amber-700' }[cat] || 'bg-gray-100');

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
        <FormButton onClick={() => { resetForm(); setIsModalOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" />
          发布新闻
        </FormButton>
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
              className={formStyles.search}
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className={formStyles.filter}
          >
            <option value="all">全部分类</option>
            <option value="company">公司动态</option>
            <option value="industry">行业资讯</option>
            <option value="policy">政策法规</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={formStyles.filter}
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[40%]">标题</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">分类</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[10%]">状态</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[15%]">发布时间</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-[15%]">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredNews.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-900 line-clamp-1" title={item.title}>{item.title}</div>
                    <div className="text-sm text-gray-500 line-clamp-1" title={item.summary || ''}>{item.summary || '-'}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full whitespace-nowrap ${getCategoryColor(item.category)}`}>
                      {getCategoryLabel(item.category)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full whitespace-nowrap ${item.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {item.isPublished ? '已发布' : '草稿'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('zh-CN') : '-'}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleTogglePublish(item)} className={`p-2 rounded-lg transition-colors ${item.isPublished ? 'text-amber-600 hover:bg-amber-50' : 'text-green-600 hover:bg-green-50'}`} title={item.isPublished ? '取消发布' : '发布'}>
                        {item.isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredNews.length === 0 && <div className="text-center py-12 text-gray-500">暂无新闻数据</div>}
      </div>

      {/* Modal */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={editingNews ? '编辑新闻' : '发布新闻'}
      >
        <FormInput
          label="新闻标题"
          value={formData.title}
          onChange={(v: string) => setFormData({ ...formData, title: v })}
          placeholder="请输入新闻标题"
          required
        />
        <FormInput
          label="英文标题"
          value={formData.titleEn}
          onChange={(v: string) => setFormData({ ...formData, titleEn: v })}
          placeholder="请输入英文标题（可选）"
        />
        <FormSelect
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
        <FormTextArea
          label="摘要"
          value={formData.summary}
          onChange={(v: string) => setFormData({ ...formData, summary: v })}
          placeholder="请输入新闻摘要"
          rows={4}
        />
        <FormTextArea
          label="正文内容"
          value={formData.content}
          onChange={(v: string) => setFormData({ ...formData, content: v })}
          placeholder="请输入新闻正文内容"
          rows={5}
        />
        <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg mb-4">
          <input
            type="checkbox"
            id="isPublished"
            checked={formData.isPublished}
            onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
            className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
          />
          <label htmlFor="isPublished" className="text-sm text-gray-700">
            立即发布
          </label>
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <FormButton variant="secondary" onClick={() => { setIsModalOpen(false); resetForm(); }}>
            取消
          </FormButton>
          <FormButton onClick={handleSubmit}>
            {editingNews ? '保存' : '发布'}
          </FormButton>
        </div>
      </FormModal>
    </div>
  );
}
