'use client';

import { 
  FormInput, 
  FormSelect, 
  FormTextArea,
  Button,
  AdminModal,
  ImageUpload 
} from '@/components/ui/admin-index';
import type { SelectOption } from '@/components/ui/admin-index';
import type { Project, ProjectFormData, ProjectCategory, ProjectStatus } from '@/types';

const CATEGORY_OPTIONS: SelectOption[] = [
  { value: 'wind', label: '风电' },
  { value: 'solar', label: '光伏' },
  { value: 'storage', label: '储能' },
];

const STATUS_OPTIONS: SelectOption[] = [
  { value: 'planning', label: '规划中' },
  { value: 'construction', label: '建设中' },
  { value: 'operation', label: '运营中' },
];

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProject: Project | null;
  formData: ProjectFormData;
  onFormChange: <K extends keyof ProjectFormData>(field: K, value: ProjectFormData[K]) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function ProjectModal({
  isOpen,
  onClose,
  editingProject,
  formData,
  onFormChange,
  onSubmit,
  isSubmitting,
}: ProjectModalProps) {
  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={editingProject ? '编辑项目' : '新建项目'}
      maxWidth="2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <div className="md:col-span-2">
          <ImageUpload
            value={formData.imageUrl}
            onChange={(v) => onFormChange('imageUrl', v)}
            label="项目图片"
          />
        </div>
        <FormInput
          label="项目名称"
          value={formData.title}
          onChange={(e) => onFormChange('title', e.target.value)}
          required
        />
        <FormInput
          label="英文名称"
          value={formData.titleEn}
          onChange={(e) => onFormChange('titleEn', e.target.value)}
        />
        <FormSelect
          label="项目类型"
          value={formData.category}
          onChange={(e) => onFormChange('category', e.target.value as ProjectCategory)}
          options={CATEGORY_OPTIONS}
          required
        />
        <FormSelect
          label="项目状态"
          value={formData.status}
          onChange={(e) => onFormChange('status', e.target.value as ProjectStatus)}
          options={STATUS_OPTIONS}
          required
        />
        <FormInput
          label="装机容量"
          value={formData.capacity}
          onChange={(e) => onFormChange('capacity', e.target.value)}
          placeholder="如: 60MW"
          required
        />
        <FormInput
          label="项目地点"
          value={formData.location}
          onChange={(e) => onFormChange('location', e.target.value)}
          required
        />
        <FormInput
          label="英文地点"
          value={formData.locationEn}
          onChange={(e) => onFormChange('locationEn', e.target.value)}
        />
        <FormInput
          label="开始日期"
          type="date"
          value={formData.startDate}
          onChange={(e) => onFormChange('startDate', e.target.value)}
        />
        <FormInput
          label="结束日期"
          type="date"
          value={formData.endDate}
          onChange={(e) => onFormChange('endDate', e.target.value)}
        />
      </div>
      <FormTextArea
        label="项目描述"
        value={formData.description}
        onChange={(e) => onFormChange('description', e.target.value)}
        rows={4}
      />
      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
        <Button variant="secondary" onClick={onClose}>
          取消
        </Button>
        <Button onClick={onSubmit} loading={isSubmitting}>
          {editingProject ? '保存修改' : '创建项目'}
        </Button>
      </div>
    </AdminModal>
  );
}
