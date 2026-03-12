'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit, Trash2, X, Wind, Sun, Battery, Search, 
  ChevronLeft, ChevronRight, Upload, Image as ImageIcon, Download
} from 'lucide-react';
import { API_ENDPOINTS } from '@/lib/api';
import LoadingSpinner, { TableSkeleton } from '@/components/Loading';
import { toast } from 'sonner';
import { exportToExcel, formatProjectsForExport } from '@/lib/export';

interface Project {
  id: number;
  title: string;
  titleEn?: string;
  category: string;
  status: string;
  capacity: string;
  location: string;
  locationEn?: string;
  description?: string;
  imageUrl?: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
}

// 按钮组件 - 统一高度 44px
function Button({ children, onClick, variant = 'primary', size = 'md', disabled = false, loading = false }: any) {
  const base = 'inline-flex items-center justify-center rounded-lg font-medium transition-all active:scale-95';
  const variants = {
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm',
    secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    ghost: 'hover:bg-gray-100 text-gray-700',
  };
  const sizes = { 
    sm: 'px-3 py-2 text-sm h-9', 
    md: 'px-4 py-2.5 text-base h-11', 
    lg: 'px-6 py-3 text-base h-12' 
  };
  
  return (
    <button 
      onClick={onClick} 
      disabled={disabled || loading} 
      className={`${base} ${variants[variant as keyof typeof variants]} ${sizes[size as keyof typeof sizes]} ${disabled ? 'opacity-50' : ''}`}
    >
      {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />}
      {children}
    </button>
  );
}

// 弹窗组件
function Modal({ isOpen, onClose, title, children }: any) {
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" 
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col" 
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="p-6 overflow-y-auto flex-1">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// 输入组件 - 统一高度 48px，字体 16px
function Input({ label, value, onChange, type = 'text', placeholder = '', required = false }: any) {
  return (
    <div className="mb-5">
      <label className="block text-base font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full h-12 px-4 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-400"
      />
    </div>
  );
}

// 选择组件 - 统一高度 48px，字体 16px
function Select({ label, value, onChange, options, required = false }: any) {
  return (
    <div className="mb-5">
      <label className="block text-base font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full h-12 px-4 pr-10 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white appearance-none cursor-pointer"
        >
          {options.map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// 文本域组件
function TextArea({ label, value, onChange, rows = 4 }: any) {
  return (
    <div className="mb-5">
      <label className="block text-base font-medium text-gray-700 mb-2">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none placeholder:text-gray-400"
      />
    </div>
  );
}

// 图片上传组件
function ImageUpload({ value, onChange, label = '项目图片' }: any) {
  const [preview, setPreview] = useState(value);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div className="mb-5">
      <label className="block text-base font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex items-center gap-4">
        {preview ? (
          <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <button
              onClick={() => { setPreview(''); onChange(''); }}
              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <label className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-colors">
            <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">点击上传</span>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        )}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  const [formData, setFormData] = useState({
    title: '', titleEn: '', category: 'wind', status: 'planning',
    capacity: '', location: '', locationEn: '', description: '',
    imageUrl: '', startDate: '', endDate: ''
  });

  useEffect(() => { fetchProjects(); }, [currentPage, pageSize]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_ENDPOINTS.projects);
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      } else {
        toast.error('获取项目列表失败');
      }
    } catch (error) {
      console.error(error);
      toast.error('网络错误');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '', titleEn: '', category: 'wind', status: 'planning',
      capacity: '', location: '', locationEn: '', description: '',
      imageUrl: '', startDate: '', endDate: ''
    });
    setEditingProject(null);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.capacity || !formData.location) {
      toast.error('请填写必填项');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const url = editingProject 
        ? `${API_ENDPOINTS.projects}/${editingProject.id}`
        : API_ENDPOINTS.projects;
      
      const response = await fetch(url, {
        method: editingProject ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(editingProject ? '项目更新成功' : '项目创建成功');
        setIsModalOpen(false);
        resetForm();
        fetchProjects();
      } else {
        toast.error('操作失败');
      }
    } catch (error) {
      console.error(error);
      toast.error('网络错误');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这个项目吗？此操作不可恢复。')) return;
    
    try {
      const response = await fetch(`${API_ENDPOINTS.projects}/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        toast.success('项目删除成功');
        fetchProjects();
      } else {
        toast.error('删除失败');
      }
    } catch (error) {
      console.error(error);
      toast.error('网络错误');
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      titleEn: project.titleEn || '',
      category: project.category,
      status: project.status,
      capacity: project.capacity,
      location: project.location,
      locationEn: project.locationEn || '',
      description: project.description || '',
      imageUrl: project.imageUrl || '',
      startDate: project.startDate?.split('T')[0] || '',
      endDate: project.endDate?.split('T')[0] || ''
    });
    setIsModalOpen(true);
  };

  const handleExport = () => {
    const data = formatProjectsForExport(filteredProjects);
    exportToExcel(data, '项目列表');
    toast.success('导出成功');
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredProjects.length / pageSize);
  const paginatedProjects = filteredProjects.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'wind': return <Wind className="w-4 h-4 text-blue-500" />;
      case 'solar': return <Sun className="w-4 h-4 text-amber-500" />;
      default: return <Battery className="w-4 h-4 text-green-500" />;
    }
  };

  const getCategoryLabel = (cat: string) => ({ wind: '风电', solar: '光伏', storage: '储能' }[cat] || cat);
  const getStatusLabel = (status: string) => ({ planning: '规划中', construction: '建设中', operation: '运营中' }[status] || status);
  const getStatusColor = (status: string) => ({
    planning: 'bg-gray-100 text-gray-700 border-gray-200',
    construction: 'bg-amber-50 text-amber-700 border-amber-200',
    operation: 'bg-green-50 text-green-700 border-green-200'
  }[status] || 'bg-gray-100');

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">项目管理</h1>
          <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        <TableSkeleton rows={5} />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="p-4 md:p-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">项目管理</h1>
          <p className="text-gray-500 mt-1">共 {filteredProjects.length} 个项目</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" /> 导出 Excel
          </Button>
          <Button onClick={() => { resetForm(); setIsModalOpen(true); }}>
            <Plus className="w-4 h-4 mr-2" /> 新建项目
          </Button>
        </div>
      </div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm p-4 mb-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="搜索项目名称或地点..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-10 pr-4 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-400"
            />
          </div>
          <div className="relative">
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              className="h-12 px-4 pr-10 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white appearance-none cursor-pointer min-w-[140px]"
            >
              <option value="all">全部类型</option>
              <option value="wind">风电</option>
              <option value="solar">光伏</option>
              <option value="storage">储能</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div className="relative">
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="h-12 px-4 pr-10 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white appearance-none cursor-pointer min-w-[140px]"
            >
              <option value="all">全部状态</option>
              <option value="planning">规划中</option>
              <option value="construction">建设中</option>
              <option value="operation">运营中</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Table - 使用 min-w 确保表格不压缩 */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '35%' }}>项目信息</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '12%' }}>类型</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '15%' }}>容量</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '18%' }}>状态</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '20%' }}>操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <AnimatePresence>
                {paginatedProjects.map((project, index) => (
                  <motion.tr 
                    key={project.id} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {project.imageUrl ? (
                          <img src={project.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                            <ImageIcon className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-gray-900 text-base truncate">{project.title}</div>
                          <div className="text-sm text-gray-500 truncate">{project.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(project.category)}
                        <span className="text-base whitespace-nowrap">{getCategoryLabel(project.category)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-base font-medium text-gray-900 whitespace-nowrap">{project.capacity}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full border whitespace-nowrap ${getStatusColor(project.status)}`}>
                        {getStatusLabel(project.status)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => handleEdit(project)} 
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="编辑"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(project.id)} 
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="删除"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        {paginatedProjects.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-base">没有找到匹配的项目</p>
          </div>
        )}
        
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              显示 {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, filteredProjects.length)} 条，共 {filteredProjects.length} 条
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-600">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); resetForm(); }} 
        title={editingProject ? '编辑项目' : '新建项目'}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <div className="md:col-span-2">
            <ImageUpload 
              value={formData.imageUrl} 
              onChange={(v: string) => setFormData({...formData, imageUrl: v})} 
            />
          </div>
          <Input 
            label="项目名称" 
            value={formData.title} 
            onChange={(v: string) => setFormData({...formData, title: v})} 
            required 
          />
          <Input 
            label="英文名称" 
            value={formData.titleEn} 
            onChange={(v: string) => setFormData({...formData, titleEn: v})} 
          />
          <Select 
            label="项目类型" 
            value={formData.category} 
            onChange={(v: string) => setFormData({...formData, category: v})}
            options={[{value:'wind',label:'风电'},{value:'solar',label:'光伏'},{value:'storage',label:'储能'}]} 
            required 
          />
          <Select 
            label="项目状态" 
            value={formData.status} 
            onChange={(v: string) => setFormData({...formData, status: v})}
            options={[{value:'planning',label:'规划中'},{value:'construction',label:'建设中'},{value:'operation',label:'运营中'}]} 
            required 
          />
          <Input 
            label="装机容量" 
            value={formData.capacity} 
            onChange={(v: string) => setFormData({...formData, capacity: v})} 
            placeholder="如: 60MW" 
            required 
          />
          <Input 
            label="项目地点" 
            value={formData.location} 
            onChange={(v: string) => setFormData({...formData, location: v})} 
            required 
          />
          <Input 
            label="英文地点" 
            value={formData.locationEn} 
            onChange={(v: string) => setFormData({...formData, locationEn: v})} 
          />
          <Input 
            label="开始日期" 
            type="date" 
            value={formData.startDate} 
            onChange={(v: string) => setFormData({...formData, startDate: v})} 
          />
          <Input 
            label="结束日期" 
            type="date" 
            value={formData.endDate} 
            onChange={(v: string) => setFormData({...formData, endDate: v})} 
          />
        </div>
        <TextArea 
          label="项目描述" 
          value={formData.description} 
          onChange={(v: string) => setFormData({...formData, description: v})} 
          rows={4} 
        />
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
          <Button variant="secondary" onClick={() => { setIsModalOpen(false); resetForm(); }}>
            取消
          </Button>
          <Button onClick={handleSubmit} loading={isSubmitting}>
            {editingProject ? '保存修改' : '创建项目'}
          </Button>
        </div>
      </Modal>
    </motion.div>
  );
}
