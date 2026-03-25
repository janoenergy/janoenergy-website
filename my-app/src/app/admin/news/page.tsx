'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Search } from 'lucide-react';
import { API_ENDPOINTS } from '@/lib/api';
import { toast } from 'sonner';
import { 
  Button, 
  FormInput, 
  FormSelect, 
  FormTextArea,
  AdminModal 
} from '@/components/ui/admin-index';
import type { SelectOption } from '@/components/ui/admin-index';
import type { NewsItem, NewsFormData, NewsCategory } from '@/types';

// 常量配置
const CATEGORY_OPTIONS: SelectOption[] = [
  { value: 'company', label: '公司动态' },
  { value: 'industry', label: '行业资讯' },
  { value: 'policy', label: '政策法规' },
];

const CATEGORY_LABELS: Record<NewsCategory, string> = {
  company: '公司',
  industry: '行业',
  policy: '政策',
};

const CATEGORY_COLORS: Record<NewsCategory, string> = {
  company: 'bg-blue-100 text-blue-700 border border-blue-200',
  industry: 'bg-green-100 text-green-700 border border-green-200',
  policy: 'bg-amber-100 text-amber-700 border border-amber-200',
};

const INITIAL_FORM_DATA: NewsFormData = {
  title: '',
  titleEn: '',
  summary: '',
  content: '',
  category: 'company',
  isPublished: false,
};

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<NewsFormData>(INITIAL_FORM_DATA);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API_ENDPOINTS.news);
      if (res.ok) {
        const data = await res.json();
        setNews(data);
      }
    } catch (error) {
      console.error('Fetch news error:', error);
      toast.error('获取新闻列表失败');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setEditingNews(null);
  }, []);

  const handleOpenCreate = useCallback(() => {
    resetForm();
    setIsModalOpen(true);
  }, [resetForm]);

  const handleOpenEdit = useCallback((item: NewsItem) => {
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
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!formData.title) {
      toast.error('请填写新闻标题');
      return;
    }
    
    setIsSubmitting(true);
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
      } else {
        toast.error('操作失败');
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('网络错误');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, editingNews, resetForm, fetchNews]);

  const handleDelete = useCallback(async (id: number) => {
    if (!confirm('确定删除此新闻？')) return;
    try {
      const res = await fetch(`${API_ENDPOINTS.news}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchNews();
        toast.success('删除成功');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('删除失败');
    }
  }, [fetchNews]);

  const handleTogglePublish = useCallback(async (item: NewsItem) => {
    try {
      const res = await fetch(`${API_ENDPOINTS.news}/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, isPublished: !item.isPublished }),
      });
      if (res.ok) {
        fetchNews();
        toast.success(item.isPublished ? '已取消发布' : '已发布');
      }
    } catch (error) {
      console.error('Toggle publish error:', error);
      toast.error('操作失败');
    }
  }, [fetchNews]);

  const filteredNews = news.filter((n) => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || n.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'published' ? n.isPublished : !n.isPublished);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    resetForm();
  }, [resetForm]);

  const updateFormField = useCallback(<K extends keyof NewsFormData>(
    field: K,
    value: NewsFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

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
        <div>
          <h1 className="text-2xl font-bold text-gray-900">新闻管理</h1>
          <p className="text-gray-500 mt-1">共 {filteredNews.length} 条新闻</p>
        </div>
        <Button onClick={handleOpenCreate}>
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
              className="w-full h-12 pl-10 pr-4 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none placeholder:text-gray-400"
            />
          </div>
          <FormSelect
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            options={[{ value: 'all', label: '全部分类' }, ...CATEGORY_OPTIONS]}
            className="min-w-[140px]"
          />
          <FormSelect
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[
              { value: 'all', label: '全部状态' },
              { value: 'published', label: '已发布' },
              { value: 'draft', label: '草稿' },
            ]}
            className="min-w-[140px]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[40%]">标题</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[12%]">分类</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[12%]">状态</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[16%]">发布时间</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[20%]">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredNews.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900 text-base line-clamp-1" title={item.title}>{item.title}</div>
                    <div className="text-sm text-gray-500 line-clamp-1" title={item.summary || ''}>{item.summary || '-'}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-1 text-sm font-medium rounded-full whitespace-nowrap ${CATEGORY_COLORS[item.category]}`}>
                      {CATEGORY_LABELS[item.category]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-1 text-sm font-medium rounded-full whitespace-nowrap ${item.isPublished ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-700 border border-gray-200'}`}>
                      {item.isPublished ? '已发布' : '草稿'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-base text-gray-600 whitespace-nowrap">
                    {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('zh-CN') : '-'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTogglePublish(item)}
                        className={item.isPublished ? 'text-amber-600 hover:text-amber-700 hover:bg-amber-50' : 'text-green-600 hover:text-green-700 hover:bg-green-50'}
                        title={item.isPublished ? '取消发布' : '发布'}
                      >
                        {item.isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenEdit(item)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        title="编辑"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        title="删除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredNews.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-base">暂无新闻数据</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingNews ? '编辑新闻' : '发布新闻'}
        maxWidth="2xl"
      >
        <FormInput
          label="新闻标题"
          value={formData.title}
          onChange={(e) => updateFormField('title', e.target.value)}
          placeholder="请输入新闻标题"
          required
        />
        <FormInput
          label="英文标题"
          value={formData.titleEn}
          onChange={(e) => updateFormField('titleEn', e.target.value)}
          placeholder="请输入英文标题（可选）"
        />
        <FormSelect
          label="新闻分类"
          value={formData.category}
          onChange={(e) => updateFormField('category', e.target.value as NewsCategory)}
          options={CATEGORY_OPTIONS}
          required
        />
        <FormTextArea
          label="摘要"
          value={formData.summary}
          onChange={(e) => updateFormField('summary', e.target.value)}
          placeholder="请输入新闻摘要"
          rows={3}
        />
        <FormTextArea
          label="正文内容"
          value={formData.content}
          onChange={(e) => updateFormField('content', e.target.value)}
          placeholder="请输入新闻正文内容"
          rows={5}
        />
        <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg mb-4">
          <input
            type="checkbox"
            id="isPublished"
            checked={formData.isPublished}
            onChange={(e) => updateFormField('isPublished', e.target.checked)}
            className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
          />
          <label htmlFor="isPublished" className="text-base text-gray-700">
            立即发布
          </label>
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button variant="secondary" onClick={handleCloseModal}>
            取消
          </Button>
          <Button onClick={handleSubmit} loading={isSubmitting}>
            {editingNews ? '保存' : '发布'}
          </Button>
        </div>
      </AdminModal>
    </div>
  );
}
