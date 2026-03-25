'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, Download } from 'lucide-react';
import { API_ENDPOINTS } from '@/lib/api';
import LoadingSpinner, { TableSkeleton } from '@/components/Loading';
import { toast } from 'sonner';
import { exportToExcel, formatProjectsForExport } from '@/lib/export';
import { Button } from '@/components/ui/admin-index';
import { ProjectTable } from './components/ProjectTable';
import { ProjectFilters } from './components/ProjectFilters';
import { ProjectPagination } from './components/ProjectPagination';
import { ProjectModal } from './components/ProjectModal';
import type { Project, ProjectFormData } from '@/types';

const INITIAL_FORM_DATA: ProjectFormData = {
  title: '',
  titleEn: '',
  category: 'wind',
  status: 'planning',
  capacity: '',
  location: '',
  locationEn: '',
  description: '',
  imageUrl: '',
  startDate: '',
  endDate: '',
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const [formData, setFormData] = useState<ProjectFormData>(INITIAL_FORM_DATA);

  const fetchProjects = useCallback(async () => {
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
      console.error('Fetch projects error:', error);
      toast.error('网络错误');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setEditingProject(null);
  }, []);

  const handleOpenCreate = useCallback(() => {
    resetForm();
    setIsModalOpen(true);
  }, [resetForm]);

  const handleOpenEdit = useCallback((project: Project) => {
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
      endDate: project.endDate?.split('T')[0] || '',
    });
    setIsModalOpen(true);
  }, []);

  const handleSubmit = useCallback(async () => {
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
      console.error('Submit error:', error);
      toast.error('网络错误');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, editingProject, resetForm, fetchProjects]);

  const handleDelete = useCallback(async (id: number) => {
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
      console.error('Delete error:', error);
      toast.error('网络错误');
    }
  }, [fetchProjects]);

  const handleExport = useCallback(() => {
    const data = formatProjectsForExport(filteredProjects);
    exportToExcel(data, '项目列表');
    toast.success('导出成功');
  }, []);

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredProjects.length / pageSize);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    resetForm();
  }, [resetForm]);

  const updateFormField = useCallback(<K extends keyof ProjectFormData>(
    field: K,
    value: ProjectFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

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
          <Button onClick={handleOpenCreate}>
            <Plus className="w-4 h-4 mr-2" /> 新建项目
          </Button>
        </div>
      </div>

      {/* Filters */}
      <ProjectFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterCategory={filterCategory}
        onCategoryChange={setFilterCategory}
        filterStatus={filterStatus}
        onStatusChange={setFilterStatus}
      />

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      >
        <ProjectTable
          projects={paginatedProjects}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />

        <ProjectPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredProjects.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </motion.div>

      {/* Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingProject={editingProject}
        formData={formData}
        onFormChange={updateFormField}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </motion.div>
  );
}
